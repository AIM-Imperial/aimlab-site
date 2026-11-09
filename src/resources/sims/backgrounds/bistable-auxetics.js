// The bistable kirigami behind the homepage title, one of the drawings that
// deck.js runs there: the bistable auxetic mechanism of the viewer
// bistable-auxetics.html in the folder above, opening and closing in a loop.
// The viewer's supercell (six cells round one grid vertex: a rotor triangle in
// each cell, three wedges round it, the six together a hexagon) is repeated on
// a hexagonal lattice whose spacing follows the hexagon's size, so the whole
// sheet grows and shrinks about the centre of the panel, where the logo sits,
// and covers the panel open or closed. The kinematics are the viewer's, ported
// as they are (tri_unit_deploy.ipynb); the cut angle and rotor edge are its
// defaults. The pieces are drawn without the viewer's pins, as a line drawing
// in the greys of the current palette, the rotors filled a half step from the
// ground. It starts closed and opens as the page loads.
(function () {
  "use strict";

  // ---- settings -----------------------------------------------------------
  var CUT = 5;            // cut angle theta, degrees (the sim's default)
  var EDGE = 5;           // rotor edge l, with the grid edge L = 10 (the sim's default)
  var HOLD = 2.4;         // seconds at rest in each state
  var MOVE = 1.6;         // seconds to open, and to close
  var SIZE = 0.2;         // closed hexagon circumradius as a fraction of the panel's shorter side,
  var SIZE_MIN = 80, SIZE_MAX = 200;   // clamped to this range of pixels

  // ---- geometry (the sim's) -----------------------------------------------
  var L = 10, DEG = Math.PI / 180, ALPHA = Math.PI / 6;
  function rot(a, p, c) {
    var ca = Math.cos(a), sa = Math.sin(a), x = p[0] - c[0], y = p[1] - c[1];
    return [c[0] + ca * x - sa * y, c[1] + sa * x + ca * y];
  }
  function add(p, d) { return [p[0] + d[0], p[1] + d[1]]; }
  function sub(p, d) { return [p[0] - d[0], p[1] - d[1]]; }
  // intersection of line p->q with line u->v
  function isect(p, q, u, v) {
    var a = q[0] - p[0], b = u[0] - v[0], c = q[1] - p[1], d = u[1] - v[1];
    var e = u[0] - p[0], f = u[1] - p[1];
    var det = a * d - b * c, s = (e * d - b * f) / det;
    return [p[0] + s * a, p[1] + s * c];
  }
  // One cell, the rotor turned by phi: each wedge translates rigidly with its
  // pin; the hub wedge's corner stays on y = 0 and the top wedge's corner on
  // the 60 degree line, as in the sim.
  function unit(l, theta, phi) {
    var A = [0, 0], B = [L, 0], C = [L / 2, L * Math.sqrt(3) / 2];
    var cen = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
    var r = l / Math.sqrt(3);
    var corner = function (a) { return rot(theta, [cen[0] + r * Math.cos(a), cen[1] + r * Math.sin(a)], cen); };
    var ll = corner(210 * DEG), lr = corner(330 * DEG), tp = corner(90 * DEG);
    var p1 = isect(ll, lr, A, C), p2 = isect(tp, lr, A, B), p3 = isect(ll, tp, B, C);
    var tri = [ll, lr, tp];
    var wedges = [
      { pts: [A, p1, lr, p2], k: 1 },   // hub: its corner at the grid vertex
      { pts: [B, p2, tp, p3], k: 2 },   // rim
      { pts: [C, p3, ll, p1], k: 0 }    // rim
    ];
    var triD = tri.map(function (p) { return rot(-phi, p, cen); });
    var wD = wedges.map(function (w) {
      var d = sub(triD[w.k], tri[w.k]);
      return { pts: w.pts.map(function (p) { return add(p, d); }), k: w.k };
    });
    var n1 = [0, 1], n2 = [-Math.sin(60 * DEG), Math.cos(60 * DEG)];
    var a0 = wD[0].pts[0], t3 = wD[2].pts[3];
    var b1 = n1[0] * a0[0] + n1[1] * a0[1], b2 = n2[0] * t3[0] + n2[1] * t3[1];
    var det = n1[0] * n2[1] - n1[1] * n2[0];
    var shift = [(b1 * n2[1] - n1[1] * b2) / det, (n1[0] * b2 - b1 * n2[0]) / det];
    return {
      tri: triD.map(function (p) { return sub(p, shift); }),
      wedges: wD.map(function (w) { return w.pts.map(function (p) { return sub(p, shift); }); })
    };
  }
  // Six placements round the vertex: the cell, its mirror, and both turned by
  // 120 and 240 degrees.
  function supercell(l, theta, phi) {
    var u0 = unit(l, theta, phi), O = [0, 0];
    var xf = function (fn, u) { return { tri: u.tri.map(fn), wedges: u.wedges.map(function (w) { return w.map(fn); }) }; };
    var u1 = xf(function (p) { return [p[0], -p[1]]; }, u0);
    var units = [u0, u1];
    [120 * DEG, 240 * DEG].forEach(function (ang) {
      units.push(xf(function (p) { return rot(ang, p, O); }, u0));
      units.push(xf(function (p) { return rot(ang, p, O); }, u1));
    });
    // The hexagon's circumradius now: the rim corners' distance from the vertex.
    var R = (Math.hypot(u0.wedges[1][0][0], u0.wedges[1][0][1]) + Math.hypot(u0.wedges[2][0][0], u0.wedges[2][0][1])) / 2;
    return { units: units, R: R };
  }
  var PHI_MAX = (60 + 2 * CUT) * DEG;   // open at phi = 60 deg + 2 theta
  function build(f) {   // f: 0 closed .. 1 open -> the paths of one supercell, in grid units
    // The pieces only: the sim's pins are left out, so the sheet reads as a
    // pattern rather than a linkage.
    var cell = supercell(EDGE, CUT * DEG, f * PHI_MAX);
    var rotors = new Path2D(), wedges = new Path2D();
    var poly = function (path, pts) {
      path.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length; i++) path.lineTo(pts[i][0], pts[i][1]);
      path.closePath();
    };
    cell.units.forEach(function (u) {
      poly(rotors, u.tri);
      u.wedges.forEach(function (w) { poly(wedges, w); });
    });
    return { rotors: rotors, wedges: wedges, R: cell.R };
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
