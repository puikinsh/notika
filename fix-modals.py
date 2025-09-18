#!/usr/bin/env python3
import re

# Read the file
with open('notika/green-horizotal/modals-vite.html', 'r') as f:
    content = f.read()

# Find all modal divs with their complete content
modal_pattern = r'(<div class="modal fade"[^>]*>.*?</div>\s*</div>\s*</div>)'
modals = re.findall(modal_pattern, content, re.DOTALL)

print(f"Found {len(modals)} modals")

# Remove modals from their current location
for modal in modals:
    content = content.replace(modal, '')

# Find where to insert modals (just before the script tag at the end)
insert_point = content.find('    <!-- Main JS Module Entry -->')

if insert_point != -1:
    # Insert all modals before the script tag
    modals_section = '\n    <!-- All Modals (moved to body root for proper z-index) -->\n'
    for modal in modals:
        modals_section += '    ' + modal + '\n\n'

    content = content[:insert_point] + modals_section + content[insert_point:]

    # Write the fixed file
    with open('notika/green-horizotal/modals-vite-fixed.html', 'w') as f:
        f.write(content)

    print("Fixed file written to modals-vite-fixed.html")
else:
    print("Could not find insertion point")