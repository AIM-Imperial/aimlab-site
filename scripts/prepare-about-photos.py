#!/usr/bin/env python3
"""Prepare About-page photos.

Reads raw_material/about-us-images/ and writes web-ready copies into
src/team/about-photos/, one folder per carousel:

  raw_material/about-us-images/set-1a.jpeg   ->  src/team/about-photos/set-1/set-1a.jpeg
  raw_material/about-us-images/set-2/x.jpeg  ->  src/team/about-photos/set-2/x.jpeg
  raw_material/about-us-images/other.jpeg    ->  src/team/about-photos/other.jpeg  (loose photos: one extra carousel)

Each copy is rotated upright, resized to at most 1600 px on the long side and
saved as JPEG (quality 82) with no metadata, so the GPS position and camera
details a phone writes into a photo never reach the site. Files that already
exist are skipped; pass --force to redo them.

  python3 scripts/prepare-about-photos.py [--force]
"""
import re, sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "raw_material" / "about-us-images"
DEST = ROOT / "src" / "team" / "about-photos"
LONG_SIDE = 1600
QUALITY = 82
IMAGE = re.compile(r"\.(jpe?g|png|heic)$", re.I)
SET_NAME = re.compile(r"^(set-[^/]+?)[a-z]\.(jpe?g|png)$", re.I)  # set-1a.jpeg -> set-1

def target_for(path: Path) -> Path:
    rel = path.relative_to(SRC)
    if len(rel.parts) > 1:                       # already in a folder: keep it
        return DEST / rel.parts[0] / (rel.stem + ".jpeg")
    m = SET_NAME.match(path.name)
    folder = m.group(1) if m else ""
    return DEST / folder / (path.stem + ".jpeg")

def prepare(path: Path, out: Path) -> int:
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)             # bake the rotation in
    im = im.convert("RGB")
    im.thumbnail((LONG_SIDE, LONG_SIDE), Image.LANCZOS)
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)  # no exif= : metadata dropped
    return out.stat().st_size

def main() -> None:
    force = "--force" in sys.argv
    if not SRC.is_dir():
        sys.exit(f"no source folder: {SRC}")
    files = sorted(p for p in SRC.rglob("*") if p.is_file() and IMAGE.search(p.name))
    done = skipped = 0
    for p in files:
        out = target_for(p)
        if out.exists() and not force:
            skipped += 1
            continue
        size = prepare(p, out)
        print(f"{p.relative_to(SRC)}  ->  {out.relative_to(ROOT)}  ({size // 1024} KB)")
        done += 1
    print(f"{done} written, {skipped} already present (use --force to redo)")

if __name__ == "__main__":
    main()
