---
title: A solar array that deploys itself
subtitle: Elastic flasher origami and scissor rings, triggered by warmth alone
tags:
  - Deployable structures
  - Origami
  - Shape morphing
  - 4D printing
start: 2018
end: 2019
hero: /assets/img/projects/autonomous-solar-array/hero.jpg
heroAlt: The 3D-printed origami solar array fully expanded in a water bath, flexible solar panels arranged in a spiral over the flasher origami substrate
heroCaption: The printed array at full expansion. The array deploys when the surrounding water is warmed; it has no motor, controller, or tether.
collaborators: Osama R. Bilal, Chiara Daraio (Caltech); Robert Lang (Lang Origami); Kristina Shea (ETH Zurich)
summary: >-
  Deployable systems usually pair a passive folded payload with a network of motors that unpacks it. This work embeds the actuation in the material instead: a functional metamaterial of wedge-shaped unit cells, each one arm of an elastic "flasher" origami joined to a pair of scissor mechanisms, with shape-memory polymer distributed through both. Below its transition temperature the printed array is stiff in either state; warmed past it, the stored prestrain relaxes and the array deploys on its own - a tenfold area expansion in under 40 seconds, in close agreement with simulation. Studying the folding dynamics revealed a bifurcation between collapsing into a disk or a cone, and the kinematics were optimized to carry the largest number of flexible solar panels.
links:
  - label: Paper
    url: "https://doi.org/10.1103/physrevapplied.11.064069"
publications:
  - authors: "Chen T, Bilal OR, Lang R, Daraio C, Shea K."
    title: "Autonomous deployment of a solar panel using elastic origami and distributed shape-memory-polymer actuators."
    venue: "<em>Physical Review Applied</em> 11(6), 064069 (2019). Editors' Suggestion; Featured in Physics."
    url: "https://drive.google.com/file/d/1zGFgm8LBlrAGyHfhzsozSczkXxGLdIgs/view?usp=sharing"
---

Deployable structures are used where access is difficult: in orbit, in
space, and in disaster zones. The conventional approach separates the system
into a passive folded payload and a network of motors and controllers that
deploys it. Each added actuator adds mass, wiring, and failure modes. This
project takes a different approach: the actuation is built into the material,
so that the structure senses its environment and deploys without external
control. The demonstration is a solar-panel array that expands its area
tenfold, from roughly 0.05 to 0.5 square metres, in under 40 seconds,
triggered by a rise in ambient temperature alone.

## One cell, two mechanisms

The array is a functional metamaterial with rotational periodicity: a ring of
identical wedge-shaped unit cells, each combining one arm of an elastic
"flasher" origami with a pair of scissor mechanisms. The scissors form the
outer ring - a single-degree-of-freedom mechanism similar to the Hoberman
sphere - which serves as both the primary structure and the primary actuator;
its radius increases from 125 to 395 millimetres as it opens. The origami forms
the inner substrate that carries the flexible solar panels and folds entirely
inside the void of the collapsed ring. Kinematic analysis
of the real, finite-thickness parts - not just the idealized mechanism - sets
the expansion ratio, and the crease pattern's two free parameters were
optimized so the folded substrate carries the largest possible number of
panels.

<figure class="project-figure">
  <img src="/assets/img/projects/autonomous-solar-array/fabrication.jpg" alt="The scissor mechanism unit and printed ring in collapsed and expanded states, the folded flasher origami, one wedge-shaped segment with solar panels, and the fully expanded array">
  <figcaption>The two mechanisms, fabricated. Top: the scissor ring, collapsed (inset) and expanded. Bottom: the flasher origami substrate, folded (inset), one wedge with its panels, and the expanded array - a tenfold change in area.</figcaption>
</figure>

## Folding dynamics

Collapsing the flasher origami is the more difficult half of the problem.
Simulating the folding dynamics revealed a bifurcation: depending on how fast
the pattern is folded, it collapses into either a flat disk or a cone, and only
the disk fits the stowed configuration. Mapping the energy landscape of the two
paths led to a rotational core apparatus that guides the fold reliably into the
disk state. Deployment proceeds in two stages - the array first rotates,
unwinding its spiral, and then expands radially - and the printed system
follows the simulated sequence closely in both configurations.

<figure class="project-figure">
  <img src="/assets/img/projects/autonomous-solar-array/folding-sim.jpg" alt="Simulation frames of the flasher origami folding along two paths of the bifurcation: collapapsing toward a cone in one sequence and toward a flat disk in the other">
  <figcaption>The folding bifurcation, simulated. The same pattern folds into a cone (top) or the stowable disk (bottom) depending on the folding dynamics.</figcaption>
</figure>

## Deployment by warmth

The autonomy comes from the material. The hubs of every scissor and the
entire origami substrate are 3D-printed in a shape-memory polymer: glassy and stiff
below its transition temperature, orders of magnitude softer above it.
Collapsing the array while warm programs a prestrain that is locked in on
cooling, so the stowed structure is rigid and holds its shape without
restraint. When the ambient temperature rises above the transition again, the
stiffness drops, the stored strain is released, and the array unfolds. A viscoelastic model of the
printed polymer, calibrated by thermal analysis and validated in a
temperature-controlled load frame, predicts the whole self-expanding sequence.
Because sensing, actuation, and structure are provided by the same material,
the system requires no wiring, control electronics, or separate actuators.
