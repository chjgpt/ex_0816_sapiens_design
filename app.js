const quotes = [
  {id:"q001",text:"행복은 이미 만들어진 것이 아니다. 행복은 당신의 행동에서 나온다.",author:"달라이 라마",category:"성장",reflection:"행복이 저절로 찾아오길 기다리기보다, 오늘 내가 선택한 행동이 하루의 결을 바꿀 수 있어요."},
  {id:"q002",text:"겨울이 없다면 봄은 그리 즐겁지 않을 것이다.",author:"앤 브래드스트리트",category:"위안",reflection:"지금의 계절이 길게 느껴져도 끝이 있다는 사실은 변하지 않아요. 지나온 시간이 있어 봄도 더 선명해집니다."},
  {id:"q003",text:"용기란 두려움이 없는 것이 아니라, 두려움보다 더 중요한 것이 있다고 판단하는 것이다.",author:"앰브로즈 레드문",category:"용기",reflection:"두렵다는 건 멈춰야 한다는 뜻이 아니에요. 그보다 더 소중한 이유가 있다면, 두려움과 함께 움직일 수도 있습니다."},
  {id:"q004",text:"우리가 반복해서 하는 일이 곧 우리 자신이다. 그러므로 탁월함은 행동이 아니라 습관이다.",author:"윌 듀런트",category:"성장",reflection:"한 번의 대단한 성과보다 매일 반복한 선택이 결국 나를 만듭니다. 오늘의 한 번도 그 일부예요."},
  {id:"q005",text:"상처받지 않은 사람처럼 사랑하라.",author:"알프레드 디수자",category:"관계",reflection:"과거의 상처가 앞으로의 모든 관계를 결정하게 둘 필요는 없어요. 다시 믿는 속도는 내가 정하면 됩니다."},
  {id:"q006",text:"희망은 깨어 있는 인간의 꿈이다.",author:"아리스토텔레스",category:"위안",reflection:"희망은 아직 오지 않은 것을 미리 그려보게 하는 힘일지도 몰라요. 지금 품고 있는 가능성을 너무 빨리 접지 마세요."},
  {id:"q007",text:"천 리 길도 한 걸음부터 시작된다.",author:"노자",category:"성장",reflection:"멀리 있는 끝을 한꺼번에 생각하면 막막해집니다. 지금 내딛는 한 걸음이면 출발로는 충분해요."},
  {id:"q008",text:"삶이 있는 한 희망은 있다.",author:"키케로",category:"위안",reflection:"지금 보이는 답이 없다고 해서 앞으로의 가능성까지 사라진 건 아니에요. 삶이 이어지는 동안 다음 장면도 열려 있습니다."},
  {id:"q009",text:"할 수 있다고 믿든 할 수 없다고 믿든, 믿는 대로 될 것이다.",author:"헨리 포드",category:"자기확신",reflection:"스스로에게 내리는 결론은 생각보다 큰 힘을 가집니다. 시작도 전에 ‘나는 안 돼’라고 정해버리지만 않아도 달라질 수 있어요."},
  {id:"q010",text:"친절한 말은 짧고 말하기도 쉽지만, 그 울림은 참으로 끝이 없다.",author:"마더 테레사",category:"관계",reflection:"길고 멋진 말보다 짧은 다정함이 오래 남을 때가 있어요. 오늘 건넨 한마디가 누군가의 하루를 바꿀 수도 있습니다."},
  {id:"q011",text:"성공이란 열정을 잃지 않고 실패에서 실패로 걸어가는 것이다.",author:"윈스턴 처칠",category:"용기",reflection:"실패가 이어지면 열정이 먼저 닳기 쉽죠. 그래도 다시 해보고 싶은 마음이 남아 있다면, 그 마음이 아직 끝이 아니라는 증거예요."},
  {id:"q012",text:"인생은 가까이서 보면 비극이지만 멀리서 보면 희극이다.",author:"찰리 채플린",category:"위안",reflection:"지금 아픈 일을 억지로 웃어넘길 필요는 없어요. 시간이 지나면 지금과는 다른 거리에서 바라볼 수도 있습니다."},
  {id:"q013",text:"배움은 우연히 얻어지는 것이 아니라 열정과 성실로 찾아야 한다.",author:"애비게일 애덤스",category:"성장",reflection:"배움은 기다린다고 저절로 쌓이지 않아요. 알고 싶은 마음을 붙잡고 꾸준히 찾아가는 시간이 결국 내 것이 됩니다."},
  {id:"q014",text:"우리의 가장 큰 영광은 한 번도 실패하지 않는 데 있지 않고, 넘어질 때마다 일어나는 데 있다.",author:"공자",category:"용기",reflection:"넘어졌다는 사실보다 다시 일어나는 선택이 더 오래 남습니다. 잠시 쉬었다가 다시 서도 괜찮아요."},
  {id:"q015",text:"어둠은 어둠을 몰아낼 수 없다. 오직 빛만이 그럴 수 있다.",author:"마틴 루터 킹 주니어",category:"관계",reflection:"상처받았다고 같은 상처를 돌려줄 필요는 없어요. 어떤 태도를 지킬지는 여전히 내가 선택할 수 있습니다."},
  {id:"q016",text:"너 자신이 되어라. 다른 사람은 이미 모두 자리가 찼다.",author:"오스카 와일드",category:"자기확신",reflection:"남을 닮느라 애쓸수록 내 모습은 흐려지기 쉬워요. 비교를 잠시 내려놓고 내가 편안한 방식으로 돌아와도 됩니다."},
  {id:"q017",text:"새는 알을 깨고 나온다. 알은 세계다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다.",author:"헤르만 헤세",category:"용기",reflection:"익숙한 세계를 벗어나는 일은 흔들릴 수밖에 없어요. 지금의 불안이 새로운 내가 나오는 과정일 수도 있습니다."},
  {id:"q018",text:"사람들이 성공이라 칭찬하는 삶은 여러 삶의 방식 중 하나일 뿐이다. 왜 다른 삶들을 희생하면서까지 그것만 크게 보아야 하는가.",author:"헨리 데이비드 소로",category:"자기확신",reflection:"남들이 정한 성공이 꼭 내 삶의 정답일 필요는 없어요. 내가 중요하게 여기는 기준도 충분히 하나의 길입니다."},
  {id:"q019",text:"우리는 모두 서로를 도우려 한다. 인간은 본래 그런 존재다.",author:"찰리 채플린",category:"관계",reflection:"혼자 견디는 것만이 강한 건 아니에요. 도움을 주고받을 수 있다는 사실 자체가 우리가 서로 연결돼 있다는 뜻이니까요."},
  {id:"q020",text:"기회는 일어나는 것이 아니라 만들어내는 것이다.",author:"크리스 그로서",category:"성장",reflection:"기회가 올 때까지 기다리는 것보다 내가 먼저 만들 수 있는 자리를 찾는 편이 빠를 때가 있어요. 시도하는 순간 가능성도 생깁니다."},
  {id:"q021",text:"폭풍이 지나가기를 기다리는 것이 삶이 아니다. 빗속에서 춤추는 법을 배우는 것이다.",author:"비비안 그린",category:"위안",reflection:"상황이 나아질 때까지 삶을 미뤄둘 필요는 없어요. 힘든 날에도 잠깐 웃고 쉬는 순간은 여전히 내 것이니까요."},
  {id:"q022",text:"나는 실패하지 않았다. 그저 작동하지 않는 만 가지 방법을 발견했을 뿐이다.",author:"토머스 에디슨",category:"성장",reflection:"잘되지 않은 시도도 무엇이 아닌지를 알려줍니다. 실패를 막다른 길보다 다음 방법을 고르는 정보로 볼 수 있어요."},
  {id:"q023",text:"사랑은 서로 마주 보는 것이 아니라 함께 같은 방향을 바라보는 것이다.",author:"앙투안 드 생텍쥐페리",category:"관계",reflection:"좋은 관계는 늘 같은 생각을 하는 데서 생기지 않아요. 함께 지키고 싶은 방향이 있다면 서로 달라도 오래 걸을 수 있습니다."},
  {id:"q024",text:"미래는 자신의 꿈이 아름답다고 믿는 사람들의 것이다.",author:"엘리너 루스벨트",category:"자기확신",reflection:"아직 현실이 되지 않았다는 이유로 꿈의 가치를 먼저 깎지 마세요. 내가 그 가능성을 믿는 데서 미래의 방향도 시작됩니다."},
  {id:"q025",text:"아무것도 하지 않으면 의심과 두려움이 생긴다. 행동하면 자신감과 용기가 생긴다.",author:"데일 카네기",category:"용기",reflection:"자신감이 생긴 뒤에 행동하는 게 아니라, 행동하면서 자신감이 따라오는 경우가 더 많아요. 시작이 마음을 바꿔놓기도 합니다."},
  {id:"q026",text:"나를 죽이지 못하는 고통은 나를 더 강하게 만든다.",author:"프리드리히 니체",category:"용기",reflection:"힘들었던 일을 억지로 좋은 일이라 부를 필요는 없어요. 다만 그 시간을 버텨낸 힘까지 함께 무시할 필요도 없습니다."},
  {id:"q027",text:"어디를 가든 마음을 다해 가라.",author:"공자",category:"성장",reflection:"어디에 있든 마음을 반쯤 빼둔 채 버티기보다, 지금 선택한 자리에서 할 수 있는 만큼 마음을 써보는 것도 좋습니다."},
  {id:"q028",text:"인생에서 가장 중요한 것은 살아왔다는 사실이 아니라, 타인의 삶에 어떤 변화를 주었는가이다.",author:"넬슨 만델라",category:"관계",reflection:"내가 남긴 흔적은 거창한 성취보다 누군가의 삶을 조금 낫게 만든 순간에 있을 수도 있어요. 오늘의 다정함도 그런 흔적입니다."},
  {id:"q029",text:"나는 크고 고귀한 일을 이루고 싶다. 하지만 작고 평범한 일을 크고 고귀한 일처럼 해내는 것이 나의 가장 중요한 의무이자 기쁨이다.",author:"헬렌 켈러",category:"성장",reflection:"성장은 언제나 큰 성취의 모습으로 오지는 않아요. 오늘 맡은 평범한 일을 정성껏 해내는 시간도 나를 만들어갑니다."},
  {id:"q030",text:"할 수 있는 일을 하라. 가진 것으로, 있는 곳에서.",author:"시어도어 루스벨트",category:"자기확신",reflection:"모든 조건이 갖춰질 때까지 기다리지 않아도 돼요. 지금 가진 것과 지금 서 있는 자리에서도 시작할 수 있는 일은 있습니다."},
  {id:"q031",text:"당신이 할 수 있다고 생각하는 것보다 더 많은 것을 할 수 있다.",author:"엘리너 루스벨트",category:"자기확신",reflection:"스스로 정해둔 한계가 실제 한계보다 좁을 때가 있어요. 해보기 전에는 몰랐던 힘이 남아 있을지도 모릅니다."},
  {id:"q032",text:"어제는 지나갔고 내일은 아직 오지 않았다. 우리에게는 오늘뿐이다.",author:"마더 테레사",category:"위안",reflection:"어제는 고칠 수 없고 내일은 아직 손에 잡히지 않아요. 지금 내가 돌볼 수 있는 건 결국 오늘뿐입니다."},
  {id:"q033",text:"고통은 피할 수 없지만 괴로움은 선택이다.",author:"무라카미 하루키",category:"위안",reflection:"아픈 마음이 드는 건 어쩔 수 없어요. 그래도 그 고통이 나 자신 전체를 대신하게 둘 필요는 없습니다."},
  {id:"q034",text:"평화는 밖에서 오는 것이 아니다. 평화는 내면에서 온다.",author:"붓다",category:"위안",reflection:"바깥이 시끄러운 날일수록 내 마음까지 같이 흔들릴 필요는 없어요. 잠깐 숨을 고르는 것만으로도 안쪽의 소음은 조금 잦아들 수 있습니다."},
  {id:"q035",text:"어려움 한가운데에 기회가 놓여 있다.",author:"알베르트 아인슈타인",category:"성장",reflection:"지금의 어려움이 길을 막는 것처럼 보여도, 그 안에는 방향을 바꾸거나 새롭게 시도할 가능성이 숨어 있을 수 있어요."},
  {id:"q036",text:"상상력은 지식보다 중요하다.",author:"알베르트 아인슈타인",category:"성장",reflection:"이미 아는 것만으로는 보이지 않는 길도 있어요. 정답이 없어도 ‘다르게 볼 수 있을까’라는 상상에서 새로운 선택이 시작됩니다."},
  {id:"q037",text:"삶은 자전거를 타는 것과 같다. 균형을 유지하려면 계속 움직여야 한다.",author:"알베르트 아인슈타인",category:"성장",reflection:"흔들리는 건 멈췄다는 뜻이 아니에요. 완벽한 균형보다 다시 움직이며 중심을 찾아가는 일이 더 중요할 때가 있습니다."},
  {id:"q038",text:"성공은 최종적인 것이 아니며 실패는 치명적인 것이 아니다. 중요한 것은 계속할 용기다.",author:"윈스턴 처칠",category:"용기",reflection:"성공에 너무 오래 머물 필요도, 실패를 끝이라고 받아들일 필요도 없어요. 결국 다음 장면을 만드는 건 계속해보려는 마음입니다."},
  {id:"q039",text:"가장 어두운 밤도 끝나고 해는 떠오른다.",author:"빅토르 위고",category:"위안",reflection:"지금이 유난히 길고 어둡게 느껴져도 이 시간이 영원히 계속되지는 않아요. 오늘은 멀리 보지 말고 하루만 지나가도 됩니다."},
  {id:"q040",text:"미소는 당신의 얼굴에서 겨울을 몰아내는 햇살이다.",author:"빅토르 위고",category:"위안",reflection:"미소 하나가 모든 문제를 해결하진 않지만, 굳어 있던 마음을 잠시 풀어주는 순간은 있어요."},
  {id:"q041",text:"행동은 모든 성공의 기본 열쇠다.",author:"파블로 피카소",category:"성장",reflection:"생각이 아무리 좋아도 움직이지 않으면 결과는 바뀌지 않아요. 손을 대는 순간, 계획은 현실 쪽으로 넘어옵니다."},
  {id:"q042",text:"영감은 존재한다. 다만 우리가 일하고 있을 때 찾아온다.",author:"파블로 피카소",category:"성장",reflection:"영감이 먼저 와야 시작할 수 있는 건 아니에요. 손을 움직이는 동안 뒤늦게 찾아오는 생각도 많습니다."},
  {id:"q043",text:"태도를 바꾸면 세상이 달라진다.",author:"윌리엄 제임스",category:"성장",reflection:"상황을 바로 바꾸지 못해도 그것을 바라보는 방식은 바꿀 수 있어요. 관점이 달라지면 전에 없던 선택지가 보이기도 합니다."},
  {id:"q044",text:"우리가 두려워해야 할 유일한 것은 두려움 그 자체다.",author:"프랭클린 D. 루스벨트",category:"용기",reflection:"두려움은 실제보다 더 큰 벽을 만들어 보일 때가 있어요. 한 번 가까이에서 보면 생각보다 넘을 만한 벽일 수도 있습니다."},
  {id:"q045",text:"나는 준비할 것이다. 그러면 언젠가 나의 기회가 올 것이다.",author:"에이브러햄 링컨",category:"성장",reflection:"기회는 언제 올지 알 수 없지만, 준비한 시간은 사라지지 않아요. 오늘 쌓아둔 것이 나중의 기회를 붙잡게 해줄 수 있습니다."},
  {id:"q046",text:"사람들은 당신이 한 말과 행동은 잊어도, 당신 때문에 느낀 감정은 잊지 않는다.",author:"마야 안젤루",category:"관계",reflection:"사람은 정확한 문장보다 그때 느낀 마음을 오래 기억하기도 해요. 맞는 말을 고르는 것만큼 어떤 마음으로 전할지도 중요합니다."},
  {id:"q047",text:"우리는 많은 패배를 만날 수 있지만 패배해서는 안 된다.",author:"마야 안젤루",category:"용기",reflection:"패배를 겪었다는 것과 패배한 사람으로 남는 건 다른 이야기예요. 한 번의 결과가 나 전체의 이름이 되게 둘 필요는 없습니다."},
  {id:"q048",text:"자신을 사랑하는 것은 평생 이어질 로맨스의 시작이다.",author:"오스카 와일드",category:"자기확신",reflection:"평생 가장 오래 함께 살아갈 사람은 결국 나예요. 다른 사람에게 건네는 이해와 다정함을 나에게도 조금은 돌려주세요."},
  {id:"q049",text:"당신이 세상에서 보고 싶은 변화가 되어라.",author:"마하트마 간디",category:"성장",reflection:"바라는 변화를 멀리서 기다리기보다 내가 먼저 그 모습으로 살아볼 수 있어요. 작은 행동 하나도 주변에 다른 기준을 보여줍니다."},
  {id:"q050",text:"친구란 내가 솔직할 수 있는 사람이다. 그 앞에서는 생각을 소리 내어 말할 수 있다.",author:"랠프 월도 에머슨",category:"관계",reflection:"좋은 관계에서는 잘 보이기 위해 마음을 숨기지 않아도 돼요. 솔직한 생각을 편하게 꺼낼 수 있다는 것 자체가 큰 신뢰니까요."},
  {id:"q051",text:"중요한 것은 무엇을 바라보느냐가 아니라 무엇을 보느냐이다.",author:"헨리 데이비드 소로",category:"성장",reflection:"같은 곳을 보고 있어도 누구나 같은 것을 보는 건 아니에요. 익숙한 장면을 한 번 더 자세히 보면 전에 지나친 것이 눈에 들어올 수 있습니다."},
  {id:"q052",text:"꿈을 이루고 싶다면 먼저 꿈에서 깨어나라.",author:"J. M. 파워",category:"성장",reflection:"꿈은 생각 속에만 있을 때보다 현실과 닿을 때 움직이기 시작해요. 오늘의 행동 하나가 꿈을 현실 쪽으로 데려옵니다."},
  {id:"q053",text:"낭비한 시간에 대한 후회는 더 큰 시간 낭비다.",author:"메이슨 쿨리",category:"위안",reflection:"지나간 시간을 후회하느라 지금까지 잃을 필요는 없어요. 늦었다는 생각이 들 때가 다시 시작할 수 있는 가장 가까운 순간이기도 합니다."},
  {id:"q054",text:"항상 얼굴을 햇빛 쪽으로 향하라. 그러면 그림자는 뒤로 물러날 것이다.",author:"월트 휘트먼",category:"위안",reflection:"걱정을 없애는 것보다 마음이 향할 곳을 고르는 일이 먼저일 때가 있어요. 어두운 쪽만 보고 있었다면 오늘의 밝은 장면 하나도 놓치지 마세요."},
  {id:"q055",text:"혼자서는 아주 조금 할 수 있지만 함께라면 많은 것을 할 수 있다.",author:"헬렌 켈러",category:"관계",reflection:"혼자서는 닿기 어려운 곳도 함께라면 가능해집니다. 도움을 청하고 힘을 나누는 것도 앞으로 가는 방식이에요."},
  {id:"q056",text:"세상에서 가장 아름다운 것은 보거나 만질 수 없다. 마음으로 느껴야 한다.",author:"헬렌 켈러",category:"관계",reflection:"눈에 보이는 성과만이 소중한 건 아니에요. 말로 설명하기 어려운 애정과 신뢰처럼, 마음으로만 알 수 있는 것들도 삶을 오래 지탱합니다."},
  {id:"q057",text:"나는 바람의 방향을 바꿀 수 없지만 목적지에 닿도록 돛을 조절할 수 있다.",author:"지미 딘",category:"용기",reflection:"바람을 바꿀 수 없어도 돛의 방향은 조절할 수 있어요. 지금 바꿀 수 있는 것에 힘을 쓰는 편이 낫습니다."},
  {id:"q058",text:"아무리 느리게 가도 멈추지만 않는다면 괜찮다.",author:"공자",category:"위안",reflection:"느린 걸음도 걸음입니다. 남의 속도보다 내가 계속 가고 있다는 사실을 더 오래 봐주세요."},
  {id:"q059",text:"우리가 생각하는 대로 우리는 존재한다.",author:"마르쿠스 아우렐리우스",category:"자기확신",reflection:"스스로를 어떤 사람이라고 반복해서 말하는지는 생각보다 큰 영향을 줍니다. 나를 깎아내리는 말이 사실처럼 굳어지지 않게 해주세요."},
  {id:"q060",text:"행복한 삶을 만드는 데 필요한 것은 아주 적다. 그것은 모두 당신 안에 있다.",author:"마르쿠스 아우렐리우스",category:"자기확신",reflection:"행복을 위해 계속 무언가를 더 채워야 하는 건 아닐지도 몰라요. 이미 내 안과 곁에 있는 것들만으로도 마음이 가벼워지는 순간이 있습니다."},
  {id:"q061",text:"삶 전체를 한꺼번에 생각하며 자신을 괴롭히지 마라.",author:"마르쿠스 아우렐리우스",category:"위안",reflection:"앞으로의 모든 일을 한꺼번에 떠올리면 누구라도 벅찰 수 있어요. 지금은 오늘만 지나가도 됩니다."},
  {id:"q062",text:"사랑받고 싶다면 사랑하라. 그리고 사랑받을 만한 사람이 되어라.",author:"벤저민 프랭클린",category:"관계",reflection:"사랑받고 싶은 마음만큼 먼저 사랑을 표현하는 일도 필요해요. 관계는 한쪽이 알아주길 기다리는 것보다 서로 건네는 마음 속에서 자랍니다."},
  {id:"q063",text:"잘한 것은 말보다 행동으로 보여주어라.",author:"벤저민 프랭클린",category:"성장",reflection:"말로 설명하는 것보다 꾸준한 행동이 더 분명하게 보여줄 때가 있어요. 조용히 이어온 선택이 결국 나를 대신해 말해줍니다."},
  {id:"q064",text:"삶의 목적은 행복해지는 것이다.",author:"달라이 라마",category:"위안",reflection:"성과를 채우느라 행복을 항상 뒤로 미룰 필요는 없어요. 잘 사는 일 안에는 내가 기쁨을 느끼는 시간도 포함됩니다."},
  {id:"q065",text:"배우고 때때로 익히면 또한 기쁘지 아니한가.",author:"공자",category:"성장",reflection:"배운 것을 다시 써보고 익히는 순간, 지식은 비로소 내 것이 됩니다. 알아가는 즐거움은 그 과정에서 더 선명해져요."},
  {id:"q066",text:"마음은 채워야 할 그릇이 아니라 불붙여야 할 불씨다.",author:"플루타르코스",category:"성장",reflection:"배움은 많이 채우는 일보다 알고 싶게 만드는 불씨를 지키는 데 가까울지도 몰라요. 마음이 오래 머무는 궁금증에는 이유가 있습니다."},
  {id:"q067",text:"삶에서 두려워할 것은 없다. 다만 이해해야 할 것이 있을 뿐이다.",author:"마리 퀴리",category:"용기",reflection:"두려움은 알 수 없을 때 더 크게 느껴지기도 해요. 하나씩 이해해가다 보면 막막했던 마음도 조금은 선명해질 거예요."},
  {id:"q068",text:"성공은 도달한 위치보다 그 과정에서 극복한 장애물로 측정해야 한다.",author:"부커 T. 워싱턴",category:"성장",reflection:"결과만 놓고 보면 내가 지나온 어려움은 보이지 않아요. 여기까지 오는 동안 넘은 것들도 내 성장의 크기를 말해줍니다."},
  {id:"q069",text:"삶은 대담한 모험이거나 아무것도 아니다.",author:"헬렌 켈러",category:"용기",reflection:"안전한 선택만으로는 만나기 어려운 장면도 있어요. 가끔은 조금 불확실해도 마음이 가는 쪽을 택해야 삶이 넓어집니다."},
  {id:"q070",text:"용기란 두려움이 없는 것이 아니라 두려움을 이겨내는 것이다.",author:"넬슨 만델라",category:"용기",reflection:"두려움이 사라진 뒤에 움직이는 게 용기는 아니에요. 떨리는 마음을 안고도 앞으로 가는 순간이 이미 용기입니다."},
  {id:"q071",text:"마음을 정하면 두려움은 줄어든다.",author:"로자 파크스",category:"용기",reflection:"마음을 정한다고 걱정이 모두 없어지진 않지만, 무엇을 지킬지 분명해지면 두려움이 차지하는 자리는 줄어들 수 있어요."},
  {id:"q072",text:"공로는 실제로 경기장에 서 있는 사람에게 돌아간다.",author:"시어도어 루스벨트",category:"용기",reflection:"밖에서 평가하는 것보다 직접 뛰어드는 일이 훨씬 어렵습니다. 결과와 별개로 시도한 용기까지 인정해도 돼요."},
  {id:"q073",text:"우리의 의심은 배신자다. 시도하기를 두려워하게 만들어, 얻을 수도 있었던 좋은 것을 놓치게 한다.",author:"윌리엄 셰익스피어",category:"용기",reflection:"할 수 있을지 확신이 없다는 이유만으로 기회까지 먼저 포기하지는 마세요. 시도하지 않으면 알 수 없었던 가능성도 있습니다."},
  {id:"q074",text:"어려워서 감히 하지 못하는 것이 아니라, 감히 하지 못해서 어려운 것이다.",author:"세네카",category:"용기",reflection:"멀리서 보기만 할수록 일은 더 어렵게 느껴질 때가 있어요. 직접 부딪쳐보는 순간, 막연했던 어려움의 크기도 달라집니다."},
  {id:"q075",text:"새로운 대륙을 발견하려면 해안을 오랫동안 보지 못할 각오가 있어야 한다.",author:"앙드레 지드",category:"용기",reflection:"새로운 길에서는 한동안 익숙한 기준이 보이지 않을 수 있어요. 불확실함이 곧 잘못된 방향이라는 뜻은 아닙니다."},
  {id:"q076",text:"용기는 다른 모든 덕목을 꾸준히 실천하게 하는 가장 중요한 덕목이다.",author:"마야 안젤루",category:"용기",reflection:"좋다고 믿는 가치를 실제로 지키려면 결국 용기가 필요합니다. 생각에 머무르지 않고 행동으로 이어갈 때 그 가치도 비로소 드러납니다."},
  {id:"q077",text:"앞으로 점들을 연결할 수는 없다. 뒤를 돌아볼 때에만 연결할 수 있다.",author:"스티브 잡스",category:"성장",reflection:"지금 하는 일이 어디로 이어질지 당장은 알 수 없어요. 지나고 나서야 의미가 보이는 경험도 있습니다."},
  {id:"q078",text:"모든 것이 잘될 것이고, 모든 것이 잘될 것이다.",author:"노리치의 줄리언",category:"위안",reflection:"지금은 끝이 보이지 않아도 모든 일이 이 모습 그대로 머물지는 않아요. 오늘만큼은 결론을 서두르지 않고 마음을 쉬게 두어도 됩니다."},
  {id:"q079",text:"세상은 고통으로 가득하지만, 그것을 이겨내는 일로도 가득하다.",author:"헬렌 켈러",category:"위안",reflection:"고통이 있다는 사실과 회복할 수 있다는 사실은 함께 존재할 수 있어요. 힘든 지금에도 다시 나아갈 가능성은 남아 있습니다."},
  {id:"q080",text:"상황을 바꿀 수 없을 때 우리는 자신을 바꾸라는 도전을 받는다.",author:"빅터 프랭클",category:"성장",reflection:"바꿀 수 없는 현실 앞에서는 힘을 쓰는 방향도 달라져야 할 때가 있어요. 상황 대신 내 태도와 선택을 바꾸는 것도 하나의 변화입니다."},
  {id:"q081",text:"우리는 현실보다 상상 속에서 더 자주 고통받는다.",author:"세네카",category:"위안",reflection:"걱정은 아직 오지 않은 일을 이미 겪은 것처럼 지치게 하기도 해요. 지금은 눈앞의 하루에 마음을 남겨두세요."},
  {id:"q082",text:"사람을 괴롭히는 것은 일어난 일이 아니라 그 일에 대한 생각이다.",author:"에픽테토스",category:"위안",reflection:"같은 일도 어떤 의미를 붙이느냐에 따라 마음에 남는 무게가 달라져요. 일어난 일 하나가 내 삶 전체의 의미까지 결정하게 둘 필요는 없습니다."},
  {id:"q083",text:"좋은 사람이 무엇인지 더 이상 논하지 말고, 좋은 사람이 되어라.",author:"마르쿠스 아우렐리우스",category:"성장",reflection:"어떤 사람이 되고 싶은지 오래 생각하는 것도 필요하지만, 결국 그 모습을 만드는 건 오늘의 행동이에요. 내가 중요하게 여기는 가치를 한 번 실제로 살아내는 편이 더 분명합니다."},
  {id:"q084",text:"나는 모든 것에도 불구하고 사람들이 마음속으로는 선하다고 믿는다.",author:"안네 프랑크",category:"관계",reflection:"사람에게 실망한 날에도 모든 사람을 같은 결론으로 묶을 필요는 없어요. 여전히 믿을 만한 마음과 다정함은 곳곳에 남아 있습니다."},
  {id:"q085",text:"어느 누구도 그 자체로 온전한 섬은 아니다.",author:"존 던",category:"관계",reflection:"혼자서 모든 걸 감당해야 하는 사람은 없어요. 우리는 생각보다 많이 기대고 영향을 주고받으며 살아갑니다."},
  {id:"q086",text:"내가 원하지 않는 것을 남에게 행하지 말라.",author:"공자",category:"관계",reflection:"관계의 기준이 헷갈릴 때는 내가 그 자리에 있었다면 어떤 대우를 바랐을지 떠올려보세요. 존중은 거기서 시작되기도 합니다."},
  {id:"q087",text:"사람이 있는 곳에는 어디에나 친절을 베풀 기회가 있다.",author:"세네카",category:"관계",reflection:"친절은 거창한 마음보다 사소한 순간에서 더 자주 나타나요. 짧은 배려 하나도 누군가의 하루를 조금 덜 힘들게 만들 수 있습니다."},
  {id:"q088",text:"모든 사람에게 귀를 기울이되, 네 목소리는 아껴라.",author:"윌리엄 셰익스피어",category:"관계",reflection:"모든 말에 바로 답할 필요는 없어요. 충분히 듣고 난 뒤에 꺼낸 한마디가 더 정확하고 따뜻할 때가 있습니다."},
  {id:"q089",text:"진정한 우정에서는 격식이 필요하지 않다.",author:"윌리엄 셰익스피어",category:"관계",reflection:"편안한 관계에서는 매번 완벽한 모습을 준비하지 않아도 돼요. 꾸미지 않은 나로 함께 있을 수 있다는 것도 가까움입니다."},
  {id:"q090",text:"나의 인간성은 당신의 인간성과 떼려야 뗄 수 없이 이어져 있다.",author:"데즈먼드 투투",category:"관계",reflection:"우리는 서로에게 영향을 주며 살아가요. 상대를 존중하는 일은 결국 내가 살아갈 세상을 함께 지키는 일이기도 합니다."},
  {id:"q091",text:"내가 그를 사랑한 이유를 묻는다면 이렇게밖에는 말할 수 없다. 그가 그였고, 내가 나였기 때문이다.",author:"미셸 드 몽테뉴",category:"관계",reflection:"모든 좋은 관계가 이유로 설명되는 건 아니에요. 서로를 있는 그대로 받아들이는 데서 생기는 가까움도 있습니다."},
  {id:"q092",text:"자신을 친구에게 나누면 기쁨은 두 배가 되고 슬픔은 반이 된다.",author:"프랜시스 베이컨",category:"관계",reflection:"기쁜 일은 나누면 더 선명해지고, 힘든 일은 나누는 것만으로도 무게가 달라질 때가 있어요. 혼자 안고 있어야만 하는 마음은 아닙니다."},
  {id:"q093",text:"무엇보다도 너 자신에게 진실하라.",author:"윌리엄 셰익스피어",category:"자기확신",reflection:"남의 기대를 따라가다 보면 내 마음의 목소리가 작아지기 쉬워요. 적어도 중요한 선택 앞에서는 내가 정말 원하는 것이 무엇인지 놓치지 마세요."},
  {id:"q094",text:"나는 있는 그대로 존재하며, 그것으로 충분하다.",author:"월트 휘트먼",category:"자기확신",reflection:"무언가를 증명해야만 가치가 생기는 건 아니에요. 지금의 나도 이미 존중받을 이유가 있습니다."},
  {id:"q095",text:"당신의 시간은 한정되어 있으니 다른 사람의 삶을 사느라 낭비하지 마라.",author:"스티브 잡스",category:"자기확신",reflection:"남들이 정한 삶보다 내가 원하는 삶이 무엇인지 아는 게 먼저일 수 있어요. 한정된 시간을 어디에 쓸지는 내 선택입니다."},
  {id:"q096",text:"너 자신을 믿어라. 모든 마음은 그 단단한 울림에 응답한다.",author:"랠프 월도 에머슨",category:"자기확신",reflection:"모든 사람의 확신을 얻은 뒤에야 나를 믿을 수 있는 건 아니에요. 충분히 고민했다면 내 판단에도 한 번은 힘을 실어줄 필요가 있습니다."},
  {id:"q097",text:"남을 아는 것은 지혜이고, 자신을 아는 것은 밝음이다.",author:"노자",category:"자기확신",reflection:"남을 잘 아는 것만큼 나를 제대로 아는 일도 중요해요. 내가 원하는 것과 두려워하는 것을 알수록 선택의 방향도 선명해집니다."},
  {id:"q098",text:"먼저 어떤 사람이 되고 싶은지 자신에게 말하라. 그리고 해야 할 일을 하라.",author:"에픽테토스",category:"성장",reflection:"되고 싶은 모습을 생각하는 것만으로는 달라지지 않아요. 오늘의 행동이 그 사람과 가까워지는 쪽인지 보는 것이 변화의 시작입니다."},
  {id:"q099",text:"자신의 꿈이 이끄는 방향으로 자신 있게 나아가라.",author:"헨리 데이비드 소로",category:"자기확신",reflection:"내가 믿는 방향이라면 남보다 빠르거나 확실할 필요는 없어요. 다른 사람의 속도보다 내 길을 잃지 않는 일이 더 중요합니다."},
  {id:"q100",text:"우리의 가장 깊은 두려움은 무능함이 아니라 헤아릴 수 없이 강력하다는 것이다.",author:"메리앤 윌리엄슨",category:"자기확신",reflection:"내 가능성이 드러나는 순간이 오히려 부담스러울 때가 있어요. 눈에 띄는 게 두렵다는 이유로 스스로를 작게 만들 필요는 없습니다."}
];

// MVP1에서는 사용하지 않는 체크인·기록·카테고리 탐색 구현입니다.
// 이후 MVP에서 재사용할 수 있도록 코드는 보존하되 실행하지 않습니다.
if (false) {
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
let supabaseClient=null, selectedMood="", todayEntryExists=false;
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
async function loadTodayEntry(){
  const status=$("#checkinStatus"), submit=$("#checkinSubmit"), savedQuote=$("#checkinSavedQuote");
  status.textContent="오늘 기록을 확인하는 중…";
  try{
    const client=await getSupabase();
    const {data,error}=await client.from("journal_entries").select("mood,content,quote_text,quote_author").eq("entry_date",localDate()).maybeSingle();
    if(error)throw error;
    todayEntryExists=Boolean(data);
    document.querySelectorAll("[data-mood]").forEach(item=>item.classList.toggle("selected",data?.mood===item.dataset.mood));
    selectedMood=data?.mood||"";journalContent.value=data?.content||"";$("#journalCount").textContent=journalContent.value.length;
    if(data){
      $("#checkinSavedQuoteText").textContent=`“${data.quote_text}”`;$("#checkinSavedQuoteAuthor").textContent=`— ${data.quote_author}`;savedQuote.hidden=false;
      status.textContent="오늘 남긴 기록이에요. 마음이 달라졌다면 편하게 수정하세요.";
    }else{savedQuote.hidden=true;status.textContent=""}
    submit.textContent=data?"수정하고 새 문장 받기 ↗":"마음 남기기 ↗";
  }catch(error){status.textContent=error.message||"오늘 기록을 불러오지 못했어요."}
}
async function openCheckin(){
  if(!checkinDialog.open)checkinDialog.showModal();
  document.body.classList.add("dialog-open");
  await loadTodayEntry();
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
    todayEntryExists=true;
    renderQuote(picked.i,false,true);closeCheckin();toast("오늘의 마음을 저장했어요.");
    setTimeout(()=>$("#quote").scrollIntoView({behavior:"smooth"}),320);
  }catch(error){$("#checkinStatus").textContent=error.message||"저장하지 못했어요. 잠시 후 다시 시도해 주세요."}
  finally{submit.disabled=false;submit.textContent=todayEntryExists?"수정하고 새 문장 받기 ↗":"마음 남기기 ↗"}
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

}
