// =============================================================================
// About us photos - one carousel per folder inside  src/team/about-photos/ ,
// folders in name order, photos within a folder in file-name order. There is
// no list to maintain: make a folder (set-1, set-2, ...), put photos in it, and
// it is a carousel on the About page at the next build (the build copies the
// photos to /assets/img/about/). `npm run about-photos` prepares them from
// raw_material/about-us-images/ (resized, no metadata).
//
//   - Name folders and files so they sort as you want them.
//   - Photos left loose in about-photos/ (not in a folder) form one extra
//     carousel.
//   - Landscape photos suit the 3:2 tiles; 1200-1600 px on the long side.
//   - Chapters: a heading over a run of carousels. List the folders under a
//     title in `chapters` below, in the order they should appear. Folders not
//     listed under any chapter follow the chapters, without a heading.
//   - A title and a line of description above a carousel, and a caption under
//     a photo, are optional: one line each below, keyed by the folder name or
//     by folder/file. Click a photo on the page to enlarge it.
// =============================================================================

const chapters = [
  { title: "University of Houston, 2021 to 2026", sets: ["set-1", "set-2", "set-3", "set-4"] },
];

const titles = {
  "set-1": "The spaces we were given",
  "set-2": "The first equipment",
  "set-3": "The lab benches",
  "set-4": "Moving into the new lab space",
};

const descriptions = {
  "set-1": "The rooms assigned to the group at the University of Houston, as we found them.",
  "set-2": "The first equipment to arrive, including a selective laser sintering (SLS) printer, a laser cutter and the Instron testing machine.",
  "set-3": "The lab benches, ordered for all the rooms, arrive and are installed.",
};

const captions = {
  // "set-1/set-1a.jpeg": "The machine shop on the first day.",
};

// --- Do not edit below. Reads the folders and pairs each with its text.
// Exported as a function so the folders are read again on every build: the
// local preview keeps this module cached between rebuilds, and a plain value
// would keep listing the photos from the first build.
const fs = require("fs");
const path = require("path");
const DIR = path.join(__dirname, "..", "team", "about-photos");
const IMAGE = /\.(jpe?g|png|webp|gif)$/i;
const byName = (a, b) => a.localeCompare(b, "en", { numeric: true });
const slug = (text) => String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function readSets() {
  if (!fs.existsSync(DIR)) return [];
  const entries = fs.readdirSync(DIR, { withFileTypes: true });
  const sets = [];
  const loose = entries.filter((e) => e.isFile() && IMAGE.test(e.name)).map((e) => e.name).sort(byName);
  if (loose.length) {
    sets.push({ name: "", title: titles[""] || "", description: descriptions[""] || "",
      photos: loose.map((f) => ({ src: f, caption: captions[f] || "" })) });
  }
  entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => e.name)
    .sort(byName)
    .forEach((dir) => {
      const files = fs.readdirSync(path.join(DIR, dir)).filter((f) => IMAGE.test(f)).sort(byName);
      if (!files.length) return;
      sets.push({ name: dir, title: titles[dir] || "", description: descriptions[dir] || "",
        photos: files.map((f) => ({ src: dir + "/" + f, caption: captions[dir + "/" + f] || "" })) });
    });
  return sets;
}

module.exports = () => {
  const sets = readSets();
  const lookup = new Map(sets.map((s) => [s.name, s]));
  const used = new Set();
  const out = [];
  for (const ch of chapters) {
    const members = ch.sets.map((n) => lookup.get(n)).filter(Boolean);
    members.forEach((s) => used.add(s.name));
    if (members.length) out.push({ title: ch.title, id: slug(ch.title), sets: members });
  }
  const rest = sets.filter((s) => !used.has(s.name));
  if (rest.length) out.push({ title: "", id: "", sets: rest });
  return { chapters: out, sets };
};
