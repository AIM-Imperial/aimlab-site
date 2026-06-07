// Eleventy configuration for AIM Lab
// This file tells Eleventy where to find things and how to process them.
// You usually don't need to touch this.

module.exports = function(eleventyConfig) {
  // Copy static assets (CSS, JS, images) straight through to the built site.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Date filters used in templates: {{ date | dateISO }} → "2026-05-03"
  //                                  {{ date | dateDisplay }} → "2026.05"
  eleventyConfig.addFilter("dateISO", (d) => {
    const date = (d instanceof Date) ? d : new Date(d);
    return date.toISOString().slice(0, 10);
  });
  eleventyConfig.addFilter("dateDisplay", (d) => {
    const date = (d instanceof Date) ? d : new Date(d);
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    return `${yyyy}.${mm}`;
  });
  eleventyConfig.addFilter("year", (d) => {
    const date = (d instanceof Date) ? d : new Date(d);
    return date.getUTCFullYear();
  });

  // Press coverage — newest first
  eleventyConfig.addCollection("press", (collection) =>
    collection.getFilteredByGlob("src/press/*.md").sort((a, b) => b.date - a.date)
  );

  // Sort projects by an optional `order` field, then by title
  eleventyConfig.addCollection("projects", (collection) =>
    collection.getFilteredByGlob("src/projects/*.md").sort((a, b) => {
      const ao = a.data.order ?? 999;
      const bo = b.data.order ?? 999;
      if (ao !== bo) return ao - bo;
      return (a.data.title || "").localeCompare(b.data.title || "");
    })
  );

  // Sort people by `order` (PI = 1, postdocs = 10s, PhDs = 20s, etc.)
  eleventyConfig.addCollection("people", (collection) =>
    collection.getFilteredByGlob("src/people/*.md").sort((a, b) => {
      const ao = a.data.order ?? 999;
      const bo = b.data.order ?? 999;
      return ao - bo;
    })
  );

  // Publications — one .md file per paper, grouped by year (newest first).
  // Within a year, sort by the `order` field (lower first), then title.
  eleventyConfig.addCollection("pubsByYear", (collection) => {
    const items = collection.getFilteredByGlob("src/publications/*.md");
    const byYear = {};
    for (const p of items) {
      const y = p.data.year ?? 0;
      (byYear[y] = byYear[y] || []).push(p);
    }
    return Object.keys(byYear)
      .map(Number)
      .sort((a, b) => b - a)
      .map((year) => ({
        year,
        items: byYear[year].sort((a, b) => {
          const ao = a.data.order ?? 999;
          const bo = b.data.order ?? 999;
          if (ao !== bo) return ao - bo;
          return (a.data.title || "").localeCompare(b.data.title || "");
        }),
      }));
  });

  // Art projects — same sorting as research projects
  eleventyConfig.addCollection("art", (collection) =>
    collection.getFilteredByGlob("src/art/*.md").sort((a, b) => {
      const ao = a.data.order ?? 999;
      const bo = b.data.order ?? 999;
      if (ao !== bo) return ao - bo;
      return (a.data.title || "").localeCompare(b.data.title || "");
    })
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
