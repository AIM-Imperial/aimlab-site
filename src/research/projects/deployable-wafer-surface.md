---
title: Deployable wafer devices
subtitle: Flat sheets that snap into stable 3D shapes, scaled down to the chip
tags:
  - Deployable structures
  - Shape morphing
  - Algorithm
  - Kirigami
start: 2023
end: 2026
hero: /assets/img/projects/deployable-wafer-surface/hero.jpg
heroAlt: A wafer-fabricated planar precursor deploying into a doubly-curved 3D dome
heroCaption: From a target surface, to a flat patterned precursor, to the deployed free-standing 3D form.
collaborators: Yue Wang, Kelvin Shum (Houston); Yuyang Song (Toyota Research Institute of North America)
links:
  - label: Code & data (Zenodo)
    url: "https://doi.org/10.5281/zenodo.20393900"
publications:
  - authors: "Wang Y, Shum K, Song Y, Chen T."
    title: "Deployable 3D architectures from wafer-fabricated precursors."
    venue: "<em>Nature Communications</em> (2026)."
    url: "https://drive.google.com/file/d/1dH6reMT56YjCjZBqzTxB54U8LTwqd83P/view?usp=sharing"
summary: >-
  Can a flat sheet be programmed to deploy into a prescribed, self-supporting 3D surface
  with no mold, frame, or power, and how far down in scale does it survive? We tile a
  sheet with bistable auxetic cells that expand under tension and latch in a second stable
  state, so a spatially varying expansion makes the sheet buckle into a determined shape
  and hold it. A conformal flattening of the target, matched cell by cell against a
  precomputed library, yields the flat pattern. Carried to the micron scale, standard
  wafer photolithography produces free-standing polyimide shells, including a dome and
  gold-coated paraboloidal reflectors whose optics match prediction, extending flexible
  electronics toward deployable antennas, sensors, and micro-optics.
---

How far down in scale can a flat sheet be programmed to deploy into a prescribed,
self-supporting 3D surface? Our earlier project on
[bistable auxetic surface structures](/projects/bistable-auxetic-surfaces/)
established the principle at benchtop scale with laser-cut rubber sheets. This
project carries the same principle to the micron scale, where standard wafer
fabrication produces free-standing 3D shells.

## The principle: bistable auxetic cells

The sheet is tiled with bistable auxetic cells. Each cell expands biaxially under
tension (its Poisson's ratio is negative) by an amount set by its geometry, and it
has two stable states separated by an energy barrier, so it snaps open and holds
its expanded state with no applied force. Prescribing a spatially varying expansion
across the sheet introduces an in-plane metric that cannot stay flat; the sheet
buckles into a determined curved shape, and because every cell latches, the
deployed surface supports itself. The cell library, the mechanics of a single cell,
and the benchtop prototypes are described in the
[bistable auxetic surface structures](/projects/bistable-auxetic-surfaces/) project.

## Designing the flat pattern for one specific shape

Targeting a particular surface is an inverse problem. We flatten the target 3D
surface to the plane with a conformal map, which gives, at every point, the local
areal scaling (the conformal factor) needed to recover the 3D embedding. From the
precomputed library we then assign, at each location, the cell whose snapped-open
expansion matches the required growth, choosing the stiffest, most repeatable
candidate where several qualify. Tiling these spatially graded cells yields a
single flat layout whose only compatible deployed state is the intended shape.

## Scaling it down to the wafer

The same principle, carried to the micron scale, lets standard **semiconductor
processing produce 3D shells**. Lithographic fabrication is extraordinarily
precise but intrinsically planar, which is a real limitation for curved sensors,
conformal antennas, micro-optics, and implants meant for non-developable surfaces.
Here the rotating-square unit cells are defined as slits in a thin polyimide film
using the same photolithography and etch steps used for flexible electronics. The
full sheet is patterned in the cleanroom in roughly two days, and a release step
delaminates it from the wafer without damaging the compliant hinges and without
aggressive wet chemistry.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/deployable-wafer-surface/wafer-fabrication.jpg" alt="Six-step wafer fabrication: spin coating a layered stack, photolithography, reactive-ion etching, peeling the film from the wafer, a secondary etch, and the final released specimen">
  <figcaption>The six-step protocol: a layered stack is spin-coated onto the wafer (A to D), the cell pattern is written by photolithography and transferred by reactive-ion etching, the film is peeled from the substrate, a secondary etch opens the slits fully, and the free-standing precursor is released.</figcaption>
</figure>

## A worked example: deploying a dome

A spherical dome is the clearest demonstration of the full pipeline. The target
dome is conformally flattened, the scale-factor field is sampled on a grid, and
each grid square is assigned the cell whose second equilibrium matches the local
expansion, producing the lithography pattern.

<figure class="project-figure">
  <img src="/assets/img/projects/deployable-wafer-surface/wafer-dome-design.jpg" alt="Digital design pipeline for a dome: target mesh, conformal flattening, grid-sampled scale factor, and the resulting per-cell lithography pattern">
  <figcaption>From dome to pattern: the target mesh is conformally flattened, grid-sampled to obtain the local scale factor, and converted cell by cell into the lithography pattern.</figcaption>
</figure>

That pattern is then fabricated as a flat, spatially heterogeneous precursor on
the wafer, in which cells of differing expansion appear as a visibly varying
microstructure.

<figure class="project-figure" style="width: 33%">
  <img src="/assets/img/projects/deployable-wafer-surface/wafer-dome-fabrication.jpg" alt="Microscope image of the wafer-fabricated flat precursor for the dome, showing the spatially varying cell microstructure">
  <figcaption>The fabricated flat precursor for the dome. Cells of different scale factor are visible as a spatially graded microstructure across the sheet.</figcaption>
</figure>

Deployment is the final manufacturing step. A spherical indenter pushes the
released precursor past each cell's second equilibrium; when the indenter is
withdrawn, the structure stays in its 3D shape, held by the bistability of its
cells. Deployment is repeatable across samples and matches finite-element
simulation, with the largest geometric deviations confined to the free rim.

<figure class="project-figure">
  <img src="/assets/img/projects/deployable-wafer-surface/wafer-dome-deployment.jpg" alt="A flat precursor being deployed by a spherical indenter into a free-standing 3D dome, shown in schematic, microscopy, and finite-element snapshots">
  <figcaption>2D-to-3D deployment of the dome by a mechanical indenter, shown as schematic, microscopy, and finite-element snapshots. The free-standing dome retains its shape after the indenter is withdrawn.</figcaption>
</figure>

## Complex shapes

The method is not limited to domes. Supplying different target geometries to the
design algorithm yields free-standing structures spanning a range of topologies
and both positive (synclastic) and negative (anticlastic) Gaussian curvature,
including a model cornea, a double dome joined by a saddle, threefold-symmetric
open shapes, and an annulus. In each case the same pipeline (flatten, look up,
tile, deploy) is applied unchanged; only the input surface differs.

## A working optical device

As a functional demonstration, we deploy gold-coated **paraboloidal reflectors**.
Curvature is the whole point of a reflector, so it is a stringent test of how
precisely the deployed shape matches the design. We illuminate each reflector with
a collimated laser and record the reflected pattern on an imaging plane, comparing
it against a ray-based geometric-optics prediction.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/deployable-wafer-surface/wafer-setup.jpg" alt="Optical test setup: a deployed paraboloidal reflector focuses incident laser rays toward a focal point and onto an imaging plane, with a photograph of the bench arrangement of laser, reflector, and camera">
  <figcaption>The optical test. A collimated laser strikes the deployed paraboloidal reflector; the reflected rays converge near the focal point and project onto an imaging plane recorded by a camera. The geometry sets the focal length, f, and imaging distance, D.</figcaption>
</figure>

We fabricated reflectors at three focal lengths (f = 0.85r, 0.65r, 0.45r). The
measured reflected patterns track the geometric-optics predictions across all
three, confirming that the deployed curvature is accurate enough to function as a
real optical element, produced entirely by this route.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/deployable-wafer-surface/wafer-result.jpg" alt="Three gold-coated paraboloidal reflectors at focal lengths 0.85r, 0.65r and 0.45r, with their target shapes, predicted reflected-intensity patterns, and measured laser patterns">
  <figcaption>Gold-coated reflectors at three focal lengths (f = 0.85r, 0.65r, 0.45r). For each, the target shape, the predicted reflected-intensity pattern, and the measured laser pattern are shown; prediction and measurement agree, confirming precise curvature control.</figcaption>
</figure>

## Why it matters

By recasting shape transformation as a fabrication step, this work extends
*flexible* electronics toward *deployable* electronics: antennas, conformal sensor
arrays, micro-optics, and implants built with the mature, scalable toolchain of
the semiconductor industry. Because the design is resolved cell by cell, the
planar-to-3D map is known in advance, so functional components such as sensors can
be placed at precise locations on the final curved surface.

*A collaboration with the Toyota Research Institute of North America. Supported by
NASA MIRO (IDEAS^2, grant 80NSSC24M0178). Fabricated at the University of Houston Nanofabrication
Facility and the Shared Equipment Authority at Rice University.*
