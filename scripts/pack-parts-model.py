#!/usr/bin/env python3
"""Pack a multi-part model for the AIM part viewer (format aim-parts/1).

    python3 scripts/pack-parts-model.py raw_material/parts/<model-id> [--out FILE]
    npm run parts-model -- raw_material/parts/<model-id>

The folder holds a manifest, model.json, and one mesh file per part: STL, OBJ,
PLY, GLB/GLTF, 3MF or OFF, anything trimesh reads. Export each part from CAD in
the assembly's shared coordinate frame. The manifest:

{
  "title": "Sand casting mold",
  "summary": "One sentence shown under the title.",
  "units": "mm", "up": "y",
  "groups": [{"id": "Flask"}, {"id": "Mold"}, {"id": "Metal", "material": "metal"}],
  "views": {"iso": [0.62, 0.5, 1], "front": [0, 0.04, 1]},
  "parts": [
    {"file": "cope-flask.stl", "name": "Cope flask", "group": "Flask", "color": "#2e4f5a", "explode": 380},
    {"file": "sprue.stl", "cutaway": "sprue.cut.stl", "name": "Sprue", "group": "Metal",
     "subgroup": "Gating system", "color": "#7a4a2a", "explode": [0, 140, 0]}
  ]
}

Per part only "file" and "name" are required. "explode" is a distance along the
up axis, or an [x, y, z] offset, that the part moves at full explode. "cutaway"
names the mesh shown when the viewer's Cutaway is on: export it from CAD with
the section already removed (a plain clipping plane would show hollow shells).
"material" is matte (default), metal or sand. "opacity" (0-1) makes a part
translucent, "visible": false starts it hidden (unchecked in the tree). "smooth"
is the crease angle in degrees below which neighbouring faces shade smoothly
(default 30; 0 = flat).
Group entries may carry a "label" and a default "material".

Output: src/resources/sims/parts/<model-id>.json. The Teaching page list and the
viewer's model menu include it at the next site build. Full format notes:
scripts/PARTS-FORMAT.md.
"""
import argparse, base64, json, sys
from pathlib import Path

try:
    import numpy as np
    import trimesh
except ImportError:
    sys.exit("needs numpy and trimesh:  python3 -m pip install numpy trimesh")

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "src" / "resources" / "sims" / "parts"


def load_mesh(path: Path, smooth_deg: float):
    m = trimesh.load(path, force="mesh")
    if smooth_deg and smooth_deg > 0:
        angle = np.radians(smooth_deg)
        try:
            m = trimesh.graph.smooth_shade(m, angle=angle)
        except Exception:
            m = m.smoothed(angle=angle)
    elif smooth_deg == 0:  # flat shading: every face its own vertices
        m = trimesh.Trimesh(vertices=m.vertices[m.faces].reshape(-1, 3),
                            faces=np.arange(len(m.faces) * 3).reshape(-1, 3), process=False)
    return m


def encode(m):
    v = np.ascontiguousarray(m.vertices, dtype="<f4")
    if len(v) <= 65535:
        idx, kind = np.ascontiguousarray(m.faces, dtype="<u2"), "uint16"
    else:
        idx, kind = np.ascontiguousarray(m.faces, dtype="<u4"), "uint32"
    b64 = lambda a: base64.b64encode(a.tobytes()).decode("ascii")
    return {"positions": b64(v), "indices": b64(idx), "indexType": kind}, len(v), len(m.faces)


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("folder", help="folder with model.json and the mesh files")
    ap.add_argument("--out", help="output file (default src/resources/sims/parts/<model-id>.json)")
    args = ap.parse_args()
    folder = Path(args.folder).resolve()
    manifest_path = folder / "model.json"
    if not manifest_path.is_file():
        sys.exit(f"no manifest: {manifest_path}")
    mf = json.loads(manifest_path.read_text())
    model_id = mf.get("id") or folder.name
    out = Path(args.out).resolve() if args.out else OUT_DIR / f"{model_id}.json"

    parts, tv, tt = [], 0, 0
    for i, p in enumerate(mf.get("parts", [])):
        if "file" not in p or "name" not in p:
            sys.exit(f"part {i}: needs \"file\" and \"name\"")
        smooth = p.get("smooth", mf.get("smooth", 30))
        mesh, nv, nf = encode(load_mesh(folder / p["file"], smooth))
        tv += nv; tt += nf
        entry = {
            "id": p.get("id") or "".join(c if c.isalnum() else "-" for c in p["name"].lower()).strip("-"),
            "name": p["name"],
            "group": p.get("group", ""),
            "subgroup": p.get("subgroup"),
            "color": p.get("color", "#949AA4"),
            "explode": p.get("explode", 0),
            "mesh": mesh,
        }
        for key in ("material", "opacity", "visible"):
            if key in p:
                entry[key] = p[key]
        if p.get("cutaway"):
            entry["cutaway"], cv, cf = encode(load_mesh(folder / p["cutaway"], smooth))
        parts.append(entry)
        print(f"  {p['name']:28} {nv:7d} vertices {nf:7d} triangles" + ("  + cutaway" if p.get("cutaway") else ""))

    model = {
        "format": "aim-parts/1",
        "id": model_id,
        "title": mf.get("title", model_id),
        "summary": mf.get("summary", ""),
        "units": mf.get("units", "mm"),
        "up": mf.get("up", "y"),
        "groups": mf.get("groups", []),
        "views": mf.get("views", {}),
        "parts": parts,
    }
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(model, separators=(",", ":")))
    print(f"{out.relative_to(ROOT) if out.is_relative_to(ROOT) else out}: {len(parts)} parts, "
          f"{tv} vertices, {tt} triangles, {out.stat().st_size // 1024} KB")
    if out.parent == OUT_DIR:
        print("Rebuild the site (npm run build, or the running npm start) and the model appears on the Teaching page and in the viewer's model menu.")


if __name__ == "__main__":
    main()
