---
layout: layouts/project.njk
title: Untethered soft robots that swim by snapping
subtitle: Battery-free locomotion powered by bistable snaps
tags:
  - Functional materials
  - Shape transformation
  - 3D printing
order: 8
dates: 2018
hero: /assets/img/projects/bistable-soft-robots/hero.png
heroAlt: A 3D-printed soft swimming robot with fins driven by a bistable element
heroCaption: A 3D-printed swimmer whose fins are driven by snapping bistable elements, with no battery, electronics, or tether.
collaborators: With Osama R. Bilal, Chiara Daraio (Caltech), and Kristina Shea (ETH Zurich)
links:
  - label: Code & data
    url: "#"
publications:
  - authors: "Chen T, Bilal OR, Shea K, Daraio C."
    title: "Harnessing bistability for directional propulsion of soft, untethered robots."
    venue: "<em>Proceedings of the National Academy of Sciences</em> 115(22), 5698–5702 (2018)."
    url: "https://drive.google.com/file/d/1S0KJnD7cgkLzOAmNlkngX5CW1DUpbTEb/view?usp=sharing"
---

Mobile robots typically depend on a tether or onboard power and control, each of
which carries a cost: a tether constrains range and workspace, while batteries and
electronics add mass, complexity, and points of failure. We developed small **soft
swimming robots that locomote with none of these**: no battery, no electronics, no
tether. Each is produced in a single multi-material 3D print, and each follows a
trajectory specified entirely at design time.

## Mechanism of propulsion

The fins are actuated by a **bistable element**, a snap-through structure with two
stable equilibria separated by an energy barrier. Crossing that barrier releases
the stored elastic energy on a timescale far shorter than the loading timescale,
producing the rapid, impulsive paddle stroke that drives propulsion.

The snap is triggered by a **shape-memory polymer actuator**: a printed curved
strip programmed with a recovery temperature. When the surrounding water exceeds
that threshold, the strip relaxes toward its programmed configuration and loads the
bistable element. Shape-memory recovery is intrinsically slow, but using it only to
*trigger* the snap decouples actuation rate from propulsion rate, so a slow thermal
stimulus yields a fast mechanical stroke. The energy landscape is engineered to be
**asymmetric**, so the forward transition is far more favorable than the reverse,
rectifying the stroke into net directed motion.

## Programming the trajectory

Multiple actuator-element pairs can be tuned to fire **in sequence** by setting
their recovery thresholds: a thinner strip reaches temperature first, followed by a
thicker one, yielding a coordinated train of strokes and longer travel. Because
heading is governed by **fin geometry and placement**, the route is encoded in the
morphology itself:

- Two symmetric fins produce balanced thrust and straight-line motion.
- Removing or offsetting a fin makes the stroke asymmetric, turning the robot
  through a predictable angle.

Composing fin layout with actuation timing lets us prescribe an entire path in
advance. As a demonstration, we built a vessel that **swims out, releases a cargo,
and returns** to its origin, with no feedback or control system of any kind.

## Significance

The result demonstrates that locomotion and rudimentary decision-making can be
**encoded in a material and its geometry** rather than in electronics: here, the
structure is the controller. This embodied-control approach suits low-cost,
disposable, or otherwise hard-to-power platforms, such as untethered devices for
open-water environmental or marine sensing, where an onboard battery and processor
are impractical. The work appeared in *PNAS*.

*A collaboration with Chiara Daraio's group at Caltech and Kristina Shea's group
at ETH Zurich.*

<!-- ADD BODY IMAGES HERE. Drop files into src/assets/img/projects/bistable-soft-robots/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/bistable-soft-robots/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/bistable-soft-robots/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
