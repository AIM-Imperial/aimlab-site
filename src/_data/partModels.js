// =============================================================================
// Part-viewer models - every  src/resources/sims/parts/<id>.json  (the
// aim-parts/1 format, see scripts/PARTS-FORMAT.md). Read at build time for the
// Teaching page's list and for /sims/parts/index.json, whose first entry the
// viewer opens when its address names no model. Add a model file and both update.
// =============================================================================
const fs = require("fs");
const path = require("path");
const DIR = path.join(__dirname, "..", "resources", "sims", "parts");

module.exports = () => {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR)
    .filter((f) => f.endsWith(".json") && f !== "index.json")
    .map((f) => {
      const id = f.replace(/\.json$/, "");
      let data = {};
      try { data = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")); } catch (e) { console.warn(`[partModels] ${f}: ${e.message}`); }
      return {
        id,
        title: data.title || id,
        summary: data.summary || "",
        parts: Array.isArray(data.parts) ? data.parts.length : 0,
        url: `/sims/part-viewer.html?model=${encodeURIComponent(id)}`,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "en"));
};
