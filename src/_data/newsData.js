// =============================================================================
// AIM Lab news — the single source of truth for the News page and homepage.
//
// TO ADD A NEWS ITEM: add one line to the top of the list below.
//   { date: "2026-09-15", title: "Short sentence describing the news." },
//
//   - date  (string "YYYY-MM-DD")  sets the order and the displayed date.
//   - title (string)               the text; HTML is allowed for links/italics,
//                                   e.g.  '<a href="/join/">Join</a>' or
//                                   'New paper in <em>Nature</em>.'
//     If the title contains a double quote, wrap the whole value in single
//     quotes (as shown) so it stays valid.
//
// Items can be in any order; they are sorted newest-first automatically.
// =============================================================================

const items = [
  { date: "2026-06-01", title: "Lindsay Underwood started her summer internship at <a href='https://www.nasa.gov/johnson/'>NASA JSC</a>!" },
  { date: "2026-06-01", title: "We migrated the AIM group to the Department of Aeronautics at Imperial College London. See <a href='https://profiles.imperial.ac.uk/tian.chen'>Tim's profile</a>!" },
  { date: "2026-05-28", title: "'Entanglement-driven responses through multiscale 3D-printed knits' is published in <em>Proceedings of the National Academy of Sciences</em>. See the <a href='/projects/3DP-knits/'>project page</a>." },
  { date: "2026-05-14", title: "Katlinh Nguyen received the <a href='https://www.uh.edu/honors/undergraduate-research/honors-thesis/awards/'>Outstanding Senior Honors Thesis Award</a>. Congratulations!" },
  { date: "2025-08-21", title: "Ilyes Krida passed his qualifying exam! Congratulations." },
  { date: "2025-08-01", title: "We started working on 3D scanning and additive manufacturing with DoD, NAVSEA!" },
  { date: "2025-02-20", title: "NASA Partnerships for Innovation in Engineering Education &amp; Research for Space (PIE2RS) has started. <a href='https://pie2rs.egr.uh.edu/'>See the program</a>." },
  { date: "2025-01-01", title: "NASA MIRO Inflatable Deployable Environments and Adaptive Space Systems (IDEAS2) Center has started. <a href='https://ideas2.egr.uh.edu/'>See the center</a>." },
  { date: "2024-12-20", title: "Paper titled Haptiknit: Distributed stiffness knitting for wearable haptics is published in Science Robotics." },
  { date: "2024-12-12", title: "Paper titled Extraction of Mechanical Properties of Shape Memory Alloys from Instrumented Spherical Indentation is published in JAM." },
  { date: "2024-09-25", title: "We received a NASA INCLUDES grant to enable inclusive engineering education! <a href='https://uh.edu/news-events/stories/2024/october/10022024-nasa-stem-grant.php'>Read the story</a>." },
  { date: "2024-09-15", title: "We received a NASA MIRO grant to demonstrate deployable structures! <a href='https://ideas2.egr.uh.edu/'>See the center</a>." },
  { date: "2024-09-02", title: "We received a TIP grant titled 'Broadening Students' Mental Map between Theoretical and Physical Domains.' <a href='https://uh.edu/research/funding-opportunities/internal-awards/research-seed-grants/fy2024/'>See the funding page</a>." },
  { date: "2024-09-01", title: "The YouTube video introducing the paper 'Bistable auxetic surface structures' has been viewed over 8 million times!" },
  { date: "2024-08-01", title: "Tim started to serve as the deputy editor-in-chief for 3D Printing and Additive Manufacturing." },
  { date: "2024-07-03", title: "Awarded the High Priority Area Research Seed Grants, titled 'Woven and Knit Textiles for Flexible and Stretchable Batteries.' <a href='https://uh.edu/research/funding-opportunities/internal-awards/research-seed-grants/fy2024'>See the funding page</a>." },
  { date: "2024-02-05", title: "Our paper 'Leveraging the snap buckling of bistable magnetic shells to design a refreshable braille dot' is published in Advanced Materials Technologies." },
  { date: "2024-01-16", title: "Krida, Ilyes is starting his PhD at our lab!" },
  { date: "2023-11-22", title: "'Algorithmic encoding of adaptive responses in temperature-sensing multimaterial architectures' is published in Science Advances, and was selected for a cover image!" },
  { date: "2023-09-18", title: "'Shape reconfiguring bistable structures using heat activated fibers' is published!" },
  { date: "2023-08-19", title: "Professor Chen successfully hosts the Texas Soft Matter Meeting!" },
  { date: "2023-08-18", title: "Liu, Pan is starting her PhD at our lab!" },
  { date: "2023-08-03", title: "'Two-dimensional X-ray diffraction (2D-XRD) and micro-computed tomography (micro-CT) characterization of additively manufactured 316L stainless steel' is published!" },
  { date: "2023-08-02", title: "'Intelligent matter that senses, calculates, and reacts: A story of electronics, computation, and mechanics' is published." },
  { date: "2023-06-16", title: "'Creating geometric imperfections in thin-walled structures using acoustic excitation' is published." },
  { date: "2023-05-01", title: "We received a 'Grants to Enhance and Advance Research' award, for a proposal titled 'Stochastic excitation in the fabrication and characterization of thin elastic shells using acoustics.'" },
  { date: "2023-04-18", title: "'Programming material logic using magnetically controlled bistability' is published." },
  { date: "2023-02-13", title: "Krichen, Melek joins our lab as a research assistant!" },
  { date: "2022-12-04", title: "Paper titled '3D-printing textiles: multi-stage mechanical characterization of additively manufactured biaxial weaves' is published in Materials and Design!" },
  { date: "2022-11-11", title: "Paper titled 'From kirigami to hydrogels: a tutorial on designing conformally transformable surfaces' is published in Journal of Applied Mechanics. Congratulations to Wang Yue." },
  { date: "2022-09-01", title: "Wang, Yue is starting her PhD at our lab! She will work on micro fabrication of functional structures." },
  { date: "2022-07-01", title: "Our Teaching Innovation Proposal entitled 'Developing Demonstration Kits for During-lecture Experimentation in Mechanics' is awarded!" },
  { date: "2022-05-10", title: "Tian Chen starts serving as an associate editor in the journal 3D Printing and Additive Manufacturing." },
  { date: "2022-04-18", title: "Three students have received summer research funding and are joining our lab to do exciting things!" },
  { date: "2022-01-22", title: "Starting the first funded project researching the Direct Energy Deposition + in-situ CNC process within the Advanced Manufacturing Institute." },
  { date: "2022-01-16", title: "Starting the new semester with 3 students awarded the Provost's Undergraduate Research Scholarship!" },
  { date: "2021-10-01", title: "Four master's and bachelor's students have joined the lab to work on a number of interesting things! Will update as they progress." },
  { date: "2021-09-03", title: "Our paper on Smooth Triaxial Weaving with Naturally Curved Ribbons was featured on the cover of Physical Review Letters! You can also read the synopsis in Physics magazine, titled The Geometry of Basket Weaving." },
  { date: "2021-09-01", title: "The Architected Intelligent Matter (A.I.M.) lab officially opens its doors at the University of Houston!" },
  { date: "2021-08-11", title: "A research highlight on our weaving project, titled Weaving smooth 3D shapes with curved ribbons, was published in Nature Reviews Physics!" },
  { date: "2021-07-25", title: "Our paper on Smooth triaxial weaving with naturally curved ribbons was accepted in Phys. Rev. Lett. and promoted as an Editors' Suggestion!" },
  { date: "2021-05-04", title: "Our paper on the Bending Response of a Book with Internal Friction was accepted in Phys. Rev. Lett. and promoted as an Editors' Suggestion! EPFL published a news article on it." },
  { date: "2021-05-03", title: "Our paper on Bistable Auxetic Surface Structures was accepted in SIGGRAPH 2021!" },
  { date: "2021-05-02", title: "Our paper on Computational Inverse Design of Surface-based Inflatables was accepted in SIGGRAPH 2021!" },
  { date: "2021-05-01", title: "Our paper on 3D Weaving with Curved Ribbons was accepted in SIGGRAPH 2021!" },
  { date: "2021-03-27", title: "Our paper on the Computational design of multi-stable, reconfigurable surfaces was accepted in Materials &amp; Design!" },
  { date: "2021-03-25", title: "3 out of 3 papers were accepted at SIGGRAPH '21! More details to follow when the papers come out." },
  { date: "2021-01-21", title: "Read a great Nature News &amp; Views piece by Corentin Coulais, titled Mechanical memory written and read remotely." },
  { date: "2021-01-20", title: "A new article titled A reprogrammable mechanical metamaterial with stable memory was accepted in Nature! Great collaborating with Mark Pauly and Pedro Reis." },
  { date: "2020-07-11", title: "Our paper on the design of the Canopy pavilion on the EPFL campus has been accepted at the Advances in Architectural Geometry conference." },
  { date: "2019-11-08", title: "Tim was awarded the ETH medal for his doctoral thesis by the Rectorate of ETH Zurich. The medal is awarded to outstanding doctoral theses (&lt;8%), and includes a prize of 2,000 CHF." },
  { date: "2019-10-10", title: "We entered the IASS 2019 Form and Force competition with the 'Elastic Rod Pavilion' and were announced as a prize winner. The accompanying conference proceeding is titled X-Shell Pavilion: A Deployable Elastic Rod Structure." },
  { date: "2019-06-28", title: "The work on a self-deploying solar panel was featured in a Focus story in Physics." },
  { date: "2019-06-27", title: "Resulting from a continuing collaboration with Caltech, our paper on a self-deploying solar panel was published in Physical Review Applied and selected as an Editors' Suggestion." },
  { date: "2019-06-06", title: "From a continuing collaboration with MIT, our paper titled Design and Computational Modeling of a 3D Printed Pneumatic Toolkit for Soft Robotics was published in Soft Robotics." },
  { date: "2019-04-18", title: "Our paper titled Programmable, active lattice structures: Unifying stretch-dominated and bending-dominated topologies was published in Extreme Mechanics Letters." },
  { date: "2018-08-08", title: "The paper on soft robots was featured on both the ETH and Caltech front pages, and was on CBS News!" },
  { date: "2018-05-15", title: "Collaborating with the folks at Caltech, our paper titled Harnessing bistability for directional propulsion of soft, untethered robots was published in PNAS." },
];

// --- Do not edit below. Sorts newest-first and groups by year. ---------------
items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

const byYear = [];
for (const it of items) {
  const year = Number(it.date.slice(0, 4));
  let g = byYear.find((x) => x.year === year);
  if (!g) { g = { year, items: [] }; byYear.push(g); }
  g.items.push(it);
}
byYear.sort((a, b) => b.year - a.year);

module.exports = { all: items, byYear };
