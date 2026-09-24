#!/usr/bin/env node
// Publish a draft project: npm run publish-draft <slug>
//
// Moves src/research/projects/draft/<slug>.md up to src/research/projects/,
// moves src/assets/img/projects/draft/<slug>/ up to src/assets/img/projects/,
// and rewrites the image paths inside the file to match. Commit afterwards.
const fs = require("fs");
const path = require("path");

const slug = process.argv[2];
if (!slug || /[\/\\]/.test(slug)) {
  console.error("Usage: npm run publish-draft <slug>   (the draft file's name without .md)");
  process.exit(1);
}
const root = path.resolve(__dirname, "..");
const draftMd = path.join(root, "src/research/projects/draft", slug + ".md");
const liveMd = path.join(root, "src/research/projects", slug + ".md");
const draftImg = path.join(root, "src/assets/img/projects/draft", slug);
const liveImg = path.join(root, "src/assets/img/projects", slug);

if (!fs.existsSync(draftMd)) { console.error("No draft found at " + path.relative(root, draftMd)); process.exit(1); }
if (fs.existsSync(liveMd)) { console.error(path.relative(root, liveMd) + " already exists; not overwriting."); process.exit(1); }
if (fs.existsSync(draftImg) && fs.existsSync(liveImg)) { console.error(path.relative(root, liveImg) + " already exists; not overwriting."); process.exit(1); }

let text = fs.readFileSync(draftMd, "utf8");
const from = "/assets/img/projects/draft/" + slug + "/";
const to = "/assets/img/projects/" + slug + "/";
const count = text.split(from).length - 1;
text = text.split(from).join(to);
fs.writeFileSync(liveMd, text);
fs.unlinkSync(draftMd);
console.log("moved  " + path.relative(root, draftMd) + "  ->  " + path.relative(root, liveMd));
if (count) console.log("rewrote " + count + " image path" + (count === 1 ? "" : "s") + " to " + to);
if (fs.existsSync(draftImg)) {
  fs.renameSync(draftImg, liveImg);
  console.log("moved  " + path.relative(root, draftImg) + "/  ->  " + path.relative(root, liveImg) + "/");
} else {
  console.log("no draft image folder at " + path.relative(root, draftImg) + " (nothing to move)");
}
console.log("Now check the page with npm start, then commit.");
