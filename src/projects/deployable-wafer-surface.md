---
layout: layouts/project.njk
title: Deployable surfaces, from the benchtop to the wafer
subtitle: Flat sheets that snap into stable 3D shapes, scaled down to the chip
tags:
  - Shape transformation
  - Architected materials
  - Algorithm
order: 1
dates: 2021 → present
hero: /assets/img/projects/deployable-wafer-surface/hero.png
heroAlt: A wafer-fabricated planar precursor deploying into a doubly-curved 3D dome
heroCaption: From a target surface, to a flat patterned precursor, to the deployed free-standing 3D form.
collaborators: Yue Wang, Kelvin Shum (Houston); Yuyang Song (Toyota Research Institute of North America); Julian Panetta (UC Davis), Max Schnaubelt (TUM), Mark Pauly (EPFL)
links:
  - label: Code & data (Zenodo)
    url: "https://doi.org/10.5281/zenodo.20393900"
publications:
  - authors: "Chen T, Panetta J, Schnaubelt M, Pauly M."
    title: "Bistable auxetic surface structures."
    venue: "<em>ACM Transactions on Graphics</em> 40(4), 1–9 (2021). SIGGRAPH."
    url: "https://drive.google.com/file/d/1oybdAwG4WwRRoPT-WCSBqvzhTBkB1O_K/view?usp=sharing"
  - authors: "Wang Y, Shum K, Song Y, Chen T."
    title: "Deployable 3D architectures from wafer-fabricated precursors."
    venue: "<em>Nature Communications</em> (2026)."
    url: "https://drive.google.com/file/d/1w94hxH9gdVOt6hDtW4yBAYeUewtVxk55/view?usp=sharing"
---

Can a planar sheet be programmed to deploy into a prescribed, self-supporting 3D
surface, without a mold, a supporting frame, or any external power? And if so, how
far down in scale does the principle survive? This project spans both questions: from
a benchtop, laser-cut demonstration to free-standing 3D structures fabricated on a
silicon wafer.

## The starting point: bistable auxetic surfaces

Existing flat-to-curved strategies typically require a sustained applied load (the
shape relaxes once released), plastic deformation, or stimuli-responsive materials
actuated by heat or solvent. We instead use a purely *mechanical* mechanism, tiling
the sheet with **bistable auxetic cells** that combine two properties:

- **Auxetic**: the cell exhibits a negative Poisson's ratio, expanding biaxially
  under tension, with the magnitude of areal growth set by its geometry.
- **Bistable**: it has two stable equilibria separated by an energy barrier and
  *snaps* between them, retaining the second state with no holding force.

Prescribing a spatially varying expansion across the sheet introduces an in-plane
metric incompatible with a flat configuration. This geometric frustration drives the
sheet to buckle out of plane into a determined curved shape, and because each cell
latches in its second stable state, the deployed surface is self-supporting.

<figure class="project-figure">
  <img src="/assets/img/projects/deployable-wafer-surface/bistable-auxetic.png" alt="A flat laser-cut sheet of bistable auxetic cells deploying into a stable doubly-curved surface">
  <figcaption>The benchtop version: a flat, laser-cut sheet of patterned bistable auxetic cells that pops up into a target 3D shape and holds it on its own.</figcaption>
</figure>

## Designing the flat pattern for one specific shape

Targeting a specific surface is an inverse problem. We flatten the target 3D surface
to the plane with a conformal map, which yields at every point the local areal
scaling (the conformal factor) required to recover the 3D embedding. From a
**precomputed library** of cell designs we then assign, at each location, the cell
whose snapped-open expansion matches the required growth (and where several candidates
qualify, the one that deploys most stiffly and repeatably). Tiling these spatially
graded cells produces a single flat layout whose only compatible deployed state is the
intended shape. At benchtop scale the layout is laser-cut from an elastomeric sheet,
and we validated the deployed geometries by 3D-scanning physical prototypes against
the design.

## Scaling it down to the wafer

The same principle, carried to the micron scale, lets standard **semiconductor
processing produce 3D shells**. Lithographic fabrication is exceptionally precise but
intrinsically planar, a fundamental constraint for curved sensors, conformal antennas,
micro-optics, and implants intended for non-developable surfaces. Here the
rotating-squares unit cells are defined as slits in a thin polyimide film via the same
photolithography and etch steps used for flexible electronics. The full sheet is
patterned in the cleanroom in roughly two days, including a release process that
delaminates it from the wafer without damaging the compliant hinges and without
aggressive wet chemistry. A rounded indenter then loads the flat sheet, triggering the
cells through their snap-through transition; on retraction, the structure remains in
the deployed 3D configuration. We treat deployment as the *terminal fabrication step*:
the planar sheet on the wafer is an intermediate, and the deployed 3D structure is the
finished device.

## What we showed

- A dome reliably deployed from a flat disk, in agreement with finite-element
  simulation.
- A range of more complex geometries, including a model cornea, a double dome, and a
  ring, spanning both positive (synclastic) and negative (anticlastic) Gaussian
  curvature.
- Functional **concave mirrors**: gold-coated dishes deployed at three distinct focal
  lengths that focus an incident laser as predicted by geometric optics, a complete
  optical element produced entirely by this route.

## Why it matters

By recasting shape transformation as a fabrication step, this work extends *flexible*
electronics toward *deployable* electronics: antennas, conformal sensor arrays,
micro-optics, and implants built with the mature, scalable toolchain of the
semiconductor industry. Because the design is resolved cell by cell, the planar-to-3D
map is known a priori, so functional components such as sensors can be registered to
precise locations on the final curved surface.

*A collaboration with Julian Panetta (UC Davis), Max Schnaubelt (TUM), and Mark
Pauly (EPFL) on the foundational work, and with the Toyota Research Institute of
North America on the wafer-scale realization. Supported by NASA MIRO (IDEAS²,
grant 80NSSC24M0178). Fabricated at the University of Houston Nanofabrication
Facility and the Shared Equipment Authority at Rice University.*

<!-- ADD BODY IMAGES HERE. Drop files into src/assets/img/projects/deployable-wafer-surface/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/deployable-wafer-surface/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/deployable-wafer-surface/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
