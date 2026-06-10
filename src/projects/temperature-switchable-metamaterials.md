---
layout: layouts/project.njk
title: Temperature-switchable metamaterials
subtitle: Materials that change how they behave when warmed or cooled
tags:
  - Architected materials
  - Functional materials
  - Algorithm
  - 3D printing
order: 4
dates: 2023
hero: /assets/img/projects/temperature-switchable-metamaterials/hero.png
heroAlt: A 3D-printed two-material lattice that deforms differently when heated
heroCaption: A two-polymer architecture whose force response and shape change flip between cold and warm states.
collaborators: Yue Wang (Houston); Weichen Li, Xiaojia Shelly Zhang (UIUC)
summary: >-
  We designed metamaterials whose mechanics reconfigure with temperature alone, with no
  actuators, power, or electronics, by combining two polymers whose stiffness contrast
  collapses on heating. A multi-material topology-optimization algorithm finds the
  two-phase layout that realizes a prescribed pair of behaviors, one cold and one warm,
  which is then printed directly. This yields temperature-switchable cushioning, lattices
  whose effective Poisson's ratio reverses sign between cold and warm, and cubes that
  switch their axis of expansion. Encoding the response in geometry makes the material its
  own sensor and actuator; the work was featured on the cover of Science Advances.
publications:
  - authors: "Li W, Wang Y, Chen T, Zhang XS."
    title: "Algorithmic encoding of adaptive responses in temperature-sensing multimaterial architectures."
    venue: "<em>Science Advances</em> 9(47), eadk0620 (2023). Cover article."
    url: "https://drive.google.com/file/d/170Pr3OYgXNjDoSyb-lSr0PFwmyaPYdWm/view?usp=sharing"
---

A conventional structural material has a fixed constitutive response: its
stiffness, and the sign and magnitude of its deformation under load, are set at
the time of manufacture. We set out to design materials whose mechanical response
*reconfigures with temperature*: stiff when cold and compliant when warm,
contracting under load at one temperature and expanding at another, with no
actuators, power supply, or control electronics. Temperature alone serves as both
the stimulus and the trigger.

The mechanism exploits two polymers with sharply different thermal sensitivities
in their elastic moduli. Across the operating range, the stiffer phase is roughly
**60x stiffer than the soft phase when cold but only about 4x stiffer when warm**.
Because this contrast collapses with heating, a structure built from both phases
is effectively governed by the stiff phase in the cold state and by both phases in
the warm state. A single object therefore presents two distinct effective
behaviors, selected by its temperature.

## Designing the response, not just the geometry

The design problem is inverse: given a *target* response, find the geometry and
the spatial distribution of the two phases that realize it. The combinatorial
space is far too large to navigate by intuition, so we pose it as an optimization.
We prescribe the desired behavior, for example a specified force-displacement
curve in the cold state and a qualitatively different one in the warm state, and a
**multi-material topology-optimization algorithm** searches the two-phase layout
that satisfies both objectives simultaneously. The optimized layouts are
free-form and non-intuitive, and they are fabricated directly on a **multi-material
3D printer** that co-deposits the two polymers.

<figure class="project-figure" style="width: 83%">
  <img src="/assets/img/projects/temperature-switchable-metamaterials/force-programming.png" alt="Two target force-displacement behaviors, the optimized two-material designs and printed specimens that realize them, and the measured cold and warm responses matching the targets">
  <figcaption>Programming the force response. For two different target force-displacement curves, the algorithm produces a two-material layout (stiff EB and soft FLX phases) whose printed specimen matches the prescribed cold (10C) and warm (60C) behaviors in experiment and simulation.</figcaption>
</figure>

## Capabilities

**Programmable force response.** Components can be designed to buckle compliantly
when cold but stiffen sharply when warm, yielding temperature-switchable cushioning
relevant to impact absorption and vibration isolation, as the optimized specimens
above demonstrate.

**Sign-reversing deformation.** The same approach yields a lattice that *contracts*
laterally under vertical load at one temperature and *expands* at another, flipping
the sign of its effective Poisson's ratio with temperature alone.

<figure class="project-figure" style="width: 83%">
  <img src="/assets/img/projects/temperature-switchable-metamaterials/2D-shape-programming.png" alt="A 2D metamaterial that contracts laterally under vertical compression at 10C and expands laterally at 60C, with experiment and simulation of the unit cells">
  <figcaption>Sign-reversing deformation. Under the same vertical compression, the metamaterial contracts laterally at 10C and expands laterally at 60C; experiment and simulation agree for both states.</figcaption>
</figure>

**Three-dimensional response.** The principle extends into 3D: a cube can be
designed to expand along one axis when cold and along a different axis when warm,
with the switch driven purely by temperature.

<figure class="project-figure" style="width: 83%">
  <img src="/assets/img/projects/temperature-switchable-metamaterials/3D-shape-programming.png" alt="A 3D cubic metamaterial whose axis of expansion switches between two directions with temperature, shown as design, printed specimen, measured deformation, and a circuit demonstration">
  <figcaption>A three-dimensional switch. The cubic design contracts along one axis and expands along another, and reverses which axis with temperature; measured deformations match the targets, and the motion is enough to actuate a circuit.</figcaption>
</figure>

**A temperature-triggered switch.** Because the actuation stroke is under tight
geometric control, warming displaces the structure enough to open or close an
electrical contact, a self-actuating thermal switch with no discrete sensor or
controller.

## Significance

Encoding the response in geometry, rather than relying on shape-memory transitions
or external power, makes the material simultaneously its own sensor and its own
actuator, with temperature acting as an embedded control signal. The approach
points toward soft robots, adaptive cushioning, and devices that reconfigure
autonomously as ambient conditions change. The work appeared in *Science Advances*
and was featured on the journal's cover.

*A collaboration with Weichen Li and Xiaojia Shelly Zhang (University of Illinois
Urbana-Champaign).*

<!-- ADD BODY IMAGES HERE. Drop files into src/assets/img/projects/temperature-switchable-metamaterials/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/temperature-switchable-metamaterials/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/temperature-switchable-metamaterials/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
