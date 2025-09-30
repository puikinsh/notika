# Handlebars Template System Guide for Notika

## Overview

The Notika template now supports **Handlebars templating** with Vite, allowing you to use reusable partials for common components like headers, footers, and navigation. This makes maintaining the template much easier by avoiding code duplication.

## Features

- **Reusable partials** for header, footer, navbar, and breadcrumbs
- **Automatic context generation** based on page names
- **Dynamic navigation highlighting**
- **Clean, maintainable HTML structure**
- **Hot reload support** in development

## Setup

The Handlebars plugin is already configured in `vite.config.js` with:

```javascript
import handlebars from 'vite-plugin-handlebars'

// In plugins array:
handlebars({
  partialDirectory: resolve(process.cwd(), 'notika/green-horizotal/src/partials'),
  context: (pagePath) => {
    // Dynamic context generation based on page
  }
})
```

## Available Partials

Located in `/notika/green-horizotal/src/partials/`:

### 1. **header.hbs**
The main header with logo and top navigation (search, messages, notifications, tasks, chat).

Usage:
```handlebars
{{> header}}
```

### 2. **navbar.hbs**
The main navigation menu with dropdowns for all sections.

Usage:
```handlebars
{{> navbar}}
```

### 3. **footer.hbs**
The footer with copyright information.

Usage:
```handlebars
{{> footer}}
```

### 4. **breadcrumb.hbs**
The breadcrumb section with page title and icon.

Usage:
```handlebars
{{> breadcrumb pageTitle="Your Page" breadcrumbIcon="notika-app"}}
```

## Creating a New Page with Handlebars

### Step 1: Create the HTML File

Create a new `.html` file (e.g., `accordion-hbs.html`) with this structure:

```html
<!doctype html>
<html lang="en" data-page-module="accordion">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{pageTitle}} | Notika - Modern Vite Template</title>
    <meta name="description" content="Modern Notika Admin Template powered by Vite 7.1.5">

    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,700,900" rel="stylesheet">

    <!-- Essential CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/notika-custom-icon.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>

<body>
    {{> header}}
    {{> navbar}}
    {{> breadcrumb pageTitle="Accordion" breadcrumbIcon="notika-app"}}

    <!-- Your Content Here -->
    <div class="your-content-area">
        <div class="container">
            <!-- Page specific content -->
        </div>
    </div>

    {{> footer}}

    <!-- Page-specific JavaScript -->
    <script type="module" src="/src/js/pages/accordion.js"></script>
</body>
</html>
```

### Step 2: Add to Vite Config

Add your new page to the `vite.config.js` input configuration:

```javascript
rollupOptions: {
  input: {
    // ... existing entries
    'accordion-hbs': resolve(process.cwd(), 'notika/green-horizotal/accordion-hbs.html')
  }
}
```

### Step 3: Create JavaScript Module (if needed)

Create the corresponding JavaScript file in `src/js/pages/`:

```javascript
import { NotikaApp } from '../main.js'

class NotikaAccordion extends NotikaApp {
    constructor() {
        super()
    }

    init() {
        super.init()
        this.removeAllScrollbarRules()
        // Your page-specific initialization
    }
}

const notikaAccordion = new NotikaAccordion()
notikaAccordion.init()

export { NotikaAccordion }
```

## Available Handlebars Variables

The following variables are automatically available in your templates:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{title}}` | Page title | "Notika Admin Template" |
| `{{pageTitle}}` | Current page name | "Tabs", "Accordion", etc. |
| `{{searchPlaceholder}}` | Search input placeholder | Based on page name |
| `{{year}}` | Current year | 2025 |
| `{{isAppViews}}` | True if in App Views section | Boolean |
| `{{isHome}}` | True if in Home section | Boolean |
| `{{isCharts}}` | True if in Charts section | Boolean |
| `{{isForms}}` | True if in Forms section | Boolean |
| `{{isTables}}` | True if in Tables section | Boolean |
| `{{isPages}}` | True if in Pages section | Boolean |
| `{{activePage.[name]}}` | Specific page active state | `{{activePage.tabs}}` |
| `{{breadcrumbIcon}}` | Icon for breadcrumb | "notika-app", "notika-form", etc. |

## Customizing Partials

### Adding Custom Variables

You can pass custom variables when including partials:

```handlebars
{{> header customMessage="Welcome to Custom Page"}}
```

### Creating New Partials

1. Create a new `.hbs` file in `src/partials/`
2. Use it in your templates with `{{> partialName}}`

Example custom partial (`src/partials/card.hbs`):

```handlebars
<div class="recent-post-wrapper notika-shadow mg-t-30">
    <div class="recent-post-ctn">
        <div class="recent-post-title">
            <h2>{{cardTitle}}</h2>
            <p>{{cardDescription}}</p>
        </div>
    </div>
    <div class="recent-post-items">
        {{cardContent}}
    </div>
</div>
```

Usage:
```handlebars
{{> card cardTitle="My Card" cardDescription="Description here" cardContent="<p>Content</p>"}}
```

## Migration Strategy

### For New Pages
Always use Handlebars templates for new pages to maintain consistency.

### For Existing Pages
Gradually migrate existing `-vite.html` pages to use Handlebars:

1. Create a new `-hbs.html` version
2. Replace hardcoded header/footer/navbar with partials
3. Test thoroughly
4. Eventually replace the original file

## Benefits

1. **Maintainability**: Change header/footer in one place, updates everywhere
2. **Consistency**: Ensures all pages have the same structure
3. **Faster Development**: Copy-paste a template, change content only
4. **Cleaner Code**: HTML files focus on content, not boilerplate
5. **Version Control**: Fewer conflicts when updating common components

## Troubleshooting

### Partial Not Found
- Check the partial exists in `src/partials/`
- Verify the partial name matches exactly (case-sensitive)

### Variables Not Rendering
- Check the context function in `vite.config.js`
- Ensure you're passing the variable when including the partial

### Hot Reload Not Working
- Restart the dev server after adding new partials
- Check for syntax errors in your Handlebars templates

## Best Practices

1. **Keep partials focused**: One component per partial
2. **Use meaningful names**: `header.hbs` not `hdr.hbs`
3. **Document custom variables**: Comment what variables a partial expects
4. **Test responsiveness**: Ensure partials work on all screen sizes
5. **Maintain backwards compatibility**: Keep non-Handlebars pages working during migration

## Commands

```bash
# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Example Pages

- `tabs-hbs.html` - Full example using all partials
- More examples coming as pages are migrated

## Next Steps

1. Migrate high-traffic pages first
2. Create additional partials for common components (modals, cards, etc.)
3. Consider creating layout templates for different page types
4. Add more dynamic context based on user preferences/settings