#!/bin/bash

# Bootstrap 3 to 5 Class Migration Script
# Automates the bulk class replacements

TEMPLATE_DIR="notika/green-horizotal"
BACKUP_DIR="migration-backups"

echo "🚀 Bootstrap 3 → 5 Class Migration Script"
echo "========================================="

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "📁 Creating backups of all HTML files..."
for file in "$TEMPLATE_DIR"/*.html; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        cp "$file" "$BACKUP_DIR/${filename}.pre-migration"
    fi
done

echo "✅ Backups created in $BACKUP_DIR/"
echo ""

echo "🔄 Phase 1: Grid System Migration (655 instances)"
echo "================================================="

# Convert col-xs-* to col-* (Bootstrap 5 mobile-first approach)
echo "Converting col-xs-* classes to col-*..."
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/col-xs-/col-/g' {} \;

# Count remaining issues
REMAINING_COLXS=$(grep -r "col-xs-" "$TEMPLATE_DIR"/*.html 2>/dev/null | wc -l)
echo "✅ Converted col-xs-* classes. Remaining instances: $REMAINING_COLXS"

echo ""
echo "🔄 Phase 2: Component Class Migration (8 instances)" 
echo "==================================================="

# Convert .btn-block to .d-grid
echo "Converting .btn-block classes to .d-grid..."
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/btn-block/d-grid/g' {} \;

REMAINING_BTN_BLOCK=$(grep -r "btn-block" "$TEMPLATE_DIR"/*.html 2>/dev/null | wc -l)
echo "✅ Converted .btn-block classes. Remaining instances: $REMAINING_BTN_BLOCK"

echo ""
echo "🔄 Phase 3: Update JavaScript References"
echo "========================================"

# Update jQuery version references in HTML files
echo "Updating jQuery references from 1.12.4 to 3.7.1..."
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/jquery-1\.12\.4\.min\.js/jquery-3.7.1.min.js/g' {} \;

echo "✅ Updated jQuery references"

echo ""
echo "🔄 Phase 4: Update Bootstrap CDN References (if any)"
echo "===================================================="

# Update any hardcoded Bootstrap CDN references
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/bootstrap@3\.[^\/]*/bootstrap@5.3.8/g' {} \;
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/bootstrap\/3\.[^\/]*/bootstrap\/5.3.8/g' {} \;

echo "✅ Updated Bootstrap CDN references"

echo ""
echo "📊 MIGRATION SUMMARY"
echo "===================="

# Run our test script again to see what's left
echo "Running post-migration assessment..."

# Count remaining issues
TOTAL_COLXS=$(grep -r "col-xs-" "$TEMPLATE_DIR"/*.html 2>/dev/null | wc -l || echo 0)
TOTAL_BTN_BLOCK=$(grep -r "btn-block" "$TEMPLATE_DIR"/*.html 2>/dev/null | wc -l || echo 0)
TOTAL_JQUERY_OLD=$(grep -r "jquery-1\.12\.4" "$TEMPLATE_DIR"/*.html 2>/dev/null | wc -l || echo 0)

echo "Remaining col-xs-* classes: $TOTAL_COLXS"
echo "Remaining .btn-block classes: $TOTAL_BTN_BLOCK"
echo "Remaining old jQuery references: $TOTAL_JQUERY_OLD"

echo ""
echo "✅ Automated migration complete!"
echo "🔍 Next steps:"
echo "   1. Test all HTML pages in browser"
echo "   2. Fix any layout issues manually"
echo "   3. Update custom CSS if needed"
echo "   4. Test all JavaScript functionality"

# Create a summary file
cat > "migration-summary.txt" << EOF
Bootstrap 3 → 5 Migration Summary
Generated: $(date)

AUTOMATED CHANGES COMPLETED:
- ✅ Updated col-xs-* → col-* (Grid system)
- ✅ Updated .btn-block → .d-grid (Button component)
- ✅ Updated jQuery 1.12.4 → 3.7.1 references
- ✅ Updated Bootstrap CDN references

REMAINING ITEMS TO CHECK:
- col-xs-* classes remaining: $TOTAL_COLXS
- .btn-block classes remaining: $TOTAL_BTN_BLOCK
- Old jQuery references remaining: $TOTAL_JQUERY_OLD

FILES BACKED UP TO: $BACKUP_DIR/
- All original HTML files saved with .pre-migration extension

MANUAL TESTING REQUIRED:
- Test all 40 HTML pages for visual issues
- Verify all JavaScript functionality
- Check responsive behavior on mobile devices
- Update any custom CSS conflicting with Bootstrap 5
EOF

echo "📄 Summary saved to migration-summary.txt"