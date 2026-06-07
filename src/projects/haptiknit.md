---
layout: layouts/project.njk
title: Engineering knitted wearables
subtitle: Programmable-stiffness textiles for haptics, modeled and designed by computer
tags:
  - Textiles
  - Soft matter
  - Fabrication
  - Algorithm
order: 5
dates: 2024 → 2025
hero: /assets/img/projects/haptiknit/hero.png
heroAlt: A knitted forearm sleeve with embedded pneumatic actuators for haptic feedback
heroCaption: A one-piece knitted sleeve with embedded air actuators that presses patterns of touch onto the forearm.
collaborators: Cosima du Pasquier, Sehui Jeong, Liana Tilton, Ian Scholl, Allison Okamura (Stanford); Susan Williams, Skylar Tibbits (MIT); Pan Liu, Nour Mnejja (Houston)
publications:
  - authors: "du Pasquier C, Tessmer L, Scholl I, Tilton L, Chen T, Tibbits S, Okamura A."
    title: "Haptiknit: distributed stiffness knitting for wearable haptics."
    venue: "<em>Science Robotics</em> 9(97), eado3887 (2024)."
    url: "https://drive.google.com/file/d/1b-V-1nRMBp5rZ3rg9i79tNKvwPk2SVY7/view?usp=sharing"
  - authors: "du Pasquier C, Jeong S, Liu P, Williams S, Mnejja N, Okamura AM, Tibbits S, Chen T."
    title: "Multi-level mechanical modeling and computational design framework for weft knitted fabrics."
    venue: "<em>Extreme Mechanics Letters</em> 102423 (2025)."
    url: "https://drive.google.com/file/d/1qGjSgCA5Z0dKtUMpmoDQmKEygK6I14ek/view?usp=sharing"
---

Weft-knitted fabrics are an unusually capable engineering material: a single
continuous yarn, interlooped, yields a structure that is stretchable, durable, and
conformable, with a mechanical response set as much by stitch architecture as by
the fiber itself. We treat the knit as a designable mechanical medium and pursue
two complementary goals: building functional knitted devices, exemplified by a
haptic sleeve, and developing the computational models needed to predict and
design knit behavior from first principles.

## Haptiknit: rendering touch from a textile

Touch conveys a remarkable bandwidth of information: a tap, a stroke, or a
squeeze can signal attention, comfort, or emotion. Yet most wearable haptic
devices recreate these sensations with rigid motors and bulky power electronics,
producing hardware that is stiff, cumbersome, and uncomfortable against the skin.
**Haptiknit** takes a different route: a soft, knitted sleeve that renders rich,
spatially resolved touch on the forearm while remaining light and comfortable
enough for everyday wear.

## Programming stiffness into the fabric

For a wearer to perceive a press, a pneumatic actuator must transmit force into
the skin rather than dissipate it by expanding into the compliant fabric around
it. The solution is to modulate the **local stiffness of the knit** so that
actuator pressure is directed inward. A computer-controlled industrial knitting
machine fabricates the entire sleeve as a **single piece**, interleaving
compliant and stiff regions; the stiff regions serve as a mechanical ground that
reacts each actuator's force toward the arm.

Two mechanisms, both intrinsic to the knitting process, set the stiffness:
- **Stitch architecture**: the loop topology and pattern govern a region's
  effective elastic modulus.
- **Heat-fusible yarn**: a thermoplastic filament that fuses when heated, locking
  a region rigid. Selectively placing it raises local stiffness by up to
  **~400x** relative to the compliant zones.

A single seamless textile therefore spans more than two orders of magnitude in
stiffness, a gradient that would be difficult to realize by bonding discrete
materials.

## Constructing the sleeve

Soft **pneumatic actuators** are integrated between knit layers; each delivers
over **40 N** of force and actuates at roughly 14 Hz, fast enough for crisp,
well-defined sensations. The sleeve is a single knitted structure of stacked
sublayers, with channels and pockets knitted in to seat the actuators and route
the pneumatic tubing. It runs from a compact, **untethered pneumatic supply**
worn on the upper arm, requiring neither external power nor a fixed connection.

## Evaluating performance

We characterized the sleeve in three human-subject studies:
- **Spatial localization**: wearers identified the stimulation site on the
  forearm more accurately than with the eccentric vibration motors common in
  wearables.
- **Apparent motion**: sequencing actuators produced smooth, agreeable stroking
  percepts, tunable along a continuum from discrete taps to continuous motion.
- **Affective gestures**: the sleeve conveyed emotional cues (attention,
  gratitude, happiness, calming, love, sadness) about as reliably as a bulkier
  voice-coil array, using **fewer actuators** in a far more portable and
  comfortable form.

## Predicting and designing knit mechanics

Devices like Haptiknit expose a broader bottleneck: knit behavior is governed by
yarn-scale contact, friction, and loop geometry, so each new fabric has typically
demanded its own round of physical testing. We developed a **multi-level modeling
and design framework** to remove that bottleneck. It begins with a volumetric
finite-element model that resolves anisotropic yarn behavior and interloop contact
at the stitch scale, validated against a systematic set of swatches spanning
different stitch lengths, patterns, and yarn materials, so it generalizes without
per-fabric recalibration.

That high-fidelity model is then homogenized into a reduced strain-energy
description with only three effective parameters, which predicts fabric-level
stress-strain response in minutes rather than hours. Crucially, the framework
extends to **heterogeneous** textiles: transitions between regions of different
yarn or pattern are captured with simple series and parallel spring analogies, so
a spatially varying fabric can be treated as a patchwork of homogeneous pieces
without losing accuracy. As a demonstration, we used it to design a knitted
**compression sleeve** that conforms to arm geometry while delivering spatially
uniform pressure.

## Significance

Together these results treat the knit as an engineerable mechanical system: the
*garment can be the mechanism*, and its behavior can be predicted and inverted by
computation rather than trial and error. Haptiknit shows that encoding stiffness
directly into a textile yields accurate, expressive haptic feedback in a form
factor indistinguishable from clothing, while the modeling framework provides the
design tools to target a specified mechanical response, from haptic feedback to
graduated medical compression. Because the devices are produced in a single
knitting pass, the same approach generalizes to other body sites and assistive
applications without redesigning the manufacturing pipeline.

*A collaboration with the Okamura group at Stanford, the Self-Assembly Lab at MIT,
and the AIM Laboratory at Houston.*

<!-- ADD BODY IMAGES HERE. Drop files into src/assets/img/projects/haptiknit/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/haptiknit/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/haptiknit/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
