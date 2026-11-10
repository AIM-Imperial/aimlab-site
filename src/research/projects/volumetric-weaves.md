---
featured: true
title: Volumetric plain weaves
subtitle: Three families of yarns interlaced through a cubic lattice
tags:
  - Entanglement
  - Design
start: 2026
hero: /assets/img/projects/volumetric-weaves/hero.jpg
heroAlt: A cube woven by hand from cotton cord in three colours, with cords running in three perpendicular directions
heroCaption: A volumetric plain weave assembled by hand from cotton cord, then its yarn centrelines drawn in order with the parameter t, in the geometry of the weave viewer. The three yarns through one corner vertex come first, one after another, then the yarns in the three planes through that corner, one plane after another, then the rest of the volume.
collaborators: Samuel Poincloux (Aoyama Gakuin University); Lauren Carelli Dreier (University of California, Santa Barbara)
summary: >-
  A plain weave is two families of yarns crossing at right angles, each passing alternately over and under the other. We extend it to a volume: three mutually orthogonal families of yarns, the weft, the warp and the wup, threaded through a cubic lattice so that every section through it is a planar plain weave. A crossing matrix at each vertex records the offsets of the three yarns there. The fully alternating weave has a single topology, and the matrix fixes the phases of sinusoidal yarn centrelines, which can be planar zigzags or helices. We derived the offsets at which the yarns would intersect between vertices, and made the weaves by 3D printing and by hand from cotton cord.
links:
  - label: Preprint (arXiv)
    url: "https://arxiv.org/abs/2611.12091"
  - label: Weave viewer
    url: "/sims/weave-viewer.html"
publications:
  - authors: "Poincloux S, Carelli Dreier L, Chen T."
    title: "Topology, geometry and fabrication of volumetric plain weaves."
    venue: "arXiv:2611.12091 (2026)."
    url: "https://arxiv.org/pdf/2611.12091"
---

A planar weave has two families of yarns, the warp and the weft, whose crossings
repeat in two directions. In a plain weave each yarn passes alternately over and
under successive yarns of the other family. A volumetric weave replaces the two
families with three, each running along one axis of a cubic lattice: the weft
along *x*, the warp along *y*, and a third family, the wup, along *z*. One yarn of
each family passes through every vertex of the lattice, and a section through the
lattice perpendicular to any axis shows a planar plain weave of the two families
lying in it.

<figure class="project-figure">
  <img src="/assets/img/projects/volumetric-weaves/planar-weave.jpg" alt="A square lattice of crossing sites, the two alternating crossing configurations of weft and warp, their sinusoidal trajectories through the offset points, and the plain weave they form">
  <figcaption>The planar plain weave. a Square lattice of crossing sites, spaced λ/2. b The weft (pink) and warp (blue) are offset by ±a from the plane at each crossing, in two alternating configurations. c Sinusoidal trajectories through the offset points. d The resulting plain weave.</figcaption>
</figure>

## Crossings

At each vertex, every yarn is offset by ±*a* in the two directions perpendicular
to it. To keep the over-under order, the two yarns perpendicular to a given
direction take equal and opposite offsets along it, so the offsets cancel in
each direction. We collect them in a 3 × 3 crossing matrix. The cancellation
leaves three independent signs, and so eight configurations in four pairs, each
pair related by reversing every crossing. The fully alternating weave places
opposite configurations at neighbouring vertices, in a 2 × 2 × 2 unit cell.
Rotations by π about the coordinate axes map the four pairs onto each other, and
a translation by half a wavelength exchanges the two members of a pair: the
fully alternating volumetric plain weave has a single topology.

<figure class="project-figure">
  <img src="/assets/img/projects/volumetric-weaves/crossing-configurations.jpg" alt="Eight diagrams of a lattice vertex, each showing the offset points of the weft, warp and wup in one crossing configuration">
  <figcaption>The eight crossing configurations at a vertex. The weft (pink, along x), the warp (blue, along y) and the wup (green, along z) are each offset by ±a in the two directions perpendicular to them. The bottom row reverses every offset of the top row.</figcaption>
</figure>

## Yarn trajectories

Each yarn follows its axis while its two transverse coordinates vary
sinusoidally, with a wavelength λ of twice the vertex spacing, so that the
offsets reverse at successive crossings. The crossing matrix at the origin fixes
the phases of these oscillations. Two solutions follow. With in-phase
oscillations, each yarn stays in a fixed oblique plane and is a planar zigzag.
With a quarter-period lag between its two oscillations, and the amplitude
increased to √2 *a* to keep the offsets at the crossings, each yarn is a circular
helix. Both belong to a family of elliptical helices, in which the handedness of
each yarn can be chosen independently: for the twelve yarns of the unit cell,
the 4096 assignments reduce to 144 distinct weaves under the symmetries of the
lattice, and to 76 when a weave and its mirror image are identified.

<figure class="project-figure">
  <img src="/assets/img/projects/volumetric-weaves/unit-cell.jpg" alt="The cubic lattice, the offset points at its vertices, the in-phase yarns through them, the complete unit cell, its three sections, and a larger tiled weave">
  <figcaption>The volumetric plain weave. a The 2 × 2 × 2 unit cell, with edge length λ/2. b The offsets of the weft, warp and wup; neighbouring vertices carry opposite configurations. c The in-phase trajectories through the offset points. d The complete unit. e Sections perpendicular to x, y and z, each a planar plain weave of the two families it contains. f A larger weave tiled from the cell.</figcaption>
</figure>

<figure class="project-figure">
  <img src="/assets/img/projects/volumetric-weaves/trajectories.jpg" alt="A weft through consecutive vertices as a planar zigzag and as a helix, and the unit cell built from each">
  <figcaption>In-phase and out-of-phase trajectories. a The in-phase weft is a planar zigzag: its offset keeps a fixed direction. b The out-of-phase weft passes the same offset points as a helix of radius √2 a. c, d The unit cell with in-phase and with out-of-phase yarns.</figcaption>
</figure>

## Intersections between vertices

The trajectories pass through the prescribed offsets at the vertices, but
between vertices two centrelines could meet and change the topology. In-phase
yarns never intersect, for any offset *a*. Helical yarns of equal handedness
intersect at a critical offset of √2 λ/16, about 0.088 λ, beyond which the pair
is inverted, and no assignment of handedness avoids these intersections. For
yarns of finite radius *R*, the closest approach between two crossing yarns sets
the admissible radius, 2*R* below the closest approach.

<figure class="project-figure">
  <img src="/assets/img/projects/volumetric-weaves/interlacing.jpg" alt="Three plots against the offset over the wavelength: the distance of the interlacing point from the vertex, the separation of the yarns there, and their closest approach">
  <figcaption>A weft-warp pair at a vertex as a function of the offset a, for in-phase yarns and for helical yarns at a non-intersecting (ε = +1) and an intersecting (ε = −1) vertex. a Distance of the interlacing point from the vertex. b Separation at the interlacing point, positive while the interlacing is as prescribed. c Closest approach between the two centrelines. Beyond the critical offset (shaded), the pair at the intersecting vertex is inverted.</figcaption>
</figure>

## Fabrication

We printed an in-phase weave with configuration C<sub>A</sub> at the origin,
λ = 10 mm, *a* = 0.7 mm and *R* = 0.5 mm: five unit cells along each direction,
so that each yarn passes through ten crossings. At the boundaries each yarn was
joined to the next, making each family a single continuous yarn. The model was
printed on a Stratasys J35 in VeroUltraWhite, with a support material dissolved
in water afterwards. It is stiff along the yarn axes and compliant between them,
as plain weaves are, and it relaxes under gravity along a direction at 45° to
the yarn axes.

We also assembled a weave by hand from cotton piping cord, 6 mm in diameter, in
three colours. The cord was shaped into planar sinusoids in a 3D-printed mould,
with a latex-paint conditioner holding the shape during assembly. The weft and
warp were laid up in two-dimensional layers, and the layers were woven onto the
36 wup yarns one at a time, row by row. As it relaxed, the textile sheared within
and out of the layer planes, giving the specimen rhomboidal faces.

<figure class="project-figure">
  <img src="/assets/img/projects/volumetric-weaves/fabrication.jpg" alt="Four views of a white 3D-printed volumetric weave, and two views of a volumetric weave of cotton cord in three colours">
  <figcaption>Realized volumetric plain weaves. a A 3D-printed weave with in-phase yarns, five unit cells along each direction: i to iv, four views of the same specimen. Scale bar, 10 mm. b Two views of the weave assembled by hand from cotton cord in three colours. Scale bar, 25 mm.</figcaption>
</figure>

## The weave viewer

The [weave viewer](/sims/weave-viewer.html) computes the yarn trajectories for a
chosen crossing configuration, trajectory family and number of unit cells, in
two or three dimensions, and saves them as images or as 3D models. The figures
above were made with it, and the clip at the top of this page uses its geometry.

## Next

Volumetric counterparts of twill and satin, in which a yarn passes several
consecutive crossings on the same side, need trajectories of longer period with
several harmonics; the crossing matrix and the intersection analysis carry over.
The mechanics of the weaves come next: bending and sliding of the yarns between
vertices, the dependence on λ, *a* and *R*, and the response to defects.

*A collaboration with Samuel Poincloux (Aoyama Gakuin University) and Lauren
Carelli Dreier (University of California, Santa Barbara).*
