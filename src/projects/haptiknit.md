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
dates: 2022 → 2025
hero: /assets/img/projects/haptiknit/hero.png
heroAlt: A knitted forearm sleeve with embedded pneumatic actuators for haptic feedback
heroCaption: A one-piece knitted sleeve with embedded air actuators that presses patterns of touch onto the forearm.
collaborators: Pan Liu, Nour Mnejja (Houston); Cosima du Pasquier, Sehui Jeong, Liana Tilton, Ian Scholl, Allison Okamura (Stanford); Susan Williams, Skylar Tibbits (MIT); 
summary: >-
  We treat the knit as a designable mechanical medium. Haptiknit is a soft, one-piece
  knitted sleeve that renders rich, spatially resolved touch on the forearm: grading
  local stiffness through stitch architecture and a heat-fusible yarn lets embedded
  pneumatic actuators push their force into the skin rather than into the fabric. In human
  studies it localized touch, produced smooth apparent motion, and conveyed affective
  gestures as reliably as bulkier voice-coil arrays, far more comfortably. We also built a
  multi-level modeling framework that predicts heterogeneous knit mechanics in minutes and
  used it to design a graded compression sleeve, so the garment itself becomes the
  mechanism.
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

<figure class="project-figure" style="width: 83%">
  <img src="/assets/img/projects/haptiknit/haptic-inflatable-knit.png" alt="A pneumatic actuator between a stiff knit and a soft knit layer, shown uninflated and inflated, with the sleeve worn on a forearm and in use on a bicycle">
  <figcaption>Distributed stiffness in action. An actuator sits between a stiff knit layer and a soft one; on inflation the stiff layer grounds the force and directs the deformation inward, into the skin, rather than out into the fabric.</figcaption>
</figure>

## Constructing the sleeve

Soft **pneumatic actuators** are integrated between knit layers; each delivers
over **40 N** of force and actuates at roughly 14 Hz, fast enough for crisp,
well-defined sensations. The sleeve is a single knitted structure of stacked
sublayers, with channels and pockets knitted in to seat the actuators and route
the pneumatic tubing. Distinct fabric types handle distinct jobs: soft actuator and
bending zones, hose-access channels, transverse-flex cuffs, and stiff
actuator-resistance zones. It runs from a compact, **untethered pneumatic supply**
worn on the upper arm, requiring neither external power nor a fixed connection.

<figure class="project-figure">
  <img src="/assets/img/projects/haptiknit/design-haptic-sleeve.png" alt="The sleeve's knit architecture: four fabric types (A to D) for actuator/bending zones, hose access, transverse-flex cuffs, and stiff resistance zones, a cutaway of the layered sleeve, and the eight-actuator layout">
  <figcaption>The sleeve design. Four knit fabrics (A to D) are assigned to specific functions, woven into a single layered sleeve with channels and pockets for the actuators, here in an eight-actuator arrangement around the forearm.</figcaption>
</figure>

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

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/haptiknit/biaxial-knit-behavior.png" alt="A knit unit cell with its geometric parameters, a biaxial test rig, the stress-strain response in tension and compression with simulation and fitting, and parameter sweeps of the model">
  <figcaption>Yarn-level model. A parameterized unit cell is loaded biaxially in tension and compression; the simulation matches experiment, and sweeps over the geometric parameters show how the response is controlled by the loop geometry.</figcaption>
</figure>

That high-fidelity model is then homogenized into a reduced strain-energy
description with only three effective parameters, which predicts fabric-level
stress-strain response in minutes rather than hours. Crucially, the framework
extends to **heterogeneous** textiles: transitions between regions of different
yarn or pattern are captured with simple series and parallel spring analogies, so
a spatially varying fabric can be treated as a patchwork of homogeneous pieces
without losing accuracy.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/haptiknit/mechanics-transitions.png" alt="Uniaxial stress-strain curves in the course and wale directions for homogeneous cotton and nylon and for heterogeneous cotton-plus-nylon fabrics, comparing experiment and the spring-network prediction">
  <figcaption>Capturing heterogeneity. The course and wale responses of mixed cotton-and-nylon fabrics are predicted from their homogeneous constituents using series and parallel spring analogies, matching experiment across directions.</figcaption>
</figure>

As a demonstration, we used the framework to design a knitted **compression
sleeve**: a 3D scan of the arm is mapped to a flat knit, the stitch pattern is
optimized region by region, and the result is fabricated as a single graded
garment that delivers spatially uniform pressure across a curved limb.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/haptiknit/sleeve-optimization.png" alt="Design of a compression sleeve: 3D mapping of the arm, stress optimization producing a patchwork of stitch patterns and yarns, and the fabricated sleeve worn on an arm">
  <figcaption>Designing a compression sleeve. The arm geometry is mapped, the stitch pattern and yarn are optimized region by region into a patchwork, and the optimized garment is knitted as one piece to deliver uniform pressure.</figcaption>
</figure>

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

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/haptiknit/potential-applications.png" alt="Potential applications of programmable knitted wearables: a haptic glove, arm and leg sleeves, and sportswear">
  <figcaption>Where this leads. Comfortable, knitted wearables for social and remote communication, guidance and alerts, virtual reality, rehabilitation, and sport, all produced by the same one-pass knitting approach.</figcaption>
</figure>

*A collaboration with the Okamura group at Stanford, the Self-Assembly Lab at MIT.*

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
