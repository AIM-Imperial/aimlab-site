// The bistable auxetic mechanism's geometry: one triangular cell, closed then
// deployed (a direct port of tri_unit_deploy.ipynb), and the supercell of six
// round a grid vertex. L is the grid edge; a cell has rotor edge l and cut angle
// theta, and its rotor turns by phi, from 0 (closed) to 60 degrees + 2 theta
// (open). Shared by the viewer bistable-auxetics.html and by the drawing behind
// the homepage title, backgrounds/bistable-auxetics.js; both load this file,
// which defines window.BistableAuxetics.
window.BistableAuxetics = (function () {
  "use strict";
  const L = 10.0;
  const DEG = Math.PI / 180;
  const ALPHA = Math.PI / 6;

  // ---- 2-D helpers --------------------------------------------------------
  const rot = (a, p, c) => {
    const ca = Math.cos(a), sa = Math.sin(a);
    const x = p[0] - c[0], y = p[1] - c[1];
    return [c[0] + ca * x - sa * y, c[1] + sa * x + ca * y];
  };
  const add = (p, d) => [p[0] + d[0], p[1] + d[1]];
  const sub = (p, d) => [p[0] - d[0], p[1] - d[1]];
  // intersection of line p->q with line u->v
  function isect(p, q, u, v) {
    const a = q[0] - p[0], b = u[0] - v[0], c = q[1] - p[1], d = u[1] - v[1];
    const e = u[0] - p[0], f = u[1] - p[1];
    const det = a * d - b * c;
    const s = (e * d - b * f) / det;
    return [p[0] + s * a, p[1] + s * c];
  }

  function lMax(theta) {
    return theta >= 0 ? L * Math.sin(ALPHA - theta) / Math.sin(ALPHA)
                      : L * Math.sin(ALPHA) / Math.sin(ALPHA + Math.abs(theta));
  }
  const epsKin = (l, theta) => 2 * l * Math.sin(theta + ALPHA) / L;

  // ---- one unit, closed then deployed (direct port of tri_unit_deploy.ipynb) ----
  function unit(l, theta, phi) {
    const A = [0, 0], B = [L, 0], C = [L / 2, L * Math.sqrt(3) / 2];
    const cen = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
    const r = l / Math.sqrt(3);
    const corner = a => rot(theta, [cen[0] + r * Math.cos(a), cen[1] + r * Math.sin(a)], cen);
    const ll = corner(210 * DEG), lr = corner(330 * DEG), tp = corner(90 * DEG);

    const p1 = isect(ll, lr, A, C);
    const p2 = isect(tp, lr, A, B);
    const p3 = isect(ll, tp, B, C);

    const tri = [ll, lr, tp];
    const wedges = [
      { pts: [A, p1, lr, p2], k: 1, kind: 'hub' },   // corner at the grid vertex
      { pts: [B, p2, tp, p3], k: 2, kind: 'rim' },
      { pts: [C, p3, ll, p1], k: 0, kind: 'rim' },
    ];

    // rotor turns by -phi about its centre; each wedge follows its pin rigidly
    let triD = tri.map(p => rot(-phi, p, cen));
    let wD = wedges.map(w => {
      const d = sub(triD[w.k], tri[w.k]);
      return { pts: w.pts.map(p => add(p, d)), k: w.k, kind: w.kind };
    });

    // anchor: hub-wedge corner A stays on y = 0, top-wedge corner p1 stays on the 60 deg line
    const n1 = [0, 1];
    const n2 = [-Math.sin(60 * DEG), Math.cos(60 * DEG)];
    const a0 = wD[0].pts[0], t3 = wD[2].pts[3];
    const b1 = n1[0] * a0[0] + n1[1] * a0[1];
    const b2 = n2[0] * t3[0] + n2[1] * t3[1];
    const det = n1[0] * n2[1] - n1[1] * n2[0];
    const shift = [(b1 * n2[1] - n1[1] * b2) / det, (n1[0] * b2 - b1 * n2[0]) / det];
    triD = triD.map(p => sub(p, shift));
    wD = wD.map(w => ({ pts: w.pts.map(p => sub(p, shift)), k: w.k, kind: w.kind }));

    return { tri: triD, wedges: wD, hubOffset: Math.hypot(wD[0].pts[0][0], wD[0].pts[0][1]) };
  }

  // ---- six placements: unit, mirror, then both rotated by 120 and 240 ----
  function supercell(l, theta, phi) {
    const u0 = unit(l, theta, phi);
    const O = [0, 0];
    const xf = (fn, u) => ({ tri: u.tri.map(fn), wedges: u.wedges.map(w => ({ pts: w.pts.map(fn), k: w.k, kind: w.kind })) });
    const mir = p => [p[0], -p[1]];
    const u1 = xf(mir, u0);
    const units = [u0, u1];
    for (const ang of [120 * DEG, 240 * DEG]) {
      units.push(xf(p => rot(ang, p, O), u0));
      units.push(xf(p => rot(ang, p, O), u1));
    }
    return { units, hubOffset: u0.hubOffset };
  }

  return { L, DEG, ALPHA, lMax, epsKin, unit, supercell };
})();
