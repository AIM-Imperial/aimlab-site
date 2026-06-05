---
layout: layouts/project.njk
title: Acoustic shaping of imperfect shells
subtitle: Using sound to sculpt defects into thin shells
tags:
  - Architected materials
  - Fabrication
order: 3
dates: 2024 → present
hero: /assets/img/projects/acoustic-shaping/hero.png
heroAlt: A silicone hemispherical shell with vibration-induced surface bumps
heroCaption: A thin silicone shell cast on an acoustically vibrated mold, imprinted with a pattern of thickness imperfections.
collaborators: Ilyes Krida, Leo Mangalath, Daniel Floryan (Houston); Jacob Tang (USC)
links:
  - label: Data & code (Zenodo)
    url: "https://doi.org/10.5281/zenodo.19682356"
publications:
  - authors: "Krida I, Tang J, Mangalath L, Floryan D, Chen T."
    title: "Vibration-assisted fabrication of thin shells with spatially distributed imperfections."
    venue: "<em>Nature Communications</em> (2026)."
    url: "https://drive.google.com/file/d/1KJkJZk_-Ig0EINSFOrhW1pEQNme0zq11/view?usp=sharing"
---

Thin curved shells — a beetle's carapace, an eggshell, a pressure vessel, a
rocket fairing — are remarkably strong for their weight. But that strength comes
with a famous catch: a shell's ability to carry load is extraordinarily sensitive
to tiny manufacturing flaws. A barely visible dent can cause the whole structure
to buckle suddenly and catastrophically, at a fraction of its theoretical
strength. Engineers have wrestled with this for over a century, and still design
shells using conservative "knockdown factors" to stay on the safe side.

To study the effect carefully, researchers cast desktop-sized silicone domes and
deliberately add a defect. The problem is that almost all of this work adds a
*single, localized* dimple — whereas the flaws in real manufactured structures are
spread out across the entire surface in complex patterns. There was no easy way to
make shells with realistic, distributed imperfections.

## The idea: let sound do the sculpting

We make these distributed patterns with vibration. A thick rubber mold is bolted
onto an ordinary audio speaker and a thin layer of liquid silicone is poured over
it. When the speaker plays a single tone, the mold vibrates in a standing-wave
pattern — like a drumhead — with fixed quiet points (nodes) and points of maximum
motion (antinodes). The still-liquid silicone flows in response, and as it cures
over about twenty minutes, that flow pattern is frozen permanently into the
shell's thickness.

## A counterintuitive flow

You might expect the violently shaking antinodes to throw liquid *away*. The
opposite happens: silicone piles up exactly at the antinodes. The reason is a
subtle effect well known in fluid mechanics — fast back-and-forth shaking drives a
slow, steady "streaming" flow underneath it (the same kind of secondary flow seen
in vibrated fluids and Chladni-plate experiments). That gentle steady flow pushes
material toward the antinodes and holds it there. We confirmed it directly by
sprinkling reflective particles on the surface and filming them drift into the
growing bumps under high-speed lighting.

## Two simple dials

The pattern and its severity are set by two knobs anyone can turn:

- **Pitch (frequency)** selects *which* vibration mode the mold rings in, and so
  how many bumps appear — we made shells with rings of six, eight, and ten bumps
  by changing the tone.
- **Volume** sets *how pronounced* the bumps are, smoothly increasing the
  imperfection amplitude.

Reshaping the mold itself — adding triangular, square, or pentagonal features —
opens up still more patterns, including ones with odd numbers of bumps that the
plain hemisphere cannot produce.

## What we found

We reconstructed each shell's full thickness map from photographs (brighter where
the silicone is thinner) and checked it against destructive measurements. The
patterns closely matched the vibration modes predicted by simulation, and they
were repeatable from shell to shell. Crucially, when we then crushed the shells
under vacuum, their buckling strength dropped systematically as the imperfections
grew — giving a clean, tunable knob on imperfection sensitivity that earlier
single-dimple methods could not provide.

## Why it matters

This gives shell researchers a scalable, low-cost way to make shells with the kind
of complex, distributed flaws that real structures actually have — and to dial
their severity up or down on demand. More broadly, it is a new way to *pattern
soft materials*: by treating thickness variation as a design feature rather than a
defect, the same trick could pre-program where a soft surface bends, snaps, or
changes shape — useful for morphable surfaces, soft robotics, and bioinspired
design.

*Supported by NASA MIRO (IDEAS², grant 80NSSC24M0178), the University of Houston
GEAR program, and the Air Force Office of Scientific Research
(FA9550-25-1-0173).*

<!-- ADD BODY IMAGES HERE — drop files into src/assets/img/projects/acoustic-shaping/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/acoustic-shaping/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/acoustic-shaping/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->

