# Changelog

All notable changes to the Notika Admin Template are documented in this file.

## [2.0.0] - 2026

Complete rewrite from Bootstrap 3 to a modern Vite-powered template.

### Bootstrap 5 Migration

- Migrated from Bootstrap 3.3.6 to Bootstrap 5.3.8
- Updated 655 `col-xs-*` grid classes to `col-*`
- Converted all `data-toggle`/`data-target` attributes to `data-bs-toggle`/`data-bs-target`
- Replaced `data-dismiss` with `data-bs-dismiss` across all 41 pages
- Updated utility classes (`ml-*`/`mr-*` to `ms-*`/`me-*`, `float-left`/`float-right` to `float-start`/`float-end`)

### jQuery Removal

- Removed jQuery 1.12.4 and all jQuery plugins
- Replaced all jQuery code with vanilla JavaScript and ES6 modules
- Eliminated SlickNav, WOW.js, Magnific Popup, and other jQuery-dependent plugins

### Vite Build System

- Added Vite 7.3.1 as the build tool with HMR dev server on port 3100
- Configured multi-page app with 41 HTML entry points in `rollupOptions.input`
- Set up manual chunks for vendor (Bootstrap), charts (Chart.js), and UI (Swiper, AOS)
- Added Handlebars plugin for reusable partials (header, navbar, footer, breadcrumb)
- Configured SCSS compilation with `modern-compiler` API, PostCSS with autoprefixer and cssnano
- Build target: ES2022, output to `dist/`

### Modular JavaScript Architecture

- Created `NotikaApp` class as the main entry point (`src/js/main.js`)
- Built `NotikaCharts` module wrapping Chart.js with instance management via Map
- Built `NotikaUI` module for Bootstrap component init, counter animations (IntersectionObserver), and toast notifications
- Created 31 page-specific ES6 modules in `src/js/pages/`, each extending `NotikaApp`
- Implemented `data-page-module` attribute system to prevent double initialization

### Header and Navigation

- Redesigned header with modern Bootstrap 5 dropdowns (search, messages, notifications, tasks, chat)
- Replaced legacy tab-based navigation with stable horizontal dropdown navbar
- Created SVG logo system with 4 variants (horizontal, dark, mobile, simple)
- Added mobile offcanvas navigation with slide-in menu and submenu support
- Implemented responsive breakpoint at 992px with consistent hamburger menu behavior
- Added `preventMobileMenuOnDesktop()` to block offcanvas on desktop resize

### Icon System

- Replaced icon font includes with tree-shaken Font Awesome 7.2.0
- Icons imported individually and registered via `library.add()` in `main.js`
- Font Awesome `dom.watch()` handles SVG replacement at runtime
- Original Notika custom icon font retained alongside Font Awesome for fallback

### Modern Library Replacements

- Swiper 12.1.0 replaces Slick/Owl Carousel
- AOS 2.3.4 replaces WOW.js for scroll animations
- Sonner 2.0.7 replaces custom notification system
- Leaflet 1.9.4 for interactive maps
- Chart.js 4.5.1 replaces legacy chart libraries
- Day.js 1.11.19 for date formatting
- Tom Select 2.5.1 for enhanced select inputs
- noUiSlider 15.8.1 for range sliders
- Flatpickr 4.6.13 for date pickers
- CodeMirror 6.x for the code editor page
- Cropper.js 1.6.2 for the image cropper page

### Design System

- Implemented consistent card design with uniform 24px padding and light header backgrounds
- Created CSS custom properties spacing system (`--notika-spacing-xs` through `--notika-spacing-lg`)
- Unified shadow system matching header navigation depth
- Replaced purple gradients with Notika brand green palette (`#00c292`)
- Added smooth hover animations and micro-interactions on cards and navigation
- Responsive spacing that scales down for tablet and mobile

### Pages Modernized

- All 41 pages migrated to the new Vite structure with ES6 module entry points
- Data table page with custom sorting, filtering, pagination, and Notika-themed pagination styles
- Tabs page with animated transitions and keyboard accessibility
- Widgets page with Chart.js mini-charts for server stats
- Analytics page with dashboard charts
- Contact, invoice, typography, color, login-register, and 404 pages aligned to consistent structure
- Added missing footer to form-elements page
- Replaced emoji icons with Font Awesome in form-components

### Responsive Improvements

- Removed legacy fixed container widths (`300px`/`450px`) that broke Bootstrap 5 responsive behavior
- Fixed mobile hamburger menu consistency with `flex-shrink: 0` and `flex-wrap: nowrap`
- Added `d-lg-none`/`d-none d-lg-block` breakpoint system for mobile vs desktop navigation
- Data table controls vertically centered with `align-items: center`

### Cleanup

- Removed legacy Bootstrap 3 CSS and JS files
- Removed jQuery, SlickNav, WOW.js, Magnific Popup, and other obsolete dependencies
- Removed duplicate and unused template variations
- Cleaned up vintage files and legacy markup
- Removed external `mobile-menu.css` link from pages where Vite bundles it

## [1.0.0] - Initial Release

- Original Notika admin dashboard template by Colorlib
- Bootstrap 3.3.6 with jQuery 1.12.4
