# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Notika** is a modernized admin dashboard template. Originally a Bootstrap 3 template from Colorlib, now running Vite 7.2.4 + Bootstrap 5.3.8 + ES6 modules.

## Commands

```bash
npm run dev        # Dev server with HMR (port 3100)
npm run build      # Production build to dist/
npm run preview    # Preview production build (port 4173)
npm run lint       # ESLint
npm run type-check # TypeScript checking
```

## Architecture

**Vite root**: `./notika/green-horizotal` (not project root). The `vite.config.js` lives at the project root but sets `root: './notika/green-horizotal'`.

```
notika/green-horizotal/
├── src/js/
│   ├── main.js           # NotikaApp class - main entry point
│   ├── modules/          # Reusable ES6 modules (charts.js, ui.js)
│   └── pages/            # Page-specific JS (analytics.js, tabs.js, etc.)
├── src/css/modern.scss   # Modern SCSS styles
├── src/partials/         # Handlebars partials (header.hbs, navbar.hbs, footer.hbs, breadcrumb.hbs)
├── css/                  # Original Notika CSS (kept for compatibility, imported by main.js)
├── *.html                # Template pages
└── img/                  # Images (serves as Vite publicDir)
```

### Two types of HTML pages

1. **Standalone pages** (e.g., `index.html`) — contain inline HTML, load `main.js` directly via `<script type="module">`. `NotikaApp` auto-initializes on DOMContentLoaded.
2. **Handlebars pages** (e.g., `tabs-hbs.html`) — use `{{> header}}`, `{{> navbar}}`, `{{> breadcrumb}}` partials. Set `data-page-module` on `<html>` to suppress `NotikaApp` auto-init and load a page-specific module instead.

### Page-specific modules pattern

Pages with custom logic extend `NotikaApp`:

```javascript
import { NotikaApp } from '../main.js'
class MyPage extends NotikaApp {
  async init() {
    await super.init()
    // page-specific setup
  }
}
```

The page HTML sets `<html data-page-module="pagename">` to prevent double initialization, and uses `<script type="module" src="/src/js/pages/pagename.js">` as its entry point.

### Shared modules

- `modules/charts.js` — `NotikaCharts` class wrapping Chart.js. Stores instances in a `Map` for later access/refresh/destroy.
- `modules/ui.js` — `NotikaUI` class for Bootstrap component init, counter animations (IntersectionObserver), toast notifications, hover/ripple effects.

## Key Entry Points

**Main application**: `src/js/main.js`
- Imports all CSS (Bootstrap, AOS, Leaflet, original Notika CSS files, modern SCSS) through Vite
- Registers Chart.js components globally, sets `window.bootstrap` and `window.Notika`
- Font Awesome: tree-shaken via `@fortawesome/fontawesome-svg-core` + `dom.watch()`
- Notika custom icon font (`notika-custom-icon.css`) coexists with Font Awesome; FA provides fallbacks

**Build config**: `vite.config.js`
- Multi-page app: each page registered in `rollupOptions.input`
- Manual chunks: `vendor` (Bootstrap), `charts` (Chart.js), `ui` (Swiper, AOS)
- Handlebars plugin provides page context (title, active nav flags, breadcrumb icons) computed from the page filename
- SCSS uses `api: 'modern-compiler'`; PostCSS runs autoprefixer + cssnano
- Build target: `es2022`, output to `../../dist` (project root `dist/`)

## Stack

- **Vite** 7.3.1 with ES6 modules
- **Bootstrap** 5.3.8 (CSS framework)
- **Chart.js** 4.5.1 (data visualization)
- **Font Awesome** 7.2.0 (tree-shaken icons - only import used icons to `library`)
- **Swiper** 12.1.0 (carousels), **Leaflet** 1.9.4 (maps), **AOS** 2.3.4 (animations), **Dayjs** 1.11.19
- **Sonner** 2.0.7 (toast notifications), **Tom Select** 2.5.1 (enhanced selects), **noUiSlider** 15.8.1, **Flatpickr** 4.6.13

## Adding New Pages

1. Create `notika/green-horizotal/newpage.html`
2. Add entry to `vite.config.js` → `rollupOptions.input`
3. For standalone: add `<script type="module" src="/src/js/main.js"></script>`
4. For pages with custom logic: set `<html data-page-module="newpage">`, create `src/js/pages/newpage.js` extending `NotikaApp`, and use that as the script entry

## Adding Font Awesome Icons

Icons are tree-shaken. To add new icons, import and add them to the library in `main.js`:

```javascript
import { faNewIcon } from '@fortawesome/free-solid-svg-icons'
library.add(faNewIcon)
```

Both `free-solid-svg-icons` and `free-brands-svg-icons` packages are available.

## Known Quirks

- Mobile offcanvas menu (`#mobileNavOffcanvas`) disabled programmatically on desktop (≥992px) via `show.bs.offcanvas` event prevention
- Webkit scrollbar CSS rules removed at runtime (`removeAllScrollbarRules()`) to restore native scrollbars
- Date picker inputs use `contain: layout style paint` and `clip-path` CSS to prevent calendar popup overflow
- Bootstrap dropdowns need specific positioning context in header area (see `.notika-nav .dropdown` styles injected by `main.js`)
- Collapse animation in mobile menu uses `transition: none` to prevent flash, replaced with simple show/hide

## File Organization

- **Active source**: `notika/green-horizotal/` (Vite root)
- **Original CSS/JS**: `css/` and `js/` directories inside the template root (imported by `main.js` via relative paths like `../../css/main.css`)

## License

MIT License - Original template by Colorlib.
