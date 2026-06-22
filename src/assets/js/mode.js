// AIM Lab — Science/Art mode toggle + hamburger menu.
// Mode persists in localStorage so visitors stay in the mode they chose.
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll(".mode-toggle__btn");

  // Apply a mode to the current page (visual only). `persist` saves the choice.
  function applyMode(mode, persist) {
    if (mode !== "research" && mode !== "gallery") mode = "research";
    root.setAttribute("data-mode", mode);
    if (persist) { try { localStorage.setItem("aim-mode", mode); } catch (e) {} }
    buttons.forEach(function (b) {
      var on = b.dataset.mode === mode;
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  // Sync the toggle on load WITHOUT persisting, so forced-mode pages (art) don't
  // overwrite the visitor's saved preference.
  applyMode(root.getAttribute("data-mode") || "research", false);

  // Clicking the toggle switches mode AND goes to that mode's home page.
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var mode = b.dataset.mode;
      applyMode(mode, true);           // save the chosen mode
      window.location.href = "/";      // both modes share the homepage; it boots into the saved mode
    });
  });

  // Hamburger menu — opens whichever menu matches the current mode.
  var menuBtn = document.querySelector(".menu-btn");

  function activeMenu() {
    var mode = root.getAttribute("data-mode") || "research";
    var sel = mode === "gallery" ? ".site-menu--gallery" : ".site-menu--research";
    return document.querySelector(sel);
  }

  if (menuBtn) {
    function setMenu(open) {
      var menu = activeMenu();
      if (!menu) return;
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.classList.toggle("is-open", open);
      if (open) {
        menu.hidden = false;
        requestAnimationFrame(function () { menu.classList.add("is-open"); });
      } else {
        menu.classList.remove("is-open");
        menu.addEventListener("transitionend", function handler() {
          menu.hidden = true;
          menu.removeEventListener("transitionend", handler);
        });
      }
    }

    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") === "true";
      setMenu(!open);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuBtn.focus();
      }
    });

    // If the mode changes while the menu is open, close it (the other menu applies).
    document.querySelectorAll(".mode-toggle__btn").forEach(function (b) {
      b.addEventListener("click", function () {
        if (menuBtn.getAttribute("aria-expanded") === "true") setMenu(false);
      });
    });
  }
})();


// Theme filter for card grids. Each .filter-bar filters the cards in its paired
// grid. Research (research page) and Art (homepage gallery) each get their own,
// independently. A bar with data-filter-bar="x" pairs to a grid with
// data-filter-grid="x"; otherwise it filters all .research-card / .art-card[data-tags].
(function () {
  var bars = Array.prototype.slice.call(document.querySelectorAll(".filter-bar"));
  bars.forEach(function (bar) {
    var key = bar.getAttribute("data-filter-bar");
    var scope = key ? document.querySelector('[data-filter-grid="' + key + '"]') : document;
    if (!scope) return;
    var cards = Array.prototype.slice.call(scope.querySelectorAll(".research-card[data-tags], .art-card[data-tags]"));
    if (!cards.length) return;
    var buttons = bar.querySelectorAll(".filter-btn");

    function applyFilter(filter) {
      buttons.forEach(function (b) {
        b.classList.toggle("is-active", b.dataset.filter === filter);
      });
      cards.forEach(function (card) {
        if (filter === "all") {
          card.hidden = false;
        } else {
          var tags = (card.dataset.tags || "").split("|");
          card.hidden = tags.indexOf(filter) === -1;
        }
      });
    }

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      applyFilter(btn.dataset.filter);
    });

    // Deep link: ?tag=Textiles activates a matching filter on load.
    var requested = new URLSearchParams(window.location.search).get("tag");
    if (requested) {
      var valid = Array.prototype.some.call(buttons, function (b) {
        return b.dataset.filter === requested;
      });
      if (valid) applyFilter(requested);
    }
  });
})();


// Image galleries with a click-to-enlarge lightbox (used by the People album
// and the Publications cover gallery). Each [data-gallery] block pairs with a
// [data-lightbox] of the same data-gallery / data-lightbox id. No-op if absent.
(function () {
  var galleries = Array.prototype.slice.call(document.querySelectorAll("[data-gallery]"));
  galleries.forEach(function (gallery) {
    var id = gallery.getAttribute("data-gallery");
    var box = document.querySelector('[data-lightbox="' + id + '"]');
    var items = Array.prototype.slice.call(gallery.querySelectorAll("[data-gallery-item]"));
    if (!box || !items.length) return;

    var img = box.querySelector("[data-lightbox-img]");
    var caption = box.querySelector("[data-lightbox-caption]");
    var current = 0;

    function render() {
      var el = items[current];
      img.src = el.dataset.src;
      img.alt = el.dataset.caption || "";
      caption.textContent = el.dataset.caption || "";
    }
    function open(i) {
      current = (i + items.length) % items.length;
      render();
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
    }
    function close() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
    }
    function step(d) { current = (current + d + items.length) % items.length; render(); }

    items.forEach(function (el, i) {
      el.addEventListener("click", function () { open(i); });
    });
    box.querySelector("[data-lightbox-close]").addEventListener("click", close);
    box.querySelector("[data-lightbox-prev]").addEventListener("click", function (e) { e.stopPropagation(); step(-1); });
    box.querySelector("[data-lightbox-next]").addEventListener("click", function (e) { e.stopPropagation(); step(1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });
  });
})();


// Header on the deck homepage: full on the first panel, shrinking to the compact
// row from the second panel on, with the logo color chosen from the brightness of
// the panel in view. Every other page renders the compact header directly (set in
// base.njk), so it needs no JS here.
(function () {
  var header = document.querySelector(".site-header");
  if (!header || !document.body.classList.contains("is-deck")) return;

  var decks = Array.prototype.slice.call(document.querySelectorAll(".deck"));
  var deck = decks.filter(function (d) { return d.clientHeight > 0; })[0] || decks[0];
  if (!deck) return;
  var panels = Array.prototype.slice.call(deck.querySelectorAll(".deck__panel"));

  // Sample the top band of each panel image to decide light vs dark.
  panels.forEach(function (panel) {
    var m = (panel.getAttribute("style") || "").match(/url\(['"]?([^'")]+)['"]?\)/);
    if (!m) { panel.dataset.bg = "dark"; return; }
    var img = new Image();
    img.onload = function () {
      try {
        var c = document.createElement("canvas");
        c.width = 32; c.height = 8;
        var ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight / 4, 0, 0, 32, 8);
        var d = ctx.getImageData(0, 0, 32, 8).data, sum = 0;
        for (var i = 0; i < d.length; i += 4) sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
        panel.dataset.bg = (sum / (d.length / 4)) > 128 ? "light" : "dark";
      } catch (e) { panel.dataset.bg = "dark"; }
      deckUpdate();
    };
    img.onerror = function () { panel.dataset.bg = "dark"; deckUpdate(); };
    img.src = m[1];
  });

  var dticking = false;
  function deckApply() {
    dticking = false;
    var h = deck.clientHeight || 1;
    var i = Math.round(deck.scrollTop / h);
    i = Math.max(0, Math.min(panels.length - 1, i));
    header.classList.toggle("site-header--compact", i > 0);
    var bg = panels[i].dataset.bg || "dark";
    header.classList.toggle("site-header--on-light", bg === "light");
    header.classList.toggle("site-header--on-dark", bg === "dark");
  }
  function deckUpdate() {
    if (!dticking) { dticking = true; requestAnimationFrame(deckApply); }
  }
  deck.addEventListener("scroll", deckUpdate, { passive: true });
  deckApply();
})();


// Hero videos play only while on screen: in view they run (muted, looping),
// scrolled away they pause. Respects the user's reduced-motion preference.
(function () {
  var vids = document.querySelectorAll("[data-hero-video]");
  if (!vids.length) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) {
    vids.forEach(function (v) { v.play().catch(function () {}); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.play().catch(function () {});
      else e.target.pause();
    });
  }, { threshold: 0.35 });
  vids.forEach(function (v) { io.observe(v); });
})();


// Infinite horizontal strips (homepage research and art). The cards are
// rendered twice; whenever the scroll position drifts out of the middle
// period, jump it back by exactly one period (the copies are identical, so
// the jump is invisible).
(function () {
  document.querySelectorAll("[data-infinite]").forEach(function (scroller) {
    var cards = scroller.children.length;
    if (cards < 2 || cards % 2 !== 0) return;
    if (scroller.clientWidth === 0) return; // hidden pane (other mode)

    // Period = width of one full set, including the gap that follows each card.
    function period() {
      var gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
      return (scroller.scrollWidth + gap) / 2;
    }

    function wrap() {
      var p = period();
      if (scroller.scrollLeft < p * 0.5) scroller.scrollLeft += p;
      else if (scroller.scrollLeft > p * 1.5) scroller.scrollLeft -= p;
    }

    // Start with the first project centered (a snap position): the last card
    // peeks in from the left, the second from the right, and the loop reads
    // as endless from the start.
    var firstOfSecondCopy = scroller.children[cards / 2];
    scroller.scrollLeft = firstOfSecondCopy.offsetLeft
      - (scroller.clientWidth - firstOfSecondCopy.offsetWidth) / 2;
    scroller.addEventListener("scroll", wrap, { passive: true });
  });
})();
