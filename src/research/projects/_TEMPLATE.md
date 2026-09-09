---
# ===========================================================================
# PROJECT TEMPLATE. Copy this file to create a research project.
#   1. Duplicate this file in src/research/projects/
#   2. Rename it like  cold-spray-repair.md  (becomes the URL /projects/cold-spray-repair/)
#   3. Fill in the fields below
#   4. DELETE the two "eleventyExcludeFromCollections" / "permalink" lines
# ---------------------------------------------------------------------------
# tags: use the spellings in src/_data/site.json -> "themes" so the Research
# page filter groups them; a tag not in that list still appears, appended
# alphabetically. A project can have more than one tag (add more "  - " lines).
# hero image: src/assets/img/projects/<this file's name>/hero.jpg (1200x900, 4:3, <300KB)
# layout and URL come from projects.json in this folder; do not add them here.
# ===========================================================================
eleventyExcludeFromCollections: true
permalink: false

title: Full project title goes here
subtitle: One-line description shown under the title
tags:
  - Deployable structures
# featured: true   <- give this to EXACTLY ONE project: it leads the homepage
#                     and the Research grid. Everything else sorts by recency:
#                     ongoing first, then by end year, then start year.
hero: /assets/img/projects/your-image.jpg
heroAlt: Plain-text description of the image for accessibility
heroCaption: Optional caption shown under the big image on the project page.
start: 2025          # year the project began
# end: 2026          # add when finished; omit while ongoing ("present")
collaborators: Name One, Name Two
links:
  - label: Code
    url: "#"
publications:
  - authors: "Wang Y, et al."
    title: "Title of a related paper."
    venue: "<em>Journal Name</em>, year."
    url: ""   # link to the PDF (e.g. a Google Drive share link); shows as a "PDF" link
---

Write the project description here, in plain paragraphs. This text becomes the
body of the project's own page. Two or three short paragraphs is plenty. Link
to the paper for the full detail.

## Method

Brief description of the approach.

## What we are doing next

Brief outlook.

<!--
EXTRA IMAGES inside the body, two ways:

1. Plain image (fills the text column, no caption):
   ![Alt text describing the image](/assets/img/projects/detail-1.jpg)

2. Image WITH a visible caption (optional add class="wide" to go wider):
   <figure class="project-figure">
     <img src="/assets/img/projects/detail-2.jpg" alt="Alt text">
     <figcaption>Your caption here.</figcaption>
   </figure>

LINKS at the bottom of the page come from the "links:" list in the front-matter
above. Add as many label/url pairs as you want (Paper, Code, Video, etc.).
Internal links use a path like /join-us/ ; external use the full https:// URL.
-->

