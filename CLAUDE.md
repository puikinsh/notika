# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Notika** admin dashboard template - originally a Bootstrap-based template from Colorlib, now fully modernized with Vite 7.x build system, Bootstrap 5.3.8, and ES6 modules.

## Common Development Commands

```bash
# Development server (with hot reload on port 3000)
npm run dev

# Production build
npm run build

# Preview production build (port 4173)
npm run preview

# Lint JavaScript/TypeScript files
npm run lint

# Type checking
npm run type-check
```

## Project Architecture

The project has been **modernized from a static template** to a **full Vite-based application**:

- **Build System**: Vite 7.1.5 with ES6 modules and bundling
- **Frontend Framework**: Bootstrap 5.3.8 with modern CSS/SCSS
- **JavaScript**: ES6 modules replacing jQuery dependencies
- **Charts**: Chart.js 4.5.0 with modern API
- **Icons**: Font Awesome 7.0.1 (tree-shaken, only used icons)
- **CSS Processing**: SCSS, PostCSS with autoprefixer and cssnano
- **Development**: Hot module replacement, TypeScript support

## Project Structure

```
notika/
├── notika/green-horizotal/        # Main template source
│   ├── src/                       # Modern ES6 source files
│   │   ├── js/
│   │   │   ├── main.js           # Main application entry point
│   │   │   ├── modules/          # Reusable ES6 modules
│   │   │   │   ├── charts.js     # Chart.js wrapper classes
│   │   │   │   └── ui.js         # UI components and interactions
│   │   │   └── pages/            # Page-specific JavaScript
│   │   └── css/
│   │       └── modern.scss       # Modern SCSS styles
│   ├── *-vite.html               # Vite-enabled HTML pages
│   ├── *.html                    # Original template pages
│   ├── css/                      # Original CSS files (legacy)
│   └── js/                       # Original JS files (legacy)
├── package.json                  # NPM dependencies and scripts
├── vite.config.js               # Vite configuration
└── dist/                        # Built files (created after build)
```

## Key Files and Entry Points

### Main Application Entry
- `notika/green-horizotal/src/js/main.js` - Main application class (`NotikaApp`)
  - Automatically initializes on DOMContentLoaded unless `data-page-module` attribute is set
  - Handles Font Awesome 7.x icon loading (tree-shaken imports)
  - Initializes charts, UI components, animations, and widgets
  - Exports `NotikaApp` class for page-specific modules

### Module System
- `src/js/modules/charts.js` - Chart.js 4.5.0 wrapper (`NotikaCharts` class)
  - Manages all Chart.js instances via a Map
  - Provides methods: `createGradient()`, `refreshAll()`, `getChart(id)`, `destroyAll()`
- `src/js/modules/ui.js` - Bootstrap 5.3.8 UI components (`NotikaUI` class)
  - Handles tooltips, popovers, modals, counters
  - Provides notification API: `showSuccess()`, `showError()`, `showWarning()`, `showInfo()`
- `src/js/pages/` - Page-specific initialization modules
  - Each page can have its own module that imports and extends main.js functionality

### Build Configuration
- `vite.config.js` - Multi-page Vite 7.x configuration
  - Root: `./notika/green-horizotal`
  - All HTML entry points defined in `rollupOptions.input`
  - Manual chunks: vendor (Bootstrap), charts (Chart.js), ui (Swiper, AOS)
  - Handlebars plugin for template partials
- `package.json` - Modern dependencies and npm scripts

## Template Pages

The template includes both **legacy** and **modernized** versions:

### Vite-Enabled Pages (Modern)
- `index-vite.html` - Main dashboard with Vite bundling
- `analytics-vite.html` - Analytics with Chart.js 4.5.0
- `*-vite.html` - Various modernized pages

### Legacy Pages (Original)
- `index.html` through `index-4.html` - Original dashboard variants
- Various form, chart, and component pages (40+ pages total)

## Development Workflow

### Starting Development
```bash
npm run dev  # Starts Vite dev server on port 3000
```

### Building for Production
```bash
npm run build  # Creates optimized build in dist/
```

### Code Quality
```bash
npm run lint      # ESLint checking
npm run type-check # TypeScript checking
```

## Key Dependencies

### Core Framework
- **Bootstrap**: 5.3.8 (modern CSS framework)
- **Chart.js**: 4.5.0 (charts and data visualization)
- **Vite**: 7.1.5 (build tool and dev server)

### Modern Replacements
- **Font Awesome**: 7.0.1 (replacing old icon fonts)
- **Leaflet**: 1.9.4 (replacing old map libraries)
- **AOS**: 2.3.4 (animation library)
- **Dayjs**: 1.11.18 (date manipulation)

## Working with the Modernized Template

### Adding New Pages
1. Create HTML file with `-vite.html` suffix (e.g., `newpage-vite.html`)
2. Add entry point to `vite.config.js` in `rollupOptions.input`
3. Import main.js: `<script type="module" src="/src/js/main.js"></script>`
4. Optionally create page-specific module in `src/js/pages/newpage.js`

### Adding New Features
1. Create ES6 modules in `src/js/modules/` for reusable functionality
2. Import and use in `main.js` or page-specific files
3. Page modules should set `data-page-module` attribute to prevent double initialization

### Customizing Styles
- Edit `src/css/modern.scss` for new styles
- Original CSS files in `css/` are still included for compatibility
- Avoid overriding Notika's original widget styles (defined in `css/main.css`, `style.css`)

### Chart Integration
- Use the `NotikaCharts` class from `src/js/modules/charts.js`
- Access specific chart: `window.Notika.charts.get('chart-id')`
- Chart.js 4.5.0 with modern configuration options
- All Chart.js components registered globally

### UI Components
- Bootstrap 5.3.8 components via the `NotikaUI` class
- Modern JavaScript replacing jQuery dependencies
- Bootstrap is globally available via `window.bootstrap`

## Migration Status

The project uses a **clean, production-ready structure**:
- **Modern files**: Clean filenames (e.g., `index.html`, `buttons.html`) using Bootstrap 5.3.8 + Vite
- **Legacy archive**: Original Bootstrap 3 files preserved in `_legacy/` folder for reference
- **Temporary files**: Work-in-progress files archived in `_archive/` folder
- **Progress**: 18 pages modernized (30.5%), 23 pages remaining

## Important Conventions

### File Structure
- **Modern pages**: Root of `notika/green-horizotal/` (clean names like `analytics.html`)
- **Modern source**: `src/` directory contains ES6 modules
- **Legacy archive**: `_legacy/` folder contains original Bootstrap 3 files (for reference only)
- **Temporary archive**: `_archive/` folder contains backup files (can be deleted after testing)
- **Legacy CSS/JS**: Root-level `js/` and `css/` directories (kept for compatibility)
- **Vite root**: `./notika/green-horizotal`, not project root

### Module Initialization
- `main.js` exports `NotikaApp` class and auto-initializes
- Page-specific modules prevent auto-init by setting `data-page-module` attribute
- Font Awesome 7.x uses tree-shaking - only add icons to library that are actually used

### Widget Architecture
- Todo widget: Self-contained initialization in `main.js` (`initializeTodo()`)
- Chat widget: Self-contained initialization in `main.js` (`initializeChat()`)
- World map: Uses Leaflet 1.9.4, initialized in `initializeWorldMap()`
- Charts: Managed through `NotikaCharts` class, stored in Map for easy access

### Known Quirks
- Mobile menu offcanvas is programmatically disabled on desktop (≥992px width)
- Webkit scrollbar CSS rules are removed to restore native scrollbars
- Date picker inputs need containment CSS to prevent calendar overflow
- Bootstrap dropdowns require specific positioning context in header

## License

MIT License - Original template by Colorlib, modernization work maintains same license.