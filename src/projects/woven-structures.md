---
layout: layouts/project.njk
title: Weaving curved surfaces from flat ribbons
subtitle: From basketry to computer-designed woven shells
tags:
  - Shape transformation
  - Architected materials
  - Algorithm
order: 9
dates: 2021 → 2023
hero: /assets/img/projects/woven-structures/hero.png
heroAlt: A woven dome made of interlaced curved ribbons
heroCaption: Curved ribbons woven in a triaxial pattern produce smooth, doubly curved surfaces.
collaborators: With Pedro M. Reis, Mark Pauly, Julian Panetta, Samuel Poincloux, Changyeob Baek, Yingying Ren, and Alison Martin
publications:
  - authors: "Baek C, Martin AG, Poincloux S, Chen T, Reis PM."
    title: "Smooth triaxial weaving with naturally curved ribbons."
    venue: "<em>Physical Review Letters</em> 127(10), 104301 (2021)."
    url: "https://drive.google.com/file/d/1fjOkWyrCLIaLXVXs6Dc6wxLF8LhF6XkV/view?usp=sharing"
  - authors: "Ren Y, Panetta J, Chen T, Isvoranu F, Poincloux S, Brandt C, Martin A, Pauly M."
    title: "3D weaving with curved ribbons."
    venue: "<em>ACM Transactions on Graphics</em> 40(4), 127 (2021). SIGGRAPH."
    url: "https://drive.google.com/file/d/1XKsSPQ0VZxd5OsQFFr7NJVjUANPAMpXH/view?usp=sharing"
  - authors: "Poincloux S, Vallat C, Chen T, Sano TG, Reis PM."
    title: "Indentation and stability of woven domes."
    venue: "<em>Extreme Mechanics Letters</em> 59, 101968 (2023)."
    url: "https://drive.google.com/file/d/1Fr6GY6UealPkB9TseoECbpwnj3DhizLX/view?usp=sharing"
---

Basketry has long exploited a topological trick to generate Gaussian curvature
from flat, straight strips: introducing defects into an otherwise periodic weave
(substituting a pentagon for a hexagon, for instance) forces the surface out of
the plane. But such defects deliver curvature only in discrete increments, leaving
the accessible geometries faceted and sparse. Across three studies we pursued a
more general program: weave an *arbitrary* smooth surface, and predict and control
its mechanical response.

## Programming curvature through ribbon geometry

The governing observation is that the curvature of a woven shell is dictated almost
entirely by the **rest geometry of the ribbons**, nearly independent of material
properties or applied tension. Rather than straight strips, we weave ribbons with a
prescribed **in-plane curvature**. Varying this curvature tunes the Gaussian
curvature of the assembled weave *continuously*, replacing the discrete jumps of
defect-based weaving. Through rapid prototyping, X-ray micro-CT, and simulation we
established that this is essentially a geometric phenomenon, and used it to realize
smooth spheres, ellipsoids, and tori.

## Inverse design of the ribbon shapes

Once geometry is identified as the controlling variable, the design problem inverts:
given a **target surface**, what is the rest shape of each ribbon? Because a globally
interlaced weave is statically coupled, with every ribbon constraining its neighbors,
the forward map is intractable analytically. We developed a computational
**inverse-design pipeline** that takes a prescribed 3D surface together with a weave
topology and solves for the planar, freeform geometry of each ribbon, such that the
woven assembly relaxes to the target at mechanical equilibrium. This admits
free-form surfaces inaccessible to conventional weaving, each validated against
fabricated prototypes.

## Mechanics of woven shells

Geometry is only half the problem. We also characterized the **mechanical response**
of these woven domes under indentation. The behavior is strongly nonlinear: the
shell stiffens, then undergoes **snap-through** instability and inverts, in some
regimes settling into a second equilibrium. Notably, the same parameters that set
the shape, namely the ribbons' in-plane curvature and the boundary conditions at
their clamped ends, also govern this response, allowing a dome to be tuned from
monostable to **bistable**. A reduced beam-bending model predicts the onset of this
transition.

## Significance

Collectively these results convert an empirical craft into a predictive design
framework: specify a smooth surface, compute the planar ribbons that weave into it,
and program the snapping and bistability of the result. Since the structures
self-assemble from inexpensive flat strips into stiff doubly curved shells, the
approach suggests applications in deployable architecture, lightweight structures,
and reconfigurable surfaces. The work appears in *Physical Review Letters*, *ACM
Transactions on Graphics* (SIGGRAPH), and *Extreme Mechanics Letters*.

*A collaboration with Pedro Reis's Flexible Structures Lab and Mark Pauly's
Geometric Computing Lab at EPFL, and weaver Alison Martin.*

<!-- ADD BODY IMAGES HERE. Drop files into src/assets/img/projects/woven-structures/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/woven-structures/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/woven-structures/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
