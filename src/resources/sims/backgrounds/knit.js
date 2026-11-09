// The knit behind the homepage title, one of the drawings that deck.js runs
// there: the jersey of the knit viewer, knit-viewer.html in the folder above,
// with the viewer's default settings (6 rows of 6 loops, single layer, the yarn
// of 3 fibres), knitted in real time. It starts with the first row knitted;
// the yarn's parameter t then runs along the second row from right to left,
// turns, runs along the next from left to right, and so on up the fabric, all
// three fibres together. When the fabric is done it rests, is unravelled the
// same way backwards and faster down to the first row, and is knitted again. The fabric is centred on the panel and covers it, running past its
// edges. Seen from the front as a line drawing in the greys of the current
// palette: each fibre a band as wide as the fibre, its edges drawn as lines
// and its face a faint tint, the nearer fibres hiding the farther (WebGL with a
// depth test). The geometry is the viewer's own (knit-core.js), and the bands
// follow the same Catmull-Rom curve through the viewer's points as its tubes do.
(function () {
  "use strict";

  // ---- settings -----------------------------------------------------------
  var P = { l: 10, a: 1.5, h: 7.5, d: 2, w: 8.5, R: 0.65, r: 0.4, omega: 5,     // the viewer's defaults
            nFibers: 3, nRows: 6, nLoops: 6, S: 50, knit: "J", connected: true };
  var SIZE = 1.15;         // the fabric covers the panel, this much larger than it needs to be to just cover it
  var SPEED = 1.5;         // loops knitted per second
  var START = 1;           // rows knitted at the start, and left when it unravels
  var REST = 4;            // seconds at rest once knitted
  var BACK = 3;            // unravelling is this many times faster than knitting
  var WAIT = 1.2;          // seconds at rest unravelled before the knitting starts again
  var FILL = 0.18;         // opacity of a fibre's tint
  var SUB = 2;             // points along the curve for each step between the viewer's points

  // ---- the viewer's geometry (knit-core.js) ----------------------------------
  var G = window.KnitGeometry, V = G.V;

  // ---- the curve through the points (three.js's centripetal Catmull-Rom) ---
  function cubic(x0, x1, x2, x3, dt0, dt1, dt2) {
    var t1 = ((x1 - x0) / dt0 - (x2 - x0) / (dt0 + dt1) + (x2 - x1) / dt1) * dt1;
    var t2 = ((x2 - x1) / dt1 - (x3 - x1) / (dt1 + dt2) + (x3 - x2) / dt2) * dt1;
    return [x1, t1, -3 * x1 + 3 * x2 - 2 * t1 - t2, 2 * x1 - 2 * x2 + t1 + t2];
  }
  function smooth(pts, sub) {
    var out = [], n = pts.length;
    var d2 = function (p, q) { return (p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y) + (p.z - q.z) * (p.z - q.z); };
    for (var i = 0; i < n - 1; i++) {
      var p1 = pts[i], p2 = pts[i + 1];
      var p0 = i > 0 ? pts[i - 1] : V(2 * p1.x - p2.x, 2 * p1.y - p2.y, 2 * p1.z - p2.z);
      var p3 = i + 2 < n ? pts[i + 2] : V(2 * p2.x - p1.x, 2 * p2.y - p1.y, 2 * p2.z - p1.z);
      var dt0 = Math.pow(d2(p0, p1), 0.25), dt1 = Math.pow(d2(p1, p2), 0.25), dt2 = Math.pow(d2(p2, p3), 0.25);
      if (dt1 < 1e-4) dt1 = 1; if (dt0 < 1e-4) dt0 = dt1; if (dt2 < 1e-4) dt2 = dt1;
      var cx = cubic(p0.x, p1.x, p2.x, p3.x, dt0, dt1, dt2), cy = cubic(p0.y, p1.y, p2.y, p3.y, dt0, dt1, dt2), cz = cubic(p0.z, p1.z, p2.z, p3.z, dt0, dt1, dt2);
      for (var k = 0; k < sub; k++) {
        var u = k / sub, u2 = u * u, u3 = u2 * u;
        out.push(V(cx[0] + cx[1] * u + cx[2] * u2 + cx[3] * u3, cy[0] + cy[1] * u + cy[2] * u2 + cy[3] * u3, cz[0] + cz[1] * u + cz[2] * u2 + cz[3] * u3));
      }
    }
    out.push(pts[n - 1]);
    return out;
  }

  // ---- the fabric: each fibre a band, two vertices a point -----------------
  // Each vertex is x, y, z and the side of the band (-1 or 1). The band is as
  // wide as the fibre, square to the curve as seen from the front.
  var fabric = null;
  function build() {
    var fibres = G.buildFibers(P, null).map(function (c) { return smooth(c, SUB); });
    var M = fibres[0].length, verts = new Float32Array(fibres.length * M * 8), k = 0;
    var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    fibres.forEach(function (q) {
      for (var j = 0; j < M; j++) {
        var a = q[Math.max(j - 1, 0)], b = q[Math.min(j + 1, M - 1)];
        var tx = b.x - a.x, ty = b.y - a.y, tl = Math.hypot(tx, ty) || 1, nx = -ty / tl * P.r, ny = tx / tl * P.r;
        verts[k++] = q[j].x + nx; verts[k++] = q[j].y + ny; verts[k++] = q[j].z; verts[k++] = 1;
        verts[k++] = q[j].x - nx; verts[k++] = q[j].y - ny; verts[k++] = q[j].z; verts[k++] = -1;
        x0 = Math.min(x0, q[j].x); x1 = Math.max(x1, q[j].x); y0 = Math.min(y0, q[j].y); y1 = Math.max(y1, q[j].y);
      }
    });
    return { verts: verts, fibres: fibres.length, M: M,
             box: [x0 - P.r, y0 - P.r, x1 + P.r, y1 + P.r],
             start: SUB * START * (P.nLoops * P.S + 1) };             // the points of the first START rows and their turns
  }

  // ---- the cycle: knitting, knitted, unravelling, empty ---------------------
  var KNIT = (P.nRows - START) * P.nLoops / SPEED, UNDO = KNIT / BACK, PERIOD = KNIT + REST + UNDO + WAIT;
  function knitted(t) {     // seconds from the start -> the fraction of the rows after the first START knitted
    var u = t % PERIOD;
    if (u < KNIT) return u / KNIT;
    u -= KNIT; if (u < REST) return 1;
    u -= REST; if (u < UNDO) return 1 - u / UNDO;
    return 0;
  }

  // ---- the drawing (deck.js) ----------------------------------------------
  var VS = "attribute vec4 a; uniform vec4 map; uniform float zs; varying float side;" +
           "void main() { side = a.w; gl_Position = vec4(a.x * map.x + map.z, a.y * map.y + map.w, -a.z * zs, 1.0); }";
  var FS = "precision mediump float; varying float side; uniform vec3 line; uniform vec4 tint; uniform float edge, aa;" +
           "void main() { gl_FragColor = mix(tint, vec4(line, 1.0), smoothstep(edge - aa, edge, abs(side))); }";
  var probe = null;
  function rgb(css) {       // any CSS colour -> [r, g, b] in 0..1
    probe = probe || document.createElement("canvas").getContext("2d");
    probe.clearRect(0, 0, 1, 1); probe.fillStyle = "#000"; probe.fillStyle = css; probe.fillRect(0, 0, 1, 1);
    var p = probe.getImageData(0, 0, 1, 1).data;
    return [p[0] / 255, p[1] / 255, p[2] / 255];
  }

  (window.deckDrawings = window.deckDrawings || {}).knit = function (canvas, panel) {
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
    var U = {}; ["map", "zs", "line", "tint", "edge", "aa"].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, fabric.verts, gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "a");
    var w = 0, h = 0, dpr = 1, tones = null, last = -1, lost = false;
    canvas.addEventListener("webglcontextlost", function (e) {     // deck.js then shows the CSS drawing instead
      e.preventDefault(); lost = true;
    });
    return {
      size: function (W, H, D) { w = W; h = H; dpr = D; last = -1; },
      // By day the lines one step from the ground and the tint two; by night
      // two and three.
      recolour: function (p) { tones = { line: rgb(p.grey(p.night ? 700 : 200)), fill: rgb(p.grey(p.night ? 600 : 300)) }; last = -1; },
      draw: function (t) {
        var n = fabric.start + Math.round(knitted(t) * (fabric.M - fabric.start));
        if (n === last || lost || !w || !h || !tones) return;
        last = n;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0); gl.clearDepth(1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        if (n < 2) return;
        var b = fabric.box, s = SIZE * Math.max(w / (b[2] - b[0]), h / (b[3] - b[1]));
        var cx = (b[0] + b[2]) / 2, cy = (b[1] + b[3]) / 2, half = P.r * s * dpr;   // the band's half width in device pixels
        gl.useProgram(prog);
        gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LESS); gl.disable(gl.BLEND);
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 16, 0);
        gl.uniform4f(U.map, 2 * s / w, 2 * s / h, -2 * s * cx / w, -2 * s * cy / h);
        gl.uniform1f(U.zs, 0.1);
        gl.uniform3f(U.line, tones.line[0], tones.line[1], tones.line[2]);
        gl.uniform4f(U.tint, tones.fill[0] * FILL, tones.fill[1] * FILL, tones.fill[2] * FILL, FILL);   // premultiplied
        gl.uniform1f(U.edge, 1 - dpr / half);                           // the edge lines are one CSS pixel wide
        gl.uniform1f(U.aa, 1 / half);
        for (var f = 0; f < fabric.fibres; f++) gl.drawArrays(gl.TRIANGLE_STRIP, 2 * f * fabric.M, 2 * n);
      }
    };
  };
})();
