---
layout: layouts/page.njk
title: Research vision
lede: Matter is the loom that weaves shape into agency.
printSheet: /research/vision/print/
sections:
  - label: Research vision
    id: top
  - Themes
  - Engineering research
# The Themes rows (laid out like the Teaching page's courses). `project` is the file
# name of a project in research/projects/; its card image (hero-large) and page are
# used for the theme's picture and link.
researchThemes:
  # `text` may link to project pages (<a href="/projects/...">); the printable
  # sheet turns those into full aimlab.uk addresses so they work in the PDF.
  - title: Architecting nonlinear responses of metamaterials
    text: >-
      We design the internal architecture of metamaterials to demonstrate responses that
      do not occur naturally. We focus on nonlinear mechanical behaviour, where large
      deformation, contact and instability govern the response. Further, we focus on
      <a href="/projects/active-lattices/">stimulus-responsive characteristics</a>, in
      which <a href="/projects/temperature-switchable-metamaterials/">a uniform change in
      the surroundings</a> produces designed, local or sequenced actions.
    project: temperature-switchable-metamaterials
  - title: Frictional contact, sliding and entanglement
    text: >-
      Structures whose responses are dominated by friction and entanglement are
      ubiquitous, from entangled polymers and DNA strands to
      <a href="/projects/woven-structures/">woven baskets</a>,
      <a href="/projects/knit-modeling/">textiles</a> and composites. Their stiffness and
      dissipation come from friction and sliding between slender elements rather than
      from the material itself. We aim to understand their mechanics to engineer
      topological entanglement for functionality.
    project: 3DP-knits
  - title: Mechanical computation and memory
    text: >-
      Snap-through and multistability give a structure more than one stable state, so
      that it can hold <a href="/projects/reprogrammable-metamaterial/">multiple
      configurations without external power</a>. This notion may revolutionize material
      design by demonstrating architected materials whose physical behaviour can be
      programmed on-demand, in-situ and indefinitely. Further, with material feedback
      and rudimentary logic, we aim to
      create neuromorphic matter.
    project: reprogrammable-metamaterial
  - title: Programming shape through geometry
    text: >-
      Natural and artificial systems constantly change shape, which we seek to
      understand through geometry and mechanics. Flat architected sheets are designed so
      that each region expands by a prescribed amount, and the mismatch between
      neighbouring cells forces the sheet into a chosen curved form. The geometric
      reasoning is scale invariant, and the same algorithm applies to
      <a href="/projects/deployable-wafer-surface/">micron-</a>,
      <a href="/projects/bistable-auxetic-surfaces/">centimetre- and metre-</a>scale
      structures.
    project: deployable-wafer-surface
---

We explore programmable intelligent matter at the intersection of mechanics, geometry and fabrication. We aim to create materials whose physical properties and shape can be programmed on demand and in situ. Beyond programmability, we study materials that sense their own condition and tune their properties and shape to perform optimally. This intelligence is physical: it is embodied in the material's architecture and distributed across its elements. In the longer term, we work towards neuromorphic matter: materials that, like a nervous system, store and process information and adapt with use. We pursue this goal scientifically and through the practice of art.

## Geometry processing

We build the computational methods that connects function to form in an inverse manner:
gradient-descent, conformal mapping, shape / topology optimization and topological analysis of networks and textiles. Given a surface to deploy into, a stiffness map to match, or a response to encode, these tools return a shape to be fabricated.

## Dissipative and multistable mechanics

We study the nonlinear phenomena that give structure its agency without motors or
electronics: elastic instability and multistability, frictional contact, entanglement, and vibration. These material and mechanics phenomena are correlated to concepts typically associated with machineries: a snap-through is an actuator, a frictional interface is a memory, an entangled network is toughness, a vibrating film is a manufacturing tool. Our aim is to understand these phenomena deeply and use them to compose functionality.

## Matter-writing fabrication

We treat fabrication as part of the research. Multimaterial 3D printing, machine knitting and engineered textiles, wafer-scale processing, and robotic deposition allow our concepts to be experimentally demonstrated and our designs to become physical at a different scale - from microns to metres - and in different places, from the cleanroom to structures too large or too remote to bring to a factory.

## Themes

<div class="theme-list">
{%- for t in researchThemes -%}
{%- for p in collections.projects -%}
{%- if p.fileSlug == t.project -%}
<article class="course course--with-media"><div class="course__body"><h3 class="course__title">{{ t.title }}</h3><p class="course__desc">{{ t.text | safe }}</p></div><div class="course__media"><a href="{{ p.url }}"><img src="{{ p.data.hero | heroLargeSrc }}" alt="{{ p.data.title }}" loading="lazy"></a></div></article>
{%- endif -%}
{%- endfor -%}
{%- endfor -%}
</div>

## Engineering research

Engineering research interprets and applies natural laws in the understanding and design of artificial systems. We synthesize existing knowledge to develop systems that demonstrate both utility and generality. For example, we incorporate thermodynamical principles in the analysis of turbomachinery to the design of aircraft engines.

Our work spans fundamental discovery to design engineering, and we measure our impact along this spectrum. Fundamental research contains a great deal of uncertainty, and their impact may not be measurable until a much later date. Yet, if and when they succeed, they may revolutionize our society. With applied research, while the impact may be narrow, we see the outcome of our research immediately and gain satisfaction and fulfillment.

The synthesis of fundamental principles produces new knowledge, hence engineering research. The work in the AIM Lab is at the intersection of mechanics, geometry, and fabrication. Mechanics aims to understand how matter deform when loaded. Geometry describes the shape of objects and how they change. Fabrication informs and deepens our understanding of our research through demonstration and experimental research. Using the example of a turbine blade, it is cast as a single crystal so that it has no grain boundaries to fail along, shaped internally and externally to cool efficiently without thinning the walls past their strength, and loaded primarily by its own mass as it spins.

Our research community is mechanics. The field of mechanics encompass disciplines that are both fundamental and applied. For example, an instability understood through a foundational analysis is the same instability exploited deliberately in a deployable structure, so accumulated technique continues to be applicable across problems that appear unrelated.