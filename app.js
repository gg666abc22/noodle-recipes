/**
 * 拾味手帖 Hearth & Table — 互動邏輯與計時器
 */

(function () {
  "use strict";

  // =========================================================================
  // State
  // =========================================================================
  const filterState = {
    search: "",
    category: "all",
    difficulty: "all",
    time: "all"
  };

  let activeRecipe = null;
  let currentServings = 4;

  // Per-recipe checklist persistence (in-memory + localStorage)
  const STORAGE_KEY = "hearth_table_progress_v1";
  let progressStore = loadProgressStore();

  // Timer state
  const timerState = {
    intervalId: null,
    initialSeconds: 0,
    remainingSeconds: 0,
    isRunning: false,
    isFinished: false,
    label: ""
  };

  // =========================================================================
  // DOM Elements
  // =========================================================================
  const recipeGrid = document.getElementById("recipe-grid");
  const emptyState = document.getElementById("empty-state");
  const resultsCount = document.getElementById("results-count");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");
  const emptyResetBtn = document.getElementById("empty-reset-btn");

  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const difficultyFilter = document.getElementById("difficulty-filter");
  const timeFilter = document.getElementById("time-filter");
  const categoryPills = document.querySelectorAll(".category-pills .pill");

  const heroOpenBtn = document.getElementById("hero-open-btn");

  // Modal elements
  const modalBackdrop = document.getElementById("recipe-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalScrollArea = document.getElementById("modal-scroll-area");
  const modalImg = document.getElementById("modal-img");
  const modalCategory = document.getElementById("modal-category");
  const modalTitle = document.getElementById("modal-title");
  const modalStory = document.getElementById("modal-story");
  const modalTime = document.getElementById("modal-time");
  const modalDifficulty = document.getElementById("modal-difficulty");
  const modalBaseServings = document.getElementById("modal-base-servings");
  const modalIngredients = document.getElementById("modal-ingredients");
  const modalSteps = document.getElementById("modal-steps");
  const modalTipText = document.getElementById("modal-tip-text");
  const ingredientProgress = document.getElementById("ingredient-progress");
  const stepProgress = document.getElementById("step-progress");

  // Scaler elements
  const servingsDecBtn = document.getElementById("servings-dec");
  const servingsIncBtn = document.getElementById("servings-inc");
  const servingsDisplay = document.getElementById("servings-display");
  const servingsResetBtn = document.getElementById("servings-reset");

  // Floating Timer elements
  const floatingTimer = document.getElementById("floating-timer");
  const timerCloseBtn = document.getElementById("timer-close-btn");
  const timerLabelEl = document.getElementById("timer-label");
  const timerDisplayEl = document.getElementById("timer-display");
  const timerToggleBtn = document.getElementById("timer-toggle-btn");
  const timerAddMinBtn = document.getElementById("timer-add-min-btn");
  const timerResetBtn = document.getElementById("timer-reset-btn");

  // =========================================================================
  // Initialization
  // =========================================================================
  function init() {
    renderRecipeGrid();
    bindEvents();
  }

  function loadProgressStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveProgressStore() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressStore));
    } catch {
      // Ignore storage quota errors
    }
  }

  function getRecipeProgress(recipeId) {
    if (!progressStore[recipeId]) {
      progressStore[recipeId] = { ingredients: {}, steps: {} };
    }
    return progressStore[recipeId];
  }

  // =========================================================================
  // Filtering & Grid Rendering
  // =========================================================================
  function getFilteredRecipes() {
    const query = filterState.search.trim().toLowerCase();

    return RECIPES.filter((recipe) => {
      if (filterState.category !== "all" && recipe.category !== filterState.category) {
        return false;
      }

      if (filterState.difficulty !== "all" && recipe.difficulty !== filterState.difficulty) {
        return false;
      }

      if (filterState.time === "quick" && recipe.totalMinutes > 30) {
        return false;
      }
      if (filterState.time === "medium" && (recipe.totalMinutes <= 30 || recipe.totalMinutes > 60)) {
        return false;
      }
      if (filterState.time === "long" && recipe.totalMinutes <= 60) {
        return false;
      }

      if (query) {
        const inTitle = recipe.title.toLowerCase().includes(query);
        const inExcerpt = recipe.excerpt.toLowerCase().includes(query);
        const inCategory = recipe.category.toLowerCase().includes(query);
        const inIngredients = recipe.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(query)
        );
        if (!inTitle && !inExcerpt && !inCategory && !inIngredients) {
          return false;
        }
      }

      return true;
    });
  }

  function hasActiveFilters() {
    return (
      filterState.search.trim() !== "" ||
      filterState.category !== "all" ||
      filterState.difficulty !== "all" ||
      filterState.time !== "all"
    );
  }

  function renderRecipeGrid() {
    const filtered = getFilteredRecipes();
    resultsCount.textContent = `顯示 ${filtered.length} 道食譜`;
    resetFiltersBtn.classList.toggle("hidden", !hasActiveFilters());

    if (filtered.length === 0) {
      recipeGrid.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");
    recipeGrid.innerHTML = filtered
      .map(
        (recipe) => `
        <article class="recipe-card" tabindex="0" role="button" aria-label="開啟食譜：${escapeHtml(recipe.title)}" data-recipe-id="${recipe.id}">
          <div class="card-image-wrap">
            <img src="${recipe.image}" alt="${escapeHtml(recipe.title)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'card-image-fallback\\'><span>🍽</span><span>${escapeHtml(recipe.title)}</span></div>'">
            <span class="card-category">${escapeHtml(recipe.category)}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">${escapeHtml(recipe.title)}</h3>
            <p class="card-excerpt">${escapeHtml(recipe.excerpt)}</p>
            <div class="card-meta">
              <span>⏱ ${recipe.totalMinutes} 分鐘</span>
              <span>✦ ${escapeHtml(recipe.difficulty)}</span>
              <span>${recipe.baseServings} 人份</span>
            </div>
          </div>
        </article>
      `
      )
      .join("");
  }

  function resetAllFilters() {
    filterState.search = "";
    filterState.category = "all";
    filterState.difficulty = "all";
    filterState.time = "all";

    searchInput.value = "";
    clearSearchBtn.classList.add("hidden");
    difficultyFilter.value = "all";
    timeFilter.value = "all";

    categoryPills.forEach((pill) => {
      const isAll = pill.dataset.category === "all";
      pill.classList.toggle("active", isAll);
      pill.setAttribute("aria-selected", isAll ? "true" : "false");
    });

    renderRecipeGrid();
  }

  // =========================================================================
  // Recipe Modal & Interactive Features
  // =========================================================================
  function openRecipeModal(recipeId) {
    const recipe = RECIPES.find((r) => r.id === recipeId);
    if (!recipe) return;

    activeRecipe = recipe;
    currentServings = recipe.baseServings;

    modalImg.src = recipe.image;
    modalImg.alt = recipe.title;
    modalCategory.textContent = recipe.category;
    modalTitle.textContent = recipe.title;
    modalStory.textContent = recipe.story;
    modalTime.textContent = `${recipe.totalMinutes} 分鐘`;
    modalDifficulty.textContent = recipe.difficulty;
    modalBaseServings.textContent = `${recipe.baseServings} 人份`;
    modalTipText.textContent = recipe.tip;

    updateScalerUI();
    renderModalIngredients();
    renderModalSteps();

    modalBackdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    modalScrollArea.scrollTop = 0;
  }

  function closeRecipeModal() {
    modalBackdrop.classList.add("hidden");
    document.body.style.overflow = "";
    activeRecipe = null;
  }

  function formatScaledAmount(baseAmount, unit) {
    if (baseAmount === null || baseAmount === undefined) {
      return unit || "適量";
    }
    const ratio = currentServings / activeRecipe.baseServings;
    const raw = baseAmount * ratio;
    const rounded = Math.round(raw * 100) / 100;

    // Format clean numbers (e.g. 1.5, 2, 0.25)
    const displayNum = Number.isInteger(rounded)
      ? String(rounded)
      : String(Number(rounded.toFixed(1)));

    return `${displayNum} ${unit}`;
  }

  function updateScalerUI() {
    if (!activeRecipe) return;
    servingsDisplay.textContent = `${currentServings} 人份`;
    servingsDecBtn.disabled = currentServings <= 1;
    servingsIncBtn.disabled = currentServings >= 12;
    servingsResetBtn.classList.toggle("hidden", currentServings === activeRecipe.baseServings);
  }

  function renderModalIngredients() {
    if (!activeRecipe) return;
    const prog = getRecipeProgress(activeRecipe.id);

    modalIngredients.innerHTML = activeRecipe.ingredients
      .map((ing, idx) => {
        const checked = Boolean(prog.ingredients[idx]);
        const amountText = formatScaledAmount(ing.amount, ing.unit);
        return `
          <li class="ingredient-item ${checked ? "checked" : ""}">
            <label>
              <span class="ingredient-left">
                <input type="checkbox" data-ing-index="${idx}" ${checked ? "checked" : ""}>
                <span>${escapeHtml(ing.name)}</span>
              </span>
              <span class="ingredient-amount">${escapeHtml(amountText)}</span>
            </label>
          </li>
        `;
      })
      .join("");

    updateIngredientProgress();
  }

  function updateIngredientProgress() {
    if (!activeRecipe) return;
    const total = activeRecipe.ingredients.length;
    const prog = getRecipeProgress(activeRecipe.id);
    const checkedCount = activeRecipe.ingredients.filter((_, idx) => prog.ingredients[idx]).length;
    ingredientProgress.textContent = `已備齊 ${checkedCount} / ${total}`;
  }

  function renderModalSteps() {
    if (!activeRecipe) return;
    const prog = getRecipeProgress(activeRecipe.id);

    modalSteps.innerHTML = activeRecipe.steps
      .map((step, idx) => {
        const completed = Boolean(prog.steps[idx]);
        const timerBtnHtml = step.timerSeconds
          ? `<button type="button" class="step-timer-btn" data-seconds="${step.timerSeconds}" data-label="${escapeHtml(step.timerLabel || `步驟 ${idx + 1}`)}">
               ⏱ 啟動 ${formatDurationLabel(step.timerSeconds)} 計時
             </button>`
          : "";

        return `
          <li class="step-card ${completed ? "completed" : ""}">
            <button type="button" class="step-check-btn" data-step-index="${idx}" aria-label="標記步驟 ${idx + 1} 完成" aria-pressed="${completed}">
              ${completed ? "✓" : idx + 1}
            </button>
            <div class="step-content">
              <p class="step-text">${escapeHtml(step.text)}</p>
              ${timerBtnHtml}
            </div>
          </li>
        `;
      })
      .join("");

    updateStepProgress();
  }

  function updateStepProgress() {
    if (!activeRecipe) return;
    const total = activeRecipe.steps.length;
    const prog = getRecipeProgress(activeRecipe.id);
    const doneCount = activeRecipe.steps.filter((_, idx) => prog.steps[idx]).length;
    stepProgress.textContent = `${doneCount} / ${total} 完成`;
  }

  function formatDurationLabel(seconds) {
    if (seconds < 60) return `${seconds} 秒`;
    const mins = Math.floor(seconds / 60);
    const rem = seconds % 60;
    return rem === 0 ? `${mins} 分鐘` : `${mins} 分 ${rem} 秒`;
  }

  // =========================================================================
  // Built-in Kitchen Timer + Web Audio Chime
  // =========================================================================
  function startTimer(seconds, label) {
    clearInterval(timerState.intervalId);
    timerState.initialSeconds = seconds;
    timerState.remainingSeconds = seconds;
    timerState.isRunning = true;
    timerState.isFinished = false;
    timerState.label = label;

    floatingTimer.classList.remove("hidden", "finished");
    timerLabelEl.textContent = label;
    updateTimerDisplay();
    timerToggleBtn.textContent = "暫停";

    timerState.intervalId = setInterval(tickTimer, 1000);
  }

  function tickTimer() {
    if (!timerState.isRunning) return;

    if (timerState.remainingSeconds > 0) {
      timerState.remainingSeconds -= 1;
      updateTimerDisplay();
    }

    if (timerState.remainingSeconds <= 0) {
      clearInterval(timerState.intervalId);
      timerState.isRunning = false;
      timerState.isFinished = true;
      floatingTimer.classList.add("finished");
      timerLabelEl.textContent = `時間到！${timerState.label}`;
      timerToggleBtn.textContent = "完成";
      playChime();
    }
  }

  function toggleTimer() {
    if (timerState.isFinished) {
      closeTimer();
      return;
    }

    timerState.isRunning = !timerState.isRunning;
    timerToggleBtn.textContent = timerState.isRunning ? "暫停" : "繼續";

    if (timerState.isRunning) {
      clearInterval(timerState.intervalId);
      timerState.intervalId = setInterval(tickTimer, 1000);
    }
  }

  function addOneMinute() {
    timerState.remainingSeconds += 60;
    if (timerState.isFinished) {
      timerState.isFinished = false;
      timerState.isRunning = true;
      floatingTimer.classList.remove("finished");
      timerLabelEl.textContent = timerState.label;
      timerToggleBtn.textContent = "暫停";
      clearInterval(timerState.intervalId);
      timerState.intervalId = setInterval(tickTimer, 1000);
    }
    updateTimerDisplay();
  }

  function resetTimer() {
    clearInterval(timerState.intervalId);
    timerState.remainingSeconds = timerState.initialSeconds;
    timerState.isRunning = false;
    timerState.isFinished = false;
    floatingTimer.classList.remove("finished");
    timerLabelEl.textContent = timerState.label;
    timerToggleBtn.textContent = "開始";
    updateTimerDisplay();
  }

  function closeTimer() {
    clearInterval(timerState.intervalId);
    timerState.isRunning = false;
    floatingTimer.classList.add("hidden");
  }

  function updateTimerDisplay() {
    const mins = Math.floor(timerState.remainingSeconds / 60);
    const secs = timerState.remainingSeconds % 60;
    timerDisplayEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function playChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 warm triad

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.16);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.16);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + i * 0.16 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.16 + 0.65);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.16);
        osc.stop(ctx.currentTime + i * 0.16 + 0.7);
      });
    } catch {
      // Audio playback blocked or unsupported
    }
  }

  // =========================================================================
  // Event Listeners
  // =========================================================================
  function bindEvents() {
    // Search input
    searchInput.addEventListener("input", (e) => {
      filterState.search = e.target.value;
      clearSearchBtn.classList.toggle("hidden", filterState.search === "");
      renderRecipeGrid();
    });

    clearSearchBtn.addEventListener("click", () => {
      filterState.search = "";
      searchInput.value = "";
      clearSearchBtn.classList.add("hidden");
      renderRecipeGrid();
      searchInput.focus();
    });

    // Category pills
    categoryPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        categoryPills.forEach((p) => {
          p.classList.remove("active");
          p.setAttribute("aria-selected", "false");
        });
        pill.classList.add("active");
        pill.setAttribute("aria-selected", "true");
        filterState.category = pill.dataset.category;
        renderRecipeGrid();
      });
    });

    // Select dropdowns
    difficultyFilter.addEventListener("change", (e) => {
      filterState.difficulty = e.target.value;
      renderRecipeGrid();
    });

    timeFilter.addEventListener("change", (e) => {
      filterState.time = e.target.value;
      renderRecipeGrid();
    });

    resetFiltersBtn.addEventListener("click", resetAllFilters);
    emptyResetBtn.addEventListener("click", resetAllFilters);

    // Open recipe from Hero or Grid
    heroOpenBtn.addEventListener("click", () => {
      openRecipeModal(heroOpenBtn.dataset.recipeId);
    });

    recipeGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".recipe-card");
      if (card) {
        openRecipeModal(card.dataset.recipeId);
      }
    });

    recipeGrid.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const card = e.target.closest(".recipe-card");
        if (card) {
          e.preventDefault();
          openRecipeModal(card.dataset.recipeId);
        }
      }
    });

    // Modal close
    modalCloseBtn.addEventListener("click", closeRecipeModal);
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeRecipeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modalBackdrop.classList.contains("hidden")) {
        closeRecipeModal();
      }
    });

    // Servings scaler
    servingsDecBtn.addEventListener("click", () => {
      if (currentServings > 1) {
        currentServings -= 1;
        updateScalerUI();
        renderModalIngredients();
      }
    });

    servingsIncBtn.addEventListener("click", () => {
      if (currentServings < 12) {
        currentServings += 1;
        updateScalerUI();
        renderModalIngredients();
      }
    });

    servingsResetBtn.addEventListener("click", () => {
      if (!activeRecipe) return;
      currentServings = activeRecipe.baseServings;
      updateScalerUI();
      renderModalIngredients();
    });

    // Ingredient checklist delegation
    modalIngredients.addEventListener("change", (e) => {
      if (!activeRecipe || e.target.type !== "checkbox") return;
      const idx = e.target.dataset.ingIndex;
      const prog = getRecipeProgress(activeRecipe.id);
      prog.ingredients[idx] = e.target.checked;
      saveProgressStore();

      e.target.closest(".ingredient-item").classList.toggle("checked", e.target.checked);
      updateIngredientProgress();
    });

    // Steps checklist & step timer delegation
    modalSteps.addEventListener("click", (e) => {
      if (!activeRecipe) return;

      const checkBtn = e.target.closest(".step-check-btn");
      if (checkBtn) {
        const idx = checkBtn.dataset.stepIndex;
        const prog = getRecipeProgress(activeRecipe.id);
        const nextVal = !prog.steps[idx];
        prog.steps[idx] = nextVal;
        saveProgressStore();

        const card = checkBtn.closest(".step-card");
        card.classList.toggle("completed", nextVal);
        checkBtn.setAttribute("aria-pressed", String(nextVal));
        checkBtn.textContent = nextVal ? "✓" : String(Number(idx) + 1);
        updateStepProgress();
        return;
      }

      const timerBtn = e.target.closest(".step-timer-btn");
      if (timerBtn) {
        const secs = Number(timerBtn.dataset.seconds);
        const label = timerBtn.dataset.label;
        startTimer(secs, label);
      }
    });

    // Floating timer controls
    timerToggleBtn.addEventListener("click", toggleTimer);
    timerAddMinBtn.addEventListener("click", addOneMinute);
    timerResetBtn.addEventListener("click", resetTimer);
    timerCloseBtn.addEventListener("click", closeTimer);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  init();
})();
