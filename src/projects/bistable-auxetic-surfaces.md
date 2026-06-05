---
layout: layouts/project.njk
title: Bistable auxetic surface structures
subtitle: Flat sheets that snap into curved shapes — and stay there
tags:
  - Shape transformation
  - Architected materials
  - Algorithm
order: 7
dates: 2021
hero: /assets/img/projects/bistable-auxetic-surfaces/hero.png
heroAlt: A laser-cut flat sheet deploying into a stable doubly-curved surface
heroCaption: A flat, laser-cut sheet of patterned cells that pops up into a target 3D shape and holds it on its own.
collaborators: With Julian Panetta (UC Davis), Max Schnaubelt (TUM), and Mark Pauly (EPFL)
links:
  - label: Code & data
    url: "#"
publications:
  - authors: "Chen T, Panetta J, Schnaubelt M, Pauly M."
    title: "Bistable auxetic surface structures."
    venue: "<em>ACM Transactions on Graphics</em> 40(4), 1–9 (2021). SIGGRAPH."
    url: "https://drive.google.com/file/d/1oybdAwG4WwRRoPT-WCSBqvzhTBkB1O_K/view?usp=sharing"
---

How do you turn a flat sheet into a curved 3D surface that holds its shape without
being propped up? Most approaches need either constant force (let go and it
collapses), permanent bending, or exotic materials triggered by heat or water.
We found a purely *mechanical* route: a flat sheet, cut from ordinary elastic
material, that **snaps into a chosen curved shape and stays there on its own**.

## The idea

The sheet is tiled with **bistable auxetic cells**. Two properties do the work
together:

- **Auxetic** — the cell expands outward in all directions when pulled (it grows
  in area), and by how much is set by the cell's geometry.
- **Bistable** — it has two stable resting states and *snaps* between them, holding
  the second one with no power.

If different regions of the sheet are made to expand by different amounts, the flat
sheet can no longer stay flat — that mismatch (geometric frustration) forces it to
buckle out of plane into a specific curved shape. Because every cell locks into its
second stable state, the deployed surface is **self-supporting**: no external
frame, no held-down edges.

## Designing the flat pattern

To hit one target surface, we work backwards. The algorithm:

1. **Flattens** the target 3D surface onto the plane (a conformal map), recording
   how much each region must expand to return to 3D.
2. Looks up, from a **precomputed library** of cell designs, the cell that
   delivers exactly that expansion — and, where several work, picks the one that
   deploys most stiffly and reliably.
3. Tiles those varying cells into a single flat layout that can be **laser-cut**
   from sheet material.

Activating the cells then deploys the sheet to the target shape, which we
validated by 3D-scanning physical prototypes and mechanically testing them.

## Why it matters

This makes self-stable 3D deployment achievable with cheap, flat manufacturing and
everyday materials — no smart materials, no sustained power. It's the
computational and mechanical foundation that our later work scales down to the
micron level, using semiconductor fabrication to deploy free-standing 3D
structures (see *Deployable architectures from wafer-fabricated precursors*). The
work was published at SIGGRAPH.

*A collaboration with Julian Panetta (UC Davis), Max Schnaubelt (TUM), and Mark
Pauly (EPFL).*

<!-- ADD BODY IMAGES HERE — drop files into src/assets/img/projects/bistable-auxetic-surfaces/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/bistable-auxetic-surfaces/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/bistable-auxetic-surfaces/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
