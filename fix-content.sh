#!/bin/bash

# Fix content replacement for converted pages
# Usage: ./fix-content.sh source.html target-vite.html

SOURCE="$1"
TARGET="$2"

if [ ! -f "$SOURCE" ] || [ ! -f "$TARGET" ]; then
    echo "Usage: $0 source.html target-vite.html"
    exit 1
fi

echo "🔄 Fixing content for $(basename "$TARGET")"

# Create temporary files
TEMP_HEADER=$(mktemp)
TEMP_CONTENT=$(mktemp)
TEMP_FOOTER=$(mktemp)

# Extract header (up to navigation end)
sed -n '1,/<!-- End Stable Navigation -->/p' "$TARGET" > "$TEMP_HEADER"

# Extract footer (from footer start)
sed -n '/<!-- Start Footer area-->/,$p' "$TARGET" > "$TEMP_FOOTER"

# Extract main content from source (after navigation, before footer)
# Look for end of navigation and start of footer
NAV_END=$(grep -n "Main Menu area End\|breadcomb-area" "$SOURCE" | head -1 | cut -d: -f1)
FOOTER_START=$(grep -n "Start Footer area\|footer-copyright-area" "$SOURCE" | head -1 | cut -d: -f1)

if [ -n "$NAV_END" ] && [ -n "$FOOTER_START" ]; then
    sed -n "${NAV_END},${FOOTER_START}p" "$SOURCE" | head -n -1 > "$TEMP_CONTENT"
else
    echo "❌ Could not find content boundaries in $SOURCE"
    exit 1
fi

# Combine header + content + footer
cat "$TEMP_HEADER" > "$TARGET"
echo "" >> "$TARGET"
cat "$TEMP_CONTENT" >> "$TARGET"
echo "" >> "$TARGET" 
cat "$TEMP_FOOTER" >> "$TARGET"

# Cleanup
rm "$TEMP_HEADER" "$TEMP_CONTENT" "$TEMP_FOOTER"

echo "✅ Fixed content for $(basename "$TARGET")"