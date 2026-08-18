const MVP_VERSION = "v2";
const SESSION_ID_KEY = "daily-quotes-mvp-session-id";
const SESSION_START_KEY = "daily-quotes-mvp-v2-session-started";
const SAVED_QUOTES_KEY = "daily-quotes-saved";
const CATEGORIES = ["위안", "용기", "성장", "관계", "자기확신"];

const $ = selector => document.querySelector(selector);
const createId = () => crypto.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const sessionId = sessionStorage.getItem(SESSION_ID_KEY) || createId();
sessionStorage.setItem(SESSION_ID_KEY, sessionId);

let currentIndex = -1;
let selectedCategory = null;
let pendingCategory = null;
let categorySelectionCount = 0;
let recommendationCount = 0;
let scrollTextFrame;
let supabaseClient = null;
let trackingClientPromise = null;

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

  void getTrackingClient()
    .then(async client => {
      const { data: { user } } = await client.auth.getUser();
      if (!user) return;
      const { error } = await client.from("mvp_events").insert({ ...event, user_id: user.id });
      if (error) throw error;
    })
    .catch(() => {
      // 분석 설정 전이나 일시적인 네트워크 오류가 있어도 핵심 경험은 계속 동작합니다.
    });
}

function quoteEventValues(quote = currentQuote(), metadata = {}) {
  return {
    quote_id: quote.id,
    quote_category: quote.category,
    metadata: { selected_category: selectedCategory, ...metadata }
  };
}

function randomQuoteIndex(category, excludedIndex = -1) {
  const candidates = quotes
    .map((quote, index) => ({ quote, index }))
    .filter(item => item.quote.category === category && item.index !== excludedIndex);
  return candidates[Math.floor(Math.random() * candidates.length)].index;
}

function prepareScrollText() {
  const text = $("#quoteText");
  const raw = text.textContent;
  text.setAttribute("aria-label", raw);
  text.innerHTML = [...raw]
    .map((char, index) => `<span class="scroll-char" aria-hidden="true" style="--char:${index}">${char === " " ? "&nbsp;" : char}</span>`)
    .join("");
  updateScrollText();
}

function updateScrollText() {
  const stage = $("#quote");
  const chars = document.querySelectorAll(".scroll-char");
  if (!stage || !chars.length) return;
  const rect = stage.getBoundingClientRect();
  const viewportHeight = innerHeight;
  const progress = Math.max(0, Math.min(1, (viewportHeight * .88 - rect.top) / (viewportHeight * .7)));
  const total = Math.max(chars.length - 1, 1);
  chars.forEach((char, index) => {
    const reveal = Math.max(0, Math.min(1, (progress - index / total * .72) / .18));
    char.style.setProperty("--reveal", reveal.toFixed(3));
  });
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

function renderQuote(index, { animate = false, scroll = false, source = "category_selection" } = {}) {
  const inner = $(".quote-inner");
  const update = () => {
    currentIndex = index;
    recommendationCount += 1;
    const quote = currentQuote();
    $("#quoteCategory").textContent = quote.category;
    $("#quoteText").textContent = `“${quote.text}”`;
    $("#quoteAuthor").textContent = quote.author;
    $("#quoteReflection").textContent = quote.reflection;
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
        <div><p>“${quote.text}”</p><small>— ${quote.author} · ${quote.category}</small></div>
        <button type="button" data-remove="${quote.id}">삭제</button>
      </article>`).join("")
    : "<p class='empty'>아직 저장한 문장이 없습니다.<br>마음에 머무는 문장을 저장해 보세요.</p>";
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove("show"), 1800);
}

function selectCategory(category) {
  if (!CATEGORIES.includes(category)) return;
  pendingCategory = category;
  document.querySelectorAll("[data-category]").forEach(button => {
    const selected = button.dataset.category === category;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-checked", String(selected));
  });
  $("#categorySubmit").disabled = false;
  $("#categoryStatus").textContent = "";
}

function openCategoryDialog() {
  pendingCategory = selectedCategory;
  if (pendingCategory) selectCategory(pendingCategory);
  $("#categoryClose").hidden = !selectedCategory;
  if (!$("#categoryDialog").open) $("#categoryDialog").showModal();
  document.body.classList.add("dialog-open");
}

function closeCategoryDialog() {
  if (!selectedCategory) return;
  if ($("#categoryDialog").open) $("#categoryDialog").close();
  document.body.classList.remove("dialog-open");
}

addEventListener("scroll", () => {
  if (scrollTextFrame) return;
  scrollTextFrame = requestAnimationFrame(() => {
    updateScrollText();
    scrollTextFrame = null;
  });
}, { passive: true });
addEventListener("resize", updateScrollText);

$("#todayLabel").textContent = new Intl.DateTimeFormat("ko-KR", {
  month: "long", day: "numeric", weekday: "long"
}).format(new Date());

$("#categoryForm").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (button) selectCategory(button.dataset.category);
});

$("#categoryForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!pendingCategory) {
    $("#categoryStatus").textContent = "필요한 문장 카테고리를 하나 선택해 주세요.";
    return;
  }

  const previousCategory = selectedCategory;
  selectedCategory = pendingCategory;
  categorySelectionCount += 1;
  trackEvent("category_select", {
    quote_category: selectedCategory,
    metadata: {
      selection_order: categorySelectionCount,
      selection_type: previousCategory ? "change" : "initial",
      previous_category: previousCategory
    }
  });
  const nextIndex = randomQuoteIndex(selectedCategory, currentIndex);
  closeCategoryDialog();
  renderQuote(nextIndex, {
    animate: currentIndex >= 0,
    scroll: currentIndex >= 0,
    source: previousCategory ? "category_change" : "category_selection"
  });
});

$("#categoryClose").addEventListener("click", closeCategoryDialog);
$("#categoryDialog").addEventListener("cancel", event => {
  event.preventDefault();
  closeCategoryDialog();
});
$("#changeCategory").addEventListener("click", openCategoryDialog);

$("#nextQuote").addEventListener("click", () => {
  const previous = currentQuote();
  trackEvent("next_quote", quoteEventValues(previous, { recommendation_number: recommendationCount }));
  renderQuote(randomQuoteIndex(selectedCategory, currentIndex), {
    animate: true,
    source: "next_quote"
  });
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
    toast("문장을 저장했어요.");
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
    if (navigator.share) await navigator.share({ title: "하루 한 문장", text });
    else {
      await navigator.clipboard.writeText(text);
      toast("문장을 복사했어요.");
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

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add("is-visible");
  revealObserver.unobserve(entry.target);
}), { threshold: .15 });
document.querySelectorAll(".hero .eyebrow,.hero h1,.hero-copy,.hero>.primary-button,.orb,.closing>*")
  .forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });

if (!sessionStorage.getItem(SESSION_START_KEY)) {
  sessionStorage.setItem(SESSION_START_KEY, "true");
  trackEvent("session_start");
}
renderSaved();
openCategoryDialog();
