#!/bin/bash

# Add Bootstrap 5 Navbar Fix CSS to all HTML files

TEMPLATE_DIR="notika/green-horizotal"
CSS_LINK='    <link rel="stylesheet" href="css/bootstrap5-navbar-fix.css">'

echo "🔧 Adding Bootstrap 5 Navbar Fix CSS to All HTML Files"
echo "======================================================"

FIXED_COUNT=0

for file in "$TEMPLATE_DIR"/*.html; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        
        # Check if file doesn't already have the fix
        if ! grep -q "bootstrap5-navbar-fix.css" "$file"; then
            # Add CSS link before closing </head> tag
            sed -i '' "s|</head>|$CSS_LINK\n</head>|g" "$file"
            
            echo "✅ Added CSS fix to: $filename"
            ((FIXED_COUNT++))
        else
            echo "⏭️  Already has fix: $filename"
        fi
    fi
done

echo ""
echo "📊 SUMMARY"
echo "=========="
echo "Files fixed: $FIXED_COUNT"

echo ""
echo "✅ CSS links added successfully!"