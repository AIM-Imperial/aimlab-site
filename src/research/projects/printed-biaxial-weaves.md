---
title: 3D-printed biaxial weaves
subtitle: Mechanical characterization of woven textiles made by material jetting
tags:
  - Textiles
  - Fabrication
  - Architected materials
start: 2021
end: 2023
hero: /assets/img/projects/printed-biaxial-weaves/hero.jpg
heroAlt: A three-layer 3D-printed woven strip between rigid end blocks with a close-up of its yarns, and a single-layer printed weave bent into a curved configuration
heroCaption: Printed weaves. A three-layer strip printed between rigid end blocks, with a close-up of the interlaced yarns and a rendered cross-section, and a single-layer weave in a deformed configuration.
collaborators: Marc Wirth and Kristina Shea (ETH Zurich)
links:
  - label: Paper
    url: "https://doi.org/10.1016/j.matdes.2022.111449"
publications:
  - authors: "Wirth M, Shea K, Chen T."
    title: "3D-printing textiles: multi-stage mechanical characterization of additively manufactured biaxial weaves."
    venue: "<em>Materials &amp; Design</em> 225, 111449 (2023)."
    url: "https://drive.google.com/file/d/1hIvdN5cZuZDZbamh0Js4AeryueI7No0s/view?usp=sharing"
summary: >-
  Biaxial weaves, two orthogonal sets of interlaced yarns, were generated from an
  eight-parameter model, printed by material jetting in a flexible digital material,
  and tested in tension. A two-stage design of experiments, a definitive screening
  design over 44 runs and then a full factorial design over 48, maps the design
  parameters to a bilinear stress-strain model with a transition strain and a major
  modulus. The weave angle sets the deformation mode: yarn stretching along the yarns,
  shear followed by interlocking on the diagonal. Yarn diameter, pattern length, and
  yarn spacing set the slopes. Yarns tear across the print layers rather than
  delaminating, so the printed textile behaves as a quasi-continuous structure
  regardless of its in-plane orientation.
---

Textiles are anisotropic, pliable, and strong for their weight, and 3D printing
offers a way to make them with yarn geometry that varies from point to point.
Printed textiles had been demonstrated with powder-bed and extrusion processes, but
their mechanical behaviour had not been characterized systematically. In this work
with Marc Wirth and Kristina Shea at ETH Zurich, biaxial weaves were printed by
material jetting and their tensile response was measured as a function of the weave
geometry.

## A parametric family of weaves

A biaxial weave is two orthogonal yarn sets and a pattern of over-and-under
crossings. The design space was reduced to eight parameters: the yarn diameter, the
yarn spacing in each direction, the clearance between yarns at a crossing, the pattern
length on the top and on the bottom of the fabric (how many yarns a yarn crosses
consecutively on each side), a pattern shift, and the weave angle between the yarns
and the load. A generator places the yarn centrelines, sweeps the circular
cross-section along them, and writes the surface as an STL file to a geometric
tolerance of 10 µm, below the 42 µm resolution of the printer.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-biaxial-weaves/design-space.jpg" alt="A neutral biaxial weave at the centre surrounded by variants that each change one parameter: weave angle, yarn diameter, spacing in x and y, node height, pattern length on top and bottom, and pattern shift">
  <figcaption>The design space. A neutral weave at the centre; each surrounding design changes one parameter: yarn diameter, spacing in x and y, node height, pattern length on the top and the bottom, pattern shift, and weave angle.</figcaption>
</figure>

## Printing textiles by material jetting

The weaves were printed on a Stratasys Objet500 Connex3 in FLX9895, a digital
material blended from Agilus30 Black and VeroWhite and chosen as a compromise between
the pliability and the tear resistance expected of a yarn. Layers are 30 µm thick.
The fabric is printed flat, fully enclosed in dissolvable support, which is removed
mechanically and in an alkaline bath. Samples are 25 mm wide and 50 mm long,
following the strip test of ASTM D5035, and are printed monolithically between solid
end blocks that serve as grips. Screening samples had one woven layer; the second
stage used three stacked layers, 0.1 mm apart. The printed geometry matches the
digital model: a 1.3 mm yarn measures 1.30 mm under the microscope.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-biaxial-weaves/print-accuracy.jpg" alt="A printed weave sample and its digital overlay, with close-ups and microscope measurements of the yarn thickness from the top and the side">
  <figcaption>Print accuracy. A printed sample overlaid with an orthographic render of its digital model, and microscope measurements of the yarn thickness from the top and from the side.</figcaption>
</figure>

## Two-stage design of experiments

Rather than fitting a mechanical model, the response was mapped empirically, so that
yarn contact, friction, and slipping are included in the measurement. Stage one is a
definitive screening design: 22 runs at each of two weave angles, 44 tests in all,
spanning a space of 2,916 parameter combinations. It identified the active parameters
and removed the rest. The pattern shift has no effect; pattern symmetry does not
matter, only the total pattern length does; and the clearance at the crossings adds a
redundant nonlinearity and weakens the fabric, so it was fixed at 0.1 mm. Stage two is
a full factorial design over the reduced space of yarn diameter, the two spacings,
pattern length, and weave angle, 48 runs.

Each sample was pulled at 20 mm/min on an Instron ElectroPuls E3000, with a video
extensometer tracking a speckle pattern sprayed on the fabric. Stress is reported as a
line stress in N/mm, the load divided by the current sample width. Every stress-strain
curve is fitted with a bilinear model joined by a quadratic transition: a minor
modulus, a major modulus, and the transition strain at which the two segments meet.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-biaxial-weaves/data-pipeline.jpg" alt="Four-step data pipeline: a tensile test recorded by a video extensometer and load cell, image tracing with virtual strain gauges, recalculation of stress and strain, and a bilinear model fit with minor modulus, major modulus, and transition strain">
  <figcaption>From test to model. Video and load data are traced and filtered, converted to a line stress and strain, and fitted with a bilinear model whose minor modulus, major modulus, and transition strain are the measured quantities.</figcaption>
</figure>

## What each parameter does

The weave angle dominates. Loaded along the yarns, the fabric responds by yarn
stretching and the curve is close to linear. Loaded on the diagonal, the weave first
shears like a four-bar frame with almost no resistance until the yarns lock against
one another, and the response then stiffens sharply: on the diagonal the minor modulus
is two orders of magnitude below the major modulus, 0.008 against 1.1 N/mm on average.

Within each mode the geometry sets the numbers. On the diagonal, yarn diameter and
pattern length set when interlocking begins. Thicker yarns lock at smaller shear
angles, and a longer pattern locks on one side of each node instead of two, so the
transition strain rises. Along the yarns, diameter and spacing set the effective
cross-section, and pattern length and spacing set the waviness of the yarn, and with
it how much of the load is carried by bending before the yarn is taut.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-biaxial-weaves/parameter-effects.jpg" alt="Average stress-strain curves along the yarns and on the diagonal as yarn diameter, pattern length, and the two spacings are each changed, with shaded bands showing the range of samples">
  <figcaption>One parameter at a time. Average stress-strain curves along the yarns (a) and on the diagonal (b) as yarn diameter, pattern length, and the two spacings are changed; shaded bands are the range of the samples averaged.</figcaption>
</figure>

<figure class="project-figure">
  <img src="/assets/img/projects/printed-biaxial-weaves/mechanisms.jpg" alt="Four mechanisms: weave angle switching from yarn tension to shear and interlocking, yarn diameter and pattern length changing the interlocking, diameter and spacing changing the effective cross-section, and pattern length and spacing changing yarn curvature">
  <figcaption>Four mechanisms. The weave angle switches the deformation mode from yarn tension to shear and interlocking; yarn diameter and pattern length set the interlocking; diameter and spacing set the effective cross-section; pattern length and spacing set the yarn curvature.</figcaption>
</figure>

## Poisson's ratio and intermediate angles

On the diagonal the Poisson's ratio follows the kinematics of the shearing frame,
rising from 1 to a peak near the transition strain and then falling to between 0.3
and 0.5 once the yarns lock. Along the yarns it settles near 0.1. Samples cut at 15°
and 30° lie between the two limiting cases, but not in proportion to the angle: the
diagonal behaviour persists for angles close to 45°, because there only interlocked
yarns can transmit load.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-biaxial-weaves/weave-angle.jpg" alt="Stress-strain curves and bilinear fits for weave angles of 0, 15, 30, and 45 degrees, and the fitted responses normalized by their maxima against weave angle">
  <figcaption>Between the limits. Stress-strain curves and bilinear fits for weave angles of 0°, 15°, 30°, and 45°, and the fitted responses normalized by their maxima.</figcaption>
</figure>

## Fracture across the print layers

Extruded 3D-printed textiles fail by delamination between print layers. In the
material-jetted weaves the layers are visible in the fracture surfaces, but the tear
runs perpendicular to them: the yarn fails as a material, not as a stack. A printed
textile can therefore be laid out in any in-plane orientation without regard to the
print direction.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-biaxial-weaves/fracture.jpg" alt="Torn 3D-printed weaves with yarns of 1.3 mm and 0.7 mm diameter, with close-ups showing the print layers and a fracture surface perpendicular to them">
  <figcaption>Fracture. Torn yarns of 1.3 mm and 0.7 mm diameter. The print layers are visible in the close-ups, and the fracture surface is perpendicular to them.</figcaption>
</figure>

## Beyond loom-made fabric

Because the parameters describe the geometry at each crossing, the measured responses
can be assigned node by node to build models of textiles whose mechanical properties
vary across a patch, for example in wearables. The same freedom extends to geometries
no loom produces: the ring below has closed circumferential yarns and prints without
seams. The group's later work on [3D-printed knits](/projects/3DP-knits/) continues
this line.

<figure class="project-figure">
  <img src="/assets/img/projects/printed-biaxial-weaves/closed-loop-structure.jpg" alt="A ring-shaped weave whose circumferential yarns are closed loops, shown as a render, as printed, and deformed">
  <figcaption>A structure without a loom equivalent. Rendered, printed, and deformed views of a ring whose circumferential yarns are closed loops.</figcaption>
</figure>
