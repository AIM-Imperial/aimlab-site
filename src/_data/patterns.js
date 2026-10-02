// The line drawings behind the homepage title panel: every .svg in
// src/assets/img/patterns/, listed at build time. The homepage picks one at
// random on each visit (inline script in src/index.njk); the CSS default in
// site.css (body.is-deck) stands without JavaScript. To add a drawing, drop
// the file in the folder (viewBox cropped to the drawn area, metadata removed)
// and rebuild. Nothing else to edit.
const fs = require("fs");
const path = require("path");
module.exports = () => {
  const dir = path.join(__dirname, "..", "assets", "img", "patterns");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".svg")).sort().map((f) => "/assets/img/patterns/" + f);
};
