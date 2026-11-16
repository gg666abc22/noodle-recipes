# AGENTS.md — 拾味手帖 Hearth & Table

本文件為「拾味手帖 Hearth & Table」食譜網站的 AI 開發協作指南，規範專案架構、食譜資料格式、設計系統、程式品質標準與協作邊界。

---

## 1. 專案總覽與技術定位

- **專案名稱**：拾味手帖 Hearth & Table
- **目前架構**：純靜態前端（原生 HTML5 / CSS3 / Vanilla JavaScript），無需編譯或打包即可透過 `index.html` 直接開啟或以任何靜態伺服器提供服務。
- **長期彈性**：目前維持零外部執行期依賴（僅透過 Google Fonts 載入字體）；若未來有擴充需求，**經使用者同意後**可逐步遷移至 Vite、React 或其他現代前端框架，在此之前請勿擅自引入 `package.json` 或重型框架。
- **目錄結構**：
  - `index.html`：語意化頁面骨架（Hero 精選、篩選區、食譜網格、料理手記、互動式食譜 Modal 與懸浮計時器）。
  - `styles.css`：設計系統變數、雜誌感排版與 RWD 斷點（`960px`、`640px`）。
  - `recipes.js`：食譜資料庫（全域常數 `RECIPES` 陣列）。
  - `app.js`：篩選搜尋、份數動態換算、`localStorage` 進度儲存與 Web Audio API 計時器。
  - `images/`：各道食譜的實體圖片資源（建議為 4:3 比例的 `.jpg` 或 `.webp`）。

---

## 2. 語言與文案規範

- **一律使用繁體中文**：所有介面文字、食譜標題、食材、步驟與註解均須使用**繁體中文**，並採用**台灣料理與度量衡慣用語**。
  - 常用單位：`g`、`ml`、`顆`、`條`、`根`、`片`、`支`、`瓣`、`大匙`、`茶匙`、`小把`、`適量`。
  - 避免簡體字或非台灣慣用詞彙（如「土豆」應作「馬鈴薯」、「西紅柿」應作「番茄」、「黃油」應作「奶油」）。
- **雜誌感語氣**：食譜簡介（`excerpt`）與故事（`story`）應保有溫暖、從容、具畫面感的生活雜誌筆觸；步驟（`steps`）則須精準、明確、易於操作。

---

## 3. 食譜資料格式規範（`recipes.js`）

新增或修改 `RECIPES` 陣列中的食譜物件時，必須嚴格遵守以下欄位結構，確保篩選、份數換算與計時器正常運作：

```js
{
  id: "unique-kebab-case-id",       // 唯一識別碼（英文小寫與連字號）
  title: "食譜名稱",                 // 繁體中文標題
  category: "家常麵",              // 必須符合現有分類之一（見下方）
  difficulty: "新手友善",            // 僅限 "新手友善" 或 "進階料理"
  totalMinutes: 30,                 // 整數（分鐘），用於時間篩選（<=30 / 31-60 / >60）
  baseServings: 2,                  // 整數，作為份數換算的基準人份
  image: "images/example.jpg",      // 相對路徑，對應 images/ 內檔案
  excerpt: "卡片上顯示的兩行摘要...",
  story: "食譜彈窗中的料理故事...",
  ingredients: [
    { name: "食材名稱", amount: 200, unit: "g" },     // amount 可為整數或小數
    { name: "海鹽與黑胡椒", amount: null, unit: "適量" } // 無法換算的調味料，amount 設為 null
  ],
  steps: [
    {
      text: "步驟說明文字...",
      timerSeconds: 300,            // 整數秒數；無需計時則設為 null
      timerLabel: "簡短計時名稱"     // 僅在 timerSeconds 非 null 時需要
    }
  ],
  tip: "主廚小叮嚀文字..."
}
```

- **合法分類（`category`）**：`泡麵`、`拉麵`、`家常麵`、`義大利麵`、`涼麵與拌麵`。若需新增分類，必須同步更新 `index.html` 中的 `.category-pills` 按鈕。
- **份數換算規則**：`app.js` 會依 `currentServings / baseServings` 比例計算（支援 1～12 人份），`amount` 必須為純數字或 `null`，不可寫入字串範圍（如 `"100-150"`）。

---

## 4. 視覺與設計系統規範（`styles.css`）

本專案採用「溫暖雜誌風（Warm Editorial Magazine）」，修改樣式時請優先複用 `:root` CSS 變數，避免硬編碼色碼：

- **色彩系統**：
  - 背景色：`--bg-cream` (`#FAF7F2`)、亞麻底色 `--bg-linen` (`#F2ECE1`)、卡片白 `--bg-card` (`#FFFFFF`)
  - 文字色：主標題 `--text-espresso` (`#2B2118`)、內文 `--text-body` (`#46392E`)、輔助 `--text-muted` (`#786758`)
  - 點綴色：赤陶紅 `--accent-terracotta` (`#C25E3E`)、橄欖綠 `--accent-olive` (`#5A6B4C`)
  - 邊框色：`--border-warm` (`#E4DBC9`)
- **字體搭配**：
  - 標題與雜誌引文：`--font-serif`（`Noto Serif TC`、`Playfair Display`）
  - 介面與內文：`--font-sans`（`Noto Sans TC`）
  - 計時器數字必須維持 `font-variant-numeric: tabular-nums;` 以避免倒數時版面跳動。
- **版面與互動**：
  - 圖片容器維持 `4 / 3` 比例與圓角，並保留圖片載入失敗時的 `.card-image-fallback` 降級顯示。
  - 所有互動元件（卡片、按鈕、彈窗）皆須維持清楚的 hover 狀態與圓潤的過度動畫。

---

## 5. 程式品質、無障礙與驗證要求

- **安全性**：所有動態插入 DOM 的食譜文字皆須透過 `escapeHtml()` 處理，防止 XSS。
- **無障礙（A11y）與 RWD**：
  - 維持語意化標籤與 `aria-label`、`aria-pressed`、`aria-selected`、`role="dialog"` 屬性。
  - 食譜卡片支援鍵盤 `Enter` / `Space` 開啟；彈窗支援 `Esc` 關閉與點擊背景遮罩關閉。
  - 修改版面後須確保桌面版（3 欄）、平板（`<=960px`，2 欄）與手機版（`<=640px`，1 欄）皆無水平捲動破版。
- **必做驗證指令**：
  每次修改 `recipes.js` 或 `app.js` 後，必須執行語法檢查並確認退出碼為 `0`：
  ```powershell
  node --check recipes.js
  node --check app.js
  ```

---

## 6. AI 協作邊界

- **架構變更先確認**：若要導入建置工具（如 Vite）、後端 API 或更改資料儲存機制，必須先與使用者討論並取得同意。
- **保護使用者本地資料**：不可隨意更改 `app.js` 中的 `STORAGE_KEY`（目前為 `"hearth_table_progress_v1"`），以免造成使用者已勾選的備料與步驟進度遺失。
- **不隨意刪除現有食譜或圖片**：除非使用者明確要求，否則僅做增量擴充或修正錯誤，並保留現有註解與結構。
