#!/bin/bash

# Bootstrap 5 Data Attributes Fix Script
# Fixes remaining Bootstrap 3 data attributes that weren't caught in initial migration

TEMPLATE_DIR="notika/green-horizotal"

echo "🔧 Bootstrap 5 Data Attributes Fix"
echo "================================="

echo "📁 Processing HTML files in $TEMPLATE_DIR..."

# Count files to process
TOTAL_FILES=$(find "$TEMPLATE_DIR" -name "*.html" | wc -l)
echo "Found $TOTAL_FILES HTML files to fix"
echo ""

echo "🔄 Phase 1: Dropdown Attributes"
echo "================================"

# Fix dropdown data attributes
echo "Fixing data-toggle='dropdown' → data-bs-toggle='dropdown'..."
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/data-toggle="dropdown"/data-bs-toggle="dropdown"/g' {} \;

echo "✅ Dropdown toggles updated"

echo ""
echo "🔄 Phase 2: Collapse Attributes"
echo "==============================="

# Fix collapse data attributes
echo "Fixing data-toggle='collapse' → data-bs-toggle='collapse'..."
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/data-toggle="collapse"/data-bs-toggle="collapse"/g' {} \;

echo "Fixing data-target → data-bs-target..."
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/data-target="/data-bs-target="/g' {} \;

echo "✅ Collapse attributes updated"

echo ""
echo "🔄 Phase 3: Tab Attributes"
echo "=========================="

# Fix tab data attributes
echo "Fixing data-toggle='tab' → data-bs-toggle='tab'..."
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/data-toggle="tab"/data-bs-toggle="tab"/g' {} \;

echo "✅ Tab toggles updated"

echo ""
echo "🔄 Phase 4: Modal Attributes"
echo "============================"

# Fix modal data attributes
echo "Fixing data-toggle='modal' → data-bs-toggle='modal'..."
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/data-toggle="modal"/data-bs-toggle="modal"/g' {} \;

echo "Fixing data-dismiss='modal' → data-bs-dismiss='modal'..."
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/data-dismiss="modal"/data-bs-dismiss="modal"/g' {} \;

echo "✅ Modal attributes updated"

echo ""
echo "🔄 Phase 5: Tooltip & Popover Attributes"
echo "========================================"

# Fix tooltip and popover data attributes
echo "Fixing data-toggle='tooltip' → data-bs-toggle='tooltip'..."
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/data-toggle="tooltip"/data-bs-toggle="tooltip"/g' {} \;

echo "Fixing data-toggle='popover' → data-bs-toggle='popover'..."
find "$TEMPLATE_DIR" -name "*.html" -exec sed -i '' 's/data-toggle="popover"/data-bs-toggle="popover"/g' {} \;

echo "✅ Tooltip & popover attributes updated"

echo ""
echo "📊 VERIFICATION"
echo "==============="

# Count remaining issues
REMAINING_TOGGLE=$(grep -r "data-toggle=" "$TEMPLATE_DIR"/*.html 2>/dev/null | wc -l || echo 0)
REMAINING_TARGET=$(grep -r 'data-target=' "$TEMPLATE_DIR"/*.html 2>/dev/null | wc -l || echo 0)
REMAINING_DISMISS=$(grep -r "data-dismiss=" "$TEMPLATE_DIR"/*.html 2>/dev/null | wc -l || echo 0)

echo "Remaining data-toggle attributes: $REMAINING_TOGGLE"
echo "Remaining data-target attributes: $REMAINING_TARGET"
echo "Remaining data-dismiss attributes: $REMAINING_DISMISS"

echo ""
if [ "$REMAINING_TOGGLE" -eq 0 ] && [ "$REMAINING_TARGET" -eq 0 ] && [ "$REMAINING_DISMISS" -eq 0 ]; then
    echo "✅ All Bootstrap 5 data attributes fixed successfully!"
else
    echo "⚠️  Some attributes may need manual review"
    echo "Check files with remaining issues:"
    if [ "$REMAINING_TOGGLE" -gt 0 ]; then
        grep -l "data-toggle=" "$TEMPLATE_DIR"/*.html 2>/dev/null | head -5
    fi
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Test header dropdowns in browser"
echo "2. Test mobile navigation"  
echo "3. Test tab functionality"
echo "4. Test modal/tooltip components"