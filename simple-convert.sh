#!/bin/bash

# Simple HTML to Vite Converter
# Usage: ./simple-convert.sh filename.html "Page Title" nav_section

set -e

if [ $# -ne 3 ]; then
    echo "Usage: $0 <source.html> \"Page Title\" <nav_section>"
    echo "Example: $0 analytics.html \"Analytics Dashboard\" HOME"
    exit 1
fi

SOURCE_FILE="$1"
PAGE_TITLE="$2"
NAV_SECTION="$3"

BASENAME=$(basename "$SOURCE_FILE" .html)
VITE_FILE="/Users/silkalns/Projects/notika/notika/green-horizotal/${BASENAME}-vite.html"

echo "🔄 Converting $SOURCE_FILE to Vite..."

# 1. Copy index-vite.html as template
cp "/Users/silkalns/Projects/notika/notika/green-horizotal/index-vite.html" "$VITE_FILE"

# 2. Update title
sed -i '' "s/Dashboard One/$PAGE_TITLE/g" "$VITE_FILE"

# 3. Update navigation active state
case "$NAV_SECTION" in
    "HOME")
        # Already active in template
        ;;
    "CHARTS")
        sed -i '' 's/nav-link dropdown-toggle active/nav-link dropdown-toggle/g' "$VITE_FILE"
        sed -i '' 's/notika-bar-chart"><\/i>/notika-bar-chart"><\/i>\
                        <span>Charts<\/span>\
                    <\/a>\
                    <ul class="dropdown-menu active">/g' "$VITE_FILE"
        ;;
    "FORMS")
        sed -i '' 's/nav-link dropdown-toggle active/nav-link dropdown-toggle/g' "$VITE_FILE"
        # Add logic for forms active state
        ;;
esac

# 4. Update script source to page-specific module
sed -i '' "s/src\/js\/main.js/src\/js\/pages\/${BASENAME}.js/g" "$VITE_FILE"

echo "✅ Created: $VITE_FILE"
echo "📝 Next: Replace main content section with content from $SOURCE_FILE"
echo "📝 Next: Create /src/js/pages/${BASENAME}.js module"