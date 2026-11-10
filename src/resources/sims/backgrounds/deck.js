// The moving drawing behind the homepage title (index.njk: the canvas
// .deck__motion on each deck's title panel). The drawings are the other
// scripts in this folder, each a background version of a viewer in the folder
// above, drawn with that viewer's own geometry from its core script there:
// flasher-origami.js (flasher-origami.html, flasher-origami-core.js), knit.js
// (knit-viewer.html, knit-core.js), bistable-auxetics.js
// (bistable-auxetics.html, bistable-auxetics-core.js) and weave.js
// (weave-viewer.html, weave-core.js). One is picked at random for each visit,
// and ?bg=<name> asks for one (/?bg=knit, /?bg=flasher-origami,
// /?bg=bistable-auxetics, /?bg=weave); only that one's two scripts are loaded.
// If it cannot run here (knit.js and weave.js need WebGL), the next is tried.
//
// A drawing script registers a function in window.deckDrawings under its name:
// (canvas, panel) -> null, when it cannot run, or an object with size(w, h, dpr),
// recolour(palette) and draw(t), t in seconds from the first frame; draw leaves
// the canvas alone when the picture has not changed. palette.grey(n) is the
// palette's --grey-n on this panel, palette.rgb(n) the same as [r, g, b] in
// 0..1, and palette.night whether the dark scheme is in force; each drawing
// picks its own greys. This script sizes the canvas,
// passes the palette on, and runs the loop while the title panel is on screen.
//
// The CSS line drawing of the panel (.deck__panel--intro::before) stands where
// no drawing runs: without JavaScript, for visitors who ask for less motion,
// where no drawing can start, and if the knit's WebGL context is lost. The
// deck-intro mark on <html>, set by the head script of base.njk when motion is
// allowed, keeps it out of the way from the first paint, so its image is never
// fetched for nothing; this script takes the mark off when it has no drawing.
//
// The introduction (site.css, "The introduction"): with <html> marked
// deck-intro, this script marks it intro-run as soon as it takes charge
// (base.njk shows everything at once if that has not happened by the time the
// page has loaded), intro-open at the drawing's first frame, which starts the
// writing of the name and brings in the menu, and intro-written WRITE seconds
// later, which brings in the scroll hint.
(function () {
  "use strict";
  var WRITE = 3.4;                   // seconds from the first frame to the scroll hint: the name is written by then (site.css)
  var SCRIPTS = {                    // each drawing's core (its viewer's geometry) and the drawing itself, under /sims/
    "flasher-origami": ["flasher-origami-core.js", "backgrounds/flasher-origami.js"],
    "knit": ["knit-core.js", "backgrounds/knit.js"],
    "bistable-auxetics": ["bistable-auxetics-core.js", "backgrounds/bistable-auxetics.js"],
    "weave": ["weave-core.js", "backgrounds/weave.js"]
  };

  var html = document.documentElement, intro = html.classList.contains("deck-intro");
  var canvases = Array.prototype.slice.call(document.querySelectorAll(".deck__motion"));
  function giveUp() { html.classList.remove("deck-intro"); }     // the CSS line drawing stands, and everything shows
  if (!canvases.length || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) { giveUp(); return; }
  if (intro) html.classList.add("intro-run");

  // The scripts are loaded from this script's own folder, with its cache-busting query.
  var me = (document.currentScript && document.currentScript.src) || "/sims/backgrounds/deck.js";
  var base = me.replace(/backgrounds\/deck\.js.*$/, ""), query = (me.match(/\?.*$/) || [""])[0];
  function load(files) {             // fetched together, run in order (the core first)
    return new Promise(function (resolve, reject) {
      files.forEach(function (file, i) {
        var s = document.createElement("script");
        s.src = base + file + query; s.async = false;
        s.onerror = function () { reject(new Error(file)); };
        if (i === files.length - 1) s.onload = resolve;
        document.head.appendChild(s);
      });
    });
  }
  var names = Object.keys(SCRIPTS), asked = /[?&]bg=([\w-]+)/.exec(location.search);
  var pick = asked && SCRIPTS[asked[1]] ? asked[1] : names[Math.floor(Math.random() * names.length)];
  var order = [pick].concat(names.filter(function (n) { return n !== pick; }));
  // The drawings in turn: load one's scripts and start it on each title panel; if it cannot run, the next.
  (function attempt(i) {
    if (i >= order.length) { giveUp(); return; }
    var name = order[i], files = SCRIPTS[name];
    load(files).then(function () {
      var drawing = (window.deckDrawings || {})[name], started = 0;
      if (drawing) canvases.forEach(function (canvas) { if (run(canvas, drawing, name)) started++; });
      if (!started) attempt(i + 1);
    }, function () { attempt(i + 1); });
  })(0);

  var dark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var probe = null;
  function rgb(css) {                // any CSS colour -> [r, g, b] in 0..1, for the WebGL drawings
    probe = probe || document.createElement("canvas").getContext("2d");
    probe.clearRect(0, 0, 1, 1); probe.fillStyle = "#000"; probe.fillStyle = css; probe.fillRect(0, 0, 1, 1);
    var p = probe.getImageData(0, 0, 1, 1).data;
    return [p[0] / 255, p[1] / 255, p[2] / 255];
  }
  var t0 = -1;                       // the first frame, shared by the decks' title panels
  function stage(t) {                // the introduction's marks on <html>, once each
    if (!intro) return;
    if (!html.classList.contains("intro-open")) html.classList.add("intro-open");
    if (t >= WRITE && !html.classList.contains("intro-written")) html.classList.add("intro-written");
  }

  // One drawing on one title panel's canvas; true when it runs.
  function run(canvas, drawing, name) {
    var panel = canvas.closest(".deck__panel"), deck = canvas.closest(".deck");
    if (!panel || !deck) return false;
    var d = null;
    try { d = drawing(canvas, panel); } catch (e) { d = null; }
    if (!d) return false;
    panel.setAttribute("data-drawing", name);                   // which one runs, for reference
    var raf = 0, resized = false, recolour = false;

    function palette() {   // the greys of the palette in force on this panel (the mode's and the scheme's)
      var cs = getComputedStyle(panel), grey = function (n) { return cs.getPropertyValue("--grey-" + n).trim(); };
      return { night: !!(dark && dark.matches), grey: grey, rgb: function (n) { return rgb(grey(n)); } };
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
    if (dark) dark.addEventListener("change", function () { recolour = true; });
    if ("ResizeObserver" in window) new ResizeObserver(function () { resized = true; }).observe(panel);
    else window.addEventListener("resize", function () { resized = true; });
    // A lost WebGL context (the knit) ends the drawing; the CSS line drawing stands in.
    canvas.addEventListener("webglcontextlost", function () { stop(); panel.removeAttribute("data-drawing"); giveUp(); });
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
    return true;
  }
})();
