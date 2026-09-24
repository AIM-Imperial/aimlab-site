Draft projects. Anything in this folder builds in the local preview (npm start)
exactly like a published project - its own page, its card on the Research grid,
its homepage panel - but the folder is gitignored, so nothing here is pushed or
goes live.

  - Copy ../_TEMPLATE.md here as <slug>.md and fill it in as usual.
  - Put its images in src/assets/img/projects/draft/<slug>/ (also gitignored)
    and reference them as /assets/img/projects/draft/<slug>/...
  - To publish:  npm run publish-draft <slug>
    This moves the file and the image folder up one level and rewrites the
    image paths in the file. Then commit.

This README.txt is the only file in the folder that git tracks.
