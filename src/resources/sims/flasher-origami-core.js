// The flasher origami's geometry, shared by the viewer flasher-origami.html and
// by the drawing behind the homepage title, backgrounds/flasher-origami.js;
// both load this file, which defines window.Flasher = { pattern, mesh, fold }.
//
// Flasher origami: the crease pattern of Chen et al. (2019), Phys. Rev. Applied
// 11, 064069, Appendix B and Fig. 15, and a kinematic fold of it.
//
// Pattern. A core polygon of n sides (circumradius Ri) inside an outer polygon
// of n sides (circumradius Ro). From each core vertex v_k a spine runs along
// the tangent of the core's circle, counter-clockwise, to an outer vertex O_k;
// it is divided into c equal segments by the points p_k,j. Each core edge
// v_k v_k+1 continues as a straight line L_k to the midpoint M_k of the outer
// edge O_k O_k+1. From every spine point p_k,j (0 < j < c) two creases leave,
// parallel to L_k on one side of the spine and to L_k-1 on the other, and end
// on the outer polygon. The core edges and the lines L_k are mountain folds;
// the spine segments and the creases from the spine points alternate, valley
// for odd j and mountain for even j. The cell between two spines holds two
// triangles and 2(c - 1) trapezoids, as the paper says: the strips of cell A_k,
// between the spine of v_k and L_k, and of cell B_k, between L_k and the next
// spine, all parallel to L_k.
//
// Fold. In the wrapped state every strip stands on edge and winds round the
// core polygon as a ribbon, its length along the perimeter and its width along
// the axis; consecutive strips of a cell are pleated into a stack, and the
// stacks of the n cells nest in a spiral. At a fold fraction f the strips tilt
// by f times 90 degrees, pleat by f times 180 degrees, and the line L_k turns
// by f times the polygon's corner angle at each corner it passes, so f = 0 is
// the flat sheet and f = 1 the wrapped one. The two cells either side of a
// spine would carry its points to different places part-way, since the
// pattern is not rigidly foldable; those points take the mean, and the facets
// next to the spines stretch a little in between.
window.Flasher = (function () {
  "use strict";

  // ---- the crease pattern -------------------------------------------------
  function pattern(n, c, Ri, Ro) {
    var Ls = Math.sqrt(Ro * Ro - Ri * Ri), h = Ls / c;
    var nodes = [], id = function (x, y) { nodes.push([x, y]); return nodes.length - 1; };
    var v = [], t = [], d = [], O = [], M = [];
    for (var k = 0; k < n; k++) {
      var phi = 2 * Math.PI * k / n + Math.PI / 2;
      v.push([Ri * Math.cos(phi), Ri * Math.sin(phi)]);
      t.push([-Math.sin(phi), Math.cos(phi)]);                      // the tangent, counter-clockwise
      var a = phi + Math.PI / 2 + Math.PI / n;                       // along the core edge v_k -> v_k+1
      d.push([Math.cos(a), Math.sin(a)]);
    }
    var V = [], P = [], Oi = [], Mi = [];
    for (k = 0; k < n; k++) {
      V.push(id(v[k][0], v[k][1]));
      var row = [V[k]];
      for (var j = 1; j <= c; j++) row.push(id(v[k][0] + j * h * t[k][0], v[k][1] + j * h * t[k][1]));
      P.push(row); Oi.push(row[c]); O.push(nodes[row[c]]);
    }
    for (k = 0; k < n; k++) {
      var k1 = (k + 1) % n;
      M.push([(O[k][0] + O[k1][0]) / 2, (O[k][1] + O[k1][1]) / 2]);
      Mi.push(id(M[k][0], M[k][1]));
    }
    function hit(a, u, b, e) {           // the ray from a along u meets the line b e
      var ex = e[0] - b[0], ey = e[1] - b[1], det = u[0] * ey - u[1] * ex;
      var s = ((b[0] - a[0]) * ey - (b[1] - a[1]) * ex) / det;
      return [a[0] + s * u[0], a[1] + s * u[1]];
    }
    var EA = [], EB = [];
    for (k = 0; k < n; k++) {
      var km = (k + n - 1) % n, ka = [], kb = [];
      for (j = 1; j < c; j++) {
        var q = nodes[P[k][j]];
        var ea = hit(q, d[k], O[k], O[(k + 1) % n]), eb = hit(q, d[km], O[km], O[k]);
        ka[j] = id(ea[0], ea[1]); kb[j] = id(eb[0], eb[1]);
      }
      EA.push(ka); EB.push(kb);
    }
    var faces = [], creases = [], MT = 1, VL = -1;
    function crease(a, b, s) { creases.push([a, b, s]); }
    for (k = 0; k < n; k++) {
      k1 = (k + 1) % n;
      crease(V[k], V[k1], MT);
      crease(V[k1], Mi[k], MT);
      for (j = 1; j <= c; j++) crease(P[k][j - 1], P[k][j], j % 2 ? VL : MT);
      for (j = 1; j < c; j++) { crease(P[k][j], EA[k][j], j % 2 ? VL : MT); crease(P[k][j], EB[k][j], j % 2 ? VL : MT); }
      faces.push({ rails: [[V[k], V[k1], Mi[k]], [P[k][1], EA[k][1]]], cell: k, side: 1 });
      for (j = 2; j < c; j++) faces.push({ rails: [[P[k][j - 1], EA[k][j - 1]], [P[k][j], EA[k][j]]], cell: k, side: 1 });
      faces.push({ rails: [[P[k][c - 1], EA[k][c - 1]], [Oi[k]]], cell: k, side: 1 });
      faces.push({ rails: [[V[k1], Mi[k]], [P[k1][1], EB[k1][1]]], cell: k, side: -1 });
      for (j = 2; j < c; j++) faces.push({ rails: [[P[k1][j - 1], EB[k1][j - 1]], [P[k1][j], EB[k1][j]]], cell: k, side: -1 });
      faces.push({ rails: [[P[k1][c - 1], EB[k1][c - 1]], [Oi[k1]]], cell: k, side: -1 });
    }
    var boundary = [];                 // the outer edge, from vertex to vertex through the strips' ends
    for (k = 0; k < n; k++) {
      k1 = (k + 1) % n;
      boundary.push(Oi[k]);
      for (j = c - 1; j >= 1; j--) boundary.push(EA[k][j]);
      boundary.push(Mi[k]);
      for (j = 1; j < c; j++) boundary.push(EB[k1][j]);
    }
    return { n: n, c: c, Ri: Ri, Ro: Ro, h: h, v: v, d: d, s: 2 * Ri * Math.sin(Math.PI / n),
             nodes: nodes, core: V, faces: faces, creases: creases, outer: Oi, mids: Mi, boundary: boundary };
  }

  // ---- the mesh: facets cut into strips and triangulated -----------------
  // piece: the length of the pieces along the strips, in the pattern's units.
  function mesh(pat, piece) {
    var pos = [], node = function (x, y) { pos.push([x, y]); return pos.length - 1; };
    pat.nodes.forEach(function (q) { node(q[0], q[1]); });
    var segCache = {};
    function segPoints(a, b) {           // from pattern node a to b, both included, shared by every face along it
      var key = a < b ? a + "," + b : b + "," + a;
      if (!segCache[key]) {
        var lo = pat.nodes[a < b ? a : b], hi = pat.nodes[a < b ? b : a], L = Math.hypot(hi[0] - lo[0], hi[1] - lo[1]);
        var m = Math.max(1, Math.round(L / piece)), ids = [a < b ? a : b];
        for (var i = 1; i < m; i++) ids.push(node(lo[0] + (hi[0] - lo[0]) * i / m, lo[1] + (hi[1] - lo[1]) * i / m));
        ids.push(a < b ? b : a);
        segCache[key] = ids;
      }
      var out = segCache[key];
      return a < b ? out : out.slice().reverse();
    }
    function railPoints(rail) {
      if (rail.length === 1) return [rail[0]];
      var out = segPoints(rail[0], rail[1]);
      for (var i = 2; i < rail.length; i++) out = out.concat(segPoints(rail[i - 1], rail[i]).slice(1));
      return out;
    }
    var tris = [], triFace = [], centre = node(0, 0);
    for (var ci = 0; ci < pat.core.length; ci++) { tris.push([centre, pat.core[ci], pat.core[(ci + 1) % pat.core.length]]); triFace.push(-1); }
    pat.faces.forEach(function (f, fi) {
      var A = railPoints(f.rails[0]), B = railPoints(f.rails[1]);
      if (B.length === 1) { for (var i = 0; i + 1 < A.length; i++) { tris.push([A[i], A[i + 1], B[0]]); triFace.push(fi); } return; }
      var i = 0, j = 0;
      while (i + 1 < A.length || j + 1 < B.length) {
        var advA;
        if (i + 1 >= A.length) advA = false;
        else if (j + 1 >= B.length) advA = true;
        else advA = dist(pos[A[i + 1]], pos[B[j]]) <= dist(pos[A[i]], pos[B[j + 1]]);
        if (advA) { tris.push([A[i], A[i + 1], B[j]]); i++; } else { tris.push([A[i], B[j + 1], B[j]]); j++; }
        triFace.push(fi);
      }
    });
    tris.forEach(function (t) {           // counter-clockwise in the plane
      var a = pos[t[0]], b = pos[t[1]], c = pos[t[2]];
      if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) < 0) { var s = t[1]; t[1] = t[2]; t[2] = s; }
    });
    // Which cells each node belongs to (a node on a spine is in two).
    var cells = pos.map(function () { return []; });
    tris.forEach(function (t, ti) {
      var fi = triFace[ti]; if (fi < 0) return;
      var f = pat.faces[fi], key = f.cell * 2 + (f.side > 0 ? 0 : 1);
      t.forEach(function (i) { if (cells[i].indexOf(key) < 0) cells[i].push(key); });
    });
    // The crease segments of the mesh, for drawing: node pairs on a pattern crease.
    var creaseSegs = [];
    pat.creases.forEach(function (cr) {
      var key = cr[0] < cr[1] ? cr[0] + "," + cr[1] : cr[1] + "," + cr[0];
      var ids = segCache[key] || [cr[0], cr[1]];     // a spine segment is a single edge of the mesh
      for (var i = 0; i + 1 < ids.length; i++) creaseSegs.push([ids[i], ids[i + 1], cr[2]]);
    });
    var flat = new Float64Array(pos.length * 2);
    pos.forEach(function (q, i) { flat[2 * i] = q[0]; flat[2 * i + 1] = q[1]; });
    return { flat: flat, n: pos.length, tris: tris, cells: cells, centre: centre, creaseSegs: creaseSegs, pat: pat };
  }
  function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }

  // ---- the fold --------------------------------------------------------------
  // Writes the positions at fold fraction f into out (3 per node). spacing: the
  // radial step between the layers of the stacks, in the pattern's units.
  function fold(m, f, spacing, out) {
    var pat = m.pat, n = pat.n, c = pat.c, s = pat.s, h = pat.h;
    var turn = 2 * Math.PI / n * f, tilt = Math.PI / 2 * f, pleat = Math.PI * f;
    var w1 = h * Math.sin(Math.PI / n);                 // the strips' width
    // the pleated cross-section: direction of strip j in the (outward, up) plane
    var ex = [], ey = [];
    for (var j = 0; j <= c + 1; j++) { var a = tilt - (j % 2 === 0 ? pleat : 0); ex.push(Math.cos(a)); ey.push(Math.sin(a)); }
    var q = [0, 0, 0], acc = [0, 0, 0];
    function map(k, side, x, y) {           // the flat point (x, y) carried by cell k (side 1: A_k, -1: B_k)
      var vk = pat.v[k], dk = pat.d[k], nx = dk[1], ny = -dk[0];          // n: the outward normal of L_k
      var u = (x - vk[0]) * dk[0] + (y - vk[1]) * dk[1], w = (x - vk[0]) * nx + (y - vk[1]) * ny;
      // the strip: its index from L_k, and the position across it
      var aw = Math.abs(w), jj = Math.min(c, Math.floor(aw / w1 + 1e-9) + 1), rem = aw - (jj - 1) * w1;
      var lp = 2 * (jj - 1) + (side > 0 ? 0 : 1);                          // its place in the cell's stack
      // The stack's radius grows with the corners passed, counted from v_k for
      // A_k and from v_k+1 for B_k (whose strips start beyond that corner), so
      // the two cells either side of a spine agree there. Each face of the wrap
      // is the core edge plus the arc round the corner at that radius.
      var ff = f * f;
      var corners = function (mm) { return side > 0 ? mm : Math.max(0, mm - 1); };
      var rAt = function (mm) { return spacing * (lp + 2 * c * mm) * ff; };
      // across: the pleated cross-section at distance |w| from L_k
      var ox = 0, oy = 0;
      for (var i = 1; i < jj; i++) { ox += w1 * ex[i]; oy += w1 * ey[i]; }
      ox += rem * ex[jj]; oy += rem * ey[jj];
      var sideOff = w < 0 ? -ox : ox;
      // Walk along the wrap at this point's own radius from the core polygon:
      // each face is the core edge (length s) and the arc round the corner at
      // that radius, so the length along the strip is kept. The stack's radius
      // depends on how far round the point is, so the walk is made twice.
      var rho = rAt(corners(u / s)) + sideOff, frac = u / s;
      var px, py, dx, dy, rx, ry;
      for (var pass = 0; pass < 2; pass++) {
        px = vk[0]; py = vk[1]; dx = dk[0]; dy = dk[1];
        var left = u, ang = 0, mm = 0, arc = Math.max(0, rho) * turn, len = s + arc;   // inside the core line there is no arc
        for (;;) {
          if (left <= s + 1e-9) {                                          // on the straight part
            frac = mm + left / len; rx = dy; ry = -dx;
            px += dx * left; py += dy * left; break;
          }
          left -= s; px += dx * s; py += dy * s;                           // at the corner
          if (left <= arc + 1e-9) {                                        // on the arc
            frac = mm + (s + left) / len;
            var a = (arc > 0 ? left / arc : 1) * turn, ca = Math.cos(a), sa = Math.sin(a);
            rx = ca * dy + sa * dx; ry = sa * dy - ca * dx; break;         // the outward normal, turned by a
          }
          left -= arc; mm++; ang += turn;
          dx = Math.cos(ang) * dk[0] - Math.sin(ang) * dk[1]; dy = Math.sin(ang) * dk[0] + Math.cos(ang) * dk[1];
        }
        rho = rAt(corners(frac)) + sideOff;
      }
      var radial = rho;
      q[0] = px + radial * rx; q[1] = py + radial * ry; q[2] = oy;
      return q;
    }
    for (var i = 0; i < m.n; i++) {
      var x = m.flat[2 * i], y = m.flat[2 * i + 1], cs = m.cells[i];
      if (!cs.length) { out[3 * i] = x; out[3 * i + 1] = y; out[3 * i + 2] = 0; continue; }   // the core
      acc[0] = acc[1] = acc[2] = 0;
      for (var e = 0; e < cs.length; e++) { var r = map(cs[e] >> 1, cs[e] & 1 ? -1 : 1, x, y); acc[0] += r[0]; acc[1] += r[1]; acc[2] += r[2]; }
      out[3 * i] = acc[0] / cs.length; out[3 * i + 1] = acc[1] / cs.length; out[3 * i + 2] = acc[2] / cs.length;
    }
    return out;
  }

  return { pattern: pattern, mesh: mesh, fold: fold };
})();
