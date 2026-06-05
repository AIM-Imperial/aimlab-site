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
heroCaption: A 3D-printed swimmer whose fins are driven by snapping bistable elements — no battery, no electronics, no tether.
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

Most robots that move need a power cord, or a battery and control electronics on
board — a tether limits where they can go, and onboard power makes them heavy and
complicated. We built small **soft swimming robots that move on their own with
neither**: no battery, no electronics, no tether. They're 3D-printed in a single
print, and they steer themselves along a path decided in advance.

## How it swims

The robot's fins are driven by a **bistable element** — a snap-through part with
two stable states, like a clicker or a hair clip. Snapping releases a burst of
stored energy quickly, which is what gives a fast, propulsive paddle stroke.

The snap is triggered by a **shape-memory polymer "muscle"**: a 3D-printed curved
strip that, when the surrounding water warms past a set temperature, tries to
return to its remembered shape and pushes on the bistable element. On its own a
shape-memory material acts slowly — but by using it just to *trip* the bistable
snap, the robot gets a sudden, powerful fin stroke. The energy curve is
deliberately **asymmetric**, so moving forward is much easier than backward, which
biases the motion in one direction.

## Programming where it goes

Multiple muscle-and-snap pairs can be tuned to fire **in sequence**: a thinner
muscle activates first, then a thicker one, giving a chain of strokes that travel
further. And because steering comes from the **placement of the fins**, the path
is set at design time:

- Two symmetric fins → it goes straight.
- Remove or offset a fin → the stroke becomes asymmetric and the robot turns by a
  predictable angle.

By choosing fin layout and muscle timing, we preprogram a whole route. As a proof
of concept, we made a vessel that **swims out, drops a cargo, and navigates back**
to its start — all autonomously, with no control system.

## Why it matters

This shows that locomotion and simple "decisions" can be **built into a material
and its geometry** rather than into electronics — the structure is the controller.
That points toward cheap, disposable, or hard-to-power robots for jobs like
unguided traversal of open water (environmental or marine sensing), where carrying
a battery and computer isn't practical. The work was published in *PNAS*.

*A collaboration with Chiara Daraio's group at Caltech and Kristina Shea's group
at ETH Zurich.*

<!-- ADD BODY IMAGES HERE — drop files into src/assets/img/projects/bistable-soft-robots/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/bistable-soft-robots/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/bistable-soft-robots/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
