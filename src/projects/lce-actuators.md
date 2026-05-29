---
layout: layouts/project.njk
title: LCE actuators with programmable director fields
subtitle: Direct ink writing of soft active matter
tags:
  - Soft active matter
order: 2
dates: 2024 → present
hero: /assets/img/projects/lce-hero.jpg
heroAlt: A liquid crystal elastomer actuator morphing on heating
links:
  - label: Paper
    url: "#"
---

Liquid crystal elastomers patterned by direct ink writing produce reversible,
large-strain actuation when heated. By controlling the director field along
the print path, we program shapes that morph predictably and repeatably.

## Method

We formulate a printable LCE ink through aza-Michael addition chemistry
(RM82, RM257, EDDET, PETA), tuned for direct ink writing. The print path sets
the local director orientation, so the toolpath itself encodes the actuation:
where the material points determines which way it contracts on heating. We
generate toolpaths from a target director field in Grasshopper, print on a
custom rig, and cure in situ. Zigzag and herringbone deposition patterns give
orthotropic thermal-expansion behavior, and we use finite-element models to
connect the printed pattern to the resulting shape change.

## What we are doing next

We are coupling director-field design with topology optimization so that a
desired motion can be specified and the pattern solved for directly, and we are
pursuing actuators that combine multiple deformation modes in a single print.
