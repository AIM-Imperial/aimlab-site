// The moving drawing behind the homepage title (index.njk: the canvas
// .deck__motion on each deck's title panel). The drawings are the other
// scripts in this folder, each a background version of a viewer in the folder
// above: flasher-origami.js (flasher-origami.html), knit.js (knit-viewer.html)
// and bistable-auxetics.js (bistable-auxetics.html). Each registers itself in
// window.deckDrawings before this script runs; one is picked at random for each
// visit, and ?bg=<name> asks for one (/?bg=knit, /?bg=flasher-origami,
// /?bg=bistable-auxetics). If the one picked cannot run here (knit.js needs
// WebGL), the next is tried.
//
// A drawing is a function (canvas, panel) that returns null, when it cannot
// run, or an object with size(w, h, dpr), recolour(palette) and draw(t), t in
// seconds from the first frame; draw leaves the canvas alone when the picture
// has not changed. palette.grey(n) is the palette's --grey-n on this panel and
// palette.night whether the dark scheme is in force; each drawing picks its
// own greys. This script sizes the canvas, passes the palette on, and runs the
// loop while the title panel is on screen.
//
// The CSS line drawing of the panel (.deck__panel--intro::before) is hidden
// while a drawing runs (class is-motion on the panel) and stands otherwise:
// without JavaScript, for visitors who ask for less motion, and where no
// drawing can start.
//
// The introduction (site.css, "The introduction"): with <html> marked
// deck-intro by the head script of base.njk, this script marks it intro-run
// once a drawing is set up (base.njk shows everything at once if that has not
// happened by the time the page has loaded), intro-open at the drawing's first
// frame, which starts the writing of the name and brings in the menu, and
// intro-written WRITE seconds later, which brings in the scroll hint.
(function () {
  "use strict";
  var WRITE = 3.4;                   // seconds from the first frame to the scroll hint: the name is written by then (site.css)

  var drawings = window.deckDrawings || {}, names = Object.keys(drawings);
  var canvases = Array.prototype.slice.call(document.querySelectorAll(".deck__motion"));
  if (!canvases.length || !names.length) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var asked = /[?&]bg=([\w-]+)/.exec(location.search);
  var pick = asked && drawings[asked[1]] ? asked[1] : names[Math.floor(Math.random() * names.length)];
  var order = [pick].concat(names.filter(function (n) { return n !== pick; }));

  var html = document.documentElement, intro = html.classList.contains("deck-intro");
  var dark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var t0 = -1;                       // the first frame, shared by the decks' title panels
  function stage(t) {                // the introduction's marks on <html>, once each
    if (!intro) return;
    if (!html.classList.contains("intro-open")) html.classList.add("intro-open");
    if (t >= WRITE && !html.classList.contains("intro-written")) html.classList.add("intro-written");
  }

  canvases.forEach(function (canvas) {
    var panel = canvas.closest(".deck__panel"), deck = canvas.closest(".deck");
    if (!panel || !deck) return;
    var d = null;
    for (var i = 0; i < order.length && !d; i++) {
      try { d = drawings[order[i]](canvas, panel); } catch (e) { d = null; }
      if (d) panel.setAttribute("data-drawing", order[i]);       // which one runs, for reference
    }
    if (!d) return;
    var raf = 0, resized = false, recolour = false;

    function palette() {   // the greys of the palette in force on this panel (the mode's and the scheme's)
      var cs = getComputedStyle(panel);
      return { night: !!(dark && dark.matches), grey: function (n) { return cs.getPropertyValue("--grey-" + n).trim(); } };
    }
    function fit() {
      var w = panel.clientWidth, h = panel.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      d.size(w, h, dpr);
    }
    function frame(now) {
      raf = requestAnimationFrame(frame);
      // A page opened in a background tab gets its first frame when the tab is
      // shown: the drawing and the introduction start then, not before.
      if (t0 < 0) t0 = now;
      var t = (now - t0) / 1000;
      stage(t);
      // A new scheme's colours are read at the next frame, once its styles apply.
      if (recolour) { recolour = false; d.recolour(palette()); }
      if (resized) { resized = false; fit(); }
      d.draw(t);
    }
    function start() { if (!raf) raf = requestAnimationFrame(frame); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

    fit(); d.recolour(palette()); d.draw(0);
    panel.classList.add("is-motion");
    if (intro) html.classList.add("intro-run");
    if (dark) dark.addEventListener("change", function () { recolour = true; });
    if ("ResizeObserver" in window) new ResizeObserver(function () { resized = true; }).observe(panel);
    else window.addEventListener("resize", function () { resized = true; });
    // Run while the panel is on the deck's screen (5% or more, as the clips),
    // and not while it is scrolled away or the deck is the other mode's.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && e.intersectionRatio >= 0.05 && deck.clientHeight > 0) start(); else stop();
        });
      }, { root: deck, threshold: [0, 0.05] }).observe(canvas);
    } else {
      start();
    }
  });
})();
