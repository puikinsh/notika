# Notika Admin Dashboard

A modernized admin dashboard template built with **Vite 7.3 + Bootstrap 5.3.8 + ES6 modules**. Originally a Bootstrap 3 template by [Colorlib](https://colorlib.com), fully rewritten for modern web standards.

![Notika admin dashboard template preview](https://colorlib.com/wp/wp-content/uploads/sites/2/notika-free-creative-admin-dashboard.jpg)

## Quick Start

```bash
npm install
npm run dev        # Dev server with HMR (port 3100)
npm run build      # Production build to dist/
npm run preview    # Preview production build
```

## Tech Stack

| Category      | Technology                 | Version |
| ------------- | -------------------------- | ------- |
| Build         | Vite                       | 7.3.1   |
| CSS Framework | Bootstrap                  | 5.3.8   |
| Charts        | Chart.js                   | 4.5.1   |
| Icons         | Font Awesome (tree-shaken) | 7.2.0   |
| Carousels     | Swiper                     | 12.1.0  |
| Maps          | Leaflet                    | 1.9.4   |
| Animations    | AOS                        | 2.3.4   |
| Date/Time     | Day.js                     | 1.11.19 |
| Toasts        | Sonner                     | 2.0.7   |
| Selects       | Tom Select                 | 2.5.1   |
| Sliders       | noUiSlider                 | 15.8.1  |
| Date Picker   | Flatpickr                  | 4.6.13  |
| Code Editor   | CodeMirror                 | 6.x     |
| Image Cropper | Cropper.js                 | 1.6.2   |

## Architecture

**Vite root**: `./notika/green-horizotal/`

```text
notika/green-horizotal/
├── src/
│   ├── js/
│   │   ├── main.js              # NotikaApp class - main entry point
│   │   ├── modules/
│   │   │   ├── charts.js        # NotikaCharts (Chart.js wrapper)
│   │   │   └── ui.js            # NotikaUI (Bootstrap components, counters)
│   │   └── pages/               # 31 page-specific ES6 modules
│   ├── css/modern.scss          # Modern SCSS styles
│   └── partials/                # Handlebars partials (header, navbar, footer, breadcrumb)
├── css/                         # Template CSS (navbar, mobile menu, responsive, widgets)
├── *.html                       # 41 template pages
└── img/                         # Images (Vite publicDir)
```

### Page Types

1. **Standalone pages** load `main.js` directly. `NotikaApp` auto-initializes on DOMContentLoaded.
2. **Page-module pages** set `data-page-module` on `<html>` and load a dedicated module from `src/js/pages/` that extends `NotikaApp`.

### Adding New Pages

1. Create `newpage.html` in the template root
2. Add entry to `vite.config.js` > `rollupOptions.input`
3. For custom logic: set `<html data-page-module="newpage">`, create `src/js/pages/newpage.js` extending `NotikaApp`

### Adding Font Awesome Icons

Icons are tree-shaken. Import and register in `main.js`:

```javascript
import { faNewIcon } from '@fortawesome/free-solid-svg-icons'
library.add(faNewIcon)
```

## Template Pages

**Dashboards** &mdash; index, index-2, index-3, index-4, analytics

**Email** &mdash; inbox, compose-email, view-email

**Interface** &mdash; animations, google-map, data-map, code-editor, image-cropper, wizard

**Components** &mdash; tabs, accordion, alert, buttons, modals, notification, dialog, dropdown, popovers, tooltips

**Charts** &mdash; bar-charts, line-charts, area-charts, flot-charts

**Forms** &mdash; form-elements, form-components, form-examples

**Tables** &mdash; data-table, normal-table

**Utility** &mdash; contact, invoice, typography, color, login-register, 404, widgets

## Commands

```bash
npm run dev        # Dev server with HMR
npm run build      # Production build to dist/
npm run preview    # Preview production build (port 4173)
npm run lint       # ESLint
npm run type-check # TypeScript checking
```

## Browser Support

- Last 2 versions of Chrome, Firefox, Safari, Edge
- No IE 11

## License

MIT License. Original template by [Colorlib](https://colorlib.com).
