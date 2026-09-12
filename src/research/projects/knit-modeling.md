---
title: Knit mechanics, from yarn to garment
subtitle: A multi-level modeling and design framework for weft-knitted fabrics
tags:
  - Textiles
  - Soft matter
start: 2023
end: 2025
hero: /assets/img/projects/knit-modeling/hero.jpg
heroAlt: A computationally designed knitted compression sleeve worn on an arm, with microscope close-ups of the three knit patterns it combines
heroCaption: One seamless sleeve, several knits. The pattern, stitch length, and yarn vary along the arm so that the pressure does not.
collaborators: Cosima du Pasquier, Sehui Jeong, Allison Okamura (Stanford); Susan Williams, Skylar Tibbits (MIT); Pan Liu, Nour Mnejja (Houston)
summary: >-
  Knitted fabrics owe their stretch, recovery, and comfort to yarn-level mechanics that industrial practice still navigates by trial and error. We built a multi-level framework that starts from measured, anisotropic yarn behavior, resolves whole stitches in a volumetric finite element model, and then compresses what those simulations know into a three-parameter strain-energy surrogate that runs in minutes inside commercial tools. Validated across stitch lengths, patterns, and yarns, the framework extends to heterogeneous fabrics, where regions of different knits behave like springs in series and parallel. We used it to design a single-piece compression sleeve whose pattern varies along the arm so the pressure it applies does not.
links:
  - label: Paper
    url: "https://doi.org/10.1016/j.eml.2025.102423"
publications:
  - authors: "du Pasquier C, Jeong S, Liu P, Williams S, Mnejja N, Okamura AM, Tibbits S, Chen T."
    title: "Multi-level mechanical modeling and computational design framework for weft knitted fabrics."
    venue: "<em>Extreme Mechanics Letters</em> 82, 102423 (2026)."
    url: "https://drive.google.com/file/d/1y2hRbFXEoRV-nE4GTTKOIRiktbl4Gb_0/view?usp=sharing"
---

A weft knit is a single yarn looped into a fabric. Its stretch, recovery, and
handle are determined by how those loops slide, bend, and jam against each
other. This microstructure makes knits well suited to wearables and soft
robotics, and it also makes them difficult to predict: the response is
nonlinear, anisotropic, and history-dependent, so industrial knit design
still relies on swatch-by-swatch testing. This project, led by our
collaborators at Stanford with MIT and AIM, replaces that testing with a
modelling framework that retains yarn-level fidelity and is fast enough to
use for design.

## From yarn to fabric

The framework starts at the yarn: we measure the axial and transverse
response of three industrial yarns - plied cotton, textured nylon, and a PET
monofilament - and model them as anisotropic materials rather than as
idealized elastic rods. Each stitch is then resolved as a solid
curved rod in a volumetric finite element model, with contact, friction, and
the pre-tension that knitting itself introduces. Against biaxial experiments
across stitch lengths, patterns, and yarn materials, the simulations agree
with measurement to within a few percent, and, once validated, they predict
new fabrics without per-fabric recalibration.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/knit-modeling/biaxial-knit-behavior.jpg" alt="A knit unit cell with its geometric parameters, a biaxial test rig, the stress-strain response in tension and compression with simulation and fitting, and parameter sweeps of the model">
  <figcaption>Yarn-level model. A parameterized unit cell is loaded biaxially in tension and compression; the simulation matches experiment, and sweeps over the geometric parameters show how the response is controlled by the loop geometry.</figcaption>
</figure>

## Three numbers per fabric

A volumetric simulation takes tens of hours per fabric. The framework
therefore homogenizes each simulated knit into a strain-energy surrogate
with three physically meaningful parameters: initial stiffness, stiffness
growth, and the direction of anisotropy. The surrogate is built on the
Holzapfel-Gasser-Ogden form already available in commercial finite element
tools, so a validated fabric becomes a material definition usable in
standard finite element software, and a fabric-level prediction takes minutes
instead of hours.

## Fabrics as patchworks

Real garments are not homogeneous: yarns and patterns change from region to
region. Testing knits with deliberate material transitions showed that the
interfaces contribute little of their own - a heterogeneous fabric behaves
like its homogeneous regions joined as springs in series or parallel,
depending on whether the load runs along or across the transition. This
result makes design tractable: a garment can be treated as a patchwork of
validated regions without loss of predictive accuracy.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/knit-modeling/mechanics-transitions.jpg" alt="Uniaxial stress-strain curves in the course and wale directions for homogeneous cotton and nylon and for heterogeneous cotton-plus-nylon fabrics, comparing experiment and the spring-network prediction">
  <figcaption>Capturing heterogeneity. The course and wale responses of mixed cotton-and-nylon fabrics are predicted from their homogeneous constituents using series and parallel spring analogies, matching experiment across directions.</figcaption>
</figure>

## A sleeve with uniform pressure

The demonstration is a compression sleeve. Skin-tight garments stretch
differently at the wrist, the forearm, and the bicep, so a uniform fabric
applies uneven pressure; commercial sleeves compensate with seams and panels.
We reconstructed a volunteer's arm in 3D, mapped it to the knitting machine's
cylindrical coordinates, and used the framework to select the stitch length,
pattern, and yarn for each region so that the worn stress is constant along
the arm. The sleeve is knitted as a single piece on an industrial machine
from an algorithmically generated pattern, and force sensors along the arm
confirm that the pressure remains uniform, before and after 45 minutes of
exercise.

<figure class="project-figure" style="width: 50%">
  <img src="/assets/img/projects/knit-modeling/sleeve-optimization.jpg" alt="Design of a compression sleeve: 3D mapping of the arm, stress optimization producing a patchwork of stitch patterns and yarns, and the fabricated sleeve worn on an arm">
  <figcaption>Designing the compression sleeve. The arm geometry is mapped, the stitch pattern and yarn are optimized region by region into a patchwork, and the optimized garment is knitted as one piece to deliver uniform pressure.</figcaption>
</figure>

The same procedure - measure the yarn once, simulate the fabric, optimize the
patchwork - extends to bodysuits, medical compression garments, and the
knitted skins of soft robots: garments engineered to a specification rather
than fitted by iteration.
