# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Notika** admin dashboard template - originally a Bootstrap-based template from Colorlib, now fully modernized with Vite 7.x build system, Bootstrap 5.3.8, and ES6 modules.

## Common Development Commands

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build
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
- Handles initialization, chart setup, UI components, and modern interactions

### Module System
- `src/js/modules/charts.js` - Chart.js wrapper (`NotikaCharts` class)
- `src/js/modules/ui.js` - UI components and Bootstrap integration (`NotikaUI` class)
- Page-specific modules in `src/js/pages/` for individual template pages

### Build Configuration
- `vite.config.js` - Complete Vite setup with multi-page configuration
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

### Adding New Features
1. Create ES6 modules in `src/js/modules/`
2. Import and use in `main.js` or page-specific files
3. Update Vite configuration if needed for new entry points

### Customizing Styles
- Edit `src/css/modern.scss` for new styles
- Original CSS files in `css/` are still included for compatibility

### Chart Integration
- Use the `NotikaCharts` class from `src/js/modules/charts.js`
- Chart.js 4.5.0 with modern configuration options

### UI Components
- Bootstrap 5.3.8 components via the `NotikaUI` class
- Modern JavaScript replacing jQuery dependencies

## Migration Status

The project exists in a **hybrid state**:
- **Legacy files**: Original template files maintained for reference
- **Modern implementation**: Vite-based architecture with ES6 modules
- **Dual compatibility**: Both old and new approaches work side-by-side

## License

MIT License - Original template by Colorlib, modernization work maintains same license.