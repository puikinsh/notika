#!/bin/bash

# Bootstrap 5 Migration Testing Script
# Simple shell script to identify migration issues

echo "🔍 Bootstrap 5 Migration Assessment"
echo "=================================="

TEMPLATE_DIR="notika/green-horizotal"
REPORT_FILE="migration-issues.txt"

# Clear previous report
> "$REPORT_FILE"

echo "Scanning HTML files in $TEMPLATE_DIR..."
echo ""

# Count total HTML files
TOTAL_FILES=$(find "$TEMPLATE_DIR" -name "*.html" | wc -l)
echo "📁 Found $TOTAL_FILES HTML files to analyze"
echo ""

echo "🔍 BOOTSTRAP 3 GRID CLASSES" | tee -a "$REPORT_FILE"
echo "=============================" | tee -a "$REPORT_FILE"

# Search for Bootstrap 3 grid classes
echo "Searching for col-xs-* classes (need to become col-*):" | tee -a "$REPORT_FILE"
grep -r "col-xs-" "$TEMPLATE_DIR"/*.html | wc -l | xargs echo "  Found:" | tee -a "$REPORT_FILE"

echo "Searching for col-*-offset-* classes (deprecated):" | tee -a "$REPORT_FILE"
grep -r "col-.*-offset-" "$TEMPLATE_DIR"/*.html | wc -l | xargs echo "  Found:" | tee -a "$REPORT_FILE"

echo "Searching for .no-gutters classes (now .g-0):" | tee -a "$REPORT_FILE"
grep -r "no-gutters" "$TEMPLATE_DIR"/*.html | wc -l | xargs echo "  Found:" | tee -a "$REPORT_FILE"

echo "" | tee -a "$REPORT_FILE"
echo "🧩 DEPRECATED COMPONENT CLASSES" | tee -a "$REPORT_FILE"
echo "=================================" | tee -a "$REPORT_FILE"

echo "Searching for .btn-block classes (now .d-grid):" | tee -a "$REPORT_FILE"
grep -r "btn-block" "$TEMPLATE_DIR"/*.html | wc -l | xargs echo "  Found:" | tee -a "$REPORT_FILE"

echo "Searching for .badge-* color classes (now .bg-*):" | tee -a "$REPORT_FILE"
grep -r "badge-\(primary\|secondary\|success\|info\|warning\|danger\|light\|dark\)" "$TEMPLATE_DIR"/*.html | wc -l | xargs echo "  Found:" | tee -a "$REPORT_FILE"

echo "Searching for .font-weight-* classes (now .fw-*):" | tee -a "$REPORT_FILE"
grep -r "font-weight-" "$TEMPLATE_DIR"/*.html | wc -l | xargs echo "  Found:" | tee -a "$REPORT_FILE"

echo "Searching for .media components:" | tee -a "$REPORT_FILE"
grep -r "class.*media\b" "$TEMPLATE_DIR"/*.html | wc -l | xargs echo "  Found:" | tee -a "$REPORT_FILE"

echo "" | tee -a "$REPORT_FILE"
echo "📚 JAVASCRIPT DEPENDENCIES" | tee -a "$REPORT_FILE"
echo "============================" | tee -a "$REPORT_FILE"

echo "Searching for jQuery usage (\$()):" | tee -a "$REPORT_FILE"
grep -r '\$(' "$TEMPLATE_DIR"/*.html | wc -l | xargs echo "  Found:" | tee -a "$REPORT_FILE"

echo "Searching for Bootstrap 3 modal JS calls:" | tee -a "$REPORT_FILE"
grep -r '\.modal(' "$TEMPLATE_DIR"/*.html | wc -l | xargs echo "  Found:" | tee -a "$REPORT_FILE"

echo "Searching for Bootstrap 3 tooltip JS calls:" | tee -a "$REPORT_FILE"
grep -r '\.tooltip(' "$TEMPLATE_DIR"/*.html | wc -l | xargs echo "  Found:" | tee -a "$REPORT_FILE"

echo "" | tee -a "$REPORT_FILE"
echo "📄 DETAILED FILE BREAKDOWN" | tee -a "$REPORT_FILE"
echo "============================" | tee -a "$REPORT_FILE"

echo "Files with col-xs-* classes:" | tee -a "$REPORT_FILE"
grep -l "col-xs-" "$TEMPLATE_DIR"/*.html | sed 's|.*/||' | sort | tee -a "$REPORT_FILE"

echo "" | tee -a "$REPORT_FILE"
echo "Files with .btn-block classes:" | tee -a "$REPORT_FILE"
grep -l "btn-block" "$TEMPLATE_DIR"/*.html | sed 's|.*/||' | sort | tee -a "$REPORT_FILE"

echo ""
echo "✅ Analysis complete! Check $REPORT_FILE for detailed breakdown."
echo ""
echo "🚨 KEY MIGRATION PRIORITIES:"
echo "  1. Update all col-xs-* grid classes"
echo "  2. Replace .btn-block with .d-grid"
echo "  3. Update deprecated component classes"
echo "  4. Test jQuery plugin compatibility"