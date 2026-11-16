/**
 * 拾味手帖 Hearth & Table — 麵食食譜資料庫
 * 分類：泡麵、拉麵、家常麵、義大利麵、涼麵與拌麵
 */
const RECIPES = [
  {
    id: "tonkotsu-garlic-ramen",
    title: "濃郁蒜香豚骨叉燒拉麵",
    category: "拉麵",
    difficulty: "進階料理",
    totalMinutes: 75,
    baseServings: 2,
    image: "images/tonkotsu-ramen.jpg",
    excerpt: "以焦香黑蒜油點綴乳白醇厚的豚骨湯底，搭配低溫慢滷叉燒、半熟溏心蛋與彈牙細拉麵。",
    story: "不必熬湯十小時，利用雞高湯與無糖豆漿的乳化比例，加上現炸黑蒜油的焦香，在家也能重現深夜拉麵屋裡那碗濃郁卻不膩口的豚骨拉麵。",
    ingredients: [
      { name: "日式生細拉麵", amount: 2, unit: "球" },
      { name: "豬梅花叉燒肉片", amount: 6, unit: "片" },
      { name: "溏心蛋（對半切）", amount: 2, unit: "顆" },
      { name: "濃郁豬骨或雞高湯", amount: 700, unit: "ml" },
      { name: "無糖濃豆漿（增稠乳化用）", amount: 150, unit: "ml" },
      { name: "蒜頭（切薄片炸黑蒜油用）", amount: 6, unit: "瓣" },
      { name: "麻油與沙拉油（各半）", amount: 2, unit: "大匙" },
      { name: "日式醬油（湯底調味）", amount: 2, unit: "大匙" },
      { name: "味醂", amount: 1, unit: "大匙" },
      { name: "蔥花、海苔片與白芝麻", amount: null, unit: "適量" }
    ],
    steps: [
      {
        text: "製作黑蒜油：冷鍋倒入麻油與沙拉油，放入蒜片以極小火慢慢炸至深褐色（注意不要焦苦），連油帶蒜倒入耐熱碗壓碎備用。",
        timerSeconds: 360,
        timerLabel: "小火慢炸黑蒜油"
      },
      {
        text: "熬煮湯底：取湯鍋倒入高湯、日式醬油與味醂煮滾，轉小火後加入無糖豆漿輕輕拌勻，維持微滾狀態 5 分鐘（豆漿勿大火沸騰以免結塊）。",
        timerSeconds: 300,
        timerLabel: "溫火乳化湯頭"
      },
      {
        text: "叉燒肉片可用噴槍炙燒表面，或以平底鍋乾煎每面 30 秒逼出油脂香氣。",
        timerSeconds: 60,
        timerLabel: "煎香叉燒肉片"
      },
      {
        text: "另煮一大鍋滾水，下日式細拉麵快煮 90 秒至保有麵芯彈牙口感，撈起徹底甩乾水分。",
        timerSeconds: 90,
        timerLabel: "快煮細拉麵"
      },
      {
        text: "溫熱的大碗中倒入滾燙豚骨湯底，放入拉麵整理麵線，鋪上叉燒、溏心蛋、海苔與大量蔥花，最後淋上一匙黑蒜油即可上桌。",
        timerSeconds: null
      }
    ],
    tip: "煮拉麵的水量要大，且撈起後一定要「徹底甩乾麵水」，才不會稀釋濃郁的豚骨湯底；若喜歡硬麵口感，煮 60 秒即可起鍋。"
  },
  {
    id: "kimchi-cheese-ramyeon",
    title: "起司泡菜嫩蛋升級辛拉麵",
    category: "泡麵",
    difficulty: "新手友善",
    totalMinutes: 10,
    baseServings: 1,
    image: "images/kimchi-instant-noodles.jpg",
    excerpt: "只要十分鐘的深夜救贖！韓式泡菜的酸辣與融化切達起司交織，讓平凡泡麵瞬間升級成濃郁鍋物。",
    story: "宵夜想吃泡麵又想來點儀式感時，這道只需一鍋到底的升級版辛拉麵是最完美的選擇。起司融進辣湯裡能柔和辛辣度，半熟蛋黃拌麵更是犯規。",
    ingredients: [
      { name: "韓式辣味泡麵（含調味粉包）", amount: 1, unit: "包" },
      { name: "韓式老泡菜（切小塊）", amount: 60, unit: "g" },
      { name: "雞蛋", amount: 1, unit: "顆" },
      { name: "切達起司片", amount: 1, unit: "片" },
      { name: "清水", amount: 500, unit: "ml" },
      { name: "青蔥（斜切蔥花）", amount: 1, unit: "支" },
      { name: "熟白芝麻", amount: 1, unit: "茶匙" }
    ],
    steps: [
      {
        text: "小湯鍋開中火，加入少許香油（可省略）將泡菜略炒 1 分鐘釋放酸香，接著倒入清水與泡麵調味粉包、乾燥蔬菜包煮滾。",
        timerSeconds: 120,
        timerLabel: "炒香泡菜煮湯底"
      },
      {
        text: "湯滾後放入泡麵麵體，以中大火煮 2 分鐘至麵條微散。",
        timerSeconds: 120,
        timerLabel: "煮泡麵麵體"
      },
      {
        text: "在麵中央撥出一個小凹槽打入雞蛋（不要攪散），蓋上鍋蓋轉中小火燜煮 90 秒至蛋白凝固、蛋黃呈半熟糖心狀。",
        timerSeconds: 90,
        timerLabel: "加蓋燜熟嫩蛋"
      },
      {
        text: "熄火後立刻在熱騰騰的麵上放一片切達起司，撒上蔥花與白芝麻，趁起司半融時直接端鍋享用。",
        timerSeconds: null
      }
    ],
    tip: "麵體煮 3.5 分鐘左右口感最彈牙，因為離火後餘溫還會繼續加熱；起司務必在熄火後再放，才不會沉入鍋底糊掉。"
  },
  {
    id: "scallion-pork-dry-noodles",
    title: "古早味蔥油豬肉燥乾拌麵",
    category: "家常麵",
    difficulty: "新手友善",
    totalMinutes: 25,
    baseServings: 2,
    image: "images/scallion-pork-noodles.jpg",
    excerpt: "紅蔥頭慢炸出金黃蔥油，拌炒五花豬絞肉與蔭油膏，淋在彈牙關廟麵上，是最踏實的台灣家常味。",
    story: "台灣巷口麵攤的靈魂，就在那一匙油亮噴香的肉燥與紅蔥酥。自己在家炒一鍋肉燥，不僅能控制肥瘦比例，拌麵、燙青菜都百搭。",
    ingredients: [
      { name: "關廟麵或家常陽春寬麵", amount: 2, unit: "束" },
      { name: "帶皮五花豬絞肉（粗絞）", amount: 200, unit: "g" },
      { name: "紅蔥頭（切薄片）", amount: 6, unit: "顆" },
      { name: "青江菜（對半剖開）", amount: 2, unit: "株" },
      { name: "純釀造醬油", amount: 2, unit: "大匙" },
      { name: "醬油膏", amount: 1, unit: "大匙" },
      { name: "米酒", amount: 1, unit: "大匙" },
      { name: "冰糖", amount: 1, unit: "茶匙" },
      { name: "白胡椒粉", amount: 0.5, unit: "茶匙" },
      { name: "清水", amount: 150, unit: "ml" }
    ],
    steps: [
      {
        text: "冷鍋放 1.5 大匙油與紅蔥頭片，以小火慢炸約 4 分鐘至紅蔥頭呈金黃酥脆後先撈起一半當紅蔥酥，鍋內留蔥油與另一半蔥片。",
        timerSeconds: 240,
        timerLabel: "小火慢炸紅蔥油"
      },
      {
        text: "轉中大火放入豬絞肉煸炒至變白出油，沿鍋邊嗆入米酒，再加入醬油、醬油膏、冰糖與白胡椒粉炒出醬香。",
        timerSeconds: 180,
        timerLabel: "煸香炒製肉燥"
      },
      {
        text: "倒入清水煮滾後轉小火，加蓋慢滷 10 分鐘讓肉燥入味濃郁。",
        timerSeconds: 600,
        timerLabel: "小火慢滷肉燥"
      },
      {
        text: "煮一鍋滾水下關廟麵煮 5 分鐘，起鍋前 30 秒放入青江菜一同燙熟，撈起瀝乾放入大碗中。",
        timerSeconds: 300,
        timerLabel: "煮熟關廟麵"
      },
      {
        text: "淋上兩大匙熱騰騰的肉燥與蔥油，撒上預留的酥脆紅蔥酥與蔥花，趁熱拌勻享用。",
        timerSeconds: null
      }
    ],
    tip: "炸紅蔥頭一定要「冷油下鍋、小火慢炸」，並在呈淺金黃色時就撈起一半，因為餘溫會讓它繼續上色變脆。"
  },
  {
    id: "mentaiko-scallop-pasta",
    title: "明太子奶油干貝義大利麵",
    category: "義大利麵",
    difficulty: "新手友善",
    totalMinutes: 25,
    baseServings: 2,
    image: "images/mentaiko-pasta.jpg",
    excerpt: "生食級干貝煎出金黃焦香，拌入融合鮮奶油與明太子的粉紅醬汁，海味濃郁卻滑順不膩。",
    story: "日本洋食屋裡最受歡迎的和風義大利麵，在家也能輕鬆重現。關鍵在於熄火後再拌入明太子，利用餘溫讓魚卵微微裹上麵條，保留粒粒分明的鮮美口感。",
    ingredients: [
      { name: "義大利直麵（Spaghetti）", amount: 180, unit: "g" },
      { name: "生食級大干貝", amount: 6, unit: "顆" },
      { name: "辛子明太子（去膜取卵）", amount: 60, unit: "g" },
      { name: "動物性鮮奶油", amount: 120, unit: "ml" },
      { name: "無鹽奶油", amount: 15, unit: "g" },
      { name: "蒜頭（切末）", amount: 2, unit: "瓣" },
      { name: "清酒或白酒", amount: 30, unit: "ml" },
      { name: "海苔絲", amount: 1, unit: "小把" },
      { name: "蝦夷蔥或蔥花", amount: 1, unit: "大匙" }
    ],
    steps: [
      {
        text: "煮一大鍋滾水（加 1% 鹽），放入義大利麵依包裝指示少 1 分鐘的時間煮至彈牙（Al Dente），撈麵時保留約 80ml 煮麵水。",
        timerSeconds: 480,
        timerLabel: "煮義大利麵"
      },
      {
        text: "干貝擦乾表面，平底鍋中大火熱鍋後下少許油，每面各煎 60 至 90 秒至金黃焦香後先取出。",
        timerSeconds: 150,
        timerLabel: "香煎生食干貝"
      },
      {
        text: "轉小火放入無鹽奶油與蒜末炒香，嗆入清酒後倒入鮮奶油與 50ml 煮麵水，輕輕煮至微濃稠。",
        timerSeconds: 120,
        timerLabel: "濃縮奶油醬汁"
      },
      {
        text: "將義大利麵倒入鍋中快速拌勻收汁，熄火！趁餘溫拌入去膜明太子，讓粉紅醬汁均勻包覆每根麵條。",
        timerSeconds: null
      },
      {
        text: "捲成漂亮的麵山盛盤，擺上金黃干貝，撒上海苔絲與細蔥花立即享用。",
        timerSeconds: null
      }
    ],
    tip: "明太子遇到高溫會熟透結塊，失去滑順感與鮮味，務必在「完全熄火」後再拌入鍋中。"
  },
  {
    id: "classic-carbonara-pasta",
    title: "經典培根蛋奶義大利麵 Carbonara",
    category: "義大利麵",
    difficulty: "新手友善",
    totalMinutes: 20,
    baseServings: 2,
    image: "images/carbonara-pasta.jpg",
    excerpt: "不加一滴鮮奶油！正統羅馬作法，只用蛋黃、現磨起司與煮麵水乳化出絲滑濃郁的黃金醬汁。",
    story: "Carbonara 最迷人的地方在於簡單純粹的食材魔法：焦脆培根逼出的油脂，遇上混合起司的蛋黃液與高溫麵條，在離火拌勻的瞬間乳化成如絲絨般的醬汁。",
    ingredients: [
      { name: "義大利直麵（Spaghetti）", amount: 180, unit: "g" },
      { name: "厚切煙燻培根（切粗條）", amount: 100, unit: "g" },
      { name: "蛋黃", amount: 3, unit: "顆" },
      { name: "全蛋", amount: 1, unit: "顆" },
      { name: "帕瑪森或羊奶起司（現磨細粉）", amount: 50, unit: "g" },
      { name: "現磨粗粒黑胡椒", amount: 1.5, unit: "茶匙" },
      { name: "海鹽（煮麵水用）", amount: null, unit: "適量" }
    ],
    steps: [
      {
        text: "大碗中將蛋黃、全蛋、現磨起司粉與大量黑胡椒徹底拌勻成濃稠蛋糊備用。",
        timerSeconds: null
      },
      {
        text: "煮滾一鍋加鹽熱水，放入義大利麵煮至彈牙（比包裝時間少 1 分鐘），撈起前預留 100ml 煮麵水。",
        timerSeconds: 480,
        timerLabel: "煮義大利麵"
      },
      {
        text: "同時冷鍋下培根條，以中小火慢慢煎出油脂至培根表面金黃酥脆，熄火靜置降溫 1 分鐘。",
        timerSeconds: 300,
        timerLabel: "慢煎酥脆培根"
      },
      {
        text: "將煮好的麵條夾入培根鍋中拌勻（確認鍋子已離火且不燙手），倒入蛋起司糊與 40ml 溫煮麵水，快速甩拌至醬汁濃稠滑順地裹住麵條。",
        timerSeconds: null
      },
      {
        text: "立即盛盤，再磨上些許起司與黑胡椒即可上桌。",
        timerSeconds: null
      }
    ],
    tip: "蛋液絕對不能在開火的鍋中攪拌，否則會瞬間變成炒蛋！若醬汁太濃稠，可逐匙補入溫熱的煮麵水調整流動感。"
  },
  {
    id: "sesame-shrimp-cold-noodles",
    title: "麻醬辣油鮮蝦涼麵",
    category: "涼麵與拌麵",
    difficulty: "新手友善",
    totalMinutes: 20,
    baseServings: 2,
    image: "images/sesame-cold-noodles.jpg",
    excerpt: "香濃白芝麻醬搭配花椒辣油與烏醋的微酸爽口，加上鮮甜燙蝦仁與爽脆小黃瓜絲，開胃又消暑。",
    story: "天氣悶熱或胃口不佳時，一碗冰鎮過後的涼麵最能喚醒味蕾。秘訣是用溫水將濃稠的芝麻醬分次澥開，再加入蒜泥與花椒辣油，香氣立刻立體起來。",
    ingredients: [
      { name: "黃油麵或細拉麵", amount: 250, unit: "g" },
      { name: "白蝦（去殼開背去腸泥）", amount: 8, unit: "隻" },
      { name: "小黃瓜（切細絲）", amount: 1, unit: "條" },
      { name: "純白芝麻醬", amount: 3, unit: "大匙" },
      { name: "溫開水（澥芝麻醬用）", amount: 3, unit: "大匙" },
      { name: "薄鹽醬油", amount: 2, unit: "大匙" },
      { name: "烏醋或鎮江香醋", amount: 1.5, unit: "大匙" },
      { name: "花椒辣油", amount: 1, unit: "大匙" },
      { name: "蒜泥", amount: 1, unit: "茶匙" },
      { name: "砂糖", amount: 1, unit: "茶匙" },
      { name: "碎花生（壓碎）", amount: 2, unit: "大匙" }
    ],
    steps: [
      {
        text: "調麻醬：將白芝麻醬放入碗中，分 3 次加入溫開水順同一方向攪拌至滑順乳狀，再拌入醬油、烏醋、砂糖、蒜泥與辣油。",
        timerSeconds: null
      },
      {
        text: "煮一鍋滾水，放入白蝦汆燙 90 秒至蝦身捲曲變紅，撈起泡入冰開水中冰鎮備用。",
        timerSeconds: 90,
        timerLabel: "汆燙鮮蝦"
      },
      {
        text: "麵條下滾水煮熟（約 3 分鐘），撈起後立刻放入冰開水中冰鎮降溫，接著瀝乾並拌入 1 茶匙香油防沾黏。",
        timerSeconds: 180,
        timerLabel: "煮熟麵條"
      },
      {
        text: "碗底鋪上冰鎮麵條，放上小黃瓜絲與鮮蝦，淋上滿滿的麻醬辣油醬汁，最後撒上碎花生即可大口拌勻享用。",
        timerSeconds: null
      }
    ],
    tip: "芝麻醬一開始遇水會「油水分離」變得很濃稠，這是正常現象！只要分次少量加水並持續攪拌，就會重新變成絲滑的醬汁。"
  }
];
