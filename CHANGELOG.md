# Changelog

All notable changes to the Notika admin dashboard template.

## [3.0.1] - 2026-11-16

A dependency refresh and maintenance release. Bootstrap moves to 5.3.9 and every
other package to its latest release.

### Changed

- Bootstrap 5.3.8 to 5.3.9; Vite 8.3, cssnano 9, glob 14, Chart.js 4.6,
  Cropper.js 2.3, Sass, ESLint, Prettier and html-validate updated.
- `npm audit` reports 0 vulnerabilities (fast-uri and handlebars advisories fixed).

### Fixed

- Leaflet marker icons returned 404 on the Google Map page.
- The documentation page's Bootstrap stylesheet SRI hash did not match the file,
  so browsers blocked it. CDN pins (Bootstrap 5.3.9, bootstrap-icons 1.13.2,
  highlight.js 11.12.0) are bumped with recomputed hashes.
- Tab list items use `role="none"` to satisfy html-validate 11.21.

## [3.0.0] - 2026-08-07

A security, performance and accessibility release. All 32 open Dependabot alerts
are resolved, Google Fonts no longer loads from a third-party CDN, the per-page
JavaScript payload is roughly halved, and the HTML validator now passes cleanly
across all 41 pages. **Contains breaking changes — see below.**

### ⚠️ Breaking Changes

| Change | Notes |
|--------|-------|
| `npm run type-check` removed, `typescript` and `@types/node` uninstalled | The project has zero `.ts` files and no `tsconfig.json`, so `tsc --noEmit` only ever errored |
| `swiper` removed | Nothing imported it. The stale local `css/swiper.min.css` import was dropped too |
| `npm run lint` rewritten | ESLint 10 is flat-config only and removed `--ext`; the old script could not run at all |
| Production source maps disabled | They exposed the original sources and added ~2 MB to `dist/` |
| Build minifier switched to Oxc | Vite 8 no longer bundles esbuild for minification |
| Inbox rows are `<div data-href>` rather than `<a>` | An `<a>` cannot legally contain the row's checkbox and star controls. The email subject is now the real link, and the row stays clickable |

### 🔒 Security

- **All 32 Dependabot alerts resolved** — handlebars, vite, immutable, postcss,
  svgo, picomatch, brace-expansion, esbuild, flatted, rollup, minimatch and
  swiper. `npm audit` reports **0 vulnerabilities**.
- **Google Fonts is now self-hosted.** All 41 pages fetched Roboto from
  `fonts.googleapis.com`/`fonts.gstatic.com` on every load — a third-party
  request that leaks visitor IPs and has been ruled a GDPR violation in
  Germany. Roboto now ships from `@fontsource/roboto`. No page loads any
  third-party script, stylesheet or font.
- Source maps are no longer published to `dist/`.
- Reviewed every `innerHTML` sink: all three interpolate loop indices or
  internal constants, never user input. No XSS issues found.

### ⚡ Performance

Per-page JavaScript dropped from roughly **88 kB to 45 kB gzipped**.

- **Chart.js, Leaflet and AOS now load on demand** (`src/js/modules/lazy.js`).
  All three were imported eagerly by `main.js`, so every one of the 41 pages
  paid for them. In practice Chart.js is used on 7 pages, Leaflet on 3, and AOS
  on **none** — no page carries a `data-aos` attribute, so it was initialising
  and animating nothing.
- Verified in a real browser: `buttons.html` and `typography.html` now load
  **74 kB and 69 kB** of JavaScript with no chart, map or font requests at all.
- Removed the unused `swiper.min.css` import from the shared bundle.

### ♿ Accessibility

`npm run lint:html` went from **1601 errors to 0**.

- 261 icon-only buttons and links gained an `aria-label`, with their icons
  marked `aria-hidden="true"`.
- 232 buttons gained an explicit `type` (none were inside a `<form>`, so this
  is hygiene rather than a live bug).
- Both `<nav>` landmarks on every page gained distinct accessible names
  ("Main navigation" / "Sidebar navigation") — 78 duplicate-landmark errors.
- Fixed `<input>` nested inside `<a>` on the inbox (8 rows), a `<style>` block
  inside `<body>`, `<footer>` inside `<blockquote>` reading as a landmark, a
  redundant `for` attribute, and a `<form>` with no submit control.
- 7 password fields gained `autocomplete`; 22 boolean attributes normalised;
  17 duplicated class tokens removed; 12 raw ampersands encoded; 35
  self-closed void elements and 284 trailing-whitespace errors cleaned up.

### 🐛 Bug Fixes

- **`npm run lint` was completely broken.** ESLint 10 dropped `--ext` and
  requires flat config; there was no config file at all. Added
  `eslint.config.js` with separate browser and Node scopes, then fixed the 10
  real errors it surfaced.
- **`npm run type-check` was broken** and has been removed (see above).
- **`npm run build` broke under Vite 8** in two ways: Rolldown only accepts
  `manualChunks` as a function, and Vite 8 no longer bundles esbuild for
  minification.
- **`tabs.js` called `new bootstrap.Tooltip()` on an undeclared global** with no
  guard, so it threw if the global was not yet set. Both `tabs.js` and
  `color.js` now import Bootstrap properly.
- Fixed redundant regex escapes in `data-table.js` and `form-elements.js`, and
  dead assignments in `form-examples.js` and `tabs.js`.
- The 41 page entry points are now globbed rather than hand-maintained, so
  adding a page no longer means remembering to register it in `vite.config.js`.
- `vite.config.js` uses `import.meta.dirname` instead of `process.cwd()`, which
  depended on the directory npm happened to be invoked from.

### 📦 Dependencies

Major upgrades: **Vite 7 → 8**, cssnano 7 → 8.

| Package | Previous | Updated |
|---------|----------|---------|
| @fontsource/roboto | — | **5.2.8** (new — replaces the Google Fonts CDN) |
| @fortawesome/* | 7.2.0 | 7.3.1 |
| autoprefixer | 10.4.24 | 10.5.4 |
| cropperjs | 2.1.0 | 2.1.1 |
| cssnano | 7.1.2 | **8.0.4** |
| dayjs | 1.11.19 | 1.11.21 |
| eslint | 10.0.0 | 10.8.0 |
| prettier | 3.8.1 | 3.9.6 |
| sass | 1.97.3 | 1.102.0 |
| vite | 7.3.1 | **8.2.1** |
| vite-plugin-handlebars | 2.0.0 | 2.0.3 |

**Removed:** `swiper`, `typescript`, `@types/node`.
**Added:** `@fontsource/roboto`, `html-validate`, `@eslint/js`, `globals`, `glob`.

### 🔧 Added

- `eslint.config.js`, `.prettierrc` and `.htmlvalidate.json` — the project had
  none of these, so two of its three npm scripts could not run.
- `npm run lint:html` for HTML and accessibility validation.

---

## [2.0.0] - 2026-02-14

Complete modernization of the original Colorlib template. Every HTML page, stylesheet, and script has been rewritten or replaced. The project now uses a Vite build system with ES6 modules.

### Build System

- Added **Vite 7.3.1** as the build system with HMR dev server, code splitting, and optimized production builds
- Multi-page app configuration: all 41 pages registered as Rollup entry points
- Manual chunks for caching: `vendor` (Bootstrap), `charts` (Chart.js), `ui` (Swiper, AOS)
- **Handlebars partials** for shared layout (header, navbar, footer, breadcrumb) with dynamic page context
- SCSS compilation with `api: 'modern-compiler'`, PostCSS autoprefixer + cssnano
- Build target: ES2022 with esbuild minification and sourcemaps
- `npm run dev` (port 3100), `npm run build` (to `dist/`), `npm run preview` (port 4173)

### Framework Upgrade

- Upgraded Bootstrap 3.3.6 to **5.3.8** (CSS + JS bundle via Vite)
- Migrated all Bootstrap 3 markup to Bootstrap 5 equivalents:
  - Updated 655 `col-xs-*` grid classes to `col-*`
  - Converted all `data-toggle`/`data-target` to `data-bs-toggle`/`data-bs-target`
  - Replaced `data-dismiss` with `data-bs-dismiss` across all 41 pages
  - `btn-default` to `btn-secondary`, `btn-block` to `w-100`, `form-group` to `mb-3`
  - `ml-*/mr-*` to `ms-*/me-*`, `text-left/right` to `text-start/end`
  - `float-left/right` to `float-start/end`, panels to cards

### jQuery Removal

- Removed jQuery 1.12.4 entirely — all 41 pages are now **zero-jQuery**
- Rewrote all interactivity as ES6 module classes (~1,185 lines in `main.js` + 31 page modules)
- Eliminated SlickNav, WOW.js, Magnific Popup, and all jQuery-dependent plugins

### Plugin Replacements

| Removed | Replaced With | Notes |
| --------- | --------- | --------- |
| jQuery + jQuery UI | ES6 classes | `NotikaApp` base class with page-specific extensions |
| Bootstrap 3 JS | Bootstrap 5.3.8 bundle | Includes Popper.js, bundled via Vite |
| Font Awesome 4 (icon font) | Font Awesome 7.2.0 (SVG) | Tree-shaken via `library.add()` + `dom.watch()` |
| WOW.js + animate.css | AOS 2.3.4 | Scroll-triggered animations |
| Owl Carousel / Slick | Swiper 12.1.0 | Touch-enabled carousel slider |
| Morris.js + Flot + Sparkline | Chart.js 4.5.1 | `NotikaCharts` wrapper class with instance Map |
| Summernote | CodeMirror 6 | In-browser code editor with syntax highlighting |
| jQuery Cropper | Cropper.js 2.1.0 | Standalone image cropping |
| meanMenu | Custom vanilla JS | Offcanvas mobile menu (Bootstrap 5) |
| SlickNav | Custom vanilla JS | Responsive navigation |
| CounterUp (jQuery) | Vanilla + IntersectionObserver | Modern scroll detection for counters |
| normalize.css | Bootstrap 5 Reboot | Included in Bootstrap |
| jQuery DataTables | Vanilla JS data tables | Sortable, searchable, paginated |
| Bootstrap Datepicker | Native HTML5 inputs | `type="date"`, `type="time"`, etc. |

### JavaScript Architecture

- **Class-based modules**: `NotikaApp` base class with shared initialization; 31 page modules extend it
- **Dynamic page loading**: `<html data-page-module="pagename">` triggers page-specific module
- **Shared modules**: `NotikaCharts` (Chart.js wrapper with instance Map), `NotikaUI` (Bootstrap components, counter animations)
- **Font Awesome tree-shaking**: Only imported icons bundled (~80 icons from solid + brands sets)
- **Memory leak prevention**: `destroy()` methods with `beforeunload` listeners for `setInterval` cleanup
- **Inline script consolidation**: Search/navbar enhancement logic centralized in `setupModernFeatures()`

### Header and Navigation

- Redesigned header with modern Bootstrap 5 dropdowns (search, messages, notifications, tasks, chat)
- Replaced legacy tab-based navigation with stable horizontal dropdown navbar
- Created SVG logo system with 4 variants (horizontal, dark, mobile, simple)
- **Desktop** (>=992px): Horizontal dropdown navbar with Bootstrap 5 dropdowns
- **Mobile** (<992px): Bootstrap 5 offcanvas menu with hamburger toggle
- Offcanvas forcefully hidden on desktop via CSS and `show.bs.offcanvas` event prevention
- Handlebars navbar partial with dynamic active state based on page name

### Icon System

- Replaced Font Awesome 4 icon font (`fa fa-*`) with **Font Awesome 7.2.0** tree-shaken SVGs
- Icons explicitly imported in `main.js` and registered via `library.add()`
- Only used icons are bundled — no full icon font loaded
- Both `free-solid-svg-icons` and `free-brands-svg-icons` packages available
- `dom.watch()` handles SVG replacement at runtime

### Design System

- Green theme: primary `#00c292` with clean white card design
- Consistent card pattern with uniform 24px padding and light header backgrounds
- CSS custom properties spacing system (`--notika-spacing-xs` through `--notika-spacing-lg`)
- Card shadows: `0 2px 8px rgba(0,0,0,0.1)`, hover: `0 4px 16px rgba(0,0,0,0.15)`
- Smooth hover animations and micro-interactions on cards and navigation

### Pages Redesigned

- **Accordion** — 7 variations: basic, always-open, flush, icons, color schemes, bordered accent, nested
- **Tabs** — Standard, justified, vertical, icon, pill, color, custom-styled, and animated tab variations
- **Buttons** — Comprehensive button showcase with consistent card pattern
- **Dialog** — SweetAlert2 notification dialogs (replaced jQuery dialog patterns)
- **Popovers** — All 4 directions with proper Bootstrap 5 markup and consistent card layout
- **Data Table** — Custom sorting, filtering, pagination with Notika-themed styles
- **Widgets** — Chart.js mini-charts for server stats with IntersectionObserver counters
- All 41 pages aligned to consistent card pattern and standardized HTML head

### CSS Cleanup

- Removed ~882 lines of dead CSS from `style.css` (old header/nav, animated classes, meanmenu, sidebar, box layout, dark sidebar, fullscreen layout)
- Removed ~251 lines of dead rules from `responsive.css` (sidebar, old header, layout variant selectors)
- Deleted 5 dead CSS files: `owl.theme.css`, `owl.transitions.css`, `meanmenu.min.css`, `reset.css`, `main.css`
- Removed 35 duplicate inline `<script>` blocks across HTML files
- Uninstalled 7 unused npm packages (overlayscrollbars, tom-select, nouislider, flatpickr, sonner, rollup-plugin-copy, vite-plugin-eslint)

### Responsive Improvements

- Removed legacy fixed container widths (`300px`/`450px`) that broke Bootstrap 5 responsive behavior
- Fixed mobile hamburger menu consistency with `flex-shrink: 0` and `flex-wrap: nowrap`
- Added `d-lg-none`/`d-none d-lg-block` breakpoint system for mobile vs desktop navigation
- Responsive breakpoints at 768px, 992px, and 1169px

### Documentation

- Comprehensive `README.md` with screenshots, premium template showcase, tech stack, architecture docs
- `CHANGELOG.md` (this file) documenting all v1.0 to v2.0 changes
- `RELEASE.md` with concise "what's new" summary and metrics
- `CLAUDE.md` with project context for AI-assisted development

## [1.0.0] - 2017

### Initial Release

- Original Colorlib template
- Bootstrap 3.3.6 + jQuery 1.12.4
- 41 HTML pages (horizontal "green" layout)
- Font Awesome 4 icon font
- 15+ jQuery plugins
- No build system — direct file includes
