const MVP_VERSION = "v3";
document.documentElement.classList.add("motion-enabled");
const SESSION_ID_KEY = "daily-quotes-mvp-session-id";
const SESSION_START_KEY = "daily-quotes-mvp-v3-session-started";
const SAVED_QUOTES_KEY = "daily-quotes-saved";
const CATEGORIES = ["위로", "동기부여", "관계", "자존감", "긍정"];
const CATEGORY_EXAMPLES = Object.freeze({
  "위로": "요즘 계속 일이 안 풀리는데 당장은 제가 할 수 있는 것도 별로 없는 것 같아서 막막해요.",
  "동기부여": "새롭게 해보고 싶은 일이 생겼는데 지금 시작하기에는 너무 늦은 것 같아요. 이미 다른 사람들은 훨씬 앞서 있는 것 같아서 지금 방향을 바꿔도 되는지 망설여져요.",
  "관계": "믿었던 사람한테 크게 상처받았어요. 너무 화가 나서 저도 똑같이 상처를 주고 싶다는 생각이 자꾸 들어요.",
  "자존감": "주변 사람들은 다 자기 분야에서 잘하고 빛나는 것 같은데 저는 특별히 보여줄 것도 없는 것 같아요. 자꾸 남들과 비교하게 돼요.",
  "긍정": "소소한 행복에 대한 따뜻한 문구를 받아보고 싶어요."
});

const $ = selector => document.querySelector(selector);
const createId = () => crypto.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const sessionId = sessionStorage.getItem(SESSION_ID_KEY) || createId();
sessionStorage.setItem(SESSION_ID_KEY, sessionId);

let currentIndex = -1;
let selectedCategory = null;
let pendingCategory = null;
let currentContext = "";
let currentRecommendationSource = null;
let currentPersonalizedReflection = "";
let libraryCategory = "전체";
let libraryVisible = 4;
let categorySelectionCount = 0;
let recommendationCount = 0;
let recommendationInFlight = false;
let heroIntroPlayed = false;
let scrollTextFrame;
let quoteLineLayoutFrame;
let supabaseClient = null;
let trackingClientPromise = null;
let trackingQueue = Promise.resolve();
const TRACKING_MAX_RETRIES = 2;

function loadSavedQuoteIds() {
  let stored;
  try {
    stored = JSON.parse(localStorage.getItem(SAVED_QUOTES_KEY) || "[]");
  } catch {
    stored = [];
  }

  const ids = stored
    .map(value => Number.isInteger(value) ? quotes[value]?.id : value)
    .filter(value => quotes.some(quote => quote.id === value));
  const uniqueIds = [...new Set(ids)];
  localStorage.setItem(SAVED_QUOTES_KEY, JSON.stringify(uniqueIds));
  return uniqueIds;
}

let savedQuoteIds = loadSavedQuoteIds();

function currentQuote() {
  return quotes[currentIndex];
}

function displayAuthor(author) {
  return /^《[^》]+》$/.test(author) ? `영화 ${author}` : author;
}

function gaEvent(eventName, values = {}) {
  if (typeof window.gtag !== "function") return;
  const analyticsValues = {
    mvp_version: MVP_VERSION,
    quote_id: values.quote_id,
    quote_category: values.quote_category,
    rating: values.rating
  };
  Object.keys(analyticsValues).forEach(key => {
    if (analyticsValues[key] === undefined || analyticsValues[key] === null) delete analyticsValues[key];
  });
  window.gtag("event", eventName, analyticsValues);
}

async function getTrackingClient() {
  if (supabaseClient) return supabaseClient;
  if (trackingClientPromise) return trackingClientPromise;

  trackingClientPromise = (async () => {
    if (!window.supabase) throw new Error("Supabase client is unavailable.");
    const response = await fetch("/api/supabase-config");
    if (!response.ok) throw new Error("Supabase configuration is unavailable.");
    const config = await response.json();
    supabaseClient = window.supabase.createClient(config.url, config.anonKey);
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
      const { error } = await supabaseClient.auth.signInAnonymously();
      if (error) throw error;
    }
    return supabaseClient;
  })().catch(error => {
    supabaseClient = null;
    trackingClientPromise = null;
    throw error;
  });

  return trackingClientPromise;
}

function trackEvent(eventName, values = {}) {
  gaEvent(eventName, values);

  const event = {
    session_id: sessionId,
    mvp_version: MVP_VERSION,
    event_name: eventName,
    quote_id: values.quote_id || null,
    quote_category: values.quote_category || null,
    rating: values.rating ?? null,
    feedback: values.feedback || null,
    metadata: values.metadata || {},
    created_at: new Date().toISOString()
  };

  trackingQueue = trackingQueue.then(() => insertTrackingEvent(event));
}

async function insertTrackingEvent(event) {
  for (let attempt = 0; attempt <= TRACKING_MAX_RETRIES; attempt += 1) {
    try {
      const client = await getTrackingClient();
      const { data: { user }, error: userError } = await client.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("Supabase user is unavailable.");

      const { error } = await client.from("mvp_events").insert({ ...event, user_id: user.id });
      if (error) throw error;
      return;
    } catch (error) {
      if (attempt === TRACKING_MAX_RETRIES) {
        console.warn(`[MVP analytics] Failed to store ${event.event_name}.`, error);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 250 * (attempt + 1)));
    }
  }
}

function quoteEventValues(quote = currentQuote(), metadata = {}) {
  return {
    quote_id: quote.id,
    quote_category: quote.category,
    metadata: {
      selected_category: selectedCategory,
      context_used: Boolean(currentContext),
      recommendation_source: currentRecommendationSource,
      ...metadata
    }
  };
}

function randomQuoteIndex(category, excludedIndex = -1) {
  const candidates = quotes
    .map((quote, index) => ({ quote, index }))
    .filter(item => item.quote.category === category && item.index !== excludedIndex);
  return candidates[Math.floor(Math.random() * candidates.length)].index;
}

function fallbackRecommendation() {
  const index = randomQuoteIndex(selectedCategory, currentIndex);
  const quote = quotes[index];
  return {
    quote_id: quote.id,
    personalized_reflection: quote.reflection,
    recommendation_source: "fallback"
  };
}

async function requestPersonalizedRecommendation() {
  if (!currentContext) return fallbackRecommendation();

  try {
    const response = await fetch("/api/recommend-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: selectedCategory, context: currentContext })
    });
    if (!response.ok) throw new Error(`Recommendation request failed (${response.status}).`);

    const result = await response.json();
    const quote = quotes.find(candidate => candidate.id === result.quote_id);
    const reflection = typeof result.personalized_reflection === "string"
      ? result.personalized_reflection.trim()
      : "";
    if (!quote || quote.category !== selectedCategory || !reflection) {
      throw new Error("Recommendation response is invalid.");
    }
    if (currentIndex >= 0 && quote.id === currentQuote().id) {
      throw new Error("Recommendation repeated the current quote.");
    }

    return {
      quote_id: quote.id,
      personalized_reflection: reflection,
      recommendation_source: result.recommendation_source === "fallback" ? "fallback" : "ai"
    };
  } catch (error) {
    console.warn("[MVP recommendation] Using a local fallback.", error);
    return fallbackRecommendation();
  }
}

function prepareScrollText() {
  const text = $("#quoteText");
  const raw = text.textContent;
  text.setAttribute("aria-label", raw);
  text.replaceChildren();
  let charIndex = 0;
  (raw.match(/\S+\s*/gu) || []).forEach(token => {
    const wordText = token.trimEnd();
    const trailingSpace = token.slice(wordText.length);
    const word = document.createElement("span");
    word.className = "scroll-word";
    word.dataset.word = wordText;
    [...wordText].forEach(char => {
      const letter = document.createElement("span");
      letter.className = "scroll-char";
      letter.setAttribute("aria-hidden", "true");
      letter.style.setProperty("--char", charIndex);
      letter.textContent = char;
      word.append(letter);
      charIndex += 1;
    });
    if (trailingSpace) word.append(document.createTextNode("\u00a0"));
    text.append(word);
  });
  scheduleQuoteLineLayout();
  updateScrollText();
}

const LINE_END_DEPENDENTS = new Set([
  "그", "이", "저", "어떤", "한", "내", "네", "우리", "모든", "아무", "각", "몇", "또", "더", "수", "것"
]);
const sentenceEndPattern = /[.!?…。！？][”"'’）)\]}]*$/u;
const phraseEndPattern = /[,;:，、；：.!?…。！？][”"'’）)\]}]*$/u;

function normalizedWord(word) {
  return word.replace(/^[^\p{L}\p{N}]+/gu, "").replace(/[^\p{L}\p{N}]+$/gu, "");
}

function quoteLinePenalty(words, start, end, width, target, available, isLastLine) {
  const lineWordCount = end - start;
  const endWord = words[end - 1].dataset.word || "";
  let penalty = Math.pow((width - target) / available, 2) * 100;

  if (lineWordCount === 1 && words.length > 1) penalty += isLastLine ? 110 : 55;
  else if (lineWordCount === 2 && isLastLine) penalty += 24;

  if (!isLastLine && LINE_END_DEPENDENTS.has(normalizedWord(endWord))) penalty += 500;
  if (!isLastLine && sentenceEndPattern.test(endWord)) penalty -= 10;
  else if (!isLastLine && phraseEndPattern.test(endWord)) penalty -= 4;

  let lastSentenceEnd = -1;
  for (let index = start; index < end - 1; index += 1) {
    if (sentenceEndPattern.test(words[index].dataset.word || "")) lastSentenceEnd = index;
  }
  if (lastSentenceEnd >= start) {
    const nextSentenceWordsOnLine = end - lastSentenceEnd - 1;
    if (nextSentenceWordsOnLine <= 2) penalty += nextSentenceWordsOnLine === 1 ? 90 : 48;
  }

  return penalty;
}

function findBalancedBreaks(words, widths, available, lineCount) {
  const wordCount = words.length;
  const prefixWidths = [0];
  widths.forEach(width => prefixWidths.push(prefixWidths[prefixWidths.length - 1] + width));
  const target = prefixWidths[wordCount] / lineCount;
  const costs = Array.from({ length: lineCount + 1 }, () => Array(wordCount + 1).fill(Infinity));
  const previous = Array.from({ length: lineCount + 1 }, () => Array(wordCount + 1).fill(-1));
  costs[0][0] = 0;

  for (let line = 1; line <= lineCount; line += 1) {
    for (let end = line; end <= wordCount; end += 1) {
      const remainingWords = wordCount - end;
      const remainingLines = lineCount - line;
      if (remainingWords < remainingLines) continue;

      for (let start = line - 1; start < end; start += 1) {
        if (!Number.isFinite(costs[line - 1][start])) continue;
        const width = prefixWidths[end] - prefixWidths[start];
        if (width > available + 1) continue;
        const linePenalty = quoteLinePenalty(words, start, end, width, target, available, line === lineCount);
        const nextCost = costs[line - 1][start] + linePenalty;
        if (nextCost < costs[line][end]) {
          costs[line][end] = nextCost;
          previous[line][end] = start;
        }
      }
    }
  }

  if (!Number.isFinite(costs[lineCount][wordCount])) return null;
  const breaks = [];
  let end = wordCount;
  for (let line = lineCount; line > 1; line -= 1) {
    const start = previous[line][end];
    if (start < 0) return null;
    breaks.unshift(start);
    end = start;
  }
  return breaks;
}

function updateQuoteLineBreaks() {
  const text = $("#quoteText");
  if (!text) return;
  text.querySelectorAll(".smart-quote-break").forEach(breakElement => breakElement.remove());
  const words = [...text.querySelectorAll(".scroll-word")];
  const available = text.clientWidth;
  if (words.length < 2 || available <= 0) return;

  const widths = words.map(word => word.getBoundingClientRect().width);
  const totalWidth = widths.reduce((sum, width) => sum + width, 0);
  const minimumLines = Math.max(1, Math.ceil(totalWidth / available));
  if (minimumLines === 1) return;

  let breaks = null;
  for (let lineCount = minimumLines; lineCount <= Math.min(words.length, minimumLines + 2); lineCount += 1) {
    breaks = findBalancedBreaks(words, widths, available, lineCount);
    if (breaks) break;
  }
  if (!breaks) return;

  breaks.forEach(index => {
    const breakElement = document.createElement("br");
    breakElement.className = "smart-quote-break";
    breakElement.setAttribute("aria-hidden", "true");
    words[index].before(breakElement);
  });
}

function scheduleQuoteLineLayout() {
  if (quoteLineLayoutFrame) cancelAnimationFrame(quoteLineLayoutFrame);
  quoteLineLayoutFrame = requestAnimationFrame(() => {
    updateQuoteLineBreaks();
    quoteLineLayoutFrame = null;
  });
}

function updateScrollText() {
  const stage = $("#quote");
  const chars = document.querySelectorAll(".scroll-char");
  if (!stage || !chars.length) return;
  const rect = stage.getBoundingClientRect();
  const viewportHeight = innerHeight;
  const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight));
  const total = Math.max(chars.length - 1, 1);
  chars.forEach((char, index) => {
    const rawReveal = Math.max(0, Math.min(1, (progress - index / total * .7) / .3));
    const reveal = rawReveal * rawReveal * (3 - 2 * rawReveal);
    char.style.setProperty("--reveal", reveal.toFixed(3));
  });
}

function updateClosingMotion() {
  const section = $(".closing");
  if (!section) return;
  const rect = section.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / rect.height));
  const phase = (start, end) => Math.max(0, Math.min(1, (progress - start) / (end - start)));
  section.style.setProperty("--closing-kicker", phase(0, .2).toFixed(3));
  section.style.setProperty("--closing-line-one", phase(.16, .5).toFixed(3));
  section.style.setProperty("--closing-line-two", phase(.32, .68).toFixed(3));
  section.style.setProperty("--closing-button", phase(.62, .9).toFixed(3));
}

function resetRating() {
  const form = $("#ratingForm");
  form.reset();
  form.querySelectorAll("input, textarea, button").forEach(control => control.disabled = false);
  form.classList.remove("is-complete");
  $("#ratingSubmit").textContent = "평가 제출";
  $("#ratingStatus").textContent = "";
}

function updateSaveButton() {
  const saved = savedQuoteIds.includes(currentQuote().id);
  $("#saveQuote").setAttribute("aria-pressed", String(saved));
  $("#saveQuote span").textContent = saved ? "저장됨" : "저장";
}

function renderQuote(index, {
  animate = false,
  scroll = false,
  source = "fallback",
  personalizedReflection = quotes[index].reflection
} = {}) {
  const inner = $(".quote-inner");
  const update = () => {
    currentIndex = index;
    recommendationCount += 1;
    currentRecommendationSource = source;
    currentPersonalizedReflection = personalizedReflection;
    const quote = currentQuote();
    $("#quoteCategory").textContent = quote.category;
    $("#quoteText").textContent = `“${quote.text}”`;
    $("#quoteAuthor").textContent = displayAuthor(quote.author);
    $("#quoteReflection").textContent = currentPersonalizedReflection;
    prepareScrollText();
    updateSaveButton();
    resetRating();
    trackEvent("quote_view", quoteEventValues(quote, {
      recommendation_number: recommendationCount,
      recommendation_source: source
    }));
  };

  if (animate && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    inner.classList.remove("quote-enter");
    inner.classList.add("quote-leave");
    clearTimeout(renderQuote.timer);
    renderQuote.timer = setTimeout(() => {
      update();
      inner.classList.remove("quote-leave");
      void inner.offsetWidth;
      inner.classList.add("quote-enter");
    }, 280);
  } else {
    update();
  }

  if (scroll) $("#quote").scrollIntoView({ behavior: "smooth" });
}

function renderSaved() {
  $("#savedCount").textContent = savedQuoteIds.length;
  const savedQuotes = savedQuoteIds
    .map(id => quotes.find(quote => quote.id === id))
    .filter(Boolean);
  $("#savedList").innerHTML = savedQuotes.length
    ? savedQuotes.map(quote => `
      <article class="saved-item">
        <div><p>“${quote.text}”</p><small>— ${displayAuthor(quote.author)} · ${quote.category}</small></div>
        <button type="button" data-remove="${quote.id}">삭제</button>
      </article>`).join("")
    : "<p class='empty'>아직 저장한 말이 없습니다.<br>마음에 머무는 말을 저장해 보세요.</p>";
}

function renderLibrary() {
  const filteredQuotes = libraryCategory === "전체"
    ? quotes
    : quotes.filter(quote => quote.category === libraryCategory);
  const visibleQuotes = filteredQuotes.slice(0, libraryVisible);
  const grid = $("#libraryGrid");
  const fragment = document.createDocumentFragment();

  visibleQuotes.forEach(quote => {
    const card = document.createElement("article");
    card.className = "library-card";

    const category = document.createElement("span");
    category.className = "library-card-category";
    category.textContent = quote.category;

    const text = document.createElement("p");
    text.className = "library-card-text";
    text.textContent = `“${quote.text}”`;

    const cardFooter = document.createElement("div");
    cardFooter.className = "library-card-footer";

    const source = document.createElement("footer");
    source.className = "library-card-source";
    source.textContent = `— ${displayAuthor(quote.author)}`;

    const viewButton = document.createElement("button");
    viewButton.className = "library-view";
    viewButton.type = "button";
    viewButton.dataset.libraryQuoteId = quote.id;
    viewButton.textContent = "이 문구 크게 보기 →";

    cardFooter.append(source, viewButton);
    card.append(category, text, cardFooter);
    fragment.append(card);
  });

  grid.replaceChildren(fragment);
  $("#libraryCount").textContent = `${libraryCategory} ${visibleQuotes.length} / ${filteredQuotes.length}개`;
  $("#libraryShowMore").hidden = visibleQuotes.length >= filteredQuotes.length;
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove("show"), 1800);
}

function recommendationNotice(source) {
  if (source === "ai") return "AI가 입력한 상황에 맞춰 문구를 골랐어요.";
  if (currentContext) return "AI 추천을 불러오지 못해 기본 추천으로 문구를 골랐어요.";
  return "기본 추천으로 문구를 골랐어요.";
}

function updateCategorySubmitState() {
  $("#categorySubmit").disabled = recommendationInFlight || !pendingCategory;
}

function setRecommendationLoading(loading, trigger) {
  recommendationInFlight = loading;
  $("#nextQuote").disabled = loading;
  $("#changeCategory").disabled = loading;
  $("#categoryClose").disabled = loading;
  $("#situationInput").disabled = loading;
  document.querySelectorAll("[data-category]").forEach(button => button.disabled = loading);
  $("#nextQuote").textContent = loading && trigger === "next" ? "문구를 고르는 중…" : "새 문구 추천";
  $("#categorySubmit").textContent = loading && trigger === "category"
    ? "문구를 고르는 중…"
    : "오늘의 말 만나기 →";
  updateCategorySubmitState();
}

async function recommendAndRender({ trigger, scroll = false } = {}) {
  if (recommendationInFlight) return;
  const animate = currentIndex >= 0;
  setRecommendationLoading(true, trigger);

  try {
    const recommendation = await requestPersonalizedRecommendation();
    const index = quotes.findIndex(quote => quote.id === recommendation.quote_id);
    closeCategoryDialog();
    renderQuote(index, {
      animate,
      scroll,
      source: recommendation.recommendation_source,
      personalizedReflection: recommendation.personalized_reflection
    });
    toast(recommendationNotice(recommendation.recommendation_source));
    if (animate) await new Promise(resolve => setTimeout(resolve, 320));
  } finally {
    setRecommendationLoading(false, trigger);
  }
}

function selectCategory(category) {
  if (!CATEGORIES.includes(category)) return;
  pendingCategory = category;
  $("#situationInput").placeholder = CATEGORY_EXAMPLES[category];
  document.querySelectorAll("[data-category]").forEach(button => {
    const selected = button.dataset.category === category;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-checked", String(selected));
  });
  updateCategorySubmitState();
  $("#categoryStatus").textContent = "";
}

function resetCategoryForm() {
  pendingCategory = null;
  const situationInput = $("#situationInput");
  situationInput.value = "";
  situationInput.placeholder = "카테고리를 선택하면 상황에 맞는 예시가 보여요.";
  $("#situationCount b").textContent = "0";
  $("#categoryStatus").textContent = "";
  document.querySelectorAll("[data-category]").forEach(button => {
    button.classList.remove("selected");
    button.setAttribute("aria-checked", "false");
  });
  updateCategorySubmitState();
}

function openCategoryDialog({ reset = false } = {}) {
  if (reset) {
    resetCategoryForm();
  } else {
    pendingCategory = selectedCategory;
    if (pendingCategory) selectCategory(pendingCategory);
  }
  $("#categoryClose").hidden = reset || !selectedCategory;
  if (!$("#categoryDialog").open) $("#categoryDialog").showModal();
  document.body.classList.add("dialog-open");
}

function openCategoryDialogAtTop() {
  if (window.scrollY <= 2) {
    openCategoryDialog({ reset: true });
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startedAt = performance.now();

  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  const waitForTop = () => {
    if (window.scrollY <= 2 || performance.now() - startedAt > 1000) {
      window.scrollTo({ top: 0, behavior: "auto" });
      openCategoryDialog({ reset: true });
      return;
    }

    window.requestAnimationFrame(waitForTop);
  };

  window.requestAnimationFrame(waitForTop);
}

function playHeroIntro() {
  if (heroIntroPlayed) return;
  heroIntroPlayed = true;
  setTimeout(() => {
    requestAnimationFrame(() => $(".hero").classList.add("intro-visible"));
  }, 120);
}

function closeCategoryDialog() {
  if (!selectedCategory) return;
  if ($("#categoryDialog").open) $("#categoryDialog").close();
  document.body.classList.remove("dialog-open");
  playHeroIntro();
}

addEventListener("scroll", () => {
  if (scrollTextFrame) return;
  scrollTextFrame = requestAnimationFrame(() => {
    updateScrollText();
    updateClosingMotion();
    scrollTextFrame = null;
  });
}, { passive: true });
addEventListener("resize", () => {
  scheduleQuoteLineLayout();
  updateScrollText();
  updateClosingMotion();
});
document.fonts?.ready.then(scheduleQuoteLineLayout);

$("#todayLabel").textContent = new Intl.DateTimeFormat("ko-KR", {
  month: "long", day: "numeric", weekday: "long"
}).format(new Date());

$("#categoryForm").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (button) selectCategory(button.dataset.category);
});

$("#situationInput").addEventListener("input", event => {
  $("#situationCount b").textContent = event.currentTarget.value.length;
  $("#categoryStatus").textContent = "";
  updateCategorySubmitState();
});

$("#categoryForm").addEventListener("submit", async event => {
  event.preventDefault();
  if (!pendingCategory) {
    $("#categoryStatus").textContent = "필요한 문구 카테고리를 하나 선택해 주세요.";
    return;
  }
  const context = $("#situationInput").value.trim();

  const previousCategory = selectedCategory;
  selectedCategory = pendingCategory;
  currentContext = context;
  categorySelectionCount += 1;
  trackEvent("category_select", {
    quote_category: selectedCategory,
    metadata: {
      context_used: Boolean(context),
      selection_order: categorySelectionCount,
      selection_type: previousCategory ? "change" : "initial",
      previous_category: previousCategory
    }
  });
  await recommendAndRender({ trigger: "category", scroll: currentIndex >= 0 });
});

$("#categoryClose").addEventListener("click", closeCategoryDialog);
$("#categoryDialog").addEventListener("cancel", event => {
  event.preventDefault();
  closeCategoryDialog();
});
$("#changeCategory").addEventListener("click", openCategoryDialogAtTop);

$("#nextQuote").addEventListener("click", async () => {
  const previous = currentQuote();
  trackEvent("next_quote", quoteEventValues(previous, { recommendation_number: recommendationCount }));
  await recommendAndRender({ trigger: "next" });
});

$("#saveQuote").addEventListener("click", () => {
  const quote = currentQuote();
  const savedIndex = savedQuoteIds.indexOf(quote.id);
  if (savedIndex >= 0) {
    savedQuoteIds.splice(savedIndex, 1);
    toast("저장에서 삭제했어요.");
  } else {
    savedQuoteIds.unshift(quote.id);
    trackEvent("save_quote", quoteEventValues(quote, { recommendation_number: recommendationCount }));
    toast("문구를 저장했어요.");
  }
  localStorage.setItem(SAVED_QUOTES_KEY, JSON.stringify(savedQuoteIds));
  updateSaveButton();
  renderSaved();
});

$("#shareQuote").addEventListener("click", async () => {
  const quote = currentQuote();
  const text = `“${quote.text}” — ${quote.author}`;
  trackEvent("share_quote", quoteEventValues(quote, { recommendation_number: recommendationCount }));
  try {
    if (navigator.share) await navigator.share({ title: "하루 한마디", text });
    else {
      await navigator.clipboard.writeText(text);
      toast("문구를 복사했어요.");
    }
  } catch (error) {
    if (error.name !== "AbortError") toast("공유하지 못했어요.");
  }
});

$("#savedNav").addEventListener("click", () => {
  $("#savedPanel").hidden = false;
  renderSaved();
  $("#savedPanel").scrollIntoView({ behavior: "smooth" });
});

$("#closeSaved").addEventListener("click", () => {
  $("#savedPanel").hidden = true;
  $("#today").scrollIntoView({ behavior: "smooth" });
});

$("#libraryNav").addEventListener("click", () => {
  $("#libraryPanel").hidden = false;
  $("#libraryNav").setAttribute("aria-expanded", "true");
  libraryVisible = 4;
  renderLibrary();
  $("#libraryPanel").scrollIntoView({ behavior: "smooth" });
});

$("#closeLibrary").addEventListener("click", () => {
  $("#libraryPanel").hidden = true;
  $("#libraryNav").setAttribute("aria-expanded", "false");
  $("#today").scrollIntoView({ behavior: "smooth" });
});

$("#libraryPanel").addEventListener("click", event => {
  const filterButton = event.target.closest("[data-library-category]");
  if (filterButton) {
    libraryCategory = filterButton.dataset.libraryCategory;
    libraryVisible = 4;
    document.querySelectorAll("[data-library-category]").forEach(filter => {
      const active = filter === filterButton;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    renderLibrary();
    return;
  }

  const viewButton = event.target.closest("[data-library-quote-id]");
  if (!viewButton) return;
  const index = quotes.findIndex(quote => quote.id === viewButton.dataset.libraryQuoteId);
  if (index < 0) return;
  const quote = quotes[index];
  selectedCategory = quote.category;
  pendingCategory = quote.category;
  currentContext = "";
  $("#libraryPanel").hidden = true;
  $("#libraryNav").setAttribute("aria-expanded", "false");
  renderQuote(index, {
    animate: currentIndex >= 0,
    scroll: true,
    source: "fallback",
    personalizedReflection: quote.reflection
  });
  toast("라이브러리에서 선택한 문구를 크게 보여드려요.");
});

$("#libraryShowMore").addEventListener("click", () => {
  libraryVisible += 4;
  renderLibrary();
});

$("#savedList").addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  savedQuoteIds = savedQuoteIds.filter(id => id !== button.dataset.remove);
  localStorage.setItem(SAVED_QUOTES_KEY, JSON.stringify(savedQuoteIds));
  renderSaved();
  if (currentIndex >= 0) updateSaveButton();
  toast("저장에서 삭제했어요.");
});

$("#ratingForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const rating = Number(formData.get("rating"));
  if (!rating) {
    $("#ratingStatus").textContent = "1점부터 5점 중 하나를 선택해 주세요.";
    return;
  }

  const feedback = $("#ratingFeedback").value.trim();
  trackEvent("rating_submit", {
    ...quoteEventValues(currentQuote(), { recommendation_number: recommendationCount }),
    rating,
    feedback: feedback || null
  });
  form.querySelectorAll("input, textarea, button").forEach(control => control.disabled = true);
  form.classList.add("is-complete");
  $("#ratingSubmit").textContent = "제출 완료";
  $("#ratingStatus").textContent = "평가가 제출되었습니다. 감사합니다.";
});

if (!sessionStorage.getItem(SESSION_START_KEY)) {
  sessionStorage.setItem(SESSION_START_KEY, "true");
  trackEvent("session_start");
}
renderSaved();
updateClosingMotion();
openCategoryDialog();
