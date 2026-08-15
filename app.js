const quotes = [
  {text:"행복은 이미 만들어진 것이 아니다. 행복은 당신의 행동에서 나온다.",author:"달라이 라마",category:"성장",reflection:"큰 결심보다 오늘의 작은 행동 하나가 마음의 방향을 바꿉니다."},
  {text:"겨울이 없다면 봄은 그리 즐겁지 않을 것이다.",author:"앤 브래드스트리트",category:"위안",reflection:"지금의 계절이 전부는 아닙니다. 봄은 보이지 않는 곳에서도 오고 있습니다."},
  {text:"용기란 두려움이 없는 것이 아니라, 두려움보다 더 중요한 것이 있다고 판단하는 것이다.",author:"앰브로즈 레드문",category:"용기",reflection:"두려워도 괜찮습니다. 중요한 쪽으로 한 걸음 옮기는 것이 용기입니다."},
  {text:"우리가 반복해서 하는 일이 곧 우리 자신이다. 그러므로 탁월함은 행동이 아니라 습관이다.",author:"윌 듀런트",category:"성장",reflection:"완벽한 하루보다 다시 돌아오는 습관이 당신을 더 멀리 데려갑니다."},
  {text:"상처받지 않은 사람처럼 사랑하라.",author:"알프레드 디수자",category:"관계",reflection:"다정함은 약함이 아니라, 상처를 넘어 다시 손 내미는 힘입니다."},
  {text:"희망은 깨어 있는 인간의 꿈이다.",author:"아리스토텔레스",category:"위안",reflection:"희망은 막연한 기다림이 아니라 오늘을 움직이게 하는 조용한 상상입니다."},
  {text:"천 리 길도 한 걸음부터 시작된다.",author:"노자",category:"성장",reflection:"멀리 보되, 오늘은 가장 작고 분명한 한 걸음에 집중해 보세요."},
  {text:"삶이 있는 한 희망은 있다.",author:"키케로",category:"위안",reflection:"끝처럼 느껴지는 순간에도 다음 장을 쓸 가능성은 남아 있습니다."},
  {text:"할 수 있다고 믿든 할 수 없다고 믿든, 믿는 대로 될 것이다.",author:"헨리 포드",category:"용기",reflection:"자신에게 건네는 첫 문장이 오늘의 가능성을 정합니다."},
  {text:"친절한 말은 짧고 말하기도 쉽지만, 그 울림은 참으로 끝이 없다.",author:"마더 테레사",category:"관계",reflection:"오늘 누군가에게 건넨 따뜻한 한마디는 생각보다 오래 남습니다."},
  {text:"성공이란 열정을 잃지 않고 실패에서 실패로 걸어가는 것이다.",author:"윈스턴 처칠",category:"용기",reflection:"넘어짐은 방향을 다시 잡는 과정입니다. 열정만은 놓지 마세요."},
  {text:"인생은 가까이서 보면 비극이지만 멀리서 보면 희극이다.",author:"찰리 채플린",category:"위안",reflection:"오늘의 무게도 시간이 지나면 새로운 의미와 표정을 갖게 됩니다."},
  {text:"배움은 우연히 얻어지는 것이 아니라 열정과 성실로 찾아야 한다.",author:"애비게일 애덤스",category:"성장",reflection:"조금 서툰 오늘은 더 나은 내일을 배우는 중이라는 증거입니다."},
  {text:"우리의 가장 큰 영광은 한 번도 실패하지 않는 데 있지 않고, 넘어질 때마다 일어나는 데 있다.",author:"공자",category:"용기",reflection:"다시 시작하는 순간, 실패는 이미 당신의 스승이 됩니다."},
  {text:"어둠은 어둠을 몰아낼 수 없다. 오직 빛만이 그럴 수 있다.",author:"마틴 루터 킹 주니어",category:"관계",reflection:"상대의 차가움보다 나의 따뜻함을 선택하는 일이 세상을 바꿉니다."},
  {text:"너 자신이 되어라. 다른 사람은 이미 모두 자리가 찼다.",author:"오스카 와일드",category:"성장",reflection:"비교를 잠시 내려놓고, 오늘의 나에게 가장 솔직한 선택을 해보세요."},
  {text:"새는 알을 깨고 나온다. 알은 세계다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다.",author:"헤르만 헤세",category:"용기",reflection:"익숙함이 깨지는 순간은 새로운 내가 태어나는 순간일 수 있습니다."},
  {text:"사람은 오로지 마음먹은 만큼 행복하다.",author:"에이브러햄 링컨",category:"위안",reflection:"바꿀 수 없는 것 사이에서도 마음을 둘 곳은 선택할 수 있습니다."},
  {text:"우리는 모두 서로를 도우려 한다. 인간은 본래 그런 존재다.",author:"찰리 채플린",category:"관계",reflection:"혼자 견디지 않아도 됩니다. 도움을 청하는 것도 관계를 믿는 방식입니다."},
  {text:"기회는 일어나는 것이 아니라 만들어내는 것이다.",author:"크리스 그로서",category:"성장",reflection:"기다리는 대신 오늘 할 수 있는 가장 작은 시작을 만들어 보세요."},
  {text:"폭풍이 지나가기를 기다리는 것이 삶이 아니다. 빗속에서 춤추는 법을 배우는 것이다.",author:"비비안 그린",category:"위안",reflection:"상황이 완벽해질 때까지 삶을 미루지 않아도 괜찮습니다."},
  {text:"나는 실패하지 않았다. 그저 작동하지 않는 만 가지 방법을 발견했을 뿐이다.",author:"토머스 에디슨",category:"용기",reflection:"잘되지 않은 시도도 다음 선택을 선명하게 만드는 귀중한 기록입니다."},
  {text:"사랑은 서로 마주 보는 것이 아니라 함께 같은 방향을 바라보는 것이다.",author:"앙투안 드 생텍쥐페리",category:"관계",reflection:"좋은 관계는 같은 사람이 되는 것이 아니라 같은 곳을 향해 걷는 일입니다."},
  {text:"미래는 자신의 꿈이 아름답다고 믿는 사람들의 것이다.",author:"엘리너 루스벨트",category:"성장",reflection:"당신의 꿈을 가장 먼저 믿어줄 사람은 바로 당신이어도 충분합니다."}
];

const $ = s => document.querySelector(s);
let currentIndex = new Date().getFullYear()*372 + (new Date().getMonth()+1)*31 + new Date().getDate();
currentIndex %= quotes.length;
let category = "전체", visible = 4;
let saved = JSON.parse(localStorage.getItem("daily-quotes-saved") || "[]");

function renderQuote(index, scroll=false){
  currentIndex=index; const q=quotes[index];
  $("#quoteCategory").textContent=q.category; $("#quoteNumber").textContent=`${String(index+1).padStart(2,"0")} / ${quotes.length}`;
  $("#quoteText").textContent=`“${q.text}”`; $("#quoteAuthor").textContent=q.author; $("#quoteReflection").textContent=q.reflection;
  const isSaved=saved.includes(index); $("#saveQuote").setAttribute("aria-pressed",isSaved); $("#saveQuote span").textContent=isSaved?"저장됨":"저장";
  if(scroll) $("#quote").scrollIntoView({behavior:"smooth"});
}
function renderGrid(){
  const list=quotes.map((q,i)=>({...q,i})).filter(q=>category==="전체"||q.category===category).slice(0,visible);
  $("#quoteGrid").innerHTML=list.map(q=>`<article class="mini-card"><span class="category">${q.category}</span><q>${q.text}</q><footer>— ${q.author}</footer><button type="button" data-pick="${q.i}">이 문장 크게 보기 →</button></article>`).join("");
  $("#showMore").hidden=visible>=quotes.filter(q=>category==="전체"||q.category===category).length;
}
function renderSaved(){
  $("#savedCount").textContent=saved.length;
  $("#savedList").innerHTML=saved.length?saved.map(i=>`<article class="saved-item"><div><p>“${quotes[i].text}”</p><small>— ${quotes[i].author} · ${quotes[i].category}</small></div><button type="button" data-remove="${i}">삭제</button></article>`).join(""):"<p class='empty'>아직 저장한 문장이 없습니다.<br>마음에 머무는 문장을 저장해 보세요.</p>";
}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("show"),1800)}
$("#todayLabel").textContent=new Intl.DateTimeFormat("ko-KR",{month:"long",day:"numeric",weekday:"long"}).format(new Date());
$("#nextQuote").addEventListener("click",()=>{let n;do{n=Math.floor(Math.random()*quotes.length)}while(n===currentIndex);renderQuote(n)});
$("#saveQuote").addEventListener("click",()=>{const p=saved.indexOf(currentIndex);if(p>=0){saved.splice(p,1);toast("저장에서 삭제했어요.")}else{saved.unshift(currentIndex);toast("문장을 저장했어요.")}localStorage.setItem("daily-quotes-saved",JSON.stringify(saved));renderQuote(currentIndex);renderSaved()});
$("#shareQuote").addEventListener("click",async()=>{const q=quotes[currentIndex],text=`“${q.text}” — ${q.author}`;try{if(navigator.share)await navigator.share({title:"하루 한 문장",text});else{await navigator.clipboard.writeText(text);toast("문장을 복사했어요.")}}catch(e){if(e.name!=="AbortError")toast("공유하지 못했어요.")}});
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");btn.classList.add("active");category=btn.dataset.category;visible=4;renderGrid()}));
$("#showMore").addEventListener("click",()=>{visible+=4;renderGrid()});
$("#quoteGrid").addEventListener("click",e=>{const b=e.target.closest("[data-pick]");if(b)renderQuote(Number(b.dataset.pick),true)});
$("#savedNav").addEventListener("click",()=>{$("#savedPanel").hidden=false;renderSaved();$("#savedPanel").scrollIntoView({behavior:"smooth"})});
$("#closeSaved").addEventListener("click",()=>{$("#savedPanel").hidden=true;$("#today").scrollIntoView({behavior:"smooth"})});
$("#savedList").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;saved=saved.filter(i=>i!==Number(b.dataset.remove));localStorage.setItem("daily-quotes-saved",JSON.stringify(saved));renderSaved();renderQuote(currentIndex);toast("저장에서 삭제했어요.")});
renderQuote(currentIndex);renderGrid();renderSaved();
