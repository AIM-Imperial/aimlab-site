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

    // Deep link: ?tag=Entanglement activates a matching filter on load.
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

  // Sample each panel's still to decide light vs dark chrome: the top quarter
  // drives the header (data-bg), the bottom quarter the frosted bottom band
  // (data-bg-bottom), and the central square (what the stacked layout shows)
  // the panel's tone (data-tone), which that layout uses to fill the panel
  // around the square.
  panels.forEach(function (panel) {
    var still = panel.querySelector(".deck__still");
    var src = still && (still.currentSrc || still.getAttribute("src"));
    if (!src) { panel.dataset.bg = "dark"; panel.dataset.bgBottom = "dark"; return; }
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
        var side = Math.min(img.naturalWidth, img.naturalHeight);
        ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, 32, 8);
        var d = ctx.getImageData(0, 0, 32, 8).data, sum = 0;
        for (var i = 0; i < d.length; i += 4) sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
        panel.dataset.tone = (sum / (d.length / 4)) > 128 ? "light" : "dark";
      } catch (e) { panel.dataset.bg = "dark"; panel.dataset.bgBottom = "dark"; panel.dataset.tone = "dark"; }
      deckUpdate();
    };
    img.onerror = function () { panel.dataset.bg = "dark"; panel.dataset.bgBottom = "dark"; panel.dataset.tone = "dark"; deckUpdate(); };
    img.src = src;
  });

  // Stacked layout (narrow screens, see the CSS): the panels are padded by the header's
  // height so the media centres in the space beneath it. Both header heights
  // are measured, full (first panel) and compact (the rest), at load, when the
  // display font has loaded, and on resize.
  function measure() {
    var wasCompact = header.classList.contains("site-header--compact");
    header.classList.remove("site-header--compact");
    var full = header.offsetHeight;
    header.classList.add("site-header--compact");
    var compact = header.offsetHeight;
    header.classList.toggle("site-header--compact", wasCompact);
    deck.style.setProperty("--deck-top-first", full + "px");
    deck.style.setProperty("--deck-top", compact + "px");
    // Each panel's title band, so the square can be capped by the space left.
    panels.forEach(function (panel) {
      var band = panel.querySelector(".deck__text");
      if (band) panel.style.setProperty("--deck-band", band.offsetHeight + "px");
    });
  }
  measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  window.addEventListener("resize", function () { measure(); deckUpdate(); });

  // In the stacked (narrow-screen) layout the header sits on the page ground,
  // not on the image, so its chrome follows the ground's tone (light or dark).
  function groundTone() {
    var m = (getComputedStyle(document.body).backgroundColor || "").match(/\d+/g);
    if (!m) return "light";
    return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) > 128 ? "light" : "dark";
  }

  var dticking = false;
  function deckApply() {
    dticking = false;
    var h = deck.clientHeight || 1;
    var i = Math.round(deck.scrollTop / h);
    i = Math.max(0, Math.min(panels.length - 1, i));
    header.classList.toggle("site-header--compact", i > 0);
    var stacked = getComputedStyle(deck).getPropertyValue("--deck-layout").trim() === "stacked";
    // The title panel (i = 0) has no image: the header sits on the page ground.
    // In the stacked layout the header sits on the panel's fill, which follows
    // the clip's tone (data-tone) once the still has been sampled.
    var bg = i === 0 ? groundTone() : stacked ? (panels[i].dataset.tone || groundTone()) : (panels[i].dataset.bg || "dark");
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




// Deck videos. Every clip is preload="none" in the markup and carries no
// autoplay attribute. When a clip's panel comes within one screen, the clip is
// loaded and marked for autoplay: WebKit (Safari) then starts it by itself the
// moment its panel becomes visible, which is the one path Safari has been seen
// to honour inside this scrolling deck (a clip that is on screen from the very
// first paint never gets that "becomes visible" moment, which is why the title
// panel carries no clip). The script also plays a clip as its panel comes on
// screen, for the engines that do not autoplay off-screen clips, and pauses it
// as the panel leaves. A clip on screen that the browser stopped (hidden tab,
// page restored from the back/forward cache) is resumed. Add ?deckdebug to the
// address to trace this in the console.
(function () {
  var all = Array.prototype.slice.call(document.querySelectorAll(".deck__video"));
  if (!all.length) return;
  var debug = /\bdeckdebug\b/.test(location.search);
  function dbg() { if (debug) console.log.apply(console, ["[deck " + (performance.now() / 1000).toFixed(2) + "s]"].concat(Array.prototype.slice.call(arguments))); }
  function name(v) { return v.src.split("/").slice(-2)[0]; }
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;   // the CSS hides the clips

  function load(v) {
    if (!v.hasAttribute("data-deck-lazy")) return;
    v.removeAttribute("data-deck-lazy");
    v.autoplay = true;      // WebKit starts it itself once its panel is visible
    v.preload = "auto";
    v.load();
    dbg("load", name(v));
  }
  function play(v) {
    load(v);
    if (!v.paused) return;
    dbg("play", name(v), "readyState", v.readyState);
    var p = v.play();
    if (p && p.catch) p.catch(function (err) { dbg("play refused", name(v) + ":", err && err.name, err && err.message); });
  }
  function pause(v) { if (!v.paused) { dbg("pause", name(v)); v.pause(); } }
  // At least 5% of the clip's panel is on the deck's screen (geometry).
  function onScreen(v, deck) {
    var r = v.getBoundingClientRect(), d = deck.getBoundingClientRect();
    var overlap = Math.min(r.bottom, d.bottom) - Math.max(r.top, d.top);
    return r.height > 0 && overlap / r.height >= 0.05;
  }

  var decks = Array.prototype.slice.call(document.querySelectorAll(".deck"));
  if (!("IntersectionObserver" in window)) {   // very old browsers: the first clip of each deck only
    decks.forEach(function (deck) { var v = all.filter(function (x) { return deck.contains(x); })[0]; if (v) play(v); });
    return;
  }
  decks.forEach(function (deck) {
    var vids = all.filter(function (v) { return deck.contains(v); });
    if (!vids.length) return;
    // On screen (5% or more of the clip): play. Off screen: pause. The panels
    // touch edge to edge, so a departed panel still counts as intersecting at
    // a threshold of zero and its exit would never be reported; 5% is the
    // threshold as well as the definition. A deck that is not displayed (the
    // other mode) has no height and is left alone.
    var watch = new IntersectionObserver(function (entries) {
      if (deck.clientHeight === 0) return;
      entries.forEach(function (e) {
        var visible = e.isIntersecting && e.intersectionRatio >= 0.05;
        dbg("observer:", name(e.target), visible ? "on screen" : "off screen", "ratio", e.intersectionRatio.toFixed(2));
        if (visible) play(e.target); else pause(e.target);
      });
    }, { root: deck, threshold: [0, 0.05] });
    vids.forEach(function (v) { watch.observe(v); });
    // One screen ahead: load and mark for autoplay. The margin extends the root
    // by one screen; a panel merely touching that edge has a zero-height
    // intersection and is two screens away, so it is skipped, and the second
    // threshold makes sure its arrival inside the margin is reported (at a
    // threshold of zero alone, edge contact and arrival look the same).
    var ahead = new IntersectionObserver(function (entries) {
      if (deck.clientHeight === 0) return;
      entries.forEach(function (e) { if (e.isIntersecting && e.intersectionRect.height > 0) load(e.target); });
    }, { root: deck, rootMargin: "100% 0px", threshold: [0, 0.01] });
    vids.forEach(function (v) { ahead.observe(v); });
  });

  function resume(why) {
    if (document.hidden) return;
    all.forEach(function (v) {
      var deck = v.closest(".deck");
      if (deck && deck.clientHeight > 0 && onScreen(v, deck) && v.paused) { dbg("resume after", why, name(v)); play(v); }
    });
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden) resume("the tab became visible"); });
  window.addEventListener("pageshow", function (e) { if (e.persisted) resume("the page was restored"); });
  dbg("deck script ready:", all.length, "clips");
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
