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
summary: >-
  A cellular solid's mechanics are usually fixed at fabrication: a lattice is stiff or
  compliant, rarely both. Across two studies we use 4D printing of shape-memory polymers
  to let one printed lattice reprogram its own mechanics after manufacture. An active
  joint changes the unit cell's connectivity on demand, moving it across Maxwell's
  threshold between a stiff stretch-dominated and a compliant, dissipative
  bending-dominated lattice. The same strategy drives large shape change: auxetic sheets
  program area changes up to about 200 percent and morph from a flat precursor into a
  prescribed form on heating. Encoding reconfiguration in geometry and material rather
  than motors points toward structures that adapt over a mission.
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

The mechanical behavior of a cellular solid is largely fixed by its architecture at
the moment it is made. A lattice is light and stiff, or compliant and good at
absorbing energy, but rarely both, and it cannot usually switch between those
regimes once fabricated. Across two studies we asked whether a single printed
structure can reprogram its own mechanics after manufacture, using shape-memory
polymers and the geometric freedom of additive manufacturing to encode the
reconfiguration into the material and its geometry rather than into motors or
controllers.

## The idea: a joint that rewrites the lattice

The mechanics of a cellular solid is set by its nodal connectivity. Maxwell's
counting criterion separates **bending-dominated** lattices (under-connected,
compliant, good energy absorbers) from **stretch-dominated** ones (sufficiently
connected, stiff, efficient load carriers), and most structures are permanently one
or the other. Our building block is an **active, programmable joint** that changes
that connectivity on demand: switching a single joint moves the unit cell across the
Maxwell threshold, and tiling the cell builds a full three-dimensional lattice whose
character can be rewritten after it is made.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/active-lattices/geometric-idea.png" alt="An active programmable joint that switches a unit cell between two connectivities under programming and recovery, the corresponding bistable lattice unit, and a full three-dimensional lattice tiled from it">
  <figcaption>The core idea. An active programmable joint switches the unit cell's connectivity between two states (programming and recovery); the same motif builds a bistable lattice unit and, tiled, a full three-dimensional lattice.</figcaption>
</figure>

## The active material

The mechanism relies on **4D printing**: additive manufacturing of
stimulus-responsive material, where time is the operative fourth dimension. A
printed shape-memory polymer is deformed and fixed below its glass transition, then
recovers its programmed geometry when heated above it. To use this as an
engineering element we characterized the polymer's thermomechanical response in
detail, the temperature-dependent stiffness and loss, the stress relaxation, and
the thermal strain, so that the recovery forces and timing could be predicted
rather than tuned by trial and error.

<figure class="project-figure">
  <img src="/assets/img/projects/active-lattices/thermomechanical-material-response.png" alt="Thermomechanical characterization of the shape-memory polymer: loss tangent and storage modulus versus temperature, stress relaxation over time, thermal strain versus temperature, and frequency-dependent modulus">
  <figcaption>Characterizing the shape-memory polymer. Its loss tangent and modulus across temperature, stress relaxation, thermal strain, and frequency dependence set the glass transition and the recovery behavior that the lattice exploits.</figcaption>
</figure>

## Programming and recovery

With a calibrated material, a lattice can be deformed into a programmed
configuration, held there with no sustained load, and then commanded back by
heating. Tracking force, displacement, and temperature through a full cycle shows
the two phases clearly: a programming step that stores the deformation, and a
thermally triggered recovery that releases it on a controlled schedule.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/active-lattices/mechanics-shape-programming.png" alt="A lattice programmed into a deformed state and thermally recovered, with force, displacement, and temperature plotted against time across the programming and recovery phases">
  <figcaption>A programming and recovery cycle. The lattice is deformed and fixed, then heated to recover; the force, displacement, and temperature traces separate the programming phase from the thermally triggered recovery.</figcaption>
</figure>

## Switching topology, not just shape

The deeper capability is changing the lattice's *topology*. By placing the active
joints so that heating alters the unit cell's connectivity, a single structure can
be moved between a bending-dominated and a stretch-dominated lattice. The
mechanical consequence is large: in its stretch-dominated state the lattice is
stiff and strong, while in its bending-dominated state it is compliant and
dissipative. We measured both states across a family of cells and matched them
against simulation, confirming that one physical object spans two qualitatively
different regimes.

<figure class="project-figure">
  <img src="/assets/img/projects/active-lattices/loading-two-states.png" alt="Stress-strain and force-displacement curves comparing the stretch-dominated states (S1 to S6) and bending-dominated states (B1 to B5) of the lattice, with photographs of each tested specimen">
  <figcaption>Two regimes from one structure. The stretch-dominated states (S1 to S6) are stiff and strong; the bending-dominated states (B1 to B5) are compliant and dissipative. Experiments (photographs below) match the simulated responses.</figcaption>
</figure>

## Large-scale shape transformation

The same active-material strategy also drives dramatic, programmable shape change.
A tiled auxetic metamaterial (negative Poisson's ratio, so it expands laterally
under tension) can be programmed into an arbitrary intermediate configuration and
then recovered, with area changes of up to roughly 200% between the programmed and
recovered states. A reduced beam model predicts the forces and deformations of the
assembled structure and matches both finite-element simulation and three-point
bending experiments closely enough to serve as a design tool.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/active-lattices/metamaterial-transformation.png" alt="A 4D-printed auxetic metamaterial shown in its programmed, intermediate, and permanent states as it transforms">
  <figcaption>A 4D-printed auxetic metamaterial transforming from its programmed state, through an intermediate, to its recovered permanent state.</figcaption>
</figure>

Composing these cells over a contour lets a flat sheet be programmed to morph into a
prescribed target shape on heating. As a demonstration, a patterned sheet
reconfigures from a compact programmed state into the letters "ETH," passing through
a controlled intermediate before settling into the permanent form.

<figure class="project-figure">
  <img src="/assets/img/projects/active-lattices/example-shape-transformation.png" alt="A patterned lattice transforming from a programmed compact state, through an intermediate, into the spelled-out letters E T H, with matching simulation below">
  <figcaption>Programmed shape transformation. A patterned lattice morphs from its compact programmed state, through an intermediate, into the target form (here, the letters ETH), in agreement with simulation.</figcaption>
</figure>

## Why it matters

A structure that can retune its stiffness and energy absorption, or change its
shape, in real time is valuable wherever requirements change over a mission rather
than staying fixed: a spacecraft component that absorbs energy during launch and
then carries load once deployed, or a robotic element that alternates between
compliant locomotion and rigid manipulation. By encoding the reconfiguration in
geometry and material rather than in motors and controllers, these lattices point
toward structures that adapt themselves. The work was published in *3D Printing and
Additive Manufacturing* and *Extreme Mechanics Letters*.

*A collaboration with Kristina Shea at ETH Zurich.*

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
