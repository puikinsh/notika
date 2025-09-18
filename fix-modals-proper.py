#!/usr/bin/env python3
import re

# Read the original backup file
with open('notika/green-horizotal/modals-vite-backup.html', 'r') as f:
    content = f.read()

# More precise pattern to capture complete modal structures
modal_pattern = r'(<div class="modal fade"[^>]*id="[^"]*"[^>]*>.*?</div>\s*</div>\s*</div>)'

# Find all modals
modals = re.findall(modal_pattern, content, re.DOTALL)

print(f"Found {len(modals)} modals")

# If we didn't get all 13, try a different approach
if len(modals) != 13:
    # Manual extraction of modal IDs
    modal_ids = [
        'myModalone', 'myModaltwo', 'myModalthree', 'myModalfour',
        'myModalfive', 'myModalsix', 'myModalseven', 'myModalnine',
        'myModalten', 'myModaleleven', 'myModaltwelve', 'myModalthirteen',
        'myModalfourteen'
    ]

    modals = []
    for modal_id in modal_ids:
        # Find start of modal
        start_pattern = f'<div class="modal fade" id="{modal_id}"'
        start_idx = content.find(start_pattern)

        if start_idx != -1:
            # Count divs to find proper closing
            div_count = 0
            i = start_idx
            in_tag = False

            while i < len(content):
                if content[i] == '<':
                    in_tag = True
                elif content[i] == '>':
                    if in_tag:
                        # Check what kind of tag this was
                        tag_start = content.rfind('<', 0, i)
                        tag_content = content[tag_start:i+1]

                        if '<div' in tag_content:
                            div_count += 1
                        elif '</div>' in tag_content:
                            div_count -= 1
                            if div_count == 0:
                                # Found the closing div
                                modal_html = content[start_idx:i+1]
                                modals.append(modal_html)
                                print(f"Extracted modal: {modal_id}")
                                break
                    in_tag = False
                i += 1

print(f"Successfully extracted {len(modals)} modals")

# Now rebuild the file with modals in the right place
# First, remove all modals from content
clean_content = content
for modal in modals:
    clean_content = clean_content.replace(modal, '')

# Find the insertion point (before the script tag)
insert_point = clean_content.find('    <!-- Main JS Module Entry -->')

if insert_point != -1:
    # Build the modals section with proper formatting
    modals_section = '\n    <!-- All Modals (moved to body root for proper z-index) -->\n'
    for modal in modals:
        # Clean up the modal HTML formatting
        modal_lines = modal.split('\n')
        formatted_modal = []
        for line in modal_lines:
            if line.strip():  # Skip empty lines
                formatted_modal.append('    ' + line.strip())
        modals_section += '\n'.join(formatted_modal) + '\n\n'

    # Insert modals before the script tag
    final_content = clean_content[:insert_point] + modals_section + clean_content[insert_point:]

    # Write the fixed file
    with open('notika/green-horizotal/modals-vite-fixed2.html', 'w') as f:
        f.write(final_content)

    print("Fixed file written to modals-vite-fixed2.html")
else:
    print("Could not find insertion point")