# Changelog

All notable changes to the Notika admin dashboard template.

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
