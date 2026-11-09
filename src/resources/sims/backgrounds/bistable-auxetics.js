// The bistable kirigami behind the homepage title, one of the drawings that
// deck.js runs there: the bistable auxetic mechanism of the viewer
// bistable-auxetics.html in the folder above, opening and closing in a loop.
// The viewer's supercell (six cells round one grid vertex: a rotor triangle in
// each cell, three wedges round it, the six together a hexagon) is repeated on
// a hexagonal lattice whose spacing follows the hexagon's size, so the whole
// sheet grows and shrinks about the centre of the panel, where the logo sits,
// and covers the panel open or closed. The kinematics are the viewer's own
// (bistable-auxetics-core.js); the cut angle and rotor edge are its defaults.
// The pieces are drawn without the viewer's pins, as a line drawing in the
// greys of the current palette, the rotors filled a half step from the ground.
// It starts closed and opens as the page loads.
(function () {
  "use strict";

  // ---- settings -----------------------------------------------------------
  var CUT = 5;            // cut angle theta, degrees (the sim's default)
  var EDGE = 5;           // rotor edge l, with the grid edge L = 10 (the sim's default)
  var HOLD = 2.4;         // seconds at rest in each state
  var MOVE = 1.6;         // seconds to open, and to close
  var SIZE = 0.2;         // closed hexagon circumradius as a fraction of the panel's shorter side,
  var SIZE_MIN = 80, SIZE_MAX = 200;   // clamped to this range of pixels

  // ---- the geometry: the viewer's own (bistable-auxetics-core.js) ---------
  var B = window.BistableAuxetics, L = B.L, DEG = B.DEG;
  var PHI_MAX = (60 + 2 * CUT) * DEG;   // open at phi = 60 deg + 2 theta
  function build(f) {   // f: 0 closed .. 1 open -> the paths of one supercell, in grid units
    // The pieces only: the sim's pins are left out, so the sheet reads as a
    // pattern rather than a linkage.
    var cell = B.supercell(EDGE, CUT * DEG, f * PHI_MAX);
    var rotors = new Path2D(), wedges = new Path2D();
    var poly = function (path, pts) {
      path.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length; i++) path.lineTo(pts[i][0], pts[i][1]);
      path.closePath();
    };
    cell.units.forEach(function (u) {
      poly(rotors, u.tri);
      u.wedges.forEach(function (w) { poly(wedges, w.pts); });
    });
    // The hexagon's circumradius now: the rim corners' distance from the vertex.
    var u0 = cell.units[0], c1 = u0.wedges[1].pts[0], c2 = u0.wedges[2].pts[0];
    return { rotors: rotors, wedges: wedges, R: (Math.hypot(c1[0], c1[1]) + Math.hypot(c2[0], c2[1])) / 2 };
  }


  // ---- the cycle: opening, open, closing, closed --------------------------
  var PERIOD = 2 * (HOLD + MOVE);
  function ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function opening(t) {   // seconds from the start -> 0 closed .. 1 open
    var u = t % PERIOD;
    if (u < MOVE) return ease(u / MOVE);
    u -= MOVE; if (u < HOLD) return 1;
    u -= HOLD; if (u < MOVE) return 1 - ease(u / MOVE);
    return 0;
  }

  // ---- the drawing (deck.js) ----------------------------------------------
  (window.deckDrawings = window.deckDrawings || {})["bistable-auxetics"] = function (canvas) {
    var ctx = canvas.getContext("2d");
    if (!ctx || typeof Path2D !== "function") return null;
    var w = 0, h = 0, dpr = 1, colours = null, last = -1;
    return {
      size: function (W, H, D) { w = W; h = H; dpr = D; last = -1; },
      // By day the lines one step from the ground and the rotors a half step;
      // by night two steps and one.
      recolour: function (p) { colours = { line: p.grey(p.night ? 700 : 200), fill: p.grey(p.night ? 800 : 50) }; last = -1; },
      draw: function (t) {
        var f = opening(t);
        if (f === last || !w || !h || !colours) return;
        last = f;
        var cell = build(f);
        var R0 = Math.max(SIZE_MIN, Math.min(SIZE_MAX, SIZE * Math.min(w, h)));   // closed circumradius, px
        var s = R0 / L;                                                            // px per grid unit
        var R = cell.R, a1 = [1.5 * R, Math.sqrt(3) / 2 * R], a2 = [0, Math.sqrt(3) * R];
        var reach = Math.hypot(w, h) / 2 / s + R;                                  // grid units from the centre worth drawing
        var n = Math.ceil(reach / (Math.sqrt(3) / 2 * R)) + 1;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineJoin = "round";
        ctx.strokeStyle = colours.line;
        ctx.fillStyle = colours.fill;
        for (var i = -n; i <= n; i++) {
          for (var j = -n; j <= n; j++) {
            var cx = i * a1[0] + j * a2[0], cy = i * a1[1] + j * a2[1];
            if (Math.hypot(cx, cy) > reach) continue;
            // grid units -> pixels, y up, this hexagon's centre at (cx, cy)
            ctx.setTransform(dpr * s, 0, 0, -dpr * s, dpr * (w / 2 + cx * s), dpr * (h / 2 - cy * s));
            ctx.lineWidth = 1 / s;
            ctx.fill(cell.rotors);
            ctx.stroke(cell.wedges);
            ctx.stroke(cell.rotors);
          }
        }
      }
    };
  };
})();
