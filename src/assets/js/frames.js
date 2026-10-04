// Image frames (site.css "Image frames"; print.css for the sheets). Each framed
// image's frame takes the shade that stands out from the image: dark over a
// light image, light over a dark one. The image is read where the frame runs -
// a band round its displayed edge - and its mean brightness sets
// data-frame="dark" | "light" on the frame's holder.
(function () {
  var IMAGES = ".research-card__img img, .art-card__img img, .person-card__photo img, .course__media img, " +
               ".proj__hero-media img, .page__hero-media img, .cover-item img, .sheet__hero img, .sheet__theme-media img";
  var HOLDER = ".research-card, .art-card, .person-card, .course__media, .proj__hero-media, .page__hero-media, .cover-item, " +
               ".sheet__hero, .sheet__theme-media";
  var W = 48;                       // width of the sample, in pixels

  // img: the picture to read; shown: the element it is displayed in (the img
  // itself, or for a video the video element, whose poster frame is read).
  function classify(img, shown) {
    shown = shown || img;
    var holder = shown.closest(HOLDER);
    if (!holder || !img.naturalWidth) return;
    try {
      // The part of the image on show: object-fit: cover, centred.
      var bw = shown.clientWidth, bh = shown.clientHeight;
      if (!bw || !bh) return;
      var nw = img.naturalWidth, nh = img.naturalHeight, box = bw / bh, sx = 0, sy = 0, sw = nw, sh = nh;
      if (nw / nh > box) { sw = nh * box; sx = (nw - sw) / 2; } else { sh = nw / box; sy = (nh - sh) / 2; }
      var H = Math.max(8, Math.round(W / box));
      var canvas = document.createElement("canvas");
      canvas.width = W; canvas.height = H;
      var g = canvas.getContext("2d", { willReadFrequently: true });
      g.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
      var d = g.getImageData(0, 0, W, H).data;
      var band = Math.max(2, Math.round(W * 0.08)), sum = 0, n = 0;
      for (var y = 0; y < H; y++) {
        for (var x = 0; x < W; x++) {
          if (x >= band && x < W - band && y >= band && y < H - band) continue;   // the band only
          var i = 4 * (y * W + x), a = d[i + 3] / 255;
          sum += (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) * a + 255 * (1 - a);
          n++;
        }
      }
      holder.setAttribute("data-frame", sum / n > 140 ? "dark" : "light");
    } catch (e) {
      // An image from another site cannot be read; its frame keeps the default shade.
    }
  }

  document.querySelectorAll(IMAGES).forEach(function (img) {
    if (img.complete && img.naturalWidth) classify(img);
    else img.addEventListener("load", function () { classify(img); }, { once: true });
  });
  // Hero videos: their poster, which is the clip's first frame.
  document.querySelectorAll(".proj__hero-media video[poster]").forEach(function (video) {
    var poster = new Image();
    poster.onload = function () { classify(poster, video); };
    poster.src = video.getAttribute("poster");
  });
})();
