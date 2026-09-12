---
title: Engineering knitted wearables
subtitle: Programmable-stiffness textiles for wearable haptics
tags:
  - Textiles
  - Robotics
start: 2022
end: 2024
hero: /assets/img/projects/haptiknit/hero.jpg
heroAlt: A knitted forearm sleeve with embedded pneumatic actuators for haptic feedback
heroCaption: A one-piece knitted sleeve with embedded air actuators that presses patterns of touch onto the forearm.
collaborators: Cosima du Pasquier, Liana Tilton, Ian Scholl, Allison Okamura (Stanford); Lavender Tessmer, Skylar Tibbits (MIT)
summary: >-
  We treat the knit as a designable mechanical medium. Haptiknit is a soft, one-piece
  knitted sleeve that renders rich, spatially resolved touch on the forearm: grading
  local stiffness through stitch architecture and a heat-fusible yarn lets embedded
  pneumatic actuators push their force into the skin rather than into the fabric. In human
  studies it localized touch, produced smooth apparent motion, and conveyed affective
  gestures as reliably as bulkier voice-coil arrays, far more comfortably. The garment
  itself becomes the mechanism.
publications:
  - authors: "du Pasquier C, Tessmer L, Scholl I, Tilton L, Chen T, Tibbits S, Okamura A."
    title: "Haptiknit: distributed stiffness knitting for wearable haptics."
    venue: "<em>Science Robotics</em> 9(97), eado3887 (2024)."
    url: "https://drive.google.com/file/d/1PNUY1SR2ntghZHI6-iLxJ4TC-QBVRWBv/view?usp=sharing"
---

Weft-knitted fabrics are an unusually capable engineering material: a single
continuous yarn, interlooped, yields a structure that is stretchable, durable, and
conformable, with a mechanical response set as much by stitch architecture as by
the fiber itself. We treat the knit as a designable mechanical medium and, in this
project, build a functional knitted device: a haptic sleeve whose stiffness is
programmed into the fabric.

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
  <img src="/assets/img/projects/haptiknit/haptic-inflatable-knit.jpg" alt="A pneumatic actuator between a stiff knit and a soft knit layer, shown uninflated and inflated, with the sleeve worn on a forearm and in use on a bicycle">
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
  <img src="/assets/img/projects/haptiknit/design-haptic-sleeve.jpg" alt="The sleeve's knit architecture: four fabric types (A to D) for actuator/bending zones, hose access, transverse-flex cuffs, and stiff resistance zones, a cutaway of the layered sleeve, and the eight-actuator layout">
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

## Significance

Haptiknit treats the knit as an engineerable mechanical system: the *garment can
be the mechanism*. Encoding stiffness directly into a textile yields accurate,
expressive haptic feedback in a form factor indistinguishable from clothing.
Because the device is produced in a single knitting pass, the same approach
generalizes to other body sites and assistive applications without redesigning
the manufacturing pipeline.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/haptiknit/potential-applications.jpg" alt="Potential applications of programmable knitted wearables: a haptic glove, arm and leg sleeves, and sportswear">
  <figcaption>Where this leads. Comfortable, knitted wearables for social and remote communication, guidance and alerts, virtual reality, rehabilitation, and sport, all produced by the same one-pass knitting approach.</figcaption>
</figure>

*A collaboration with the Okamura group at Stanford and the Self-Assembly Lab at MIT.*
