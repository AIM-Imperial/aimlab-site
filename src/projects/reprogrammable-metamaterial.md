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
heroCaption: An array of mechanical "bits," each magnetically switchable between a soft and a stiff state, and stable there with no power.
collaborators: With Mark Pauly (EPFL) and Pedro M. Reis (EPFL)
publications:
  - authors: "Chen T, Pauly M, Reis PM."
    title: "A reprogrammable mechanical metamaterial with stable memory."
    venue: "<em>Nature</em> 589(7842), 386–390 (2021)."
    url: "https://drive.google.com/file/d/1synwVHOWHtT0SyYZ-eu9cVtA58fwXemQ/view?usp=sharing"
---

A metamaterial derives its properties from its *architecture* rather than its
constituents, but those properties are typically fixed at fabrication and cannot
be altered afterward. We asked whether a material could instead be **rewritten
like a hard drive**: each element set independently to one of two states, on
demand and repeatedly, while retaining that setting without any sustained energy
input.

## A mechanical bit

The building block is an **m-bit**, the mechanical analogue of a digital bit. It
supports the same three operations as nonvolatile memory:

- **Write:** a magnetic pulse switches the m-bit by snapping an embedded
  **bistable shell** through to its other equilibrium configuration.
- **Memory:** the new state persists indefinitely with no applied field, since
  both configurations are local minima of the elastic energy.
- **Read:** mechanical loading probes the state through its stiffness, and the
  read operation is nondestructive: it does not perturb the stored value.

The two states have markedly different mechanical responses. In the **ON** state,
load is transmitted axially through internal contacts, giving a stiff, strong
element. In the **OFF** state, slender curved members deform in bending, giving a
compliant one. Switching between states changes the stiffness, strength, and
stored energy each by **roughly an order of magnitude**, and the response remains
elastic throughout, so the cycle is fully reversible.

## Programming a whole material

Each m-bit occupies a cubic unit cell and tiles into a periodic array. We built a
**6 × 6 lattice** and programmed it with a single actuator: a pair of
electromagnetic coils registers to each target cell and switches it alone,
leaving its neighbors untouched. This realizes bit-level random access, the
defining feature of addressable memory. A single m-bit endured **over 1,000 write
cycles** while returning reliably to the same two equilibria.

Choosing the binary pattern of ON and OFF cells sets the **bulk response** of the
identical physical lattice: its effective stiffness and strength span an order of
magnitude and can be retuned at will. The written configuration *is* the
material's constitutive behavior.

## Why it matters

This transfers the digital abstraction of addressable, rewritable, nonvolatile
memory into the mechanical domain. One fabricated object can be reconfigured for
distinct functions over its service life rather than being committed at
manufacture: adaptive cushioning and impact mitigation, structures that retune
their stiffness on demand, and mechanical logic computed in the medium itself.
The work was published in *Nature*.

*A collaboration with Mark Pauly and Pedro M. Reis at EPFL.*

<!-- ADD BODY IMAGES HERE. Drop files into src/assets/img/projects/reprogrammable-metamaterial/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/reprogrammable-metamaterial/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/reprogrammable-metamaterial/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
