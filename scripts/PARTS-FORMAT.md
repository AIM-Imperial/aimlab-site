# Part-viewer model format (aim-parts/1)

One viewer, `/sims/part-viewer.html`, shows every multi-part model on the site.
A model is one JSON file, `src/resources/sims/parts/<id>.json`, and the viewer
opens it at `/sims/part-viewer.html?model=<id>`. The site build lists every
file in that folder on the Teaching page and in `/sims/parts/index.json`, whose
first entry the viewer opens when the address names no model, so adding a
model is adding a file.

## The file

```json
{
  "format": "aim-parts/1",
  "id": "sand-casting-mold",
  "title": "Sand casting mold",
  "summary": "One sentence shown under the title and in the Teaching list.",
  "units": "mm",
  "up": "y",
  "groups": [{"id": "Flask"}, {"id": "Mold"}, {"id": "Metal", "material": "metal"}],
  "views": {"iso": [0.62, 0.5, 1], "front": [0, 0.04, 1]},
  "parts": [
    {
      "id": "cope-flask",
      "name": "Cope flask",
      "group": "Flask",
      "subgroup": null,
      "color": "#2e4f5a",
      "material": "matte",
      "opacity": 1,
      "visible": true,
      "explode": [0, 380, 0],
      "mesh":    {"positions": "<base64>", "indices": "<base64>", "indexType": "uint16"},
      "cutaway": {"positions": "<base64>", "indices": "<base64>", "indexType": "uint16"}
    }
  ]
}
```

| Field | Meaning |
|-------|---------|
| `format` | Always `aim-parts/1`. |
| `id`, `title`, `summary` | The id matches the file name. Title and summary appear in the viewer's panel and in the Teaching list. |
| `units`, `up` | Informational units; `up` is `x`, `y` or `z` (default `y`) and sets the direction of a scalar `explode`. |
| `groups` | Optional. The order of the groups in the parts tree; each entry may carry a `label` and a default `material`. Groups named only by parts are appended in order of first appearance. |
| `views` | Optional camera directions for the Reset (`iso`) and Front (`front`) buttons, as vectors from the centre towards the camera. |
| `parts[].name`, `group`, `subgroup` | The tree: group row, then the part rows, with an optional sub-group row (for example "Gating system"). |
| `parts[].color` | Hex colour of the part and of its swatch in the tree. |
| `parts[].material` | `matte` (default), `metal` or `sand`: the shading preset. |
| `parts[].opacity` | Optional, 0 to 1. Below 1 the part is translucent, for an enclosure that should not hide what is inside. |
| `parts[].visible` | Optional. `false` starts the part hidden (unchecked in the tree). |
| `parts[].explode` | Where the part moves at full explode: a distance along `up`, or an `[x, y, z]` offset in model units. |
| `parts[].mesh` | The part's geometry. |
| `parts[].cutaway` | Optional. The geometry shown when Cutaway is on. Parts without one stay whole; an empty mesh (`"positions": ""`) means the section removes the part entirely. The Cutaway toggle is hidden when no part has one. |

## Mesh encoding

A mesh is a triangle list with shared vertices:

- `positions`: base64 of a little-endian `float32` array, `x y z` per vertex, in model units in the assembly's shared frame.
- `indices`: base64 of a little-endian `uint16` array (when there are at most 65535 vertices) or `uint32`, three vertex indices per triangle. Say which with `indexType`.
- `normals` (optional): base64 `float32`, one per vertex. Without it the viewer computes smooth normals, so split vertices along sharp creases (the packer does this at 30 degrees) if you want hard edges.

The viewer frames the assembly from its bounding box: the camera distance, zoom limits, the explode camera follow and the outline threshold all come from the file. There are no model-specific numbers in the viewer.

## Making a file

**From CAD exports** (the usual route): put the meshes and a `model.json`
manifest in `raw_material/parts/<id>/` and run

```
npm run parts-model -- raw_material/parts/<id>
```

The manifest lists the parts with their file names and the fields above; the
script (`scripts/pack-parts-model.py`, its header documents the manifest)
reads any format trimesh opens, splits crease vertices, encodes the buffers and
writes `src/resources/sims/parts/<id>.json`. Export a cutaway part from CAD
with the section already removed, as a second file named in `"cutaway"`.

**Directly**: any language can write the file. Encode the arrays as described
and follow the schema; the packer is a 100-line example.

## Offline use

The viewer fetches its model, which browsers refuse for a page opened from
disk. For a copy that works offline, paste the model into the page as
`<script type="application/json" data-model>…</script>` before the viewer's
own scripts; it is then used instead of the network. Keep `applet.css`, the
shared stylesheet, next to the page.

## Compatibility

The keys of the first offline viewer, `full`/`cut` with `p`, `i`, `u16`, and
`sub`, are still read, so its data drops in unchanged.
