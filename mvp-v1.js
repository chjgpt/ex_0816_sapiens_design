const MVP_VERSION = "v1";
const SESSION_ID_KEY = "daily-quotes-mvp-session-id";
const SESSION_START_KEY = "daily-quotes-mvp-session-started";
const SAVED_QUOTES_KEY = "daily-quotes-saved";

const $ = selector => document.querySelector(selector);
const createId = () => crypto.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const sessionId = sessionStorage.getItem(SESSION_ID_KEY) || createId();
sessionStorage.setItem(SESSION_ID_KEY, sessionId);

let currentIndex = Math.floor(Math.random() * quotes.length);
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

  // 기존 버전의 숫자 인덱스 저장값을 안정적인 quote_id로 한 번 변환합니다.
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

function quoteEventValues(quote = currentQuote()) {
  return { quote_id: quote.id, quote_category: quote.category };
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

function renderQuote(index, { animate = false, scroll = false, trackView = true } = {}) {
  const inner = $(".quote-inner");
  const update = () => {
    currentIndex = index;
    const quote = currentQuote();
    $("#quoteCategory").textContent = quote.category;
    $("#quoteText").textContent = `“${quote.text}”`;
    $("#quoteAuthor").textContent = quote.author;
    $("#quoteReflection").textContent = quote.reflection;
    prepareScrollText();
    updateSaveButton();
    resetRating();
    if (trackView) trackEvent("quote_view", quoteEventValues(quote));
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

$("#nextQuote").addEventListener("click", () => {
  const previous = currentQuote();
  trackEvent("next_quote", quoteEventValues(previous));
  let nextIndex;
  do nextIndex = Math.floor(Math.random() * quotes.length);
  while (nextIndex === currentIndex);
  renderQuote(nextIndex, { animate: true });
});

$("#saveQuote").addEventListener("click", () => {
  const quote = currentQuote();
  const savedIndex = savedQuoteIds.indexOf(quote.id);
  if (savedIndex >= 0) {
    savedQuoteIds.splice(savedIndex, 1);
    toast("저장에서 삭제했어요.");
  } else {
    savedQuoteIds.unshift(quote.id);
    trackEvent("save_quote", quoteEventValues(quote));
    toast("문장을 저장했어요.");
  }
  localStorage.setItem(SAVED_QUOTES_KEY, JSON.stringify(savedQuoteIds));
  updateSaveButton();
  renderSaved();
});

$("#shareQuote").addEventListener("click", async () => {
  const quote = currentQuote();
  const text = `“${quote.text}” — ${quote.author}`;
  trackEvent("share_quote", quoteEventValues(quote));
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
  updateSaveButton();
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
    ...quoteEventValues(),
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
renderQuote(currentIndex);
renderSaved();
