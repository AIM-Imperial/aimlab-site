---
# ===========================================================================
# ART PROJECT TEMPLATE — copy this file to create an Art-side project.
#   1. Duplicate this file in src/art/
#   2. Rename it like  beaded-metamaterials.md  (becomes /art/beaded-metamaterials/)
#   3. Fill in the fields below
#   4. DELETE the two "eleventyExcludeFromCollections" / "permalink" lines
# ---------------------------------------------------------------------------
# Art projects render on a DARK page with the amber accent (always). They appear
# as tiles in the gallery on the Art-side homepage and link to their own page.
# - layout MUST be layouts/art.njk
# - tags are free-form labels (e.g. Textiles, Surfaces) — NOT the science themes.
# - hero image goes in src/assets/img/art/ (landscape, ~1200px wide, <300KB)
# - order: lower numbers appear first in the gallery.
# ===========================================================================
eleventyExcludeFromCollections: true
permalink: false

layout: layouts/art.njk
title: Title of the piece
subtitle: One-line tagline
tags:
  - Textiles
  - Networks
dates: 2024 → 2025
collaborators: Name One, Name Two
order: 99
hero: /assets/img/art/your-image.jpg
heroAlt: Plain-text description of the image
heroCaption: Optional caption shown under the hero image.
links:
  - label: Related paper
    url: "#"
---

Write the piece's narrative here — the idea, the making, what it explores.
Plain paragraphs. Use `## subheadings` for sections.
