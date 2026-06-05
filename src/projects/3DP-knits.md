---
layout: layouts/project.njk
title: 3D-printed knits
subtitle: Programmable materials built from a single entangled thread
tags:
  - Architected materials
order: 2
dates: 2024 → present
hero: /assets/img/projects/3DP-knits/hero.png
heroAlt: A 3D-printed knit fabric made of interlooped printed yarn
heroCaption: A knit fabric — loops, yarn, and fibers — reproduced directly by multi-material 3D printing.
collaborators: Bradley Cline, Catherine Bai, Yue Wang (Houston); Sehui Jeong (Stanford); Ling Xu, James U. Surjadi, Carlos M. Portela (MIT)
links:
  - label: Code (GitHub)
    url: "https://github.com/UH-AIM/3D-Printing-Volumetric-Knits"
publications:
  - authors: "Cline B, Bai C, Jeong S, Xu L, Wang Y, Surjadi JU, Portela CM, Chen T."
    title: "Entanglement-driven responses through multiscale 3D-printed knits."
    venue: "<em>Proceedings of the National Academy of Sciences</em> (2026)."
    url: "https://drive.google.com/file/d/1FJkzmtyGmGMDeVN5klAR_lPNsckEMWij/view?usp=sharing"
---

A knitted fabric is one continuous thread looped through itself thousands of
times. That simple trick of entanglement is what makes a sweater stretchy, tough,
and able to spring back — its behavior comes from how the loops catch and slide on
one another, not just from what the yarn is made of. Humans have knitted for tens
of thousands of years, yet there has never been a clean way to predict how a
given stitch pattern will behave mechanically, because knitting machines can only
make the loops their needles happen to allow.

We take a different route: we **3D-print** the knit. Because a printer places
material wherever we tell it to, we are no longer limited by what a needle can
reach — we can build any pattern of loops we can describe with geometry, and study
exactly how stitch shape controls the result.

## Printing a fabric

We start by writing down the path of the yarn as a mathematical curve — the shape
of a single loop — and then spiral fibers around that curve to build up a realistic
thread. Feeding this into a multi-material inkjet 3D printer (which jets and cures
tiny droplets of plastic, with a water-soluble support holding everything in place)
produces a real, flexible fabric whose loops can even be unraveled like a true
knit. A handful of dials — loop height, width, depth, curl, and the number and
thickness of fibers — let us sweep through a whole family of fabrics and measure
each one.

## The printed knits behave like real knits

Stretched and released, our printed fabrics show all the hallmarks of genuine
textiles: they are stiffer in one direction than the other, they stiffen sharply
as the loops pull taut, and they lose energy to friction each cycle (the loading
and unloading curves don't retrace). Side by side, a printed knit and a
machine-knitted cotton fabric of the same pattern behave the same way.

## One master curve

The most striking result is a simple unifying rule. When we rescale the
stress-strain curves of all our different knits — printed in different materials,
with different loop shapes — using one combination of the geometric dials, they all
collapse onto a **single master curve**. The same rescaling also captures the
industrial cotton knit. In other words, the characteristic springy, lossy behavior
of a knit is governed by its *geometry and entanglement*, almost regardless of the
material. That gives us a formula to predict a fabric's response before printing
it.

## Programmable, in 3D, at any size

Because the whole fabric is one connected thread, stretching it one way changes how
it responds in the perpendicular direction — so we can **pre-strain** a knit to
tune its stiffness and how much energy it absorbs, turning the same object into a
soft spring or an adjustable shock absorber on demand.

We also extend knitting into the third dimension, looping not just side to side but
top to bottom, to make solid *volumetric* knits — entangled blocks of material
rather than thin sheets. And to show the idea has no natural scale, we printed the
very same architecture down at the micrometre scale using laser nanoprinting —
to our knowledge the **smallest knit ever made** — and found it behaves like its
hand-sized counterpart.

## Why it matters

This reframes knitting as a general design strategy for *architected materials*:
program the entanglement, and you program resilience, toughness, and tunable
energy absorption directly into an object's structure. Potential uses span reusable
impact protection, adjustable damping layers, and — at the small end —
tissue scaffolds, filters, and multifunctional composites.

*Supported by NASA MIRO (IDEAS², grant 80NSSC24M0178), the Haythornthwaite
Foundation, and the National Science Foundation (CMMI-2418432).*

<!-- ADD BODY IMAGES HERE — drop files into src/assets/img/projects/3DP-knits/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/3DP-knits/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/3DP-knits/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->

