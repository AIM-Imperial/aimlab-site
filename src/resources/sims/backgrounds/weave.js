// The volumetric weave behind the homepage title, one of the drawings that
// deck.js runs there: the weave of the volumetric plain weaves project's clip,
// in the geometry of the weave viewer, weave-viewer.html in the folder above
// (its own code, weave-core.js). An in-phase weave with configuration C_A at
// its centre and five lattice lines each way (5 x 5 x 5 vertices, 75 yarns),
// with the offset and the yarn radius of the printed specimen. As in the clip,
// the drawing starts from one corner, the far lower one as first seen, and
// each yarn is drawn along its parameter t, away from that corner: the weft,
// the warp and the wup through the corner one after another, then the yarns
// in the three planes through it, one plane after another (the floor, then
// the two walls), then the rest of the volume, while the view turns slowly
// about the vertical. When the weave is whole it rests, is undrawn the same
// way backwards and faster, and is drawn again from the first view. The weave is centred on the
// panel, under the logo, and reaches past the panel's edges. Seen in
// perspective as a line drawing in the greys of
// the current palette: each yarn a band as wide as the yarn, turned to face
// the eye, its edges drawn as lines and its face a faint tint, the nearer
// yarns hiding the farther (WebGL with a depth test).
(function () {
  "use strict";
  var G = window.WeaveGeometry;

  // ---- settings -----------------------------------------------------------
  var P = { cfg3: "A", nx: 2.5, ny: 2.5, nz: 2.5, a: 0.07, ratio: 1, hand: "R", handSeed: 1 };   // the clip's weave, in the viewer's terms
  var R = 0.05;            // yarn radius over the wavelength (the printed specimen: 0.5 mm at a wavelength of 10 mm)
  var SCHEDULE = { corner: [[0.2, 1.0], [1.3, 1.0], [2.4, 1.0]], planes: [[3.6, 1.3], [5.0, 1.3], [6.4, 1.3]], rest: [7.9, 2.0] };   // [start, duration] in seconds, the clip's
  var CORNER = [0, 2 * P.ny - 1, 0];   // the lattice lines (x, y, z) of the corner the drawing starts from: the far lower one in the first view
  var PLANES = [2, 1, 0];              // the planes through it in turn, by the axis they are square to: z (the floor), then y, then x
  var REST = 4;            // seconds at rest once drawn
  var BACK = 3;            // undrawing is this many times faster than drawing
  var WAIT = 1;            // seconds at rest undrawn before the drawing starts again
  var START = -75, TURN = 5, ELEV = 28;   // the view, as in the clip: its azimuth at the start of each drawing, the degrees it turns a second, its elevation
  var DIST = 7.9;          // the eye's distance from the centre, in wavelengths (the clip's)
  var SPAN = 3.1;          // wavelengths across the panel's longer side at that distance: the weave, 3.3 to 3.9 across as it turns, reaches past the edges
  var FILL = 0.18;         // opacity of a yarn's tint

  // ---- the weave: each yarn a band, two vertices a point --------------------
  // Each vertex is the point on the centreline, the yarn's direction there, the
  // side of the band (-1 or 1) and the moment of the drawing at which the point
  // is reached. A yarn's points are reached with the clip's ease in and out.
  var fabric = null;
  function build() {
    var yarns = G.buildYarns3(P), M = yarns[0].pts.length;
    var mid = (2 * P.nx - 1) / 2 * G.LV;                               // the centre of the lattice
    var data = new Float32Array(yarns.length * M * 16), start = [], k = 0, end = 0;
    var reached = function (s) { return s < 0.5 ? Math.sqrt(s / 2) : 1 - Math.sqrt((1 - s) / 2); };
    yarns.forEach(function (y) {
      // Its turn: through the corner, in one of the three planes through it, or neither.
      var jj = G.transverse(y.i), onJ = y.p === CORNER[jj[0]], onJp = y.q === CORNER[jj[1]];
      var when = onJ && onJp ? SCHEDULE.corner[y.i] : onJ || onJp ? SCHEDULE.planes[PLANES.indexOf(onJ ? jj[0] : jj[1])] : SCHEDULE.rest;
      var back = CORNER[y.i] > 0;                                      // drawn away from the corner: from its far end where the corner is at that end
      start.push(when[0]); end = Math.max(end, when[0] + when[1]);
      for (var j = 0; j < M; j++) {
        var p = y.pts[j], a = y.pts[Math.max(j - 1, 0)], b = y.pts[Math.min(j + 1, M - 1)];
        var tx = b.x - a.x, ty = b.y - a.y, tz = b.z - a.z, tl = Math.hypot(tx, ty, tz) || 1;
        var born = when[0] + when[1] * reached((back ? M - 1 - j : j) / (M - 1));
        for (var side = 1; side >= -1; side -= 2) {
          data[k++] = p.x - mid; data[k++] = p.y - mid; data[k++] = p.z - mid;
          data[k++] = tx / tl; data[k++] = ty / tl; data[k++] = tz / tl;
          data[k++] = side; data[k++] = born;
        }
      }
    });
    return { data: data, yarns: yarns.length, M: M, start: start, end: end };
  }

  // ---- the cycle: drawing, drawn, undrawing, empty ---------------------------
  function period(end) { return end + REST + end / BACK + WAIT; }
  function moment(t, end) {   // seconds from the start -> the moment of the drawing, 0 (nothing) .. end (whole)
    var u = t % period(end);
    if (u < end) return u;
    u -= end; if (u < REST) return end;
    u -= REST; if (u < end / BACK) return end - u * BACK;
    return 0;
  }

  // ---- the drawing (deck.js) ----------------------------------------------
  // The band: its two edges R either side of the centreline, across the line of
  // sight. hw is its half width in pixels, for edge lines one CSS pixel wide.
  var VS = "attribute vec3 p, t; attribute vec2 sb; uniform mat4 view, proj; uniform float R, focal; varying float side, born, hw;" +
           "void main() { vec4 pv = view * vec4(p, 1.0); vec3 tv = (view * vec4(t, 0.0)).xyz;" +
           " pv.xyz += normalize(cross(tv, pv.xyz)) * (sb.x * R); side = sb.x; born = sb.y; hw = R * focal / -pv.z; gl_Position = proj * pv; }";
  var FS = "precision mediump float; varying float side, born, hw; uniform vec3 line; uniform vec4 tint; uniform float now, px;" +
           "void main() { if (born > now) discard; float e = 1.0 - px / hw; gl_FragColor = mix(tint, vec4(line, 1.0), smoothstep(e - 1.0 / hw, e, abs(side))); }";

  (window.deckDrawings = window.deckDrawings || {}).weave = function (canvas) {
    var gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true, depth: true });
    if (!gl) return null;
    function shader(type, src) {
      var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }
    var vs = shader(gl.VERTEX_SHADER, VS), fs = shader(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return null;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    fabric = fabric || build();
    var U = {}; ["view", "proj", "R", "focal", "line", "tint", "now", "px"].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
    var A = {}; ["p", "t", "sb"].forEach(function (n) { A[n] = gl.getAttribLocation(prog, n); });
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, fabric.data, gl.STATIC_DRAW);
    var view = new Float32Array(16), proj = new Float32Array(16);
    var w = 0, h = 0, dpr = 1, tones = null, last = -1, lost = false;
    canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); lost = true; });   // deck.js then shows the CSS drawing instead
    return {
      size: function (W, H, D) { w = W; h = H; dpr = D; last = -1; },
      // By day the lines one step from the ground and the tint two; by night
      // two and three.
      recolour: function (p) { tones = { line: p.rgb(p.night ? 700 : 200), fill: p.rgb(p.night ? 600 : 300) }; last = -1; },
      draw: function (t) {
        if (lost || !w || !h || !tones) return;
        var now = moment(t, fabric.end);
        if (now === 0 && last === 0) return;                       // nothing on show, and the canvas is clear
        last = now;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0); gl.clearDepth(1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        if (now === 0) return;
        // The eye, turning about the vertical (z) and looking at the centre, a little below it as in the
        // clip. Each drawing starts from the first view: the eye returns while nothing is on show.
        var az = (START + TURN * (t % period(fabric.end))) * Math.PI / 180, el = ELEV * Math.PI / 180;
        var ex = DIST * Math.cos(el) * Math.cos(az), ey = DIST * Math.cos(el) * Math.sin(az), ez = DIST * Math.sin(el);
        var fx = -ex, fy = -ey, fz = -0.07 - ez, fl = Math.hypot(fx, fy, fz); fx /= fl; fy /= fl; fz /= fl;   // forward
        var sx = fy, sy = -fx, sl = Math.hypot(sx, sy); sx /= sl; sy /= sl;                                    // right: forward x up, up = z
        var ux = sy * fz, uy = -sx * fz, uz = sx * fy - sy * fx;                                               // up: right x forward
        view.set([sx, ux, -fx, 0, sy, uy, -fy, 0, 0, uz, -fz, 0,
                  -(sx * ex + sy * ey), -(ux * ex + uy * ey + uz * ez), fx * ex + fy * ey + fz * ez, 1]);
        var focal = Math.max(w, h) * dpr * DIST / SPAN, near = DIST - 3, far = DIST + 3;                       // the weave lies within 2.2 of its centre
        proj.set([2 * focal / canvas.width, 0, 0, 0, 0, 2 * focal / canvas.height, 0, 0,
                  0, 0, (far + near) / (near - far), -1, 0, 0, 2 * far * near / (near - far), 0]);
        gl.useProgram(prog);
        gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LESS); gl.disable(gl.BLEND);
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.enableVertexAttribArray(A.p); gl.vertexAttribPointer(A.p, 3, gl.FLOAT, false, 32, 0);
        gl.enableVertexAttribArray(A.t); gl.vertexAttribPointer(A.t, 3, gl.FLOAT, false, 32, 12);
        gl.enableVertexAttribArray(A.sb); gl.vertexAttribPointer(A.sb, 2, gl.FLOAT, false, 32, 24);
        gl.uniformMatrix4fv(U.view, false, view); gl.uniformMatrix4fv(U.proj, false, proj);
        gl.uniform1f(U.R, R); gl.uniform1f(U.focal, focal); gl.uniform1f(U.now, now); gl.uniform1f(U.px, dpr);
        gl.uniform3f(U.line, tones.line[0], tones.line[1], tones.line[2]);
        gl.uniform4f(U.tint, tones.fill[0] * FILL, tones.fill[1] * FILL, tones.fill[2] * FILL, FILL);   // premultiplied
        for (var y = 0; y < fabric.yarns; y++) if (fabric.start[y] < now) gl.drawArrays(gl.TRIANGLE_STRIP, 2 * y * fabric.M, 2 * fabric.M);
      }
    };
  };
})();
