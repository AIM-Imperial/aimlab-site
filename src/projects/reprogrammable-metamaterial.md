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

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/reprogrammable-metamaterial/unit-cell-tessellation-design.png" alt="The m-bit unit cell in its ON and OFF states, its force-displacement response, and a tessellated array under mechanical loading">
  <figcaption>The m-bit. A single cubic cell holds two stable states (ON and OFF) with distinct force-displacement responses, and tiles into an array that is read by mechanical loading.</figcaption>
</figure>

Writing is magnetic. A small permanent magnet on the bistable shell is driven
through its snap by a pair of electromagnetic coils, and the state then holds with
no field. The switch is robust: a single m-bit was cycled over a thousand times
while returning reliably to the same two equilibria.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/reprogrammable-metamaterial/magnetic-programming.png" alt="The bistable shell's force-displacement curve, the electromagnetic coil arrangement and magnetic field, the snapping sequence in five states, and write traces over a thousand cycles">
  <figcaption>Magnetic writing. The bistable shell snaps under a field from a Maxwell coil pair (left and center); the cap moves through five states (top right), and the m-bit reaches the same ON and OFF positions reliably across more than a thousand write cycles (bottom).</figcaption>
</figure>

The two states have markedly different mechanical responses. In the **ON** state,
load is transmitted axially through internal contacts, giving a stiff, strong
element. In the **OFF** state, slender curved members deform in bending, giving a
compliant one. Switching between states changes the stiffness, strength, and
stored energy each by **roughly an order of magnitude**, and the response remains
elastic throughout, so the cycle is fully reversible.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/reprogrammable-metamaterial/loading-two-states.png" alt="An array loaded in its all-ON and all-OFF configurations, with bar charts of stiffness, strength, and dissipated energy and the measured strain fields">
  <figcaption>ON versus OFF. The same array is stiff and strong when its cells are ON and compliant when they are OFF; stiffness, strength, and stored energy each change by about an order of magnitude.</figcaption>
</figure>

## Programming a whole material

Each m-bit occupies a cubic unit cell and tiles into a periodic array. We built a
**6 × 6 lattice** and programmed it with a single actuator: a pair of
electromagnetic coils registers to each target cell and switches it alone,
leaving its neighbors untouched. This realizes bit-level random access, the
defining feature of addressable memory.

Choosing the binary pattern of ON and OFF cells sets the **bulk response** of the
identical physical lattice. As the fraction of ON cells (the programming ratio)
increases, the effective stiffness and strength rise smoothly across an order of
magnitude, so the written configuration *is* the material's constitutive behavior.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/reprogrammable-metamaterial/tunable-mechanical-response.png" alt="Force-area curves for programming ratios from zero to one, and a plot of stiffness and 2% strength rising with the programming ratio">
  <figcaption>Tuning the bulk response. Varying the fraction of ON cells (the programming ratio) sweeps the lattice's force-displacement curve continuously; both stiffness and strength climb across an order of magnitude as the ratio increases.</figcaption>
</figure>

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
