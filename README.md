# AIM Lab website

Source for [aimlab.uk](https://aimlab.uk). It is a static site built with
Eleventy: the content is plain text files, and GitHub rebuilds the site every
time a change is committed to `main`. Editing a file on github.com is enough;
nothing needs to be installed.

---

## Where things live

The source folder mirrors the site menu. Each top-level folder is one menu
item and holds that section's pages and its content files.

```
src/
  index.njk                 homepage (the full-screen project deck)
  404.md  robots.njk  sitemap.njk  CNAME     site plumbing, leave alone
  _data/                    site.json (name, nav, pill rows, themes) and the lists:
                            newsData.js, alumni.js, album.js, aboutPhotos.js, covers.js
  _includes/                layouts and partials (templates), redesign only
  assets/                   css/, js/, fonts/, img/ (images in subfolders by section;
                            img/projects/draft/ holds draft projects' images, gitignored)
scripts/                    publish-draft.js (moves a draft project live), prepare-about-photos.py (About photos from raw_material/),
                            pack-parts-model.py + PARTS-FORMAT.md (models for the 3D part viewer)

  news/                     index.njk -> /news/    press.njk -> /press/
    press/                  one .md per press item
  team/                     index.njk -> /team/    contact.njk    about-us.njk -> /about-us/
    people/                 one .md per team member
    about-photos/           the About page's photos: one folder per carousel
  research/                 index.njk -> /research/    vision.md    publications.njk
                            (vision.md: the Themes rows come from its `researchThemes`
                            front matter; each names a project whose card image and page it uses)
                            vision-print.njk -> /research/vision/print/: the lab's one-page
                            A4 sheet (logo, name, the first paragraph of vision.md, the Themes,
                            a QR code to aimlab.uk in assets/img/research/QR.svg); linked from
                            the vision page by its `printSheet` front matter
    projects/               one .md per project -> /projects/<file name>/
      draft/                projects in progress: built locally, gitignored, never live
    publications/           one .md per paper
  teaching/                 index.njk -> /teaching/    projects.njk -> /teaching/projects/
    student-projects/       one .md per FYP/MSc project on offer
  resources/                index.njk -> /resources/
    sims/                   the mechanics applets and their derivation PDFs -> /sims/;
                            part-viewer.html and parts/<id>.json, the 3D part viewer and its models;
                            blade-shape.html, the five-parameter turbine blade applet;
                            applet.css, the styles shared by the 3D applets (part viewer, blade shape, knit, weave)
  join-us/                  index.njk -> /join-us/    vacancies.njk -> /join-us/vacancies/    phd-fellowships.md -> /join-us/phd-fellowships/    postdoc-fellowships.md -> /join-us/postdoc-fellowships/
    vacancies/              one .md per advertised position
  gallery/                  index.njk -> /gallery/    about.md -> /about/   (Art mode)
    art/                    one .md per studio piece -> /art/<file name>/
```

A page's address is its path inside `src/` unless its front matter has a
`permalink` line (contact, press, publications, about, about-us keep their
short addresses that way). The item folders never produce pages of their own:
a small `.json` file in each one says how the files are used. Addresses did not
change in the September 2026 reorganisation.

Each item folder has a `_TEMPLATE.md` to copy as a starting point. Duplicate
it, rename it, fill in the fields, and delete the two
`eleventyExcludeFromCollections` / `permalink` lines at the top (those only keep
the template itself off the live site).

---

## How a page is made

Every page is one file. The block between the `---` lines at the top is the
front matter: settings the templates read. Everything below it is the body.

There are two kinds of page file, and both are declared the same way:

- **Markdown (`.md`)** for prose: paragraphs, `##` headings, lists, images.
  Use this for any page that is text. The body is placed in the prose column.
- **Nunjucks (`.njk`)** when the body needs a loop over a list (projects,
  people, papers), a filter bar, or a map. The body is HTML with template tags
  and is placed as written.

Both start with `layout: layouts/page.njk`, which draws the shared header from
these fields:

| Field | What it does |
|-------|--------------|
| `title` | Page title, also the browser tab. Required. |
| `heading` | Optional. The visible title when it should differ from `title`. |
| `lede` | One or two sentences beside the title. HTML links allowed. |
| `sections` | Optional. The on-page sections shown in the section row (see below). |
| `hero`, `heroAlt`, `heroCaption` | Optional full-width figure under the header. |
| `permalink` | Optional. Only when the address differs from the file's path. |

The pill row is not written in the page. The folder's data file, for example
`research/research.json`, sets `submenu`, and the pills come from that list in
`site.json`. Any file added to the folder gets the same pills.

Pages are not styled individually. All styles live in `assets/css/site.css`;
pages only carry class names.

### The three menus

1. **Main menu**: the items in the header, from `nav` in `site.json`.
2. **Pill row**: the pages of one section, e.g. Projects | Research vision |
   Publications. From `submenus` in `site.json`. Pages only, never anchors.
   A section with a single page shows no pill row.
3. **Section row**: the parts of the current page, in small capitals under the
   pills. From the page's own `sections` list. Write each entry as the heading
   text; the link target is derived from it the same way Markdown headings get
   their ids (lowercase, hyphens, apostrophes dropped), so `## Course
   modules` and `- Course modules` meet. When a Nunjucks page uses its own
   `id`, write `- label: PhD students` / `  id: phd` instead. Every listed
   section after the first is preceded by a "Top" link and a rule, and the
   page ends with a "Top" link; these are generated, so do not write them in
   the body.

---

## Quick reference: the things you'll do most often

### Image sizes

Cards crop images to a fixed shape (the CSS centre-crops to the aspect ratio
below), so the **ratio** matters most - match it and nothing distorts. Export at
the pixel size given (roughly 2x the on-screen size, so it stays sharp on retina
displays). Use **JPEG, under ~300KB each** (PNG only for the share image).

| Image | Aspect ratio | Export at | Goes in |
|-------|--------------|-----------|---------|
| Project hero (`hero.jpg`) | - | - | no longer displayed: the project page, the Research grid cards, the homepage and the print sheet all use `hero-large.jpg`; the `hero:` line in the front matter still names the folder |
| Project image everywhere: homepage panel, project page, grid card, print sheet | 16:9 landscape | 1920 x 1080 | the project's image folder, named `hero-large.jpg`. For a project with a `hero-deck.mp4` it MUST be the video's first frame (`ffmpeg -i hero-deck.mp4 -vf "select=eq(n\,0)" -frames:v 1 -q:v 3 hero-large.jpg`) so the still and the video hand over invisibly |
| Art hero (also used as the gallery card) | 4:3 landscape | 1200 x 900 | `src/assets/img/art/<piece>/` |
| Project body images | any ratio (fills the column) | 1600 px wide | the project's image folder |
| People photo | 2:3 portrait | 800 x 1200 | `src/assets/img/people/` |
| About page photo (carousel tile) | 3:2 landscape (others are centre-cropped) | 1200-1600 px on the long side | `src/team/about-photos/<carousel folder>/` - see "9. Add photos to About us" |
| Life-in-the-group photo (People page) | any | 1200 px on the long side | `src/assets/img/album/`, then one line in `src/_data/album.js` |
| Social share (OG) image | 1.91:1 | 1200 x 630 | `src/assets/img/og-image.jpg` |

Notes:
- **One image per project.** The `hero:` image is shown two ways: large at the top
  of the project page, and as a small 4:3 thumbnail on the Research grid (the card
  just downscales and crops the same file). Export it once at 1200 x 900 and it
  covers both.
- Because the card crops to 4:3, keep the important part of the image away from the
  edges.
- Each project has its own image subfolder, e.g. `src/assets/img/projects/3DP-knits/`,
  to keep the hero and any body images together. Name the folder after the
  project's `.md` file.
- `hero-deck.mp4` next to the image plays on the homepage panel, on hover inside the
  project's card on the Research page, and as the project page's hero, where it opens
  paused on the first frame with the browser's playback controls; a `hero.mp4` in the
  folder replaces it on the project page only.
  The homepage deck opens with a title panel (logo, name and menu centred on the page
  ground, a scroll hint at the bottom) and then shows one panel per project.
  Behind the title panel is one of the line drawings in `src/assets/img/patterns/`
  (knit, weave, felt, lace), traced as a slight rise in the page ground's saturation
  (a saturation blend, so the trace stays equally faint in light and dark mode and along
  the panel's gradient) and scaled to cover the window. One is chosen at random on each visit (the list is read from the folder at
  build time by `_data/patterns.js`). To add a drawing, put the `.svg` in that folder
  with its `viewBox` cropped to the drawn area and any `<metadata>` block removed, then
  rebuild; nothing else to edit. The no-JavaScript fallback is the knit, set in site.css.
  On wide screens the still and clip fill a project panel (cropped to cover).
  On narrow screens (any window narrow enough for the hamburger menu, the same
  breakpoint, so both change together) the panel shows the clip's central square
  instead, full width on the page ground, centred between the header and the title
  band. Keep the subject of each clip in the middle of the frame.
  No clip downloads with the page. Each clip starts loading when its panel is one
  screen away and is then marked for autoplay, so Safari starts it by itself as the
  panel becomes visible; the script also plays it as the panel comes on screen and
  pauses it as the panel leaves (mode.js). The title panel carries no clip: a clip
  that is on screen from the first paint never gets the "becomes visible" moment
  Safari waits for. Keep each clip short (about 10 s) and its bitrate modest:
  the whole set is downloaded by a visitor who scrolls the deck.

### 1. Add a news item

News is one list in `src/_data/newsData.js`. Add one line near the top:

```
  { date: "2026-09-15", title: "Yue defends her thesis on LCE actuator patterning." },
```

`date` (YYYY-MM-DD) sets the order and the displayed month. `title` may contain
HTML for links and italics: `'New paper in <em>Nature</em>. <a href="https://...">Read it</a>.'`
When the title contains double quotes, wrap the whole value in single quotes.
Commit; the site rebuilds in about a minute and the item appears on /news/.

### 2. Add a publication

One file per paper in `src/research/publications/`. Copy `_TEMPLATE.md` there,
rename it `year-month-citationtag.md` (e.g. `2026-05-wang2026deployable.md`,
the same tag as the PDF's filename on the lab's Google Drive), fill in the
fields, and delete the two `eleventyExcludeFromCollections` / `permalink`
lines. The page groups papers by `year` (newest first) and sorts by `month`
within a year. Set `doi` to make the title a link and `pdf` to show a PDF link.

### 3. Add a person

One file per person in `src/team/people/`, named like `20-jane-smith.md`. The
number controls ordering: PI is `00`, postdocs are `10`s, PhDs are `20`s,
MEng/UROP are `30`s.

```
---
name: "Jane Smith"
role: "PhD student"
order: 21
email: jane.smith@imperial.ac.uk
scholar: "https://scholar.google.com/citations?user=..."
website: ""
photo: "/assets/img/people/jane.jpg"
bio: "Jane works on bistable deployable lattices."
---
```

Upload the photo to `src/assets/img/people/` (lowercase, no spaces, 2:3 portrait,
about 800 x 1200, JPEG under 300KB). Alumni are a separate list in
`src/_data/alumni.js`.

### 4. Add a project

One file per project in `src/research/projects/`, named like `bistable-vhinge.md`
(the name becomes the address `/projects/bistable-vhinge/`). Copy `_TEMPLATE.md`
there; it explains every field. No `layout` line is needed: `projects.json` in
the folder supplies the layout and the address. Put the hero image in
`src/assets/img/projects/bistable-vhinge/hero.jpg`.

The body is Markdown. Extra images go in the body:

```
Plain image (fills the column):
![Alt text](/assets/img/projects/bistable-vhinge/detail-1.jpg)

Image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/bistable-vhinge/detail-2.jpg" alt="Alt text">
  <figcaption>Your caption.</figcaption>
</figure>
```

Links come from the `links:` list in the front matter (label/url pairs) and
appear as buttons at the bottom of the page. Related papers come from the
`publications:` list.

Projects have no manual ordering. The one project with `featured: true` leads
the homepage and the Research grid; the rest sort by recency using `start:` /
`end:` years. Omit `end` while a project is ongoing (it shows as "start-present"
and sorts to the top). To change the lead project, move the `featured: true` line.

Every project gets a panel on the homepage deck unless its front matter says
`showcase: false`. Such a project keeps its own page and its card on the
Research grid; only the homepage panel is dropped. The featured project is
always shown.

#### Draft projects

A project you are still writing can live in `src/research/projects/draft/`
instead. It builds in the local preview exactly like a published one, with its
page, its Research card, and its homepage panel, but the folder is gitignored,
so it is never pushed and never goes live. Put its images in
`src/assets/img/projects/draft/<slug>/` (also gitignored) and reference them
under that path. When it is ready:

```
npm run publish-draft <slug>
```

moves the file and its image folder up one level, rewrites the image paths in
the file, and leaves the result for you to check and commit. The folder's
`README.txt` repeats these steps.

Each project has a `tags:` list; these power the filter on the Research page.
Use the spellings in `src/_data/site.json` under `themes` so the filter buttons
come out in the intended order (a new tag still appears, appended
alphabetically).

### 5. Add a press item

One file per item in `src/news/press/`, named `YYYY-MM-DD-outlet-slug.md`. Copy
`_TEMPLATE.md` there. Fields: `date`, `outlet`, `title`, `url`, `image` (a
4:3 thumbnail in `src/assets/img/press/`), and `project` (a project's file name,
which also lists the item on that project page).

### 6. Add a student project (Teaching > Available projects)

One file per project in `src/teaching/student-projects/`, named by project
number (`TC08.md`). Front matter: `number` (ordering and anchor only), `title`,
`available` (`FYP/MSc`, `FYP`, or `MSc`), `supervisor`, `cosupervisors` (list),
`category` (list, e.g. Experimental / Design / Numerical / Analysis /
Computational / Manufacturing intensive), `software` (list). The body is the
description; `##` headings split a multi-part project (see TC03). Delete the
file when the project is taken.

### 7. Add a vacancy (Join us > Current vacancies)

One file per advertised PhD or postdoc position in `src/join-us/vacancies/`, in
the format of the Department of Aeronautics PhD adverts. Copy `TEMPLATE.txt`
there to a `.md` file and fill it in. Front matter: `title`, `level` (`PhD` or
`Postdoc`), and optionally `reference`, `start`, `closing` (the list sorts by
it), `duration`, `eligibility`, `supervisors` (list), `funding`, `requirements`
(list), `apply` (HTML), `link`, `admin`. With no files the page states that
there are no advertised vacancies. Delete the file when the position is filled.

### 8. Add a page

Create a `.md` file in the section's folder with the front matter fields from
"How a page is made" and write the body in Markdown. It gets the section's
pill row automatically. Add it to the section's list in `site.json` under
`submenus` so it appears as a pill on the other pages of the section. Add
`sections:` to give it a section row.

### 9. Add photos to About us

Photos live in `src/team/about-photos/`, one folder per carousel: make a folder
(`set-1`, `set-2`, ...), put photos in it, and it is a carousel on the page at
the next build, after the opening paragraph. Folders appear in name order;
inside a folder the photos run in file-name order (`set-1a.jpeg`,
`set-1b.jpeg`, ...). Photos left loose in `about-photos/` form one extra
carousel.

The easy route: drop the originals into `raw_material/about-us-images/` (named
`set-1a.jpeg`, `set-1b.jpeg`, ... or in a folder per set) and run

```
npm run about-photos
```

which writes upright, resized (1600 px), metadata-free JPEGs into the right
folders and skips ones already done. Phone originals carry GPS coordinates and
camera details; this step drops them, so do not copy originals in by hand.
Landscape photos suit the 3:2 tiles; others are centre-cropped in the tile and
shown whole when enlarged.

The words are in `src/_data/aboutPhotos.js`: a chapter heading over a run of
carousels (the `chapters` list names the folders under each heading, in
order; folders left out follow without a heading), and for each carousel an
optional title, a line of description and per-photo captions. Delete a file or folder to take it off the
page. The photos sit next to the page rather than under `assets/` so that
adding one rebuilds the page in the local preview; the build copies them to
`/assets/img/about/`. The preview does not rebuild on a deletion alone (an
Eleventy limit), so after removing a photo save any file, or restart
`npm start`, to see it go; the live build is always fresh. The People page's
"Life in the group" album is separate (`src/assets/img/album/` and
`src/_data/album.js`).


### 10. Add a model to the part viewer (Teaching > AE203)

One viewer shows every multi-part model; a model is one file in
`src/resources/sims/parts/`, in the format described in
`scripts/PARTS-FORMAT.md`. The usual route: export each part from CAD as a
mesh (STL, OBJ, GLB, ...) in the assembly's shared frame, put the files with a
`model.json` manifest (title, groups, and per part the file, name, group,
colour and explode offset) in `raw_material/parts/<id>/`, and run

```
npm run parts-model -- raw_material/parts/<id>
```

At the next build the model is listed in the AE203 course card on the Teaching
page and opens at `/sims/part-viewer.html?model=<id>`.
For a cutaway, export the sectioned part as a second file and name it in the
manifest's `"cutaway"`. Delete the JSON file to take a model down.

---

## Editing in the browser vs on your computer

**In the browser** (easiest): everything above can be done at github.com
without installing anything. Open the file, click the pencil icon, edit, commit.

**On your computer** (faster for big edits): clone this repo, run

```
npm install
npm start
```

You get a live preview at `http://localhost:8080` that updates as you save.
When you're happy, `git push` and the live site updates.

---

## Common mistakes & how to fix them

**The site didn't update after I committed.**
Go to the **Actions** tab on GitHub. If the latest run is red, click into it to see
the error. Usually it's a typo in YAML front matter - a missing quote or a stray
colon - or a missing comma or quote in one of the lists in `_data/`. Fix the
file, commit, and it rebuilds.

**An image isn't showing up.**
Check that the path in your Markdown matches the actual file location. Paths
start with `/assets/img/...` (with a leading slash). Filenames are case-sensitive.

**A news item is in the wrong place.**
The `date` on the line sets the order, newest first. Check it is `YYYY-MM-DD`.

**I deleted something I shouldn't have.**
Every change is in git. Go to the **History** tab on GitHub, find the commit
before the deletion, and restore the file from there.

---

## First-time setup (PI only - done once at launch)

1. Create a new GitHub repo called `aimlab-site` (or any name).
2. Upload all of these files (or push from your local clone).
3. In repo **Settings -> Pages**: set Source to "GitHub Actions".
4. In repo **Settings -> Pages**: under "Custom domain", enter `aimlab.uk`.
5. In your domain's DNS settings (Squarespace), create these records:
   - Type `A`, host `@`, value `185.199.108.153`
   - Type `A`, host `@`, value `185.199.109.153`
   - Type `A`, host `@`, value `185.199.110.153`
   - Type `A`, host `@`, value `185.199.111.153`
   - Type `CNAME`, host `www`, value `<your-github-username>.github.io`
6. Wait 10-60 minutes for DNS to propagate. Site is live at aimlab.uk.

---

## Design rules (read before redesigning anything)

- **Colour system (v4, Oct 2026 - two separate palettes, do not mix)**:
  BRAND does the website, the 3D applets and slide chrome: warm stone
  greys (a 10-rung `--grey-*` ramp, low chroma - the opposite temperature
  of the celadon figures), soft ink `#2C2721` and soft paper `#FAF8F7`
  (never absolute #000/#FFF in chrome), and iron oxide as the single accent
  (`--iron-*`: `#99522B` on light, stepped UP to `#ED9E76` on dark). There
  is no violet anywhere. v4 is v3.1 (cool slate greys, violet accent) turned
  warm: every rung keeps its lightness, so every contrast ratio is unchanged
  (ink on paper 14:1, muted text 5.5:1, links 5.5:1, 6.0:1 on dark). FIGURE
  is what objects are made of inside a figure: celadon surfaces
  (`--fig-cel-*`), true-black line work, iron callouts, true-white ground in
  both modes (figures never invert - on the grey page they read as plates),
  and the categorical series iron/petrol/moss/mulberry/amber
  (`--fig-series-1..5`). Celadon must NOT appear as page background, card
  fill, or body text - it lives inside figures only. One documented
  exception: the categorical tag tints (`--tag-*`, chips only). Components
  use semantic tokens (`--text`, `--text-muted`, `--surface`, `--border`,
  `--link`, `--accent`, `--focus`, `--figure-frame`, ...), never raw ramp
  values. Shading moves along one ramp's lightness, the accent stays
  within ~3x the surface chroma, and brand colour is never a colormap -
  quantitative fields stay on viridis or cividis. Light/dark follows the
  visitor's OS setting (`prefers-color-scheme`); dark grounds on grey 900
  `#373029`. Science vs
  Art is a content split, independent of appearance.
- **Two typefaces** (since Sep 2026): Megrim for display only - the
  wordmark, page titles, project titles, and deck titles - a skeletal
  constructed monoline, self-hosted as one 6KB WOFF2 in
  `src/assets/fonts/` (declared at the top of `site.css`; no third-party
  font requests). It has a single weight: display slots run at 400 and
  take their bold from `-webkit-text-stroke`, never a browser-synthesized
  bold. Everything else is Arial from the system - no serif, no other
  webfont. Ledes and deck subtitles are Arial italic. Text is 15px at
  1.55 line height; headings 1.2; figure captions, card by-lines and page
  descriptions 1.25.
- **Interior pages open with a centered title + short description** (the
  `page__title` / `page__lede` pattern drawn by `layouts/page.njk` from
  front matter). There is no banner system.
- **Three menus, fixed meanings**: main menu (sections), pill row (pages of
  a section), section row (parts of a page). Anchors never appear in the
  pill row.
- **Two modes only**: Science (light, typographic) and Art (dark, image grid).
  Internally the modes are coded as `research`/`gallery` in the CSS/JS - only
  the visible labels say Science/Art. The Science/Art toggle is temporarily
  hidden (commented out in `base.njk`; gallery pages still force gallery mode
  through `gallery/gallery.json`). Adding a third mode is a redesign, not a tweak.
- **Art Deco ornament** (since Oct 2026), in pewter (`--ornament`, grey 500,
  grey 600 on dark) with iron oxide only for the diamonds:
  - *Rules*: the page header divider and the footer (`.rule`) are three
    hairlines that fade at both edges, broken by an iron diamond inside an
    outline diamond; the generated section rules are a double hairline. Other
    block separators (a project's metadata table, related publications,
    press, previous/next, the year groups on News and Publications) keep the
    single grey hairline that fades at both edges (`--hairline`).
  - *Small text in tracked capitals*: the menu, the pill row (separated by
    small iron diamonds), the section row, labels, section headings,
    buttons, tags and back links. Body text stays in sentence case.
  - *Cut corners*: buttons and tags are bevelled where the browser supports
    `corner-shape` (square elsewhere). Card images, project and page heroes,
    and journal covers have their corners cut on the diagonal, with a
    rectangular hairline frame set in by a quarter of the cut whose corners
    poke out past the cuts; over the image the frame is dark on a light
    image and light on a dark one (`src/assets/js/frames.js` reads each image).
  - *Homepage title panel*: a frame with diagonal corners, filled with faint
    white (black on dark), and a rectangular frame inside it poking out past
    the cuts.
  - The printable sheets (`print.css`) use the same rule, capitals and image
    frames.
- **Video is never blended.** Images with a white background fold into the page
  with multiply blending in light mode; a video must not, because Safari applies
  a blend to a playing video only on some frames and it flickers. Clips in a
  project's body are plates in both modes (true-white ground, figure frame);
  the hero clip is framed with cut corners instead; and on the narrow
  homepage a light clip sits on a true-white fill instead of a blend.
- **Whitespace is the design.** When in doubt, leave more space.
