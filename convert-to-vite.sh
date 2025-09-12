#!/bin/bash

# HTML to Vite Conversion Script
# Converts original template HTML files to Vite build system

set -e

TEMPLATE_DIR="/Users/silkalns/Projects/notika/templates"
SRC_DIR="/Users/silkalns/Projects/notika/notika/green-horizotal"
DEST_DIR="/Users/silkalns/Projects/notika/notika/green-horizotal"

# Function to extract main content from HTML file
extract_main_content() {
    local file="$1"
    # Extract content after navigation and before footer
    sed -n '/<\/nav>/,/<div class="footer-copyright-area">/p' "$file" | \
    head -n -1 | tail -n +2
}

# Function to determine page category for active nav state
get_page_category() {
    local filename="$1"
    case "$filename" in
        index*|analytics|widgets) echo "HOME" ;;
        inbox|view-email|compose-email) echo "EMAIL" ;;
        animations|google-map|data-map|code-editor|image-cropper|wizard) echo "INTERFACE" ;;
        *charts|flot-charts) echo "CHARTS" ;;
        normal-table|data-table) echo "TABLES" ;;
        form-*) echo "FORMS" ;;
        notification|alert|modals|buttons|tabs|accordion|dialog|popovers|tooltips|dropdown) echo "COMPONENTS" ;;
        contact|invoice|typography|color|login-register|404) echo "PAGES" ;;
        *) echo "HOME" ;;
    esac
}

# Function to extract page title
get_page_title() {
    local file="$1"
    grep -o '<title>[^<]*' "$file" | sed 's/<title>//' | sed 's/ | Notika.*//'
}

# Function to create page-specific JS module
create_js_module() {
    local basename="$1"
    local category="$2"
    local classname=$(echo "${basename}" | sed 's/^./\U&/' | sed 's/-./\U&/g' | sed 's/-//g')
    
    cat > "$SRC_DIR/src/js/pages/${basename}.js" << EOF
/**
 * ${classname} Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaCharts } from '../modules/charts.js' 
import { NotikaUI } from '../modules/ui.js'

class ${classname}Page extends NotikaApp {
  constructor() {
    super()
    this.pageType = '${category}'
    this.charts = new NotikaCharts()
    this.ui = new NotikaUI()
  }
  
  async init() {
    // Initialize base app
    await super.init()
    
    // Initialize page-specific features
    await this.initializePageFeatures()
    
    console.log('✅ ${classname} page initialized with Vite 7.1.5')
  }
  
  async initializePageFeatures() {
    // Page-specific initialization
    switch (this.pageType) {
      case 'CHARTS':
        await this.initializeChartsPage()
        break
      case 'FORMS':
        await this.initializeFormsPage()
        break
      case 'TABLES':
        await this.initializeTablesPage()
        break
      default:
        // Standard page initialization
        break
    }
  }
  
  async initializeChartsPage() {
    // Initialize chart-specific functionality
    await this.charts.init()
    console.log('✅ Charts functionality initialized')
  }
  
  async initializeFormsPage() {
    // Initialize form-specific functionality
    await this.ui.init()
    console.log('✅ Forms functionality initialized')
  }
  
  async initializeTablesPage() {
    // Initialize table-specific functionality
    console.log('✅ Tables functionality initialized')
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.Notika${classname} = new ${classname}Page()
  })
} else {
  window.Notika${classname} = new ${classname}Page()
}

export { ${classname}Page }
EOF

    echo "✅ Created JS module: ${basename}.js"
}

# Main conversion function
convert_html_file() {
    local file="$1"
    local basename=$(basename "$file" .html)
    local title=$(get_page_title "$file")
    local category=$(get_page_category "$basename")
    
    echo "🔄 Converting: $basename.html"
    
    # 1. Create JS module directory if it doesn't exist
    mkdir -p "$SRC_DIR/src/js/pages"
    
    # 2. Create page-specific JS module
    create_js_module "$basename" "$category"
    
    # 3. Extract main content (everything between nav and footer)
    local content=$(extract_main_content "$file")
    
    # 4. Create new Vite HTML file
    local vite_file="${file%.html}-vite.html"
    
    # Start with header template
    cp "$TEMPLATE_DIR/vite-header.html" "$vite_file"
    
    # Replace header placeholders
    sed -i "s/{{PAGE_TITLE}}/$title/g" "$vite_file"
    sed -i "s/{{${category}_ACTIVE}}/active/g" "$vite_file"
    
    # Clear other active states
    for nav in HOME EMAIL INTERFACE CHARTS TABLES FORMS COMPONENTS PAGES; do
        if [ "$nav" != "$category" ]; then
            sed -i "s/{{${nav}_ACTIVE}}//g" "$vite_file"
        fi
    done
    
    # Add main content
    sed -i "s/{{MAIN_CONTENT}}/$content/g" "$vite_file"
    
    # Add footer with page-specific JS
    cat "$TEMPLATE_DIR/vite-footer.html" >> "$vite_file"
    sed -i "s/{{JS_MODULE}}/pages\/${basename}/g" "$vite_file"
    sed -i "s/{{PAGE_INIT_CODE}}/console.log('✅ ${basename^} page loaded')/g" "$vite_file"
    
    echo "✅ Converted: $basename.html → ${basename}-vite.html"
}

# Convert specific file or all files
if [ "$1" = "all" ]; then
    echo "🚀 Converting ALL HTML files to Vite..."
    for file in "$SRC_DIR"/*.html; do
        if [[ "$(basename "$file")" != "index-vite.html" && "$(basename "$file")" != "*-vite.html" ]]; then
            convert_html_file "$file"
        fi
    done
    echo "🎉 All HTML files converted!"
elif [ -f "$1" ]; then
    convert_html_file "$1"
else
    echo "Usage: $0 <html-file> or $0 all"
    echo "Examples:"
    echo "  $0 analytics.html"
    echo "  $0 all"
fi