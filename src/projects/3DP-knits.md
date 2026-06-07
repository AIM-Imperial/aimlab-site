---
layout: layouts/project.njk
title: 3D-printed knits
subtitle: Programmable materials built from a single entangled thread
tags:
  - Architected materials
order: 2
dates: 2024 → present
hero: /assets/img/projects/3DP-knits/hero.png
heroAlt: A 3D-printed knit fabric made of interlooped printed yarn
heroCaption: A knit fabric (loops, yarn, and fibers) reproduced directly by multi-material 3D printing.
collaborators: Bradley Cline, Catherine Bai, Yue Wang (Houston); Sehui Jeong (Stanford); Ling Xu, James U. Surjadi, Carlos M. Portela (MIT)
links:
  - label: Code (GitHub)
    url: "https://github.com/UH-AIM/3D-Printing-Volumetric-Knits"
publications:
  - authors: "Cline B, Bai C, Jeong S, Xu L, Wang Y, Surjadi JU, Portela CM, Chen T."
    title: "Entanglement-driven responses through multiscale 3D-printed knits."
    venue: "<em>Proceedings of the National Academy of Sciences</em> (2026)."
    url: "https://drive.google.com/file/d/1FJkzmtyGmGMDeVN5klAR_lPNsckEMWij/view?usp=sharing"
---

A knitted fabric is a single continuous yarn interlooped through itself thousands
of times. That topology of entanglement, rather than the intrinsic properties of
the fiber, dominates the macroscopic mechanics: stretch, recovery, and toughness
emerge from how the loops engage and slide against one another under load. Despite
millennia of practice, the design space has remained largely empirical, because
conventional knitting machines can only realize the loop geometries their needle
beds permit, leaving stitch structure and mechanical response coupled in ways that
resist systematic study.

We decouple them by **3D-printing** the knit. Deposition is not constrained by
needle kinematics, so we can fabricate any loop geometry expressible as a curve,
isolate exactly how stitch architecture governs the response, and extend knitting
into forms a needle bed cannot make.

<figure class="project-figure">
  <img src="/assets/img/projects/3DP-knits/overview-comparing-traditional-knit-and-3D-printed-knits.png" alt="Three panels: an industrially knitted fabric, a 3D-printed planar knit reproducing the same stitch, and a 3D-printed volumetric knit interlooped through its thickness">
  <figcaption>From craft to architected material: an industrially produced knit (left), the same stitch reproduced by 3D printing as a planar fabric (center), and a 3D-printed volumetric knit interlooped through its thickness (right).</figcaption>
</figure>

## Printing a fabric

We parameterize the yarn path as an analytic space curve, one loop of the stitch,
and wrap helical fibers around it to build a structured, hierarchical thread. A
multi-material inkjet printer jets and UV-cures photopolymer droplets against a
water-soluble support, yielding a compliant fabric whose loops can be unraveled
like a conventional knit. A small set of geometric parameters (loop height, width,
depth, curl, and fiber count and thickness) spans a continuous family of fabrics,
each fabricated and mechanically characterized.

Because the geometry is defined mathematically, the same description extends from a
flat fabric to a fully three-dimensional one. A volumetric knit is built from a
single continuous centerline that loops in-plane on each layer and then transitions
through the thickness, interlocking neighboring layers so the whole block is one
entangled thread.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/3DP-knits/3D-knit-geometry.png" alt="Construction of a volumetric knit: odd and even layers knit in opposite directions, joined by layer-transition loops, with the continuous centerline and the resulting interlooped geometry">
  <figcaption>Building a volumetric knit. Odd and even layers are knit in opposite directions and joined by layer-transition loops; a single continuous centerline threads through all of them, interlocking neighboring rows and layers into one entangled solid.</figcaption>
</figure>

## Printed knits reproduce textile mechanics

Under cyclic biaxial loading, the printed fabrics show the signatures of true
textiles: pronounced mechanical anisotropy between the course and wale directions,
strain-stiffening as the loops draw taut, and hysteresis from interloop friction,
with the loading and unloading branches not coinciding. A discrete-elastic-rod
(DER) simulation that models each loop and its frictional contacts reproduces the
measured curves and exposes the underlying yarn-level deformation.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/3DP-knits/2D-individual-stress-strain-behavior.png" alt="Effective stress-strain curves in the course and wale directions, comparing experiment and DER simulation, with deformation snapshots at increasing strain">
  <figcaption>Effective stress-strain response in the course and wale directions, for experiment and DER simulation, with yarn-level deformation snapshots at increasing strain. The fabric is anisotropic, strain-stiffening, and hysteretic, exactly as conventional knits are.</figcaption>
</figure>

## A single master curve

The central result is a collapse. Rescaling the stress-strain curves across
materials and loop geometries by one combination of the geometric parameters maps
them onto a **single master curve**, which also captures an industrial cotton knit.
The characteristic nonlinear, dissipative response of a knit is therefore set by
its *geometry and entanglement* and is largely material-independent, giving a
predictive relation for a fabric's behavior before it is ever fabricated.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/3DP-knits/2D-combined-behavior-fit.png" alt="Normalized stress versus effective strain: data from many printed geometries and a machine-knit cotton fabric all collapse onto one fitted master curve">
  <figcaption>One master curve. After normalization, the biaxial responses of printed knits spanning many geometries and materials, together with a machine-knit cotton fabric, collapse onto a single fitted relation.</figcaption>
</figure>

## Programmable behavior

Because the fabric is a single connected thread, loading along one axis changes how
it responds along the other. Exploiting this coupling, we **pre-strain** a knit in
one direction to tune the stiffness and the energy it dissipates in the orthogonal
direction, configuring one object as either a compliant spring or an adjustable
damper without changing its architecture.

<figure class="project-figure" style="width: 67%">
  <img src="/assets/img/projects/3DP-knits/2D-directional-programming.png" alt="Pre-strain applied in the wale or course direction systematically shifts the stress-strain response and dissipated energy measured in the orthogonal direction">
  <figcaption>Directional programming. A pre-strain imposed in one direction (wale or course) systematically raises the stiffness and hysteretic dissipation measured in the orthogonal direction; the insets show the dissipated energy growing with pre-strain.</figcaption>
</figure>

## Into three dimensions

The volumetric knit carries these ideas into the bulk. Loaded along its three
principal axes it is strongly anisotropic, and the same single-thread coupling lets
us program its through-thickness (Z) response by applying a biaxial pre-strain in
the plane, so a solid block of knit becomes a tunable, dissipative element.

<figure class="project-figure" style="width: 83%">
  <img src="/assets/img/projects/3DP-knits/3D-knit-stress-strain-and-directional-programmability.png" alt="Volumetric knit: anisotropic stress-strain response along the course, wale, and Z directions, and programmability of the Z response via in-plane biaxial pre-strain">
  <figcaption>A volumetric knit is anisotropic across its three axes (left), and its through-thickness response can be programmed by an in-plane biaxial pre-strain (right), with dissipated energy tuned by the imposed strain.</figcaption>
</figure>

## The same knit, at the micron scale

To test whether the architecture is truly scale-invariant, we reproduced the
identical volumetric knit at micrometer resolution using two-photon laser
nanoprinting and pulled it to rupture in situ. To our knowledge it is the
**smallest knit yet fabricated**, and once stresses are normalized by the base
material it follows the same deformation sequence and reaches a similar ultimate
strength as its macroscale analog, confirming that the governing mechanism is
geometric rather than material.

<figure class="project-figure">
  <img src="/assets/img/projects/3DP-knits/micro-uniaxial-snapshot.png" alt="Scanning electron microscope sequence of a micrometer-scale volumetric knit stretched uniaxially to rupture">
  <figcaption>A micrometer-scale volumetric knit, printed by two-photon lithography, stretched uniaxially to rupture in the electron microscope. Its deformation mirrors that of the hand-sized version.</figcaption>
</figure>

## Why it matters

This recasts knitting as a general design principle for *architected materials*:
prescribing the entanglement prescribes resilience, toughness, and tunable energy
absorption directly in an object's structure. Because the behavior collapses onto a
predictable master curve and can be programmed by pre-strain, the same approach
spans reusable impact protection and adjustable damping at the human scale and, at
the micron scale, points toward tissue scaffolds, filtration media, and
multifunctional composites.

*Supported by NASA MIRO (IDEAS², grant 80NSSC24M0178), the Haythornthwaite
Foundation, and the National Science Foundation (CMMI-2418432).*

<!-- ADD BODY IMAGES HERE. Drop files into src/assets/img/projects/3DP-knits/
     then uncomment a block below. Every image auto-sizes to the column width.

A plain image, no caption:
![Describe the image for accessibility](/assets/img/projects/3DP-knits/detail-1.jpg)

An image with a caption:
<figure class="project-figure">
  <img src="/assets/img/projects/3DP-knits/detail-2.jpg" alt="Describe the image">
  <figcaption>Your caption here.</figcaption>
</figure>
-->
