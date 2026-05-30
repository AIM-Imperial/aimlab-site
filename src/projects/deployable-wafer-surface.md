---
layout: layouts/project.njk
title: Deployable 3D architectures from wafer-fabricated precursors
subtitle: Flat to volumetric, as the final manufacturing step
tags:
  - Deployable structures
order: 1
dates: 2024 → present
hero: /assets/img/projects/deployable-wafer-surface/hero.jpg
heroAlt: A wafer-fabricated planar precursor deploying into a doubly-curved 3D dome
heroCaption: From a target surface, to a flat patterned precursor, to the deployed free-standing 3D form.
collaborators: Yue Wang, Kelvin Shum (Houston); Yuyang Song (Toyota Research Institute of North America)
links:
  - label: Paper
    url: "#"
  - label: Code & data (Zenodo)
    url: "https://doi.org/10.5281/zenodo.20393900"
publications:
  - authors: "Wang Y, Shum K, Song Y, Chen T."
    title: "Deployable 3D architectures from wafer-fabricated precursors."
    venue: "<em>Nature Communications</em> (2026)."
    url: "#"
---

The machinery that makes computer chips is extraordinarily precise — but it only
makes things *flat*. That is a real limitation, because many of the devices we
would like to build, from curved sensors and miniature antennas to micro-optics
and medical implants, naturally want to live on rounded, three-dimensional
surfaces. We show that standard, flat chip-making can in fact produce
free-standing 3D shells of a chosen curved shape: the flat sheet pops up into the
target form, and stays there on its own — no mold, no support, no power.

The key idea is to treat the "popping up" as the *last step of manufacturing*. The
flat sheet made on the wafer is just an intermediate; the finished product is the
deployed 3D structure.

## Why flat-to-curved is hard

There is a classical geometric obstacle: you cannot wrap a flat sheet of paper
around a ball without it creasing or tearing — a curved shape demands that the
material actually stretch, not just bend. A solid film can't stretch nearly
enough. So instead of a solid film, we build the sheet out of a network of tiny
hinged tiles cut as slits in a thin plastic membrane. This "rotating-squares"
pattern can open up dramatically, like a stretching lattice, letting flat regions
expand into curved ones.

Each tile is also **bistable**: it has two stable resting positions and snaps
between them, like a hair clip or a clicker. Once snapped into its open state, it
stays open by itself — which is what lets the finished 3D shape hold without any
external support.

## Designing the flat pattern for one specific shape

To make the sheet deploy into one particular 3D surface, we "unroll" that surface
onto a flat plane using a mathematical map that records, at every point, how much
the material must grow there to return to 3D. We then tune the geometry of each
tile so that its snapped-open size matches the growth needed at its location. The
result is a flat sheet whose microscopic pattern varies subtly from place to place
— a kind of blueprint that can only fold up into that one intended shape.

## Making it and popping it up

The whole sheet is made in a cleanroom in about two days, using the same
light-patterning and etching steps used for flexible electronics, on a thin
polyimide (a tough, flexible plastic). A neat trick lets us peel it cleanly off
the wafer without damaging the delicate hinges, and the process avoids harsh
chemicals. To deploy it, a small rounded tip simply presses the flat sheet,
snapping all the tiles open; when the tip pulls away, the structure stays in its
new 3D shape.

## What we showed

- A dome reliably deployed from a flat disk, matching computer simulation.
- A whole gallery of more complex shapes — including a model cornea, a double
  dome, and a ring — with both bowl-like and saddle-like curvature.
- Working **mirrors**: gold-coated dishes deployed at three different focal
  lengths that focus a laser exactly as optics theory predicts — a real optical
  device made entirely this way.

## Why it matters

By turning shape change into a manufacturing step, this work points from *flexible*
electronics toward *deployable* electronics — antennas, conformal sensor arrays,
micro-optics, and implants built with the mature, scalable tools of the chip
industry. And because the design is worked out tile by tile, we know in advance
exactly where every part of the sheet ends up in 3D, so components like sensors
can be placed precisely on the final curved surface.

*Supported by NASA MIRO (IDEAS², grant 80NSSC24M0178) and the Toyota Research
Institute of North America. Fabricated at the University of Houston
Nanofabrication Facility and the Shared Equipment Authority at Rice University.*

<!-- ADD BODY IMAGES HERE — drop files into src/assets/img/projects/deployable-wafer-surface/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/deployable-wafer-surface/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/deployable-wafer-surface/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->

