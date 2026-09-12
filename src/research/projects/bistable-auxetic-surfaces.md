---
title: Bistable auxetic surface structures
subtitle: Flat sheets of snapping cells that deploy into a curved shape and hold it
tags:
  - Deployable structures
  - Shape morphing
  - Algorithm
  - Kirigami
start: 2019
end: 2021
hero: /assets/img/projects/bistable-auxetic-surfaces/hero.jpg
heroAlt: A laser-cut rubber sheet of bistable auxetic cells deployed into a self-supporting double dome
heroCaption: A double dome deployed from a single flat sheet. Each cell has snapped into its second stable state, so the surface holds its shape with no frame or applied load.
collaborators: Julian Panetta (UC Davis), Max Schnaubelt (TUM), Mark Pauly (EPFL)
links:
  - label: Paper
    url: "https://doi.org/10.1145/3450626.3459940"
publications:
  - authors: "Chen T, Panetta J, Schnaubelt M, Pauly M."
    title: "Bistable auxetic surface structures."
    venue: "<em>ACM Transactions on Graphics</em> 40(4), 1-9 (2021). SIGGRAPH."
    url: "https://drive.google.com/file/d/1Ir3OjBcgV6wj7GXNxtj20Q2Amx3nPJef/view?usp=sharing"
summary: >-
  A deployable material system that is flat-fabricated from an elastic sheet and
  deploys into a prescribed doubly curved surface that is stable by design. The
  sheet is tiled with bistable auxetic cells, each of which expands isotropically to
  a second stable state set by its geometry. A precomputed library of cells covers
  expansion factors from 1.13 to 1.78; a conformal flattening of the target surface
  gives the expansion required at every point, and the matching cells are tiled into
  the flat cut pattern. Laser-cut rubber prototypes - spherical caps, a seamed
  cylinder, and architectural freeform surfaces - deploy by hand and match their
  targets to within a few percent of the bounding-box diagonal.
---

Structures that deploy from a flat state to a curved target shape reduce the cost
of fabrication, transport, and construction, and in orbit or the deep sea they are
often the only feasible means of erection. Conventional deployable structures use
periodic patterns and reach their shape through boundary constraints, which limits
the range of shapes and requires the constraints to remain in place. Systems that
encode the target shape in the material instead usually need a sustained load,
permanent plastic deformation, or a stimulus-responsive material and its trigger.
This work introduces a third option: a sheet whose cells are individually
bistable, so that the deployed surface is a local energy minimum and needs no
support once it has been pushed there.

<figure class="project-figure">
  <img src="/assets/img/projects/bistable-auxetic-surfaces/pipeline.jpg" alt="Design pipeline: an input surface is conformally flattened, a triangular tiling is overlaid, the per-cell scale factor indexes a precomputed library of bistable auxetic cells, and the resulting flat cut pattern deploys to the target shape">
  <figcaption>The inverse design pipeline. The target surface is conformally flattened; a triangular tiling of chosen resolution is overlaid; the scale factor averaged over each cell indexes a precomputed library of bistable auxetic cells, from which the stiffest cell with the required expansion is selected; the cells are tiled into the flat fabrication state, laser-cut, and deployed.</figcaption>
</figure>

## A parametric bistable cell

Each hexagonal cell consists of six triangular units, each defined by two
parameters: a cut inclination angle and a thickness. The cell behaves as a
one-degree-of-freedom linkage with a Poisson's ratio of -1, so it expands
isotropically and resists every other deformation. As it expands, the inner
triangles rotate and become kinematically incompatible; the compliant hinges that
connect them store strain energy, which rises to a barrier and falls to a second
minimum. At that minimum the force on the cell is zero and the cell is stable in
its expanded state.

<figure class="project-figure" style="width: 91%">
  <img src="/assets/img/projects/bistable-auxetic-surfaces/unit-cell.jpg" alt="A bistable auxetic cell expanding through states P1 to P5 with finite-element stress fields, and the strain-energy and force-strain curves showing a barrier and a second stable equilibrium">
  <figcaption>One cell from its flat state (P1) to its expanded stable state (P5), with finite-element stress fields. The strain-energy curve rises to a barrier and falls to a second minimum; the force crosses zero through a region of negative stiffness and again at the second stable state.</figcaption>
</figure>

The cells are characterised by nonlinear periodic homogenisation: an infinite
tiling is simulated with a plane-stress neo-Hookean model and quadratic finite
elements, stretched past the analytically estimated bistable strain, then released
to settle into its unconstrained second stable state, from which the expansion
factor and the stiffness at that state are computed. Sweeping the two geometric
parameters - 43 values of the angle, and the thickness in steps of 0.01 mm between
its geometric bounds - gives a library of cells. Not every geometrically bistable
cell remains bistable once hinge elasticity is included; the cells that do cover
expansion factors from 1.129 to 1.775. Where several cells provide the same
expansion, the stiffest is selected: the second equilibrium of a stiffer cell
encodes the expansion factor more precisely, and in experiments deployment
propagates as a cascade from cell to cell, so the height of the energy barrier is
not the limiting property.

## From target surface to cut pattern

Deployment is driven by metric frustration. The target surface is flattened to the
plane with a conformal map, whose scale factor gives the in-plane expansion needed
at each point to recover the surface. A regular equilateral triangular mesh of a
chosen resolution is overlaid on the flattening, the scale factor is averaged over
each triangle, and the library is queried for the matching cell. Where neighbouring
units differ in thickness, the cut-line end points along their shared edge are
averaged so that the pattern remains continuous. The result is a single flat layout
whose only compatible deployed state, once every cell has snapped open, is the
target shape.

## Fabrication and deployment

The prototypes are laser-cut from 2.3 mm rubber sheet, with a perforation width of
0.125 mm and a hinge thickness of 0.25 mm, chosen as the smallest that survives
repeated opening and closing. Pushing and stretching the sheet by hand deploys it:
because each cell latches, no particular order or coordination is needed, and
opening some cells causes their neighbours to open. The deployed models were
scanned photogrammetrically and compared with the target surface; deviations are
reported as a percentage of the bounding-box diagonal and are a few percent for
all models.

Steve Mould made a video of this work, filmed with the prototypes from the paper:

<figure class="project-figure video-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/vrOjy-v5JgQ" title="Steve Mould: video on bistable auxetic surface structures" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Steve Mould's video on the bistable auxetic surfaces, on YouTube.</figcaption>
</figure>

<figure class="project-figure">
  <img src="/assets/img/projects/bistable-auxetic-surfaces/spherical-caps.jpg" alt="A spherical cap realised with two cell layouts, dense and sparse, with the scanned deployed models coloured by deviation and force-displacement curves from indentation at the apex">
  <figcaption>The same spherical cap from two cell layouts. The layout with smaller expansion factors (top) needs a larger flat sheet and gives a denser, stiffer dome; the smallest possible sheet (bottom) gives a more open dome about half as stiff. The force-displacement curves are measured by indenting the apex; both caps recover when the indenter is removed.</figcaption>
</figure>

## Beyond domes

A spherical cap can be mapped to the plane with a narrow range of scale factors, so
the same target can be realised from different fabrication states with different
stiffness. Surfaces without disk topology are cut from one sheet with a seam: the
vase below is cut flat as 400 triangular units, stitched into a cylinder along the
seam, and then deployed, and the matching chirality of the units on either side of
the seam lets the cells open across it.

<figure class="project-figure" style="width: 60%">
  <img src="/assets/img/projects/bistable-auxetic-surfaces/seamed-vase.jpg" alt="A vase target surface, its flat fabrication state of 400 triangles with a marked seam, the sheet stitched into a cylinder, the deployed vase with a close-up of cells opening across the seam, and the 3D scan coloured by deviation">
  <figcaption>A surface without disk topology. The flat sheet (400 triangular units) is stitched into a cylinder along the seam marked in magenta, then deployed into the vase; the scan deviates from the target by at most 2% of the bounding-box diagonal.</figcaption>
</figure>

The cells also work in reverse: fabricated open and contracting to their second state, they produce a
nearly solid deployed surface at the cost of a larger flat sheet, which suits
applications where the open slits would be undesirable.

<figure class="project-figure" style="width: 60%">
  <img src="/assets/img/projects/bistable-auxetic-surfaces/contracting-cells.jpg" alt="Contracting bistable cells: finite-element simulation of a cell fabricated open and contracting to a second stable state, the layout and flat fabrication state of a double-bump surface, the deployed nearly solid surface, and its scan deviation">
  <figcaption>Cells fabricated in the open state contract to a second stable state (a, b). Used in the same inverse-design pipeline (c, d), they deploy into a nearly solid surface (e) with the scan deviation shown in (f).</figcaption>
</figure>

Freeform architectural surfaces show the range of the method. The Tigridia
Pavilion and the Lilium Tower were realised at a cell edge length of 10 mm, with
about 900 triangular units each, and their deployed shapes deviate from the target
by at most 3% and 4% of the bounding-box diagonal.

<figure class="project-figure">
  <img src="/assets/img/projects/bistable-auxetic-surfaces/freeform-surfaces.jpg" alt="Two freeform surfaces, the Tigridia Pavilion and the Lilium Tower: target surface, flat cut pattern with about 900 triangles, deployed laser-cut model, and the scanned deviation map">
  <figcaption>Freeform surfaces deployed from a flat sheet. Left to right: target surface, planar fabrication state, deployed model, and the deviation of the scanned model from the target (maximum 3% and 4% of the bounding-box diagonal).</figcaption>
</figure>

## Limitations

The expansion range of the cell, 1.13 to 1.78 for this material and thickness,
bounds the surfaces obtainable from one sheet; more complex surfaces need
singularities and seams. The metric defines the target only up to isometry, so a
bump can deploy in either direction unless guided, and gravity is not accounted for
in the design. The library must be recomputed for each base material and sheet
thickness, since the energy barrier and the stiffness of the deployed state both
scale with the material.

This work was carried out at EPFL with the Geometric Computing Laboratory and
was supported by the NCCR Digital Fabrication, funded by the Swiss National Science
Foundation. The same cells later became the basis of the
[wafer-scale deployable devices](/projects/deployable-wafer-surface/) fabricated
by photolithography.
