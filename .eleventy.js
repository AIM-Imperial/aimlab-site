// Eleventy configuration for AIM Lab
// This file tells Eleventy where to find things and how to process them.
// You usually don't need to touch this.

module.exports = function(eleventyConfig) {
  // Copy static assets (CSS, JS, images) straight through to the built site.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Resolve a hero image to whichever extension actually exists on disk, so the
  // extension in front matter does not have to match. Drop in hero.png, hero.jpg,
  // or hero.jpeg and {{ hero | heroSrc }} finds it.
  //   {{ "/assets/img/projects/foo/hero.png" | heroSrc }}
  const fs = require("fs");
  const IMG_EXTS = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"];
  // Return "<basePath>.<ext>" for the first ext that exists on disk, else null.
  function firstExisting(basePath, exts) {
    for (const ext of exts) {
      if (fs.existsSync("src" + basePath + "." + ext)) return basePath + "." + ext;
    }
    return null;
  }
  // Resolve a hero URL (with any extension) to the file actually on disk,
  // preferring the extension written in front matter.
  function resolveHero(urlPath) {
    const base = urlPath.replace(/\.(png|jpe?g)$/i, "");
    const written = (urlPath.match(/\.([A-Za-z]+)$/) || [])[1];
    const order = written ? [written, ...IMG_EXTS.filter((e) => e !== written)] : IMG_EXTS;
    return firstExisting(base, order) || urlPath;
  }
  eleventyConfig.addFilter("heroSrc", (urlPath) => urlPath ? resolveHero(urlPath) : urlPath);

  // High-resolution hero for print sheets: prefer hero-large.{png,jpg,jpeg} in the
  // same folder; fall back to the normal hero if no large version exists.
  //   {{ hero | heroLargeSrc }}
  eleventyConfig.addFilter("heroLargeSrc", (urlPath) => {
    if (!urlPath) return urlPath;
    const dir = urlPath.replace(/\/[^/]*$/, ""); // strip the filename
    return firstExisting(dir + "/hero-large", IMG_EXTS) || resolveHero(urlPath);
  });

  // First <p>…</p> block of rendered HTML, used as a fallback project summary.
  eleventyConfig.addFilter("firstParagraph", (html) => {
    if (!html) return "";
    const m = String(html).match(/<p>[\s\S]*?<\/p>/i);
    return m ? m[0] : "";
  });

  // Inline an SVG file's markup so it prints as true vector at full resolution
  // (an SVG referenced via <img> is rasterized at low DPI by Chrome's print).
  // Ensures a viewBox exists so it scales, and adds an optional root class.
  //   {{ "/assets/img/.../QR.svg" | inlineSvg("sheet__qr") | safe }}
  eleventyConfig.addFilter("inlineSvg", (urlPath, className) => {
    if (!urlPath) return "";
    const file = "src" + urlPath;
    if (!fs.existsSync(file)) return "";
    let svg = fs.readFileSync(file, "utf8")
      .replace(/<\?xml[\s\S]*?\?>/i, "")
      .replace(/<!DOCTYPE[\s\S]*?>/i, "")
      .trim();
    // Flatten clip-path usage. QR codes draw each module as a <rect> clipped by a
    // <clipPath> of shapes; Chrome rasterizes clip-path'd elements when printing to
    // PDF (pixelated output). Inlining the clip shapes as directly-filled geometry
    // keeps it true vector in print. No-op on SVGs without clip-paths (e.g. logos).
    if (/clip-path=/.test(svg)) {
      const clips = {};
      svg = svg.replace(/<clipPath id="([^"]+)">([\s\S]*?)<\/clipPath>/g, (m, id, inner) => {
        clips[id] = inner;
        return "";
      });
      svg = svg.replace(/<rect\b([^>]*?)clip-path="url\(['"]?#([^'")]+)['"]?\)"([^>]*?)\/>/g,
        (m, pre, id, post) => {
          if (clips[id] === undefined) return m;
          const fill = ((pre + post).match(/fill="([^"]+)"/) || [])[1] || "#000";
          return `<g fill="${fill}">${clips[id]}</g>`;
        });
      svg = svg.replace(/<defs>\s*<\/defs>/g, "");
      // Strip any leftover clip-path attr (e.g. a ref to an undefined clipPath) so
      // nothing forces a raster fallback in print.
      svg = svg.replace(/\s+clip-path="url\([^)]*\)"/g, "");
    }
    if (!/\bviewBox=/.test(svg)) {
      const w = (svg.match(/<svg[^>]*\bwidth="([\d.]+)/i) || [])[1];
      const h = (svg.match(/<svg[^>]*\bheight="([\d.]+)/i) || [])[1];
      if (w && h) svg = svg.replace(/<svg\b/i, `<svg viewBox="0 0 ${w} ${h}"`);
    }
    if (className) svg = svg.replace(/<svg\b/i, `<svg class="${className}"`);
    return svg;
  });

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
