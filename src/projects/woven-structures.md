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
established that this is essentially a geometric phenomenon.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/woven-structures/basic-geometry.png" alt="A woven unit cell with its central n-gon and ribbon centerline, and plots showing the cell angle and integrated curvature set by the number of ribbons and the topological charge">
  <figcaption>The geometry of a woven cell. The shape of the central n-gon, and the integrated curvature it carries, are fixed by the ribbon geometry and the topological charge, with experiment and finite-element results following the geometric prediction.</figcaption>
</figure>

This geometric reasoning, rooted in the Gauss-Bonnet theorem, predicts the
integrated Gaussian curvature of a weave directly from its ribbon curvatures and
topology, and we used it to realize smooth spheres, ellipsoids, and tori.

<figure class="project-figure" style="width: 52%">
  <img src="/assets/img/projects/woven-structures/gauss-bonnet.png" alt="Integrated Gauss curvature collapsing onto a single line against a modified topological charge for several ribbon numbers, with woven spherical structures below">
  <figcaption>A geometric law for curvature. The integrated Gauss curvature of a cell collapses onto a single relation in a modified topological charge, independent of the number of ribbons; the woven spheres below are built by applying it.</figcaption>
</figure>

## Inverse design of the ribbon shapes

Once geometry is identified as the controlling variable, the design problem inverts:
given a **target surface**, what is the rest shape of each ribbon? Because a globally
interlaced weave is statically coupled, with every ribbon constraining its neighbors,
the forward map is intractable analytically. We developed a computational
**inverse-design pipeline** that takes a prescribed 3D surface together with a weave
topology and solves, through a multi-stage solver, for the planar freeform geometry
of each ribbon such that the woven assembly relaxes to the target at mechanical
equilibrium. The flat ribbons can then be laser-cut and woven by hand.

<figure class="project-figure">
  <img src="/assets/img/projects/woven-structures/optimization-design.png" alt="The inverse-design pipeline: a target surface and topology graph feed a multi-stage solver that evolves ribbon rest shapes from straight to curved, producing laser-cutting curves and the final woven structure">
  <figcaption>The inverse-design pipeline. A target surface and weave topology drive a multi-stage solver (pinned crossings, free crossings, contact forces) that evolves each ribbon from straight to its final curved rest shape, yielding laser-cutting curves and the woven result.</figcaption>
</figure>

This admits free-form surfaces inaccessible to conventional weaving, each validated
against fabricated prototypes.

<figure class="project-figure">
  <img src="/assets/img/projects/woven-structures/sphere-example.png" alt="A woven sphere shown through stages of the design, colored by curvature and by the deviation between simulated and target surface">
  <figcaption>A worked example. The pipeline designs the ribbons for a sphere; coloring shows the curvature distribution and the small deviation between the woven result and the target surface.</figcaption>
</figure>

## Mechanics of woven shells

Geometry is only half the problem. We also characterized the **mechanical response**
of these woven domes under indentation. The behavior is strongly nonlinear: the
shell stiffens, then undergoes **snap-through** instability and inverts, in some
regimes settling into a second equilibrium.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/woven-structures/fem-prediction.png" alt="Vertical force versus indentation depth for experiment and finite-element simulation, with von Mises stress fields at five stages A to E of the dome inverting">
  <figcaption>Indentation response. The force-displacement curve (experiment and finite element) is strongly nonlinear; the von Mises stress fields (A to E) track the dome as it stiffens, snaps through, and inverts.</figcaption>
</figure>

Notably, the same parameters that set the shape, namely the ribbons' in-plane
curvature and the boundary conditions at their clamped ends, also govern this
response, allowing a dome to be tuned from monostable to **bistable**. A reduced
beam-bending model predicts the onset of this transition.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/woven-structures/bistability-weave.png" alt="Experiment and finite-element comparison of a woven dome inverting, with regions of positive and negative restoring force, and the indentation test rig">
  <figcaption>Tunable bistability. Depending on the design, the inverted state is either unstable (it springs back) or stable; the restoring force changes sign across the transition, matching the reduced model.</figcaption>
</figure>

## Significance

Collectively these results convert an empirical craft into a predictive design
framework: specify a smooth surface, compute the planar ribbons that weave into it,
and program the snapping and bistability of the result. Since the structures
self-assemble from inexpensive flat strips into stiff doubly curved shells, the
approach suggests applications in deployable architecture, lightweight structures,
and reconfigurable surfaces.

<figure class="project-figure">
  <img src="/assets/img/projects/woven-structures/applications.png" alt="Renderings of architectural-scale woven structures, including a pavilion and a canopy, and a woven ceramic piece">
  <figcaption>Where it leads. The same geometry-driven weaving scales from architectural pavilions and canopies to fabricated ceramic shells.</figcaption>
</figure>

The work appears in *Physical Review Letters*, *ACM Transactions on Graphics*
(SIGGRAPH), and *Extreme Mechanics Letters*.

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
