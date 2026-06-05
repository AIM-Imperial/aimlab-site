# AIM Lab website

This is the source for [aimlab.uk](https://aimlab.uk). It is a static site:
edits are plain text files, and GitHub rebuilds the site automatically every time
you save a change.

You do not need to know how to code to update this site. If you can edit a text
file in a web browser, you can update the website.

---

## Quick reference: the four things you'll do most often

**Tip:** each content folder has a `_TEMPLATE.md` file you can copy as a starting
point — `src/news/_TEMPLATE.md`, `src/projects/_TEMPLATE.md`, `src/people/_TEMPLATE.md`.
Duplicate it, rename it, fill in the fields, and delete the two
`eleventyExcludeFromCollections` / `permalink` lines at the top (those only keep
the template itself off the live site). The templates won't appear on the site.

### Image sizes

Cards crop images to a fixed shape (the CSS centre-crops to the aspect ratio
below), so the **ratio** matters most — match it and nothing distorts. Export at
the pixel size given (roughly 2× the on-screen size, so it stays sharp on retina
displays). Use **JPEG, under ~300KB each** (PNG only for the share image).

| Image | Aspect ratio | Export at | Goes in |
|-------|--------------|-----------|---------|
| Project hero (also used as the grid card) | 4:3 landscape | 1600 × 1200 | the project's image folder, named `hero.jpg` |
| Art hero (also used as the gallery card) | 4:3 landscape | 1600 × 1200 | `src/assets/img/art/` |
| Project body images | any ratio (fills the column) | 1600 px wide | the project's image folder |
| People photo | 2:3 portrait | 800 × 1200 | `src/assets/img/people/` |
| Social share (OG) image | 1.91:1 | 1200 × 630 (PNG) | `src/assets/img/og-image.png` |

Notes:
- **One image per project.** The `hero:` image is shown two ways: large at the top
  of the project page, and as a small 4:3 thumbnail on the Research grid (the card
  just downscales and crops the same file). You do **not** make a separate card
  image. Export it once at 1600 × 1200 and it covers both.
- Because the card crops to 4:3, keep the important part of the image away from the
  edges (e.g. don't put a face at the very top/bottom of a portrait).
- Each project has its own subfolder (e.g. `src/assets/img/projects/3DP-knits/`)
  to keep the hero and any body images together.

### 1. Add a news item

1. Go to the [news folder](../../tree/main/src/news) on GitHub.
2. Click **Add file → Create new file**.
3. Name the file with the date and a short slug, like `2026-09-15-yue-defends.md`.
   The `YYYY-MM-DD` at the front of the filename **is** the date — it sets both
   the displayed date and the order on the homepage. You don't write the date
   anywhere else.
4. Paste this and edit:

```
---
title: Yue defends her thesis on LCE actuator patterning.
---
```

5. Scroll down. Write a brief commit message ("add Yue defense news"). Click **Commit**.
6. Wait ~60 seconds. The site rebuilds. Your news item appears on the homepage.

You can use HTML inside `title` for links and emphasis:

```
title: New paper in <em>Nature</em>. <a href="https://...">Read it</a>.
```

### 2. Add a publication

Publications work like news: **one file per paper** in `src/publications/`. Copy
`src/publications/_TEMPLATE.md`, rename it, fill in the fields, and delete the two
`eleventyExcludeFromCollections` / `permalink` lines. The page groups papers by
`year` automatically (newest first); `order` sets the position within a year. Set
`doi` to make the title a link, and `pdf` to show a "PDF" link. A new year
appears automatically the first time a paper uses it — no need to add a heading.

### 3. Add a person

1. Go to the [people folder](../../tree/main/src/people).
2. Create a file like `20-jane-smith.md`. The number at the front controls
   ordering: PI is `00`, postdocs are `10`s, PhDs are `20`s, MEng/UROP are `30`s.
3. Paste this and edit:

```
---
name: "Jane Smith"
role: "PhD student"
order: 21
email: jane.smith@imperial.ac.uk
scholar: "https://scholar.google.com/citations?user=..."
website: ""
photo: "/assets/img/people/jane.jpg"
bio: "Jane works on bistable deployable lattices. Before joining the studio, she was at..."
---
```

4. To add a photo, upload it to `src/assets/img/people/` (use lowercase,
   no spaces, 2:3 portrait crop, ~800×1200px, JPEG under 300KB). Reference it in `photo:` above.
5. Commit.

### 4. Add a project

1. Go to the [projects folder](../../tree/main/src/projects).
2. Create a file like `bistable-vhinge.md`.
3. Use this template:

```
---
layout: layouts/project.njk
title: Project title
subtitle: One-line description
tags:
  - Deployable structures
order: 4
hero: /assets/img/projects/bistable-hero.jpg
heroAlt: Description of the image for accessibility
heroCaption: Optional caption shown below the image
collaborators: Person A, Person B
links:
  - label: Paper
    url: https://...
  - label: Code
    url: https://github.com/...
---

Body of the project page in Markdown. Plain paragraphs.

## A subheading

More content. Use `## subheadings` for sections.
```

4. Upload the hero image to `src/assets/img/projects/` (4:3 landscape,
   ~1200×900px, JPEG under 300KB).
5. Commit.

### Adding links to a news item

The news `title` accepts HTML, so put links right in it:

```
title: Our paper is out in <a href="https://www.nature.com/...">Nature Communications</a>.
```

Internal links use a path (no domain): `<a href="/join/">Join page</a>`.
Use `<em>...</em>` for italics (e.g. journal names). If a title containing a
link fails to build, wrap the whole value in single quotes:
`title: 'See <a href="...">here</a>.'`

### Adding more images or links to a project

**Links** come from the `links:` list in the front-matter — add as many
`- label:` / `url:` pairs as you want (Paper, Code, Video, Dataset…). They
appear as buttons at the bottom of the project page. Internal or external both work.

**Extra images** go in the body (below the `---`), two ways:

```
Plain image (fills the column):
![Alt text](/assets/img/projects/detail-1.jpg)

Image with a caption (add class="wide" to go wider than the text):
<figure class="project-figure">
  <img src="/assets/img/projects/detail-2.jpg" alt="Alt text">
  <figcaption>Your caption.</figcaption>
</figure>
```

Put the image files in `src/assets/img/projects/`, same as the hero.

---

## Editing in the browser vs on your computer

**On the browser** (easiest): all of the above can be done at github.com without
installing anything. Click the file, click the pencil icon, edit, commit.

**On your computer** (faster for big edits): clone this repo, run

```
npm install
npm run dev
```

You'll get a live preview at `http://localhost:8080` that updates as you save.
When you're happy, `git push` and the live site updates.

---


### Tagging projects (themes)

Each project has a `tags:` list in its front-matter — these power the theme filter
on the Research page. A project can have one or more. Example:

```
tags:
  - Deployable structures
  - Soft active matter
```

IMPORTANT: tag spelling must match exactly (including capitalization) for filtering
to work. The official set of themes lives in `src/_data/site.json` under "themes" —
the Research page filter buttons are generated from that list. To add a new theme:
1. Add it to the "themes" array in `src/_data/site.json`
2. Use the exact same spelling in any project's `tags:` list


## What lives where

```
src/
├── _data/site.json         ← lab name, email, social links, nav. Edit this if any of those change.
├── _includes/layouts/      ← page templates. Don't touch unless redesigning.
├── _includes/partials/     ← reusable bits. Same.
├── news/                   ← one .md file per news item.
├── projects/               ← one .md file per project.
├── people/                 ← one .md file per person.
├── publications.njk        ← single page, edited directly.
├── teaching.njk            ← single page, edited directly.
├── join.njk                ← single page, edited directly.
├── people.njk              ← list page, auto-generated from src/people/.
├── index.njk               ← homepage. The two modes (Research/Gallery) live here.
├── assets/css/site.css     ← all styles. Palette is locked at the top.
├── assets/js/mode.js       ← Research/Gallery mode toggle.
├── assets/img/             ← all images. Organize in subfolders.
└── CNAME                   ← tells GitHub Pages this is aimlab.uk. Don't delete.

.eleventy.js                ← config. You won't need to edit this.
.github/workflows/deploy.yml ← auto-deploy. Don't touch.
package.json                ← dependencies.
```

---

## Common mistakes & how to fix them

**The site didn't update after I committed.**
Go to the **Actions** tab on GitHub. If the latest run is red, click into it to see
the error. Usually it's a typo in YAML front-matter — a missing quote or a stray
colon. Fix the file, commit, and it'll rebuild.

**An image isn't showing up.**
Check that the path in your Markdown matches the actual file location. Paths
start with `/assets/img/...` (with a leading slash). Filenames are case-sensitive.

**The dates on news items are out of order.**
The `date:` in the front-matter controls order, not the filename. Make sure it's
in `YYYY-MM-DD` format with no quotes.

**I deleted something I shouldn't have.**
Every change is in git. Go to the **History** tab on GitHub, find the commit
before the deletion, and you can restore the file from there. Nothing is ever
truly lost.

---

## First-time setup (PI only — done once at launch)

1. Create a new GitHub repo called `aimlab-site` (or any name).
2. Upload all of these files (or push from your local clone).
3. In repo **Settings → Pages**: set Source to "GitHub Actions".
4. In repo **Settings → Pages**: under "Custom domain", enter `aimlab.uk`.
5. In your domain's DNS settings (Squarespace), create these records:
   - Type `A`, host `@`, value `185.199.108.153`
   - Type `A`, host `@`, value `185.199.109.153`
   - Type `A`, host `@`, value `185.199.110.153`
   - Type `A`, host `@`, value `185.199.111.153`
   - Type `CNAME`, host `www`, value `<your-github-username>.github.io`
6. Wait 10–60 minutes for DNS to propagate. Site is live at aimlab.uk.

---

## Design rules (read before redesigning anything)

- **Palette is four colors**: Black `#161A1D` and White `#FFFFFF` (primary),
  Blue `#0065FF` (Science accent) and Amber `#C8772E` (Art accent). Defined as CSS
  variables at the top of `site.css`. Keep black/white dominant; blue and amber are
  rare accents. Do not add new colors.
- **One typeface**: Arial, throughout. Do not add Google Fonts.
- **Interior pages have a blue banner**: each interior page (People, Publications,
  Teaching, Join) opens with a blue title banner. To set it, add `bannerTitle:` and
  `bannerText:` to the page's front-matter. Pages with no `bannerTitle` (like the
  homepage) get no banner. The banner is always blue in both modes.
- **Two modes only**: Science (light, typographic) and Art (dark, image grid).
  The toggle is in the top-right; nav lives in the hamburger menu. Internally the
  modes are still coded as `research`/`gallery` in the CSS/JS — only the visible
  labels say Science/Art. Adding a third mode is a redesign, not a tweak.
- **Whitespace is the design.** When in doubt, leave more space.
