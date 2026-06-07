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
rubber mold is first built up by repeatedly coating a metal sphere with silicone
until it is thick enough to vibrate as a stiff elastic body. It is then mounted on
an audio speaker and coated with a thin layer of liquid silicone. Driving the
speaker at a single frequency excites a standing-wave mode of the mold, with
stationary nodal lines and antinodes of maximum displacement. The uncured silicone
redistributes in response, and as it crosslinks over roughly twenty minutes the
resulting flow field is locked into a permanent thickness profile.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/acoustic-shaping/fabrication-protocol.png" alt="Fabrication protocol: a metal sphere is repeatedly coated to form a thick elastic mold; the mold is mounted on a subwoofer and a thin silicone layer is cast while driving at frequency f and volume v, producing a hemispherical shell with surface bumps">
  <figcaption>The fabrication protocol. A metal sphere is repeatedly coated to build a thick elastic mold; the mold is mounted on a subwoofer and a thin silicone layer is cast onto it while the speaker is driven at a chosen frequency (f) and volume (v), imprinting a pattern of thickness bumps into the cured shell.</figcaption>
</figure>

## A counterintuitive flow

One might expect the high-amplitude antinodes to expel fluid; instead, silicone
accumulates precisely there. The mechanism is acoustic streaming: an oscillatory
flow rectifies, through nonlinear inertial effects in the boundary layer, into a
steady secondary circulation (the same class of mean flow responsible for the
particle migration in Chladni-plate experiments). This steady streaming transports
material toward the antinodes and retains it.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/acoustic-shaping/mode-accumulation-fluid.png" alt="Cross-section schematic of the steady streaming flow in the liquid silicone over one vibration wavelength, with streamlines and pressure, alongside photographs of silicone gathering at the antinodes">
  <figcaption>The streaming mechanism. Over one wavelength of the mold's vibration, the secondary streaming flow (streamlines and pressure shown) drives liquid silicone toward the antinodes; the photographs below capture the accumulating bumps.</figcaption>
</figure>

We confirmed the picture directly. Projecting a laser sheet onto the vibrating mold
locates the nodes and antinodes from above, and the silicone is seen to gather
exactly at the antinodes (where the vibration amplitude is largest), not the nodes.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/acoustic-shaping/mode-accumulation-overhead-photography.png" alt="Overhead views of the vibrating mold with a laser sheet, showing silicone accumulations aligned with the antinode positions of the standing-wave mode">
  <figcaption>Overhead imaging with a laser sheet. The accumulations of silicone coincide with the antinodes of the mold's standing-wave mode, confirming that material collects where the vibration is strongest.</figcaption>
</figure>

## Two control parameters

The pattern and its amplitude are governed by two independent inputs:

- **Frequency** selects which mode of the mold is excited, and therefore the number
  of antinodes: tuning the drive frequency produced shells with rings of six,
  eight, and ten bumps.
- **Drive amplitude** sets the magnitude of the imperfection, continuously scaling
  the deviation from a uniform thickness.

The measured thickness patterns track the finite-element mode shapes closely. At
153, 167, and 210 Hz the mold rings in modes with six, eight, and ten antinodes
respectively, and the azimuthal intensity profiles of the fabricated shells match
the simulated modes peak for peak.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/acoustic-shaping/frequency-matching.png" alt="At 153, 167 and 210 Hz: finite-element mode shapes, the measured thickness fields of the fabricated shells, and azimuthal intensity profiles comparing experiment and simulation, showing six, eight and ten bumps">
  <figcaption>Selecting the pattern by frequency. At 153, 167, and 210 Hz the mold excites modes with six, eight, and ten antinodes; the fabricated shells (middle) reproduce the simulated mode shapes (top), and their azimuthal intensity profiles match the simulation (bottom).</figcaption>
</figure>

Altering the mold geometry itself accesses a broader family of patterns. Embedding
triangular, square, or pentagonal protrusions in the mold makes silicone collect at
the vertices, producing configurations with odd azimuthal symmetry that the
axisymmetric hemisphere cannot support.

<figure class="project-figure" style="width: 83%">
  <img src="/assets/img/projects/acoustic-shaping/polygon.png" alt="Shells cast on molds with hexagonal, pentagonal, square, and triangular protrusions, each producing bumps at the polygon vertices">
  <figcaption>Shaping by the mold. Polygonal protrusions (hexagon, pentagon, square, triangle) make the silicone accumulate at their vertices, giving imperfection patterns, including odd-symmetry ones, beyond the modal rings.</figcaption>
</figure>

## Measuring the imperfections

To quantify each shell we reconstruct its full thickness field photometrically:
placed on an LED panel and photographed from above, the transmitted intensity at
each point scales inversely with the local thickness, so a single image yields the
thickness everywhere.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/acoustic-shaping/photograph-method.png" alt="Schematic defining shell thickness between inner and outer surfaces relative to a perfect shell, and the imaging rig with a digital camera above a shell specimen on an LED panel">
  <figcaption>Measuring thickness by transmission. The local thickness is the gap between inner and outer surfaces relative to a perfect shell (left); each shell is backlit on an LED panel and photographed from directly above (right).</figcaption>
</figure>

The photometric reconstruction agrees closely with destructive cross-sectional
measurements and is reproducible across nominally identical samples.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/acoustic-shaping/photograph-result.png" alt="A reconstructed thickness map of a shell with eight bumps, and a plot of normalized thickness versus polar angle comparing the photographic reconstruction with destructive measurements">
  <figcaption>A reconstructed thickness field (left) and its agreement with destructive measurements along a meridian (right): the non-contact photographic method recovers the imperfection profile accurately.</figcaption>
</figure>

## Buckling

Under quasi-static vacuum loading, buckling strength decreases monotonically with
imperfection amplitude. Across all three modal families, the knockdown factor falls
as the drive volume (and hence the bump amplitude) increases, while the pre-buckling
stiffness stays essentially unchanged. The imperfections therefore act selectively
on the critical load, giving a continuously tunable handle on imperfection
sensitivity that single-dimple protocols cannot provide.

<figure class="project-figure" style="width: 83%">
  <img src="/assets/img/projects/acoustic-shaping/mechanical-response.png" alt="Normalized pressure-volume buckling curves at three frequencies and increasing drive volumes, with knockdown factor and stiffness plotted against speaker volume">
  <figcaption>Buckling response. Pressure-volume curves (top) show earlier, weaker buckling as the drive volume rises; the knockdown factor (bottom) decays with imperfection amplitude across all three modal families, while the pre-buckling stiffness is largely unaffected.</figcaption>
</figure>

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

