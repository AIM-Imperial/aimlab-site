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
needle kinematics, so we can fabricate any loop geometry expressible as a curve and
isolate exactly how stitch architecture governs the response.

## Printing a fabric

We parameterize the yarn path as an analytic space curve (one loop of the stitch)
and wrap helical fibers around it to build a structured, hierarchical thread. A
multi-material inkjet printer jets and UV-cures photopolymer droplets against a
water-soluble support, yielding a compliant fabric whose loops can be unraveled
like a conventional knit. A small set of geometric parameters (loop height, width,
depth, curl, and fiber count and thickness) spans a continuous family of fabrics,
each fabricated and mechanically characterized.

## Printed knits reproduce textile mechanics

Under cyclic uniaxial loading, the printed fabrics exhibit the signatures of true
textiles: pronounced mechanical anisotropy, strain-stiffening as the loops draw
taut, and hysteresis from interloop friction (the loading and unloading branches
do not coincide). Matched in stitch pattern, a printed knit and a machine-knit
cotton fabric trace nearly identical responses.

## A single master curve

The central result is a collapse. Rescaling the stress-strain curves across
materials and loop geometries by one combination of the geometric parameters
maps them onto a **single master curve**, which also captures the industrial cotton
knit. The characteristic nonlinear, dissipative response of a knit is therefore set
by its *geometry and entanglement* and is largely material-independent, giving a
predictive relation for a fabric's behavior prior to fabrication.

## Programmable, in 3D, across scales

Because the fabric is a single connected thread, loading along one axis alters the
response transverse to it. Exploiting this coupling, we **pre-strain** a knit to
tune its stiffness and energy dissipation, configuring one object as either a
compliant spring or an adjustable damper.

We further extend the architecture into the third dimension, interlooping through
the thickness as well as in-plane to produce *volumetric* knits: entangled bulk
solids rather than thin sheets. To demonstrate scale invariance, we reproduced the
identical architecture at micrometer resolution via two-photon laser nanoprinting:
to our knowledge the **smallest knit yet fabricated**, and one that mirrors the
behavior of its macroscale analog.

## Why it matters

This recasts knitting as a general design principle for *architected materials*:
prescribing the entanglement prescribes resilience, toughness, and tunable energy
absorption directly in an object's structure. Applications range from reusable
impact protection and adjustable damping layers to, at small scales, tissue
scaffolds, filtration media, and multifunctional composites.

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

