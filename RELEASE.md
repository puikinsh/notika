# Notika 2.0 — Vite-Powered, Zero jQuery

Notika has been completely rebuilt for 2026. Every page, every script, and every stylesheet has been upgraded from the original Bootstrap 3 + jQuery template to a modern Vite-bundled ES6 module architecture.

## What's New

**Vite 7.3.1 build system** powers the entire project. HMR dev server, SCSS compilation, code splitting with manual chunks, Handlebars partials for shared layout, and optimized production builds — all from `npm run dev`.

**Bootstrap 5.3.8** replaces Bootstrap 3.3.6. All 41 pages use modern markup — cards instead of panels, `data-bs-*` attributes, updated grid classes, and the latest utility API.

**Zero jQuery.** All interactivity is ES6 module classes with a `NotikaApp` base class (~1,185 lines) and 31 page-specific modules that extend it. No jQuery, no jQuery plugins anywhere in the project.

**15+ plugin replacements.** Every jQuery-dependent plugin has been swapped for a modern alternative:

- Chart.js 4.5 for all charts (was Morris.js + Flot + Sparkline)
- Swiper 12 for carousels (was Owl Carousel)
- AOS for scroll animations (was WOW.js + animate.css)
- Font Awesome 7.2 tree-shaken SVGs for icons (was Font Awesome 4 icon font)
- CodeMirror 6 for code editing (was Summernote)
- Cropper.js 2 for image manipulation (was jQuery Cropper)
- Leaflet for interactive maps
- Native HTML5 date/time inputs (was Bootstrap Datepicker)
- And more — see the full list in [CHANGELOG.md](CHANGELOG.md)

**Handlebars partials** share header, navbar, footer, and breadcrumb across all 41 pages. Navigation active states and breadcrumb icons are computed automatically from the page filename.

**Tree-shaken icons.** Font Awesome 7.2 icons are explicitly imported and registered — only the ~80 icons actually used get bundled. No more loading the entire icon font.

**Pages redesigned** for visual consistency: Accordion (7 variations), Tabs (8 variations), Buttons, Dialog, Popovers, Data Table, and Widgets — all using a unified card pattern.

## By the Numbers

| Metric | Before | After |
| --------- | --------- | --------- |
| Bootstrap | 3.3.6 | 5.3.8 |
| jQuery | Required (1.12.4) | Removed |
| jQuery plugins | 15+ | 0 |
| Build system | None (direct includes) | Vite 7.3.1 |
| JavaScript | Scattered `<script>` tags | ES6 modules (1 base + 31 pages) |
| Icon system | Font Awesome 4 (full font) | Font Awesome 7.2 (tree-shaken SVG) |
| Layout sharing | Copy-paste HTML | Handlebars partials (4 shared) |
| Dead CSS removed | — | ~1,133 lines |
| Dead CSS files deleted | — | 5 files |
| Unused npm packages removed | — | 7 packages |
| Pages | 41 | 41 |

## Breaking Changes

- jQuery is gone. Any custom code depending on `$()` will need rewriting.
- All `data-toggle` / `data-target` attributes are now `data-bs-toggle` / `data-bs-target`.
- Icon classes changed from `fa fa-*` to `fa-solid fa-*` (Font Awesome 7.2 SVG syntax).
- A build step is now required (`npm install` + `npm run dev`). No more opening HTML files directly.
- CSS is bundled through Vite — pages should not have `<link>` tags for bundled stylesheets.

## Getting Started

```bash
git clone https://github.com/nicdev/notika.git
cd notika
npm install
npm run dev        # Dev server with HMR (port 3100)
```

Build for production:

```bash
npm run build      # Output to dist/
npm run preview    # Preview production build (port 4173)
```

## License

MIT — same as the original. Credit to [Colorlib](https://colorlib.com) as the original author.
