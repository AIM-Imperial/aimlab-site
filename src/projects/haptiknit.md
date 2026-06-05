---
layout: layouts/project.njk
title: Haptiknit
subtitle: A knitted sleeve that lets you feel a sense of touch
tags:
  - Textiles
  - Soft matter
  - Fabrication
order: 5
dates: 2024
hero: /assets/img/projects/haptiknit/hero.png
heroAlt: A knitted forearm sleeve with embedded pneumatic actuators for haptic feedback
heroCaption: A one-piece knitted sleeve with embedded air actuators that presses patterns of touch onto the forearm.
collaborators: Cosima du Pasquier, Liana Tilton, Ian Scholl, Allison Okamura (Stanford); Lavender Tessmer, Skylar Tibbits (MIT)
links:
  - label: Code & data
    url: "#"
publications:
  - authors: "du Pasquier C, Tessmer L, Scholl I, Tilton L, Chen T, Tibbits S, Okamura A."
    title: "Haptiknit: distributed stiffness knitting for wearable haptics."
    venue: "<em>Science Robotics</em> 9(97), eado3887 (2024)."
    url: "https://drive.google.com/file/d/1b-V-1nRMBp5rZ3rg9i79tNKvwPk2SVY7/view?usp=sharing"
---

Touch is one of our richest senses — a tap, a stroke, a squeeze can carry
attention, comfort, or emotion. But devices that recreate touch on the body
usually rely on rigid motors and bulky batteries, so they end up stiff,
uncomfortable, and hard to wear. **Haptiknit** is a different approach: a soft,
knitted sleeve that delivers convincing touch sensations to the forearm, light and
comfortable enough to actually wear.

## The key idea: stiffness woven into the fabric

To make you *feel* a press, an air-filled actuator has to push against your skin —
not just balloon outward into the loose fabric around it. The trick is to vary the
**stiffness of the knit itself**, in the right places. Using a
computer-controlled industrial knitting machine, the whole sleeve is made in **one
piece** with soft, stretchy regions and stiff regions side by side. The stiff
regions act as a backstop that forces each actuator's push *inward*, toward the
arm.

Two methods set that stiffness, both built into the knitting:
- **Stitch pattern** — the type of knot and pattern changes how stretchy a region
  is.
- **Heat-fusible yarn** — a special thread that, when heated, melts and locks a
  region rigid. Adding it in chosen zones makes them up to **~400× stiffer** than
  the soft zones.

This lets a single seamless textile span more than two orders of magnitude in
stiffness — something that would be very hard to achieve by gluing separate
materials together.

## Building the sleeve

Soft **pneumatic (air-powered) actuators** are tucked between knit layers; each
one can push with over **40 newtons** of force and respond fast enough (about 14
times per second) to feel crisp. The sleeve is a single knitted structure of
several stacked sublayers, with built-in channels and pockets to hold the
actuators and route the air tubes. It's driven by a small **untethered air-supply
unit** worn on the upper arm — no wall power, no tether.

## Does it actually work?

We tested the sleeve with people across three studies:
- **Locating touch** — wearers identified *where* on the forearm they were being
  touched more accurately than with the buzzing (vibration) motors most wearables
  use.
- **Stroking sensations** — firing actuators in sequence produced smooth,
  pleasant stroking sensations, tunable from discrete taps to continuous strokes.
- **Social gestures** — the sleeve communicated emotional touch cues (attention,
  gratitude, happiness, calming, love, sadness) about as well as a bulkier
  voice-coil system — using **fewer actuators** and in a far more portable,
  comfortable form.

## Why it matters

Haptiknit shows that the *garment itself* can be the engineering: by programming
stiffness directly into a knit, you get accurate, expressive touch feedback in
something that feels like clothing. That points toward comfortable wearables for
social and remote communication, guidance and alerts, virtual reality, and
assistive devices — and because it's made in one shot on a knitting machine, the
same method can scale to other body parts without redesigning the manufacturing.

*A collaboration with the Okamura group at Stanford and the Self-Assembly Lab at
MIT.*

<!-- ADD BODY IMAGES HERE — drop files into src/assets/img/projects/haptiknit/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/haptiknit/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/haptiknit/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
