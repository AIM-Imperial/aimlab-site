---
layout: layouts/project.njk
title: Deployable 3D architectures from wafer-fabricated precursors
subtitle: Flat to volumetric, as the final manufacturing step
tags:
  - Deployable structures
order: 1
dates: 2024 → present
hero: /assets/img/projects/deployable-hero.jpg
heroAlt: A wafer-fabricated planar precursor deploying into a doubly-curved 3D dome
heroCaption: Pipeline for manufacturing deployable 3D mesoscale structures — from a target surface, through a conformally flattened precursor, to the deployed free-standing form.
collaborators: Yue Wang, Kelvin Shum (Houston); Yuyang Song (Toyota Research Institute of North America)
links:
  - label: Paper
    url: "#"
  - label: Code & data (Zenodo)
    url: "https://doi.org/10.5281/zenodo.20393900"
publications:
  - authors: "Wang Y, Shum K, Song Y, Chen T."
    title: "Deployable 3D architectures from wafer-fabricated precursors."
    venue: "<em>Nature Communications</em> (2026)."
    url: "#"
---

Standard wafer fabrication is flat by nature. We show that it can nonetheless
produce free-standing, mechanically stable, doubly-curved 3D structures with
*prescribed* Gaussian curvature — a capability not previously achieved through
semiconductor manufacturing. The key move is to treat the 2D-to-3D deployment as
an integral step of the manufacturing process: the planar precursor on the wafer
is an intermediate product, and the deployed 3D structure is the final device.

This opens a route from flexible electronics toward *deployable* electronics,
where the working surface is itself the deployed geometry — miniature antennas,
conformal sensor arrays, micro-optical components, and human-interfacing implants.

## The unit cell

Every surface is tessellated with a single family of unit cell: a rotating-square
auxetic microstructure defined by a tilt angle θ and slit length l. It is chosen
because it satisfies three properties the deployment framework demands at once: a
Poisson's ratio of ν = −1 between its two states, mechanical bistability with a
second equilibrium stretch λ that is tunable through θ and l, and isotropic
expansion across the whole stretch range. Isotropy is essential — a conformal map
prescribes a purely isotropic areal scaling at each point, so any shear from the
cell would be incompatible. A parametric sweep gives a library mapping each
(θ, l) to its second-equilibrium stretch, with a physically realizable bistable
range of λ ≈ [1.2, 1.6].

## From a target shape to a precursor

To target a specific 3D geometry, we conformally flatten its surface mesh to the
plane using Boundary First Flattening. The flattening records, at every point,
the local areal expansion λ needed to return to 3D. We overlay a grid, read off
the local λ per square, and select the unit cell whose second equilibrium matches
it — yielding a spatially heterogeneous, aperiodic precursor that can deploy to
that shape and, up to isometry, only that shape. Mechanistically, the spatially
varying stretch creates geometric frustration that pops the sheet out of plane
when bending becomes cheaper than in-plane compression.

## Fabrication and deployment

Precursors are patterned in polyimide (PI-2611) by maskless photolithography and
reactive-ion etching, then released by exploiting the low adhesion between two
polyimide layers rather than a sacrificial layer — which keeps stress off the
fragile hinges. The full protocol runs in about two days and uses no strong acids.
Deployment is mechanical: a spherical indenter pushes the released precursor past
each cell's second equilibrium, and the structure holds its 3D shape once the
indenter withdraws, stabilized by bistability.

We validate on a spherical dome — deployment is repeatable across samples and
geometrically accurate, with deviations concentrated at the free rim — then apply
the method to five shapes spanning different topologies and both positive and
negative curvature. As a functional demonstration, gold-coated paraboloidal
reflectors at three focal lengths (f = 0.85r, 0.65r, 0.45r) produce reflected
patterns that agree with a ray-based geometric-optics model, confirming curvature
control.

## What we are doing next

The curvature achievable in one continuous structure is bounded by the unit cell's
permissible λ range, which limits how sharp a curvature gradient can be; stitching
separately deployed sections is one route past this. Beyond mechanical indentation,
we are looking at autonomous deployment through magnetic or pneumatic actuation,
and at integrating functional layers so the deployed surface carries sensing or
electronics.
