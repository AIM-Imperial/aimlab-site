// =============================================================================
// AIM Lab journal covers — feeds the cover gallery on the Publications page.
//
// TO ADD A COVER:
//   1. Put the image in  src/assets/img/covers/  (portrait, A4-ish ~3:4,
//      ~1000px wide, JPEG under ~400KB).
//   2. Add one line below:  { src: "filename.jpg", caption: "Journal, year" }
//   3. Covers appear in this order. Caption shows under the image (optional).
//      Click a cover to enlarge it.
// The gallery only appears once at least one cover is listed here.
// =============================================================================

module.exports = [
  { src: "3dp_deployable.jpg", caption: "Deployable Structures, 3DP+ 2019" },
  { src: "EML_weaving.jpg", caption: "Weaving Indentation, EML 2022" },
  { src: "eth_4dp.jpg", caption: "4D Printing, 3DP+ 2018" },
  { src: "prl_weaving.jpg", caption: "the Geometry of Weaving, PRL 2021" },
  { src: "sciadv_thermo.jpg", caption: "Thermomechanical metamaterials, Science Advances 2023" },
  { src: "reprogrammable.jpg", caption: "Reprogrammable m-bits, Nature, 2021" },
];

