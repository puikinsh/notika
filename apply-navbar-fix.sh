#!/bin/bash

# Apply Bootstrap 5 Navbar Fix to all HTML files
# Fixes horizontal layout issues in header navigation

TEMPLATE_DIR="notika/green-horizotal"
FIX_CSS='    <!-- Bootstrap 5 navbar fix CSS
		============================================ -->
    <style>
        /* Bootstrap 5 Header Navigation Fix */
        .header-top-menu .nav.navbar-nav.notika-top-nav {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: flex-end !important;
            margin: 0 !important;
            padding: 0 !important;
            list-style: none !important;
            flex-wrap: nowrap !important;
        }
        
        .header-top-menu .nav.navbar-nav.notika-top-nav .nav-item {
            display: flex !important;
            align-items: center !important;
            margin-left: 10px !important;
        }
        
        .header-top-menu .nav.navbar-nav.notika-top-nav .nav-link {
            display: flex !important;
            align-items: center !important;
            padding: 0.5rem 0.75rem !important;
            text-decoration: none !important;
        }
        
        .header-top-menu .nav.navbar-nav.notika-top-nav .dropdown-menu {
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            z-index: 1000 !important;
        }
        
        .header-top-area .row {
            align-items: center !important;
        }
        
        .header-top-menu {
            display: flex !important;
            justify-content: flex-end !important;
            align-items: center !important;
        }
    </style>'

echo "🔧 Applying Bootstrap 5 Navbar Fix to All HTML Files"
echo "===================================================="

# Count HTML files
TOTAL_FILES=$(find "$TEMPLATE_DIR" -name "*.html" | wc -l)
echo "📁 Found $TOTAL_FILES HTML files to fix"

FIXED_COUNT=0
SKIPPED_COUNT=0

echo ""
echo "Processing files..."

for file in "$TEMPLATE_DIR"/*.html; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        
        # Check if file has responsive.css and doesn't already have the fix
        if grep -q "responsive\.css" "$file" && ! grep -q "Bootstrap 5 navbar fix" "$file"; then
            # Apply the fix by inserting after responsive.css
            sed -i '' "/responsive\.css/a\\
$FIX_CSS
" "$file"
            
            echo "✅ Fixed: $filename"
            ((FIXED_COUNT++))
        else
            echo "⏭️  Skipped: $filename (already fixed or no responsive.css found)"
            ((SKIPPED_COUNT++))
        fi
    fi
done

echo ""
echo "📊 SUMMARY"
echo "=========="
echo "Files processed: $TOTAL_FILES"  
echo "Files fixed: $FIXED_COUNT"
echo "Files skipped: $SKIPPED_COUNT"

echo ""
echo "🎯 NEXT STEPS:"
echo "1. Test header layout in browser"
echo "2. Verify dropdown functionality" 
echo "3. Check responsive behavior on mobile"

echo ""
echo "✅ Bootstrap 5 navbar fix applied successfully!"