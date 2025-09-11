# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Notika** admin dashboard template - a free Bootstrap-based admin template created by Colorlib. It's a static HTML/CSS/JS project designed for web admin interfaces.

## Project Structure

```
notika/
├── documentation/          # Complete documentation with file structure
├── notika/green-horizotal/ # Main template files
│   ├── css/               # All stylesheets organized by feature
│   ├── js/                # JavaScript files organized by plugin/feature
│   ├── img/               # Images and assets
│   ├── fonts/             # Font files (FontAwesome, custom icons)
│   └── *.html             # 40+ HTML template pages
└── README.md              # Basic project info
```

## Architecture

This is a **static frontend template** with no build system or package management:

- **Frontend Framework**: Bootstrap 3.x with custom styling
- **JavaScript**: jQuery-based with multiple specialized plugins
- **No build tools**: Direct HTML/CSS/JS files, no compilation needed
- **No dependencies management**: All libraries included directly

## Key Template Pages

The main template directory (`notika/green-horizotal/`) contains 40+ HTML pages including:

- `index.html` - Main dashboard (4 variants: index.html through index-4.html)
- `analytics.html` - Analytics dashboard
- `data-table.html` - Data tables with sorting/filtering
- `form-*.html` - Various form components and examples
- `charts/` - Multiple chart implementations (Chart.js, Flot, etc.)
- `login-register.html` - Authentication pages

## Included Libraries & Plugins

Key JavaScript libraries (all in `js/` subdirectories):
- **Charts**: Chart.js, Flot Charts, Sparklines
- **Maps**: Google Maps, jVectorMap, DataMaps
- **Forms**: Chosen, iCheck, TouchSpin, Summernote editor
- **UI**: Bootstrap components, MetisMenu, custom scrollbar
- **Other**: Cropper.js, DataTables, notification systems

## Working with this Template

### Viewing the Template
- Open any `.html` file directly in browser (no server required)
- Start with `notika/green-horizotal/index.html` for main dashboard

### Customization
- **Styling**: Edit `css/main.css` for custom styles
- **Assets**: Replace images in `img/` directory
- **Content**: Modify HTML files directly
- **Features**: Enable/disable plugins by including/excluding their JS/CSS files

### File Organization
- CSS files are organized by feature in subdirectories
- JavaScript follows the same organizational pattern
- Each plugin has its corresponding activation file (e.g., `chart-active.js`)

## License

MIT License - Template by Colorlib, free for commercial and personal use.