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
dates: 2017–2021
hero: /assets/img/projects/printed-deployable-structures/hero.png
heroAlt: A flat multi-material 3D print that deploys into a stable doubly-curved 3D structure
heroCaption: Flat-printed assemblies of bistable actuators that deploy into stable, load-bearing 3D shapes.
collaborators: With Kristina Shea (ETH Zurich)
summary: >-
  Deployable structures ship flat but tend to deploy imprecisely and cannot bear load once open. We build reconfigurable structures from a single multi-material 3D print whose deployed states are prescribed, stable, and load-bearing. The unit is a bistable actuator that snaps between two stable states; pairing it with a shape-memory polymer makes deployment autonomous and sequenceable, triggered by ambient heat with no power. An inverse-design method discretizes any target surface as a Chebyshev net and places actuators along the diagonals, so one flat print reconfigures into multiple distinct, stable, curved surfaces.
publications:
  - authors: "Chen T, Mueller J, Shea K."
    title: "Integrated design and simulation of tunable, multi-state structures fabricated monolithically with multi-material 3D printing."
    venue: "<em>Scientific Reports</em> 7, 45671 (2017)."
    url: "https://drive.google.com/file/d/19tzDmwOJkBSfZwhrMuFWOWYMPGb_pIcP/view?usp=sharing"
  - authors: "Chen T, Shea K."
    title: "An autonomous programmable actuator and shape reconfigurable structures using bistability and shape memory polymers."
    venue: "<em>3DP+</em> 5(2), 91–101 (2018)."
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
stroke, so the expansion ratio approaches unity when actuators are connected in
series.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-deployable-structures/unit-actuator.png" alt="The printed bistable unit actuator in its two states, and the same actuator assembled hierarchically into chevron strips and tetrahedral space-frame structures">
  <figcaption>The bistable unit actuator (left) and the hierarchical assemblies it builds: serial chevron strips and deployable tetrahedral space frames.</figcaption>
</figure>

The actuator is a multi-material print combining a stiff structural material, a
bistable element, and a compliant hinge. The triggering force is set by the
compliant joint's material and length, and we showed it can be tuned over an order
of magnitude (roughly 0.5 to 5 N), verified against simulation. The same
parameterization also determines whether an assembled sheet activates into positive
or negative Gaussian curvature.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-deployable-structures/updated-unit-optimization.png" alt="Parameterization of the actuator with its stiff, bistable, and compliant materials, and unit configurations that deploy to dome-like and saddle-like curvature">
  <figcaption>Designing the unit. The actuator combines stiff, bistable, and compliant materials; tuning its geometry sets the trigger force and selects whether the assembled cell deploys to synclastic (dome) or anticlastic (saddle) curvature.</figcaption>
</figure>

Connecting units in series multiplies the stroke, and a modified dynamic-relaxation
solver predicts the deployed geometries to within about 5% of measurement.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-deployable-structures/two-units-actuation.png" alt="Two serially connected actuators deploying, shown in experiment and matching schematic, expanding the structure as both units snap">
  <figcaption>Two serially connected units. As each snaps, their strokes add, expanding the assembly; experiment and the simulated kinematics agree.</figcaption>
</figure>

Tiling the cells produces flat precursors that deploy into stable, doubly curved
structures, and the approach scales from small modules up to large sheets.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-deployable-structures/multi-cell-structure.png" alt="Flat multi-cell tessellations and the positive- and negative-curvature 3D structures they deploy into, with matching simulations">
  <figcaption>Multi-cell structures. Flat tessellations of the unit cell (left of each pair) deploy into stable domes and saddles (right), reproduced by simulation.</figcaption>
</figure>

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/printed-deployable-structures/larger-structure.png" alt="A large, roughly 400 mm flat printed array deploying into a doubly-curved structure">
  <figcaption>Scaling up. A large (~400 mm) flat array of cells deploys into a self-supporting curved structure, showing the approach is not limited to small modules.</figcaption>
</figure>

## Adding autonomy with shape-memory polymers

The first actuator still requires an external trigger. To make deployment
autonomous, we paired the bistable mechanism with a **shape-memory polymer**: the
polymer acts as a temperature-controlled energy source while the bistable element
serves as a force amplifier and linear actuator. Above a programmed temperature the
polymer recovers and trips the snap, so the structure deploys in response to ambient
heat alone, with no motor or external power. Because the recovery temperature can be
tuned per actuator, deployment can be **sequenced** in time, and the deployed
structure carries quantified load both during and after activation.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-deployable-structures/autonomous-deployment.png" alt="A shape-memory-polymer-driven structure deploying from flat on heating, with expansion and contraction units, and load-bearing tests at 50 g and 200 g in the deployed state">
  <figcaption>Autonomous, load-bearing deployment. Heating drives the structure from flat to deployed through paired expansion and contraction units; the deployed form sustains load (tested at 50 g and 200 g), with no motor or external power.</figcaption>
</figure>

## Inverse design of multi-stable surfaces

The final stage addresses the design problem directly: given a set of target 3D
surfaces, compute one flat sheet that reconfigures into each of them, with every
deployed state mechanically stable. We discretize each target as a **Chebyshev
net**, a quadrilateral mesh that captures the surface through the angles of its
cells, and map those cells to the planar fabrication sheet.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-deployable-structures/chebychev-net.png" alt="Discretizing a target surface as a Chebyshev net: sampling points and equal-length edges build a quadrilateral mesh that conforms to the doubly-curved target">
  <figcaption>Chebyshev-net discretization. The target surface is covered by a mesh of equal-length edges whose quadrilateral cells capture the geometry through their corner angles, providing the map from flat sheet to 3D shape.</figcaption>
</figure>

The angular defects between the flat and target states are absorbed by **bistable
actuators along the diagonals**, which lengthen or shorten to realize each shape.
Unlike purely geometric inverse methods, this guarantees that the reconfigured
states are statically stable rather than merely kinematically possible. We
fabricated a single multi-material printed sheet that reconfigures into two
distinct, stable, doubly curved surfaces.

## Why it matters

Taken together, these results establish a route to reconfigurable structures whose
deployment is precise, repeatable, autonomous, and load-bearing, all encoded in a
single flat print rather than assembled or externally actuated. The targets span
temporary shelters and architectural elements, deployable aerospace structures,
and biomedical devices that must change shape after placement. The work was
published in *Scientific Reports*, *3D Printing and Additive Manufacturing*, and
*Materials & Design*.

*Advised by Kristina Shea at ETH Zurich.*

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
