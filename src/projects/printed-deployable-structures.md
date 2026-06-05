---
layout: layouts/project.njk
title: Printed bistable structures that deploy and reconfigure
subtitle: Flat-printed assemblies that snap into stable, load-bearing 3D shapes
tags:
  - Shape transformation
  - Architected materials
  - Algorithm
  - 3D printing
order: 11
dates: 2017 → 2021
hero: /assets/img/projects/printed-deployable-structures/hero.png
heroAlt: A flat multi-material 3D print that deploys into a stable doubly-curved 3D structure
heroCaption: Flat-printed assemblies of bistable actuators that deploy into stable, load-bearing 3D shapes.
collaborators: With Jochen Mueller and Kristina Shea (ETH Zurich)
links:
  - label: Code & data
    url: "#"
publications:
  - authors: "Chen T, Mueller J, Shea K."
    title: "Integrated design and simulation of tunable, multi-state structures fabricated monolithically with multi-material 3D printing."
    venue: "<em>Scientific Reports</em> 7, 45671 (2017)."
    url: "https://drive.google.com/file/d/19tzDmwOJkBSfZwhrMuFWOWYMPGb_pIcP/view?usp=sharing"
  - authors: "Chen T, Shea K."
    title: "An autonomous programmable actuator and shape reconfigurable structures using bistability and shape memory polymers."
    venue: "<em>3D Printing and Additive Manufacturing</em> 5(2), 91–101 (2018)."
    url: "https://drive.google.com/file/d/12Lsc90uOu3PkYYO4V2--y5PALx13howV/view?usp=sharing"
  - authors: "Chen T, Shea K."
    title: "Computational design of multi-stable, reconfigurable surfaces."
    venue: "<em>Materials &amp; Design</em> 205, 109688 (2021)."
    url: "https://drive.google.com/file/d/10nXxRKJr1Xy3jlZ9kSGceWyzss191Mz-/view?usp=sharing"
---

Deployable structures are valued in aerospace, architecture, and medicine because
they ship flat or compact and expand on site. The persistent difficulties are
precision and integrity: passive deployment tends to be imprecise, prone to
jamming, and to leave a structure that cannot carry load once open. This line of
work builds reconfigurable structures from a single multi-material 3D print whose
deployed states are geometrically prescribed, mechanically stable, and
load-bearing. It develops across three stages: the actuator, its autonomous
version, and the inverse-design method that targets arbitrary shapes.

## A bistable unit actuator

The foundation is a monolithically printed unit actuator based on a Von Mises
truss, a shallow two-bar linkage that **snaps between two stable equilibria**. Both
states are stable with no holding force, and the geometry is tuned to maximize
stroke (the expansion ratio approaches unity when actuators are connected in
series). The triggering force is set by the compliant joint material and length,
and we showed it can be tuned over an order of magnitude (roughly 0.5 to 5 N),
verified against simulation. Arranged hierarchically, these actuators drive larger
assemblies: deployable tetrahedral space frames, and flat sheets that activate into
either positive or negative Gaussian curvature, for example a dome or an enclosure,
depending on each unit's initial orientation. A modified dynamic-relaxation solver
predicts the deployed geometries to within about 5% of measurement.

## Adding autonomy with shape-memory polymers

The first actuator still requires an external trigger. To make deployment
autonomous, we paired the bistable mechanism with a **shape-memory polymer**:
the polymer acts as a temperature-controlled energy source while the bistable
element serves as a force amplifier and linear actuator. Above a programmed
temperature the polymer recovers and trips the snap, so the structure deploys in
response to ambient heat alone, with no motor or external power. Because the
recovery temperature can be tuned per actuator, deployment can be **sequenced** in
time. We demonstrated flat sheets that transform into a pyramid or a hyperbolic
paraboloid, with quantified load-bearing capacity both during activation and in the
deployed state.

## Inverse design of multi-stable surfaces

The final stage addresses the design problem directly: given a set of target 3D
surfaces, compute one flat sheet that reconfigures into each of them, with every
deployed state mechanically stable. We discretize each target as a **Chebyshev
net**, a quadrilateral mesh that captures the surface through the angles of its
cells, and map those cells to the planar fabrication sheet. The angular defects
between flat and target are absorbed by **bistable actuators along the diagonals**,
which lengthen or shorten to realize each shape. Unlike purely geometric inverse
methods, this guarantees that the reconfigured states are statically stable rather
than merely kinematically possible. We fabricated a single multi-material printed
sheet that reconfigures into two distinct, stable, doubly curved surfaces.

## Why it matters

Taken together, these results establish a route to reconfigurable structures whose
deployment is precise, repeatable, autonomous, and load-bearing, all encoded in a
single flat print rather than assembled or externally actuated. The targets span
temporary shelters and architectural elements, deployable aerospace structures,
and biomedical devices that must change shape after placement. The work was
published in *Scientific Reports*, *3D Printing and Additive Manufacturing*, and
*Materials & Design*.

*A collaboration with Jochen Mueller and Kristina Shea at ETH Zurich.*

<!-- ADD BODY IMAGES HERE. Drop files into src/assets/img/projects/printed-deployable-structures/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/printed-deployable-structures/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/printed-deployable-structures/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
