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
links:
  - label: Code & data
    url: "#"
publications:
  - authors: "Li W, Wang Y, Chen T, Zhang XS."
    title: "Algorithmic encoding of adaptive responses in temperature-sensing multimaterial architectures."
    venue: "<em>Science Advances</em> 9(47), eadk0620 (2023). Cover article."
    url: "https://drive.google.com/file/d/170Pr3OYgXNjDoSyb-lSr0PFwmyaPYdWm/view?usp=sharing"
---

Most engineered materials behave the same way for their whole life — push on them
and they push back by a fixed amount. We wanted materials that *change their
behavior on cue*: stiff in the cold, soft when warm; contracting at one
temperature, expanding at another — all without motors, batteries, or any control
electronics. The material itself senses the temperature and responds.

The trick is to build a structure out of **two different plastics** whose
stiffness changes by very different amounts as they warm up. One of them
(call it the stiff one) is roughly **60× stiffer than the other when cold, but
only about 4× stiffer once warm**. By arranging these two materials in just the
right geometry, the *cold* structure is dominated by one material and the *warm*
structure by both — so the same object behaves like two different objects
depending on its temperature.

## Designing the behavior, not just the shape

The hard part is finding the geometry and the layout of the two materials that
produce a *specific* target behavior. There are far too many possibilities to
guess by hand, so we let a computer design it. We specify the response we want —
say, a particular force-versus-squish curve when cold and a completely different
one when warm — and a **topology-optimization algorithm** searches for the
two-material layout that hits both targets at once. The resulting designs look
organic and irregular, nothing a person would draw, and they are produced directly
on a **multi-material 3D printer** that lays down both polymers together.

## What it can do

- **Programmable force response.** We made parts that buckle softly when cold but
  stiffen sharply when warm — the kind of tunable cushioning useful for impact
  absorption or vibration isolation, switchable by temperature alone.
- **Reversing motion.** A lattice that *squeezes inward* when stretched at one
  temperature but *bulges outward* at another — the sign of its response flips
  with heat.
- **A temperature-triggered switch.** Because the shape change is so
  controllable, we built a demonstrator where warming the material moves it enough
  to open or close a small electrical circuit — a self-acting thermal switch with
  no sensor or controller.
- **3D behavior.** The same idea extends into three dimensions, with blocks that
  expand along one axis when cold and along a different axis when warm.

## Why it matters

This turns temperature into a built-in control signal: the material is its own
sensor *and* its own actuator. Encoding the response into the geometry — rather
than relying on shape-memory effects or external power — points toward smarter
soft robots, adaptive cushioning, and devices that quietly reconfigure themselves
as their environment changes. The work was published in *Science Advances* and
featured on the journal's cover.

*A collaboration with Weichen Li and Xiaojia Shelly Zhang (University of Illinois
Urbana-Champaign).*

<!-- ADD BODY IMAGES HERE — drop files into src/assets/img/projects/temperature-switchable-metamaterials/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/temperature-switchable-metamaterials/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/temperature-switchable-metamaterials/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
