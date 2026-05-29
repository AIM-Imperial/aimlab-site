---
layout: layouts/project.njk
title: Chainmail-inspired auxetic microstructures
subtitle: Programmable expansion fields on doubly-curved surfaces
tags:
  - Architected materials
order: 3
dates: 2023 → present
hero: /assets/img/projects/chainmail-hero.jpg
heroAlt: A draped chainmail-inspired metamaterial sheet
links:
  - label: Paper
    url: "#"
---

A computational geometry pipeline that maps a 2D unit cell onto a 3D
target surface using conformal UV parameterization, with per-cell scale
factors that encode a designed expansion field. The result drapes, conforms,
and locally stiffens or compliances on demand.

## Method

We start from a conformal parameterization of the target surface, which gives,
at every point, the local area distortion between the flat sheet and the curved
target. That distortion sets a per-cell scale factor, which we use to morph each
unit cell — for example interpolating a ring between a circle and a square or
triangle — so that the assembled sheet carries the right amount of local
expansion to reach the target shape. Connector rings link the cells into a
chainmail topology that is flexible when loose and jams into a stiff shell when
constrained. We build the pipeline in Grasshopper and print the structures
directly, including in ceramic, and characterize their drape and load response.

## What we are doing next

We are extending the unit-cell library and the expansion-field design space, and
studying how the jamming transition can be triggered to switch a sheet between
compliant and load-bearing states.
