---
layout: layouts/project.njk
title: Programmable active lattices
subtitle: 4D-printed cellular solids that reconfigure their own mechanics
tags:
  - Architected materials
  - Functional materials
  - 3D printing
order: 10
dates: 2017 → 2019
hero: /assets/img/projects/active-lattices/hero.png
heroAlt: A 3D-printed lattice that changes topology and shape when heated
heroCaption: Active lattices that switch unit-cell topology on heating, retuning their mechanical response in place.
collaborators: With Marius Wagner, Thomas Lumpe, and Kristina Shea (ETH Zurich)
links:
  - label: Code & data
    url: "#"
publications:
  - authors: "Wagner M, Chen T, Shea K."
    title: "Large shape transforming 4D auxetic structures."
    venue: "<em>3D Printing and Additive Manufacturing</em> 4(3), 133–142 (2017)."
    url: "https://drive.google.com/file/d/1e5VWTZxbaKnSiUFK9-EgTfQak88V3Az7/view?usp=sharing"
  - authors: "Wagner MA, Lumpe TS, Chen T, Shea K."
    title: "Programmable, active lattice structures: unifying stretch-dominated and bending-dominated topologies."
    venue: "<em>Extreme Mechanics Letters</em> 29, 100461 (2019)."
    url: "https://drive.google.com/file/d/1QIkG35zeYnkm9H6LoUQyTNrvyIjUAHVb/view?usp=sharing"
---

The mechanical behavior of a cellular solid is largely fixed by its architecture
at the moment it is made. A lattice is light and stiff, or compliant and good at
absorbing energy, but rarely both, and it cannot usually switch between those
regimes once fabricated. This project asks whether a single printed structure can
reprogram its own mechanics after manufacture, using shape-memory polymers and the
geometric design freedom of additive manufacturing.

## Active auxetic metamaterials

The first study used 4D printing, additive manufacturing of stimulus-responsive
materials, where time is the operative fourth dimension: a printed shape memory
polymer is deformed, fixed, and later recovers its original geometry on heating
above its glass transition. We designed auxetic unit cells (negative Poisson's
ratio, so they expand laterally under tension) that achieve area changes of up to
roughly 200% between their programmed and recovered states. Tiling these cells
across a contour lets the whole sheet be programmed into an arbitrary intermediate
shape and then recover on cue. We characterized the thermoviscoelastic response
experimentally and built a reduced beam model that predicts the forces and
deformations of the assembled structures; it matched both finite-element
simulation and three-point bending experiments closely enough to use as a design
tool.

## Switching topology, not just shape

The second study targeted a deeper kind of reconfiguration: changing the lattice's
*topology* rather than only its shape. The mechanics of a cellular solid is
governed by its nodal connectivity. Maxwell's counting criterion separates
**bending-dominated** lattices (under-connected, compliant, good energy absorbers)
from **stretch-dominated** ones (sufficiently connected, stiff, efficient
load carriers). Most structures are permanently one or the other.

We introduced programmable active lattice structures (PALS) with shape-memory
joints that change the connectivity of the unit cell on heating, moving the
structure across the Maxwell threshold from a bending-dominated to a
stretch-dominated topology. The same physical object can therefore present a soft,
dissipative response in one state and a stiff, load-bearing one in another, with
the transition triggered thermally and verified against simulation and experiment.

## Why it matters

A structure that can retune its stiffness and energy absorption in real time is
valuable wherever requirements change over a mission rather than staying fixed: a
spacecraft component that must absorb energy during launch and then carry load once
deployed, or a robotic element that alternates between compliant locomotion and
rigid manipulation. By encoding the reconfiguration in geometry and material rather
than in motors and controllers, these lattices point toward structures that adapt
themselves. The work was published in *3D Printing and Additive Manufacturing* and
*Extreme Mechanics Letters*.

*A collaboration with Marius Wagner, Thomas Lumpe, and Kristina Shea at ETH
Zurich.*

<!-- ADD BODY IMAGES HERE. Drop files into src/assets/img/projects/active-lattices/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/active-lattices/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/active-lattices/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
