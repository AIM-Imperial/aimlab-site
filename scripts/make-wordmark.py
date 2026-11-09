#!/usr/bin/env python3
"""Writes src/_includes/partials/wordmark-drawn.njk: the wordmark's letters as SVG
paths from Megrim, in one line and in two, for the written-in title (site.css,
"The written wordmark"). Each letter is its pen strokes, drawn one after another
along the centre lines of the letter's lines, and its outline, which takes over
once the strokes are drawn.

The centre lines come from the glyphs themselves: each glyph is rasterised at one
pixel per font unit and thinned to its skeleton (scikit-image); the short spurs
that thinning leaves at corners are pruned; the skeleton is traced into lines
between its junctions, and at each junction the two lines that continue most
nearly straight on are joined into one stroke. A stroke is drawn from the end
that comes first in reading, the upper left; a closed stroke from its top, going
left. The strokes of a letter are drawn left to right, the higher first, each in
a time in proportion to its length. Megrim is monoline, so a round pen
as wide as its line retraces the letter.
Needs fontTools, numpy, OpenCV and scikit-image."""
import numpy as np, cv2, pathlib
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.recordingPen import RecordingPen
from skimage.morphology import skeletonize

SITE = pathlib.Path(__file__).resolve().parent.parent
f = TTFont(SITE / "src/assets/fonts/megrim-400.woff2")
cmap, gs, hmtx = f.getBestCmap(), f.getGlyphSet(), f["hmtx"]
UPEM = f["head"].unitsPerEm
ASC, DESC = f["hhea"].ascent, -f["hhea"].descent          # 880, 200
LINE = ASC + DESC                                           # the font's own line height
LS = -0.01 * UPEM                                           # the CSS letter-spacing, -0.01em
WORDS = ["Architected", "Intelligent", "Matter", "Laboratory"]
SUFFIX = {"Laboratory"}
MARGIN = 40          # raster margin, units
MIN_SPUR = 60        # skeleton branches shorter than this that end at a junction are pruned
STRAIGHT = 50        # two lines at a junction are one stroke if they turn by less than this, degrees
SHORTEST = 45        # shorter strokes are left to the pen's round ends, units
EPS = 1.6            # polyline tolerance, units
LIFT = 0.04          # the pause between two strokes, as a fraction of a letter's time

# ---- the skeleton ----------------------------------------------------------
def contours(ch, steps=12):
    """The glyph's contours as polylines in font units, curves flattened."""
    pen = RecordingPen(); gs[cmap[ord(ch)]].draw(pen)
    out, cur = [], []
    for op, pts in pen.value:
        if op == "moveTo": cur = [pts[0]]
        elif op == "lineTo": cur.append(pts[0])
        elif op == "qCurveTo":
            # TrueType: implied on-curve points between consecutive off-curve points;
            # a contour of off-curve points only starts at the midpoint of its last two
            ctrl = list(pts[:-1]); end = pts[-1]
            if end is None:
                end = ((ctrl[-1][0] + ctrl[0][0]) / 2, (ctrl[-1][1] + ctrl[0][1]) / 2)
                if not cur: cur = [end]
            if not cur: cur = [ctrl[0]]
            p0 = cur[-1]
            for i, c in enumerate(ctrl):
                nxt = ctrl[i + 1] if i + 1 < len(ctrl) else end
                mid = nxt if i + 1 == len(ctrl) else ((c[0] + nxt[0]) / 2, (c[1] + nxt[1]) / 2)
                for t in np.linspace(0, 1, steps + 1)[1:]:
                    cur.append(((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t * t * mid[0],
                                (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t * t * mid[1]))
                p0 = mid
        elif op == "curveTo":
            p0 = cur[-1]; c1, c2, p3 = pts
            for t in np.linspace(0, 1, steps + 1)[1:]:
                cur.append(((1-t)**3*p0[0] + 3*(1-t)**2*t*c1[0] + 3*(1-t)*t*t*c2[0] + t**3*p3[0],
                            (1-t)**3*p0[1] + 3*(1-t)**2*t*c1[1] + 3*(1-t)*t*t*c2[1] + t**3*p3[1]))
        elif op in ("closePath", "endPath"):
            if cur: out.append(cur); cur = []
    if cur: out.append(cur)
    return out

def raster(ch):
    """The glyph filled, one pixel per font unit, and the font position of pixel (0, 0)."""
    cs = contours(ch)
    allp = np.array([p for c in cs for p in c])
    x0, y0 = allp.min(0) - MARGIN; x1, y1 = allp.max(0) + MARGIN
    img = np.zeros((int(y1 - y0) + 1, int(x1 - x0) + 1), np.uint8)
    for c in cs:                                  # even-odd: each contour toggles
        poly = np.array([[p[0] - x0, y1 - p[1]] for p in c], np.int32).reshape(-1, 1, 2)
        m = np.zeros_like(img); cv2.fillPoly(m, [poly], 1); img ^= m
    return img, (x0, y1)

def trace(skel):
    """The lines of a skeleton image, as pixel paths (row, column) between its
    nodes (ends and junctions), after pruning its short spurs; and the nodes."""
    sk = skel.astype(np.uint8).copy()
    H, W = sk.shape
    def nbrs(y, x):
        return [(y + dy, x + dx) for dy in (-1, 0, 1) for dx in (-1, 0, 1)
                if (dy or dx) and 0 <= y + dy < H and 0 <= x + dx < W and sk[y + dy, x + dx]]
    for _ in range(4):
        for e in [(y, x) for y, x in zip(*np.nonzero(sk)) if len(nbrs(y, x)) == 1]:
            path, prev, cur = [e], None, e
            while True:
                nb = [n for n in nbrs(*cur) if n != prev]
                if len(nb) != 1 or len(path) > MIN_SPUR: break
                prev, cur = cur, nb[0]; path.append(cur)
            if len(path) <= MIN_SPUR and len(nbrs(*cur)) >= 3:
                for p in path[:-1]: sk[p] = 0
    deg = {(y, x): len(nbrs(y, x)) for y, x in zip(*np.nonzero(sk))}
    nodes = {p for p, d in deg.items() if d != 2}
    visited, lines = set(), []
    def walk(start, nxt):
        line, prev, cur = [start, nxt], start, nxt
        visited.add((start, nxt)); visited.add((nxt, start))
        while cur not in nodes and cur != start:
            nb = [n for n in nbrs(*cur) if n != prev]
            if not nb: break
            prev, cur = cur, nb[0]; line.append(cur); visited.add((prev, cur)); visited.add((cur, prev))
        return line
    for p in nodes:
        for n in nbrs(*p):
            if (p, n) not in visited: lines.append(walk(p, n))
    for p in list(deg):                           # closed loops without a node, such as an o
        if deg[p] == 2 and not any((p, n) in visited for n in nbrs(*p)):
            lines.append(walk(p, nbrs(*p)[0]) + [p])
    return lines, nodes

def join(lines, nodes):
    """Joins the lines into strokes: nodes within two pixels of each other are one
    junction, and at each junction the pairs of lines that turn least, by less
    than STRAIGHT, continue into each other."""
    nodes = sorted(nodes)
    root = {p: p for p in nodes}
    def find(p):
        while root[p] != p: p = root[p]
        return p
    for i, p in enumerate(nodes):
        for q in nodes[i + 1:]:
            if abs(p[0] - q[0]) <= 2 and abs(p[1] - q[1]) <= 2: root[find(p)] = find(q)
    junction = {p: find(p) for p in nodes}
    edges = [ln for ln in lines
             if not (len(ln) <= 6 and ln[0] in junction and junction[ln[0]] == junction.get(ln[-1]))]
    def heading(ln):                              # unit direction away from the line's first point
        q = ln[min(20, len(ln) - 1)]
        d = np.array([q[0] - ln[0][0], q[1] - ln[0][1]], float)
        n = np.hypot(*d)
        return d / n if n else d
    ends = {}
    for k, ln in enumerate(edges):
        for e, p in ((0, ln[0]), (1, ln[-1])):
            if p in junction: ends.setdefault(junction[p], []).append(((k, e), heading(ln if e == 0 else ln[::-1])))
    partner, pairs = {}, []
    for es in ends.values():
        for i in range(len(es)):
            for j in range(i + 1, len(es)):
                turn = np.degrees(np.arccos(np.clip(-np.dot(es[i][1], es[j][1]), -1, 1)))
                pairs.append((turn, es[i][0], es[j][0]))
    for turn, a, b in sorted(pairs):
        if turn > STRAIGHT: break
        if a not in partner and b not in partner: partner[a] = b; partner[b] = a
    used, out = set(), []
    def follow(k, e):
        path = []
        while k not in used:
            used.add(k)
            path.extend(edges[k] if e == 0 else edges[k][::-1])
            if (k, 1 - e) not in partner: break
            k, e = partner[(k, 1 - e)]
        return path
    for k in range(len(edges)):                   # open strokes, from a free end
        for e in (0, 1):
            if k not in used and (k, e) not in partner: out.append(follow(k, e))
    for k in range(len(edges)):                   # what is left goes round in a loop
        if k not in used: out.append(follow(k, 0))
    return out

def length(poly):
    return sum(np.hypot(b[0] - a[0], b[1] - a[1]) for a, b in zip(poly, poly[1:]))

_cache = {}
def strokes(ch):
    """The letter's strokes as polylines in font units, y up, in writing order."""
    if ch in _cache: return _cache[ch]
    img, (ox, oy) = raster(ch)
    out = []
    for path in join(*trace(skeletonize(img.astype(bool)))):
        if len(path) > 20 and max(abs(path[0][0] - path[-1][0]), abs(path[0][1] - path[-1][1])) <= 2:
            ring = path[:-1] if path[0] == path[-1] else path      # closed: from the top, going left
            k = min(range(len(ring)), key=lambda i: ring[i])
            ring = ring[k:] + ring[:k]
            if (ring[1][1], -ring[1][0]) > (ring[-1][1], -ring[-1][0]): ring = ring[:1] + ring[:0:-1]
            path = ring + ring[:1]
        else:                                     # open: from the end nearer the upper left
            (r0, c0), (r1, c1) = path[0], path[-1]
            if c0 + 0.5 * r0 > c1 + 0.5 * r1: path = path[::-1]
        pts = np.array([[c, r] for r, c in path], np.float32).reshape(-1, 1, 2)
        poly = [(ox + x, oy - y) for x, y in cv2.approxPolyDP(pts, EPS, False).reshape(-1, 2)]
        if length(poly) >= SHORTEST: out.append(poly)
    def order(poly):                              # left to right by the stroke's mean x, the higher first
        segs = list(zip(poly, poly[1:]))
        ls = [np.hypot(b[0] - a[0], b[1] - a[1]) for a, b in segs]
        mean_x = sum(l * (a[0] + b[0]) / 2 for l, (a, b) in zip(ls, segs)) / max(sum(ls), 1e-9)
        return mean_x - 0.25 * max(p[1] for p in poly)
    out.sort(key=order)
    return _cache.setdefault(ch, out)

def timing(polys):
    """Each stroke's start and duration as fractions of the letter's time."""
    ls = [length(p) for p in polys]
    avail = 1 - LIFT * (len(ls) - 1)
    t, out = 0.0, []
    for l in ls:
        d = avail * l / sum(ls)
        out.append((t, d)); t += d + LIFT
    return out

# ---- the SVG ----------------------------------------------------------------
fmt = lambda v: ("%.1f" % v).rstrip("0").rstrip(".")
fmt3 = lambda v: ("%.3f" % v).rstrip("0").rstrip(".") or "0"
def glyph_path(ch, x, baseline):
    pen = SVGPathPen(gs, ntos=fmt)
    gs[cmap[ord(ch)]].draw(TransformPen(pen, (1, 0, 0, -1, x, baseline)))
    return pen.getCommands()
def pen_paths(ch, x, baseline):
    polys = strokes(ch)
    return "".join('<path class="wordmark__pen" pathLength="1" style="--a:%s;--b:%s" d="M%s"/>'
                   % (fmt3(a), fmt3(b), " L".join(fmt(x + px) + " " + fmt(baseline - py) for px, py in poly))
                   for poly, (a, b) in zip(polys, timing(polys)))
def word_width(word): return sum(hmtx[cmap[ord(ch)]][0] + LS for ch in word)
SPACE = hmtx[cmap[ord(" ")]][0] + LS

def line_svg(lines, cls):
    widths = [sum(word_width(w) for w in ln) + SPACE * (len(ln) - 1) for ln in lines]
    W = max(widths); H = LINE * len(lines)
    out = ['<svg class="wordmark__drawn-svg %s" viewBox="0 0 %d %d" aria-hidden="true" focusable="false">' % (cls, round(W), H)]
    for li, ln in enumerate(lines):
        x = (W - widths[li]) / 2
        baseline = ASC + LINE * li
        for word in ln:
            out.append('<g class="wordmark__word%s">' % (" wordmark__word--suffix" if word in SUFFIX else ""))
            for i, ch in enumerate(word):
                out.append('<g class="wordmark__letter" style="--i:%d">%s<path class="wordmark__glyph" d="%s"/></g>'
                           % (i, pen_paths(ch, x, baseline), glyph_path(ch, x, baseline)))
                x += hmtx[cmap[ord(ch)]][0] + LS
            out.append('</g>')
            x += SPACE
    out.append('</svg>')
    return "\n".join(out), W, H

def main():
    one, W1, H1 = line_svg([WORDS], "wordmark__drawn-svg--one")
    two, W2, H2 = line_svg([WORDS[:2], WORDS[2:]], "wordmark__drawn-svg--two")
    head = ('{#- The wordmark written letter by letter on the title panel (site.css, "The\n'
            '    written wordmark"): the name as SVG paths from Megrim, in one line and in\n'
            '    two for narrow screens; each letter its pen strokes, with their start and\n'
            '    duration in the letter\'s time (--a, --b), and its outline. Generated by\n'
            '    scripts/make-wordmark.py; the text itself stays in the page beside it for\n'
            '    readers and search engines. -#}\n')
    (SITE / "src/_includes/partials/wordmark-drawn.njk").write_text(
        head + '<span class="wordmark__drawn" aria-hidden="true">\n' + one + "\n" + two + "\n</span>\n")
    print("one line: %d x %d units -> %.0f px wide at 31px; two lines: %d x %d -> %.0f px wide at 24px"
          % (W1, H1, W1 * 31 / UPEM, W2, H2, W2 * 24 / UPEM))
    print("strokes: " + ", ".join("%s %d" % (ch, len(_cache[ch])) for ch in sorted(_cache)))

if __name__ == "__main__":
    main()
