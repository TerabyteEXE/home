/* ============================================================
   Shared site behaviour. No frameworks, no build step.
   Safe to include on every page — each part checks the DOM
   for what it needs before doing anything.
   ============================================================ */

(function () {
  "use strict";

  var STORAGE_KEY = "site-theme";
  var POPUP_STORAGE_KEY = "welcome-popup-seen";
  var THEME_NAMES = {
    "tokyo-night": "Tokyo Night",
    "catppuccin": "Catppuccin",
    "gruvbox": "Gruvbox",
    "nord": "Nord",
    "everforest": "Everforest",
    "kanagawa": "Kanagawa"
  };

  /* ---- Theme switcher ------------------------------------------------ */

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    document.querySelectorAll(".swatch").forEach(function (btn) {
      var isActive = btn.dataset.theme === theme;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    var label = document.querySelector("[data-theme-label]");
    if (label) label.textContent = THEME_NAMES[theme] || theme;
  }

  function initThemeSwitcher() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* localStorage can be unavailable (private mode, blocked cookies) */
    }
    applyTheme(saved && THEME_NAMES[saved] ? saved : "tokyo-night");

    document.querySelectorAll(".swatch").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var theme = btn.dataset.theme;
        applyTheme(theme);
        try {
          localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
          /* ignore — theme just won't persist across visits */
        }
      });
    });
  }

  /* ---- Mobile nav toggle ---------------------------------------------- */

  function initNavToggle() {
    var toggle = document.querySelector(".bar-toggle");
    var bar = document.querySelector(".bar");
    if (!toggle || !bar) return;

    toggle.addEventListener("click", function () {
      var isOpen = bar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* ---- Live clock -------------------------------------------------------- */

  function initClock() {
    var clock = document.querySelector("[data-clock]");
    if (!clock) return;

    function tick() {
      var now = new Date();
      var h = String(now.getHours()).padStart(2, "0");
      var m = String(now.getMinutes()).padStart(2, "0");
      clock.textContent = h + ":" + m;
    }
    tick();
    setInterval(tick, 15000);
  }

  /* ---- Photo lightbox ------------------------------------------------------ */

  function initLightbox() {
    var lightbox = document.querySelector("[data-lightbox]");
    if (!lightbox) return;

    var frame = lightbox.querySelector("[data-lightbox-frame]");
    var caption = lightbox.querySelector("[data-lightbox-caption]");
    var closeBtn = lightbox.querySelector("[data-lightbox-close]");

    function open(card) {
      var iconHTML = card.querySelector(".photo-frame").innerHTML;
      var text = card.querySelector(".photo-caption").textContent;
      frame.innerHTML = iconHTML;
      caption.textContent = text;
      lightbox.classList.add("is-open");
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove("is-open");
    }

    document.querySelectorAll(".photo-card").forEach(function (card) {
      card.addEventListener("click", function () { open(card); });
    });

    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---- Welcome popup ------------------------------------------------------ */

  function initWelcomePopup() {
    var popup = document.querySelector("[data-welcome-popup]");
    if (!popup) return;

    var hasSeenPopup = false;
    try {
      hasSeenPopup = localStorage.getItem(POPUP_STORAGE_KEY) === "true";
    } catch (e) {
      /* localStorage unavailable */
    }

    if (!hasSeenPopup) {
      popup.classList.add("is-open");
      try {
        localStorage.setItem(POPUP_STORAGE_KEY, "true");
      } catch (e) {
        /* ignore — popup will show again next visit */
      }
    }

    var closeBtn = popup.querySelector("[data-popup-close]");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        popup.classList.remove("is-open");
      });
    }

    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        popup.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && popup.classList.contains("is-open")) {
        popup.classList.remove("is-open");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initThemeSwitcher();
    initNavToggle();
    initClock();
    initLightbox();
    initWelcomePopup();
  });
})();
