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
collaborators: Weichen Li, Xiaojia Shelly Zhang (UIUC); Yue Wang (Houston)
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

## Capabilities

- **Programmable force response.** Components that buckle compliantly when cold but
  stiffen sharply when warm, yielding temperature-switchable cushioning relevant to
  impact absorption and vibration isolation.
- **Sign-reversing deformation.** A lattice with negative Poisson's ratio at one
  temperature and positive at another: the sign of its transverse response flips
  with heating.
- **A temperature-triggered switch.** With the actuation stroke under tight
  geometric control, we built a demonstrator in which warming displaces the
  structure enough to open or close an electrical contact, a self-actuating thermal
  switch with no discrete sensor or controller.
- **Three-dimensional response.** The principle extends to 3D, with blocks that
  expand preferentially along one axis when cold and along a different axis when
  warm.

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
