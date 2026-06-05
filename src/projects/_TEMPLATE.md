---
# ===========================================================================
# PROJECT TEMPLATE. Copy this file to create a research project.
#   1. Duplicate this file in src/projects/
#   2. Rename it like  cold-spray-repair.md  (becomes the URL /projects/cold-spray-repair/)
#   3. Fill in the fields below
#   4. DELETE the two "eleventyExcludeFromCollections" / "permalink" lines
# ---------------------------------------------------------------------------
# tags MUST match the theme spellings in src/_data/site.json -> "themes":
#   Deployable structures | Soft active matter | Architected materials | Robotic fabrication
# A project can have more than one tag (add more "  - " lines).
# hero image: put the file in src/assets/img/projects/ (~1200x900, 4:3, <300KB)
# order: lower numbers appear first in the grid.
# ===========================================================================
eleventyExcludeFromCollections: true
permalink: false

layout: layouts/project.njk
title: Full project title goes here
subtitle: One-line description shown under the title
tags:
  - Deployable structures
order: 99
hero: /assets/img/projects/your-image.jpg
heroAlt: Plain-text description of the image for accessibility
heroCaption: Optional caption shown under the big image on the project page.
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
Internal links use a path like /join/ ; external use the full https:// URL.
-->

