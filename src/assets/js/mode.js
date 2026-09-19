// AIM Lab - Science/Art mode toggle + hamburger menu.
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

  // Hamburger menu - opens whichever menu matches the current mode.
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


// Project and art pages: every image (the hero and the body figures) enlarges
// on click. The page's <article class="proj"> becomes the gallery and each image
// a gallery item, paired with the [data-lightbox="work"] box that work-body.njk
// renders; the generic gallery code below then wires it up. Images inside links
// and any video are left alone.
(function () {
  var page = document.querySelector(".proj");
  if (!page || !document.querySelector('[data-lightbox="work"]')) return;
  var imgs = Array.prototype.slice.call(page.querySelectorAll(".proj__hero img, .proj__body img"))
    .filter(function (img) { return !img.closest("a"); });
  if (!imgs.length) return;
  page.setAttribute("data-gallery", "work");
  imgs.forEach(function (img) {
    var fig = img.closest("figure");
    var cap = fig && fig.querySelector("figcaption");
    img.setAttribute("data-gallery-item", "");
    img.dataset.src = img.currentSrc || img.src;
    img.dataset.caption = cap ? cap.textContent.trim() : (img.alt || "");
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

  // Sample each panel image to decide light vs dark chrome: the top quarter
  // drives the header (data-bg), the bottom quarter drives the frosted
  // bottom band (data-bg-bottom).
  panels.forEach(function (panel) {
    var m = (panel.getAttribute("style") || "").match(/url\(['"]?([^'")]+)['"]?\)/);
    if (!m) { panel.dataset.bg = "dark"; panel.dataset.bgBottom = "dark"; return; }
    var img = new Image();
    img.onload = function () {
      try {
        var c = document.createElement("canvas");
        c.width = 32; c.height = 8;
        var ctx = c.getContext("2d");
        var quarter = img.naturalHeight / 4;
        function grade(srcY) {
          ctx.drawImage(img, 0, srcY, img.naturalWidth, quarter, 0, 0, 32, 8);
          var d = ctx.getImageData(0, 0, 32, 8).data, sum = 0;
          for (var i = 0; i < d.length; i += 4) sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
          return (sum / (d.length / 4)) > 128 ? "light" : "dark";
        }
        panel.dataset.bg = grade(0);
        panel.dataset.bgBottom = grade(img.naturalHeight - quarter);
      } catch (e) { panel.dataset.bg = "dark"; panel.dataset.bgBottom = "dark"; }
      deckUpdate();
    };
    img.onerror = function () { panel.dataset.bg = "dark"; panel.dataset.bgBottom = "dark"; deckUpdate(); };
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
  // rAF does not fire while the tab is hidden; if a scroll landed then, the
  // dticking latch would stick. Reset it when the page becomes visible.
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) { dticking = false; deckUpdate(); }
  });
  deckApply();
})();




// Deck videos load on demand. The first panel's clip carries the autoplay
// attribute. Every other clip (preload="none", data-deck-lazy) is handled by
// two observers on its deck: one screen ahead it is marked autoplay and told to
// load, so the download starts early and WebKit treats it as an autoplaying
// video (which it starts only once visible); when its panel is actually on
// screen play() is called, and when the panel leaves the screen it pauses.
// Playing is never attempted on an off-screen clip: Safari refuses that and
// then shows a play button instead. Loading ahead starts once the first clip
// can play (or after 2.5 s), so it has the connection to itself at first.
(function () {
  var all = Array.prototype.slice.call(document.querySelectorAll(".deck__video"));
  var lazy = all.filter(function (v) { return v.hasAttribute("data-deck-lazy"); });
  if (!lazy.length) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  function load(v) {
    if (v.preload === "auto") return;
    v.autoplay = true;
    v.preload = "auto";
    v.load();
  }
  function play(v) {
    load(v);
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  if (!("IntersectionObserver" in window)) { lazy.forEach(play); return; }
  var observers = {};
  function observe(kind, margin, v, onEnter, onLeave) {
    var deck = v.closest(".deck");
    var key = kind + ":" + (deck ? deck.className : "root");
    if (!observers[key]) {
      observers[key] = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          // A zero-area intersection means the deck is not laid out (display:none
          // mode deck, or a hidden tab): do nothing for it.
          var r = e.intersectionRect;
          var visible = e.isIntersecting && r && r.width > 0 && r.height > 0;
          if (visible) onEnter(e.target);
          else if (onLeave) onLeave(e.target);
        });
      }, { root: deck, rootMargin: margin, threshold: 0 });
    }
    observers[key].observe(v);
  }
  // On screen: play (this also resumes the first clip after scrolling back up).
  all.forEach(function (v) { observe("play", "0px", v, play, function (x) { x.pause(); }); });
  // One screen ahead: start the download.
  var armed = false;
  function arm() {
    if (armed) return;
    armed = true;
    lazy.forEach(function (v) { observe("load", "100% 0px", v, load, null); });
  }
  var first = all.filter(function (v) { return !v.hasAttribute("data-deck-lazy"); })[0];
  if (first && first.readyState < 3) {
    first.addEventListener("canplay", arm, { once: true });
    setTimeout(arm, 2500);
  } else {
    arm();
  }
})();


// External links open in a new tab. Runs over every anchor with an absolute
// URL; anything pointing off-host gets target="_blank" + rel="noopener"
// (covers content-authored links in news titles, project bodies, alumni
// statuses, etc., which templates cannot easily annotate).
(function () {
  var host = window.location.host;
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    if (a.host === host) return;
    a.target = "_blank";
    if (!/\bnoopener\b/.test(a.rel)) a.rel = (a.rel ? a.rel + " " : "") + "noopener";
  });
})();


// Research grid: hovering a card plays that project's homepage clip inside
// the card (preload=metadata, so nothing downloads until the pointer arrives).
// The video is revealed only once it is playing, and rewinds when the pointer
// leaves. Touch devices simply keep the still.
(function () {
  document.querySelectorAll(".research-card").forEach(function (card) {
    var v = card.querySelector(".research-card__video");
    if (!v) return;
    v.addEventListener("playing", function () {
      v.classList.add("is-playing");
      card.classList.add("is-playing");
    });
    card.addEventListener("mouseenter", function () {
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    });
    card.addEventListener("mouseleave", function () {
      v.pause();
      v.classList.remove("is-playing");
      card.classList.remove("is-playing");
      try { v.currentTime = 0; } catch (e) {}
    });
  });
})();
