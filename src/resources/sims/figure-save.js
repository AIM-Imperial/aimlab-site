// Save PNG for the 2D solid mechanics applets, like the weave viewers: the drawing (the
// SVG #scene, its whole frame) drawn again at the chosen width and 300 dpi on a
// transparent background, in the colours on screen. The panel and the formula line under
// the drawing are not part of the picture.
(function () {
  var svg = document.getElementById('scene'), btn = document.getElementById('saveBtn'),
      mm = document.getElementById('pngMM'), info = document.getElementById('pngInfo');
  if (!svg || !btn || !mm) return;
  var DPI = 300;

  function size() {
    var vb = svg.viewBox.baseVal, w = Math.round(Math.min(300, Math.max(20, +mm.value || 100)) / 25.4 * DPI);
    return { w: w, h: Math.round(w * vb.height / vb.width) };
  }
  function showInfo() { var s = size(); info.textContent = 'PNG, ' + s.w + ' × ' + s.h + ' px at ' + DPI + ' dpi, transparent background.'; }
  mm.addEventListener('input', showInfo); showInfo();

  // The page's stylesheets do not apply inside an image, so the styles the drawing uses are
  // copied from the screen onto a copy of it. Paint servers in <defs> keep their display.
  var PROPS = ['fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray',
    'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'opacity', 'visibility',
    'font-family', 'font-size', 'font-style', 'font-weight', 'letter-spacing', 'text-anchor', 'dominant-baseline',
    'stop-color', 'stop-opacity', 'paint-order'];
  function inline(src, dst) {
    var cs = getComputedStyle(src), style = '';
    for (var i = 0; i < PROPS.length; i++) style += PROPS[i] + ':' + cs.getPropertyValue(PROPS[i]) + ';';
    if (cs.display === 'none' && !src.closest('defs')) style += 'display:none;';
    dst.setAttribute('style', style);
    dst.removeAttribute('class');
    for (var k = 0; k < src.children.length; k++) inline(src.children[k], dst.children[k]);
  }

  async function makePNG() {
    var s = size(), copy = svg.cloneNode(true);
    inline(svg, copy);
    copy.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    copy.setAttribute('width', s.w);
    copy.setAttribute('height', s.h);
    var url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(copy)], { type: 'image/svg+xml' }));
    try {
      var img = new Image();
      await new Promise(function (ok, bad) { img.onload = ok; img.onerror = function () { bad(new Error('the drawing could not be drawn')); }; img.src = url; });
      var c = document.createElement('canvas'); c.width = s.w; c.height = s.h;
      c.getContext('2d').drawImage(img, 0, 0, s.w, s.h);
      var blob = await new Promise(function (r) { c.toBlob(r, 'image/png'); });
      return withDpi(blob, DPI);
    } finally { URL.revokeObjectURL(url); }
  }

  // Marks a PNG with its resolution: a pHYs chunk (pixels per metre) after IHDR, in place
  // of any the encoder wrote.
  async function withDpi(blob, dpi) {
    var src = new Uint8Array(await blob.arrayBuffer()), ppm = Math.round(dpi / 0.0254);
    var chunk = new Uint8Array(21), dv = new DataView(chunk.buffer);
    dv.setUint32(0, 9); chunk.set([0x70, 0x48, 0x59, 0x73], 4);           // length 9, "pHYs"
    dv.setUint32(8, ppm); dv.setUint32(12, ppm); chunk[16] = 1;              // x, y; unit: metre
    dv.setUint32(17, crc32(chunk.subarray(4, 17)));
    var parts = [src.subarray(0, 8)];
    for (var p = 8; p < src.length;) {
      var len = new DataView(src.buffer, src.byteOffset + p, 4).getUint32(0), end = p + 12 + len;
      var type = String.fromCharCode.apply(null, src.subarray(p + 4, p + 8));
      if (type !== 'pHYs') parts.push(src.subarray(p, end));
      if (type === 'IHDR') parts.push(chunk);
      p = end;
    }
    return new Blob(parts, { type: 'image/png' });
  }
  function crc32(bytes) {
    var crc = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i++) { var c = (crc ^ bytes[i]) & 0xFF; for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; crc = (crc >>> 8) ^ c; }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  btn.addEventListener('click', async function () {
    btn.disabled = true;
    try {
      var blob = await makePNG(), a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = location.pathname.split('/').pop().replace(/\.html$/, '') + '.png';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    } catch (err) { info.textContent = 'Save failed: ' + err.message; console.error(err); }
    finally { btn.disabled = false; }
  });
  window.makeFigurePNG = makePNG;   // for scripts and tests
})();
