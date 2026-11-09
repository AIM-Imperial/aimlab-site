// The flasher origami behind the homepage title, one of the drawings that
// deck.js runs there: the self-deploying solar array of Chen, Bilal, Lang,
// Daraio and Shea (2019), seen from above, opening and closing in a loop. Its
// core sits under the logo and its arms reach past the edges of the panel when
// open; closed, they wind round the core in a spiral. The crease pattern and
// the fold are those of the viewer, flasher-origami.html in the folder above
// (its own code, flasher-origami-core.js): an n-sided core, c layers of facets,
// every strip tilting up, pleating and winding round the core as the fold
// fraction goes from 0 to 1. Drawn flat, as a line drawing in the greys of the
// current palette, each facet a faint tint, so the wrapped layers add up where
// they overlap. It starts closed and opens as the page loads.
(function () {
  "use strict";

  // ---- settings -----------------------------------------------------------
  var N = 10, C = 3, RATIO = 0.2;    // sides, layers and core radius over deployed radius: the paper's design
  var SIZE = 0.66;                   // deployed circumradius as a fraction of the panel's longer side
  var SPACING = 0.002;               // radial step between the layers of the wrapped stacks, as a fraction of that radius
  var PIECE = 0.05;                  // the strips are cut into pieces this long, as a fraction of that radius
  var HOLD = 2.6;                    // seconds at rest, open and closed
  var MOVE = 3.4;                    // seconds to close, and to open
  var FILL = 0.18;                   // opacity of a facet's tint

  // ---- the pattern and its fold: the viewer's own (flasher-origami-core.js) --
  var pattern = Flasher.pattern, mesh = Flasher.mesh, fold = Flasher.fold;

  // ---- the cycle: opening, open, closing, closed --------------------------
  var PERIOD = 2 * (HOLD + MOVE);
  function ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function folding(t) {     // seconds from the start -> 1 closed .. 0 open
    var u = t % PERIOD;
    if (u < MOVE) return 1 - ease(u / MOVE);
    u -= MOVE; if (u < HOLD) return 0;
    u -= HOLD; if (u < MOVE) return ease(u / MOVE);
    return 1;
  }

  // ---- the drawing (deck.js) ----------------------------------------------
  (window.deckDrawings = window.deckDrawings || {})["flasher-origami"] = function (canvas) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return null;
    var w = 0, h = 0, dpr = 1, colours = null, model = null, last = -1;
    return {
      size: function (W, H, D) { w = W; h = H; dpr = D; last = -1; },
      // By day the lines one step from the ground and the tint two; by night
      // two and three.
      recolour: function (p) { colours = { line: p.grey(p.night ? 700 : 200), fill: p.grey(p.night ? 600 : 300) }; last = -1; },
      draw: function (t) {
        var f = folding(t);
        if (f === last || !w || !h || !colours) return;
        last = f;
        var Ro = SIZE * Math.max(w, h);
        if (!model || model.Ro !== Ro) {
          var pat = pattern(N, C, RATIO * Ro, Ro), m = mesh(pat, PIECE * Ro);
          model = { Ro: Ro, pat: pat, mesh: m, pos: new Float64Array(m.n * 3) };
        }
        var p = fold(model.mesh, f, SPACING * Ro, model.pos), tris = model.mesh.tris;
        ctx.setTransform(dpr, 0, 0, -dpr, dpr * w / 2, dpr * h / 2);          // centred on the panel, y up
        ctx.clearRect(-w / 2, -h / 2, w, h);
        // the facets, each a faint tint: the wrapped layers add up
        ctx.globalAlpha = FILL; ctx.fillStyle = colours.fill;
        for (var i = 0; i < tris.length; i++) {
          var a = 3 * tris[i][0], b = 3 * tris[i][1], c = 3 * tris[i][2];
          ctx.beginPath(); ctx.moveTo(p[a], p[a + 1]); ctx.lineTo(p[b], p[b + 1]); ctx.lineTo(p[c], p[c + 1]); ctx.closePath(); ctx.fill();
        }
        ctx.globalAlpha = 1;
        // the creases and the outer edge
        ctx.lineWidth = 1; ctx.lineJoin = "round"; ctx.strokeStyle = colours.line;
        ctx.beginPath();
        var segs = model.mesh.creaseSegs;
        for (i = 0; i < segs.length; i++) { a = 3 * segs[i][0]; b = 3 * segs[i][1]; ctx.moveTo(p[a], p[a + 1]); ctx.lineTo(p[b], p[b + 1]); }
        var edge = model.pat.boundary;
        for (i = 0; i < edge.length; i++) { a = 3 * edge[i]; if (i) ctx.lineTo(p[a], p[a + 1]); else ctx.moveTo(p[a], p[a + 1]); }
        ctx.closePath();
        ctx.stroke();
      }
    };
  };
})();
