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

Thin curved shells (a beetle's carapace, an eggshell, a pressure vessel, a rocket
fairing) achieve exceptional stiffness-to-weight ratios, but that performance
carries a well-known liability: their load-bearing capacity is acutely sensitive
to geometric imperfections. A defect on the order of the shell thickness can
trigger sudden, catastrophic buckling at a small fraction of the classical
critical load. The phenomenon has resisted a clean treatment for over a century,
and shells are still designed with empirical "knockdown factors" that
deliberately discount the theoretical strength.

The canonical experimental approach casts desktop-scale silicone hemispheres with
a deliberately introduced defect. Nearly all such work imposes a *single,
localized* dimple, whereas the imperfections in manufactured structures are
distributed across the surface in spatially extended patterns. A controlled route
to shells carrying realistic, distributed imperfections has been missing.

## Sculpting with sound

We generate these distributed patterns through forced vibration. A compliant
rubber mold is mounted on an audio speaker and coated with a thin layer of liquid
silicone. Driving the speaker at a single frequency excites a standing-wave mode
of the mold, with stationary nodal lines and antinodes of maximum displacement.
The uncured silicone redistributes in response, and as it crosslinks over roughly
twenty minutes the resulting flow field is locked into a permanent thickness
profile.

## A counterintuitive flow

One might expect the high-amplitude antinodes to expel fluid; instead, silicone
accumulates precisely there. The mechanism is acoustic streaming: an oscillatory
flow rectifies, through nonlinear inertial effects in the boundary layer, into a
steady secondary circulation (the same class of mean flow responsible for the
particle migration in Chladni-plate experiments). This steady streaming transports
material toward the antinodes and retains it. We confirmed the mechanism directly
by seeding the surface with reflective tracer particles and imaging their drift
into the growing accumulations under high-speed illumination.

## Two control parameters

The pattern and its amplitude are governed by two independent inputs:

- **Frequency** selects which mode of the mold is excited, and therefore the number
  of antinodes: tuning the drive frequency produced shells with rings of six,
  eight, and ten bumps.
- **Drive amplitude** sets the magnitude of the imperfection, continuously scaling
  the deviation from a uniform thickness.

Altering the mold geometry itself (introducing triangular, square, or pentagonal
features) accesses a broader family of patterns, including configurations with odd
azimuthal symmetry that the axisymmetric hemisphere cannot support.

## Results

We reconstructed each shell's full thickness field photometrically (transmitted
intensity scales inversely with local thickness) and validated it against
destructive cross-sectional measurements. The recovered patterns agree closely
with the modal shapes predicted by finite-element simulation and are reproducible
across samples. Under vacuum loading, buckling strength decreased monotonically
with imperfection amplitude, yielding a continuously tunable handle on imperfection
sensitivity that single-dimple protocols cannot provide.

## Significance

The method offers shell researchers a scalable, inexpensive way to fabricate the
complex, distributed imperfections characteristic of real structures, with
on-demand control of their severity. More broadly, it constitutes a general
strategy for *patterning soft materials*: by treating spatial thickness variation
as a design degree of freedom rather than a flaw, the same approach can prescribe
where a soft surface preferentially bends, snaps, or morphs, with applications to
shape-morphing surfaces, soft robotics, and bioinspired design.

*Supported by NASA MIRO (IDEAS², grant 80NSSC24M0178), the University of Houston
GEAR program, and the Air Force Office of Scientific Research
(FA9550-25-1-0173).*

<!-- ADD BODY IMAGES HERE. Drop files into src/assets/img/projects/acoustic-shaping/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/acoustic-shaping/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/acoustic-shaping/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->

