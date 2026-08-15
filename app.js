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
  {text:"미래는 자신의 꿈이 아름답다고 믿는 사람들의 것이다.",author:"엘리너 루스벨트",category:"성장",reflection:"당신의 꿈을 가장 먼저 믿어줄 사람은 바로 당신이어도 충분합니다."},
  {text:"아무것도 하지 않으면 의심과 두려움이 생긴다. 행동하면 자신감과 용기가 생긴다.",author:"데일 카네기",category:"용기",reflection:"확신이 생길 때까지 기다리기보다 작은 행동으로 확신을 만들어 보세요."},
  {text:"나를 죽이지 못하는 고통은 나를 더 강하게 만든다.",author:"프리드리히 니체",category:"용기",reflection:"견뎌낸 시간은 사라지지 않고 당신 안에 단단한 힘으로 남습니다."},
  {text:"어디를 가든 마음을 다해 가라.",author:"공자",category:"성장",reflection:"결과를 앞당기려 애쓰기보다 지금 하는 일에 온전히 마음을 두어 보세요."},
  {text:"인생에서 가장 중요한 것은 살아왔다는 사실이 아니라, 타인의 삶에 어떤 변화를 주었는가이다.",author:"넬슨 만델라",category:"관계",reflection:"당신의 작은 친절도 누군가의 하루에는 오래 남는 변화가 됩니다."},
  {text:"세상을 바꾸는 데 사용할 수 있는 가장 강력한 무기는 교육이다.",author:"넬슨 만델라",category:"성장",reflection:"오늘 새로 배운 하나가 내일 바라보는 세상의 크기를 넓혀줍니다."},
  {text:"할 수 있는 일을 하라. 가진 것으로, 있는 곳에서.",author:"시어도어 루스벨트",category:"용기",reflection:"완벽한 조건보다 지금 손에 있는 가능성에서 시작해 보세요."},
  {text:"당신이 할 수 있다고 생각하는 것보다 더 많은 것을 할 수 있다.",author:"엘리너 루스벨트",category:"용기",reflection:"스스로 정한 한계 밖에 아직 만나지 못한 가능성이 있습니다."},
  {text:"어제는 지나갔고 내일은 아직 오지 않았다. 우리에게는 오늘뿐이다.",author:"마더 테레사",category:"위안",reflection:"지나간 일과 오지 않은 걱정을 잠시 내려놓고 오늘에 머물러 보세요."},
  {text:"고통은 피할 수 없지만 괴로움은 선택이다.",author:"무라카미 하루키",category:"위안",reflection:"아픔을 부정하지 않으면서도 그것이 나의 전부가 되지 않게 할 수 있습니다."},
  {text:"평화는 밖에서 오는 것이 아니다. 평화는 내면에서 온다.",author:"붓다",category:"위안",reflection:"주변이 소란스러울수록 잠시 호흡하며 내 안의 고요를 찾아보세요."},
  {text:"어려움 한가운데에 기회가 놓여 있다.",author:"알베르트 아인슈타인",category:"성장",reflection:"문제가 가리키는 곳에는 이전에는 보지 못했던 새로운 길이 있습니다."},
  {text:"상상력은 지식보다 중요하다.",author:"알베르트 아인슈타인",category:"성장",reflection:"알고 있는 답 너머를 상상할 때 새로운 가능성이 시작됩니다."},
  {text:"삶은 자전거를 타는 것과 같다. 균형을 유지하려면 계속 움직여야 한다.",author:"알베르트 아인슈타인",category:"성장",reflection:"빠르지 않아도 좋습니다. 나만의 속도로 계속 움직이는 것이 중요합니다."},
  {text:"성공은 최종적인 것이 아니며 실패는 치명적인 것이 아니다. 중요한 것은 계속할 용기다.",author:"윈스턴 처칠",category:"용기",reflection:"결과 하나가 당신을 정의하지 않습니다. 다시 이어가는 마음이 더 중요합니다."},
  {text:"가장 어두운 밤도 끝나고 해는 떠오른다.",author:"빅토르 위고",category:"위안",reflection:"지금 보이지 않아도 밤에는 끝이 있고 새로운 빛은 반드시 찾아옵니다."},
  {text:"미소는 당신의 얼굴에서 겨울을 몰아내는 햇살이다.",author:"빅토르 위고",category:"관계",reflection:"따뜻한 표정 하나가 말보다 먼저 서로의 마음을 편안하게 해줍니다."},
  {text:"행동은 모든 성공의 기본 열쇠다.",author:"파블로 피카소",category:"성장",reflection:"생각을 현실로 바꾸는 것은 결국 오늘 시작한 작은 행동입니다."},
  {text:"영감은 존재한다. 다만 우리가 일하고 있을 때 찾아온다.",author:"파블로 피카소",category:"성장",reflection:"마음이 생기기를 기다리지 말고 먼저 시작하면 영감이 뒤따라옵니다."},
  {text:"태도를 바꾸면 세상이 달라진다.",author:"윌리엄 제임스",category:"성장",reflection:"같은 하루도 어떤 마음으로 바라보느냐에 따라 전혀 다른 길이 됩니다."},
  {text:"우리가 두려워해야 할 유일한 것은 두려움 그 자체다.",author:"프랭클린 D. 루스벨트",category:"용기",reflection:"두려움의 목소리를 알아차리는 순간 그것에 끌려가지 않을 힘이 생깁니다."},
  {text:"나는 준비할 것이다. 그러면 언젠가 나의 기회가 올 것이다.",author:"에이브러햄 링컨",category:"성장",reflection:"보이지 않는 준비의 시간도 기회를 맞이하는 중요한 과정입니다."},
  {text:"사람들은 당신이 한 말과 행동은 잊어도, 당신 때문에 느낀 감정은 잊지 않는다.",author:"마야 안젤루",category:"관계",reflection:"오늘 곁에 있는 사람에게 어떤 마음을 남기고 싶은지 생각해 보세요."},
  {text:"우리는 많은 패배를 만날 수 있지만 패배해서는 안 된다.",author:"마야 안젤루",category:"용기",reflection:"넘어진 횟수가 아니라 다시 일어서려는 선택이 당신을 설명합니다."},
  {text:"자신을 사랑하는 것은 평생 이어질 로맨스의 시작이다.",author:"오스카 와일드",category:"위안",reflection:"오늘만큼은 타인에게 건네는 다정함을 나 자신에게도 나누어 주세요."},
  {text:"당신이 세상에서 보고 싶은 변화가 되어라.",author:"마하트마 간디",category:"성장",reflection:"바라는 세상은 오늘 내가 선택하는 작은 태도에서 시작됩니다."},
  {text:"약한 사람은 용서할 수 없다. 용서는 강한 사람의 특성이다.",author:"마하트마 간디",category:"관계",reflection:"용서는 상처를 잊는 일이 아니라 더 이상 상처에 붙잡히지 않는 선택입니다."},
  {text:"중요한 것은 무엇을 바라보느냐가 아니라 무엇을 보느냐이다.",author:"헨리 데이비드 소로",category:"성장",reflection:"익숙한 하루를 조금 다른 눈으로 바라보면 놓쳤던 의미가 보입니다."},
  {text:"꿈을 이루고 싶다면 먼저 꿈에서 깨어나라.",author:"J. M. 파워",category:"성장",reflection:"꿈을 현실로 옮기는 첫 단계는 오늘 할 일을 분명히 정하는 것입니다."},
  {text:"낭비한 시간에 대한 후회는 더 큰 시간 낭비다.",author:"메이슨 쿨리",category:"위안",reflection:"지나간 시간을 탓하기보다 지금 이 순간부터 다시 시작하면 됩니다."},
  {text:"항상 얼굴을 햇빛 쪽으로 향하라. 그러면 그림자는 뒤로 물러날 것이다.",author:"월트 휘트먼",category:"위안",reflection:"어둠을 없애려 애쓰기보다 내가 향할 빛을 선택해 보세요."},
  {text:"혼자서는 아주 조금 할 수 있지만 함께라면 많은 것을 할 수 있다.",author:"헬렌 켈러",category:"관계",reflection:"도움을 주고받는 연결 속에서 혼자서는 없던 힘이 생겨납니다."},
  {text:"세상에서 가장 아름다운 것은 보거나 만질 수 없다. 마음으로 느껴야 한다.",author:"헬렌 켈러",category:"관계",reflection:"눈에 보이는 성과 밖에도 삶을 풍요롭게 하는 소중한 것들이 있습니다."},
  {text:"나는 바람의 방향을 바꿀 수 없지만 목적지에 닿도록 돛을 조절할 수 있다.",author:"지미 딘",category:"용기",reflection:"상황을 바꿀 수 없다면 오늘 내가 조절할 수 있는 한 가지를 찾아보세요."},
  {text:"아무리 느리게 가도 멈추지만 않는다면 괜찮다.",author:"공자",category:"위안",reflection:"남보다 느린 속도도 계속 이어진다면 분명 앞으로 나아가는 중입니다."},
  {text:"우리가 생각하는 대로 우리는 존재한다.",author:"마르쿠스 아우렐리우스",category:"성장",reflection:"반복해서 품는 생각이 삶의 태도와 방향을 조금씩 만들어갑니다."},
  {text:"행복한 삶을 만드는 데 필요한 것은 아주 적다. 그것은 모두 당신 안에 있다.",author:"마르쿠스 아우렐리우스",category:"위안",reflection:"행복을 멀리서 찾기 전에 이미 곁에 있는 작은 충만함을 바라보세요."},
  {text:"기억하라. 행복한 삶에 필요한 것은 아주 조금뿐이다.",author:"마르쿠스 아우렐리우스",category:"위안",reflection:"더 많이 채우는 대신 지금 충분한 것을 알아보는 하루가 되어도 좋습니다."},
  {text:"사랑받고 싶다면 사랑하라. 그리고 사랑받을 만한 사람이 되어라.",author:"벤저민 프랭클린",category:"관계",reflection:"좋은 관계는 기다림보다 내가 먼저 건네는 진심에서 시작됩니다."},
  {text:"잘한 것은 말보다 행동으로 보여주어라.",author:"벤저민 프랭클린",category:"성장",reflection:"설명보다 꾸준히 쌓인 행동이 당신의 마음을 더 분명히 전합니다."},
  {text:"삶의 목적은 행복해지는 것이다.",author:"달라이 라마",category:"위안",reflection:"성과를 향해 달리면서도 내가 편안하고 행복한 방향인지 돌아보세요."}
];

const $ = s => document.querySelector(s);
let currentIndex = Math.floor(Math.random()*quotes.length);
let category = "전체", visible = 4;
let saved = JSON.parse(localStorage.getItem("daily-quotes-saved") || "[]");
let scrollTextFrame;

function prepareScrollText(){
  const text=$("#quoteText"), raw=text.textContent;
  text.setAttribute("aria-label",raw);
  text.innerHTML=[...raw].map((char,i)=>`<span class="scroll-char" aria-hidden="true" style="--char:${i}">${char===" "?"&nbsp;":char}</span>`).join("");
  updateScrollText();
}
function updateScrollText(){
  const stage=$("#quote"), chars=document.querySelectorAll(".scroll-char");
  if(!stage||!chars.length)return;
  const rect=stage.getBoundingClientRect(), vh=innerHeight;
  const progress=Math.max(0,Math.min(1,(vh*.88-rect.top)/(vh*.7)));
  const total=Math.max(chars.length-1,1);
  chars.forEach((char,i)=>{
    const reveal=Math.max(0,Math.min(1,(progress-i/total*.72)/.18));
    char.style.setProperty("--reveal",reveal.toFixed(3));
  });
}
addEventListener("scroll",()=>{if(scrollTextFrame)return;scrollTextFrame=requestAnimationFrame(()=>{updateScrollText();scrollTextFrame=null})},{passive:true});
addEventListener("resize",updateScrollText);

function renderQuote(index, scroll=false, animate=false){
  const inner=$(".quote-inner");
  const update=()=>{
    currentIndex=index; const q=quotes[index];
    $("#quoteCategory").textContent=q.category;
    $("#quoteText").textContent=`“${q.text}”`; prepareScrollText(); $("#quoteAuthor").textContent=q.author; $("#quoteReflection").textContent=q.reflection;
    const isSaved=saved.includes(index); $("#saveQuote").setAttribute("aria-pressed",isSaved); $("#saveQuote span").textContent=isSaved?"저장됨":"저장";
  };
  if(animate&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
    inner.classList.remove("quote-enter"); inner.classList.add("quote-leave");
    clearTimeout(renderQuote.timer); renderQuote.timer=setTimeout(()=>{update();inner.classList.remove("quote-leave");void inner.offsetWidth;inner.classList.add("quote-enter")},280);
  }else update();
  if(scroll) $("#quote").scrollIntoView({behavior:"smooth"});
}
function renderGrid(){
  const list=quotes.map((q,i)=>({...q,i})).filter(q=>category==="전체"||q.category===category).slice(0,visible);
  $("#quoteGrid").innerHTML=list.map(q=>`<article class="mini-card"><span class="category">${q.category}</span><q>${q.text}</q><footer>— ${q.author}</footer><button type="button" data-pick="${q.i}">이 문장 크게 보기 →</button></article>`).join("");
  requestAnimationFrame(()=>document.querySelectorAll(".mini-card").forEach((card,i)=>{card.style.setProperty("--delay",`${i*70}ms`);card.classList.add("card-enter")}));
  $("#showMore").hidden=visible>=quotes.filter(q=>category==="전체"||q.category===category).length;
}
function renderSaved(){
  $("#savedCount").textContent=saved.length;
  $("#savedList").innerHTML=saved.length?saved.map(i=>`<article class="saved-item"><div><p>“${quotes[i].text}”</p><small>— ${quotes[i].author} · ${quotes[i].category}</small></div><button type="button" data-remove="${i}">삭제</button></article>`).join(""):"<p class='empty'>아직 저장한 문장이 없습니다.<br>마음에 머무는 문장을 저장해 보세요.</p>";
}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("show"),1800)}
$("#todayLabel").textContent=new Intl.DateTimeFormat("ko-KR",{month:"long",day:"numeric",weekday:"long"}).format(new Date());
$("#nextQuote").addEventListener("click",()=>{let n;do{n=Math.floor(Math.random()*quotes.length)}while(n===currentIndex);renderQuote(n,false,true)});
$("#saveQuote").addEventListener("click",()=>{const p=saved.indexOf(currentIndex);if(p>=0){saved.splice(p,1);toast("저장에서 삭제했어요.")}else{saved.unshift(currentIndex);toast("문장을 저장했어요.")}localStorage.setItem("daily-quotes-saved",JSON.stringify(saved));renderQuote(currentIndex);renderSaved()});
$("#shareQuote").addEventListener("click",async()=>{const q=quotes[currentIndex],text=`“${q.text}” — ${q.author}`;try{if(navigator.share)await navigator.share({title:"하루 한 문장",text});else{await navigator.clipboard.writeText(text);toast("문장을 복사했어요.")}}catch(e){if(e.name!=="AbortError")toast("공유하지 못했어요.")}});
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");btn.classList.add("active");category=btn.dataset.category;visible=4;renderGrid()}));
$("#showMore").addEventListener("click",()=>{visible+=4;renderGrid()});
$("#quoteGrid").addEventListener("click",e=>{const b=e.target.closest("[data-pick]");if(b)renderQuote(Number(b.dataset.pick),true,true)});
$("#savedNav").addEventListener("click",()=>{$("#savedPanel").hidden=false;renderSaved();$("#savedPanel").scrollIntoView({behavior:"smooth"})});
$("#closeSaved").addEventListener("click",()=>{$("#savedPanel").hidden=true;$("#today").scrollIntoView({behavior:"smooth"})});
$("#savedList").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;saved=saved.filter(i=>i!==Number(b.dataset.remove));localStorage.setItem("daily-quotes-saved",JSON.stringify(saved));renderSaved();renderQuote(currentIndex);toast("저장에서 삭제했어요.")});
renderQuote(currentIndex);renderGrid();renderSaved();
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target)}}),{threshold:.15});
document.querySelectorAll(".hero .eyebrow,.hero h1,.hero-copy,.hero>.primary-button,.orb,.explore>.eyebrow,.explore>h2,.closing>*").forEach(el=>{el.classList.add("reveal");revealObserver.observe(el)});

// Supabase one-line journal check-in
let supabaseClient=null, selectedMood="";
const checkinDialog=$("#checkinDialog"), journalContent=$("#journalContent");

async function getSupabase(){
  if(supabaseClient)return supabaseClient;
  const response=await fetch("/api/supabase-config");
  if(!response.ok)throw new Error("Vercel에 Supabase 환경변수를 먼저 설정해 주세요.");
  const config=await response.json();
  supabaseClient=window.supabase.createClient(config.url,config.anonKey);
  const {data:{session}}=await supabaseClient.auth.getSession();
  if(!session){
    const {error}=await supabaseClient.auth.signInAnonymously();
    if(error)throw error;
  }
  return supabaseClient;
}
function openCheckin(){
  if(!checkinDialog.open)checkinDialog.showModal();
  document.body.classList.add("dialog-open");
}
function closeCheckin(){
  if(checkinDialog.open)checkinDialog.close();
  document.body.classList.remove("dialog-open");
  sessionStorage.setItem("daily-checkin-seen","true");
}
function localDate(){
  const now=new Date(), offset=now.getTimezoneOffset()*60000;
  return new Date(now-offset).toISOString().slice(0,10);
}
document.querySelectorAll("[data-mood]").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll("[data-mood]").forEach(item=>item.classList.remove("selected"));
  button.classList.add("selected"); selectedMood=button.dataset.mood;
  $("#checkinStatus").textContent="";
}));
journalContent.addEventListener("input",()=>$("#journalCount").textContent=journalContent.value.length);
$("#checkinNav").addEventListener("click",openCheckin);
$("#checkinClose").addEventListener("click",closeCheckin);
$("#checkinSkip").addEventListener("click",closeCheckin);
checkinDialog.addEventListener("cancel",event=>{event.preventDefault();closeCheckin()});
$("#checkinForm").addEventListener("submit",async event=>{
  event.preventDefault();
  if(!selectedMood){$("#checkinStatus").textContent="오늘의 기분을 하나 골라주세요.";return}
  const submit=$("#checkinSubmit");submit.disabled=true;submit.textContent="저장하는 중…";
  try{
    const client=await getSupabase();
    const {data:{user}}=await client.auth.getUser();
    const category=selectedMood==="용기가 필요해요"?"용기":selectedMood==="평온해요"?"성장":"위안";
    const matches=quotes.map((q,i)=>({...q,i})).filter(q=>q.category===category);
    const picked=matches[Math.floor(Math.random()*matches.length)];
    const {error}=await client.from("journal_entries").upsert({
      user_id:user.id,entry_date:localDate(),mood:selectedMood,
      content:journalContent.value.trim()||null,quote_text:picked.text,
      quote_author:picked.author,updated_at:new Date().toISOString()
    },{onConflict:"user_id,entry_date"});
    if(error)throw error;
    renderQuote(picked.i,false,true);closeCheckin();toast("오늘의 마음을 저장했어요.");
    setTimeout(()=>$("#quote").scrollIntoView({behavior:"smooth"}),320);
  }catch(error){$("#checkinStatus").textContent=error.message||"저장하지 못했어요. 잠시 후 다시 시도해 주세요."}
  finally{submit.disabled=false;submit.textContent="마음 남기기 ↗"}
});
if(!sessionStorage.getItem("daily-checkin-seen"))setTimeout(openCheckin,850);

// Personal journal history and account linking
const recordsDialog=$("#recordsDialog"), recordsList=$("#recordsList");
const escapeHTML=value=>String(value??"").replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
function formatEntryDate(value){
  return new Intl.DateTimeFormat("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"short"}).format(new Date(`${value}T00:00:00`));
}
async function loadRecords(){
  $("#recordsStatus").textContent="기록을 불러오는 중…";recordsList.innerHTML="";
  try{
    const client=await getSupabase();
    const {data:{user}}=await client.auth.getUser();
    const linked=user&&!user.is_anonymous;
    $("#accountBanner").hidden=linked;
    $("#accountStatus").textContent=linked?"계정에 연결되어 다른 기기에서도 이어볼 수 있어요.":"이 브라우저에 보관된 익명 기록이에요.";
    const {data,error}=await client.from("journal_entries").select("id,entry_date,mood,content,quote_text,quote_author").order("entry_date",{ascending:false});
    if(error)throw error;
    $("#recordsStatus").textContent=data.length?`${data.length}일의 마음을 간직하고 있어요.`:"아직 남긴 기록이 없어요.";
    recordsList.innerHTML=data.map(entry=>`<article class="record-card"><div class="record-meta"><time datetime="${entry.entry_date}">${formatEntryDate(entry.entry_date)}</time><span>${escapeHTML(entry.mood)}</span></div>${entry.content?`<p class="record-journal">${escapeHTML(entry.content)}</p>`:""}<blockquote><p>“${escapeHTML(entry.quote_text)}”</p><footer>— ${escapeHTML(entry.quote_author)}</footer></blockquote><button type="button" data-delete-entry="${entry.id}">기록 삭제</button></article>`).join("");
  }catch(error){$("#recordsStatus").textContent=error.message||"기록을 불러오지 못했어요."}
}
async function openRecords(){
  if(!recordsDialog.open)recordsDialog.showModal();document.body.classList.add("dialog-open");
  await loadRecords();
}
function closeRecords(){if(recordsDialog.open)recordsDialog.close();document.body.classList.remove("dialog-open")}
$("#recordsNav").addEventListener("click",openRecords);$("#recordsClose").addEventListener("click",closeRecords);
recordsDialog.addEventListener("cancel",event=>{event.preventDefault();closeRecords()});
recordsList.addEventListener("click",async event=>{
  const button=event.target.closest("[data-delete-entry]");if(!button)return;
  if(!confirm("이 기록을 삭제할까요? 삭제한 기록은 복구할 수 없어요."))return;
  button.disabled=true;
  try{const client=await getSupabase();const {error}=await client.from("journal_entries").delete().eq("id",button.dataset.deleteEntry);if(error)throw error;toast("기록을 삭제했어요.");await loadRecords()}catch(error){$("#recordsStatus").textContent=error.message||"삭제하지 못했어요.";button.disabled=false}
});
$("#linkGoogle").addEventListener("click",async()=>{
  const button=$("#linkGoogle");button.disabled=true;button.textContent="Google로 이동하는 중…";
  try{const client=await getSupabase();const {error}=await client.auth.linkIdentity({provider:"google",options:{redirectTo:location.origin}});if(error)throw error}catch(error){$("#recordsStatus").textContent=error.message||"Google 계정을 연결하지 못했어요.";button.disabled=false;button.textContent="Google로 기록 지키기 ↗"}
});
