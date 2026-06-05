---
layout: layouts/project.njk
title: A reprogrammable metamaterial with memory
subtitle: A material you can rewrite like a hard drive
tags:
  - Architected materials
  - Functional materials
  - Shape transformation
order: 6
dates: 2021
hero: /assets/img/projects/reprogrammable-metamaterial/hero.png
heroAlt: A tiled array of bistable mechanical bits switched between two states by a magnet
heroCaption: An array of mechanical "bits," each magnetically switchable between a soft and a stiff state — and stable there with no power.
collaborators: With Mark Pauly (EPFL) and Pedro M. Reis (EPFL)
links:
  - label: Code & data
    url: "#"
publications:
  - authors: "Chen T, Pauly M, Reis PM."
    title: "A reprogrammable mechanical metamaterial with stable memory."
    venue: "<em>Nature</em> 589(7842), 386–390 (2021)."
    url: "https://drive.google.com/file/d/1synwVHOWHtT0SyYZ-eu9cVtA58fwXemQ/view?usp=sharing"
---

A metamaterial gets its unusual properties from its *structure* rather than its
ingredients — but normally those properties are baked in at fabrication and can
never change. We asked: what if a material could be **rewritten like a hard
drive** — each piece of it set to one of two states, on demand, over and over,
and holding that setting without any power?

## A mechanical "bit"

The building block is what we call an **m-bit** — a mechanical version of a
digital bit. Like a bit on a hard drive, it has two stable states and clear
"write" and "read" steps:

- **Write:** a magnetic pulse flips the m-bit between its two states by snapping a
  small **bistable shell** through to its other resting position.
- **Memory:** once switched, it *stays* — indefinitely, with no power — just like
  non-volatile storage.
- **Read:** pressing on the m-bit reveals its state through a completely different
  stiffness, and reading it (loading it) doesn't change the setting.

The two states feel mechanically very different. In the **ON** state, load travels
straight down through internal contacts, so the bit is stiff and strong. In the
**OFF** state, curved columns simply bend, so it's soft. Switching between them
changes the stiffness, strength, and stored energy each by **about a factor of
ten** — and the whole response stays elastic, so it can be cycled again and again.

## Programming a whole material

Because each m-bit is a small cube, they tile into an array. We built a **6 × 6
grid** and programmed it on a single machine: a pair of electromagnetic coils
moves to each target bit and flips only that one, leaving its neighbours
unchanged — true bit-level, addressable writing. A single m-bit survived **over
1,000 write cycles** while reliably hitting the same two positions.

By choosing which bits are ON or OFF, the same physical tile takes on **markedly
different overall behavior** — its stiffness and strength can be tuned across an
order of magnitude, and tuned again later. The pattern you write *is* the
material's property.

## Why it matters

This brings a digital idea — addressable, rewritable, stable memory — into the
mechanical world. A single fabricated object can be reconfigured for different
jobs over its lifetime instead of being fixed at manufacture: adaptive cushioning
and impact protection, structures that retune their stiffness on demand, or
mechanical logic and computing built from matter itself. The work was published
in *Nature*.

*A collaboration with Mark Pauly and Pedro M. Reis at EPFL.*

<!-- ADD BODY IMAGES HERE — drop files into src/assets/img/projects/reprogrammable-metamaterial/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/reprogrammable-metamaterial/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/reprogrammable-metamaterial/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
