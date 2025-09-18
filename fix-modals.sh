#!/bin/bash

# Extract all modals and create a temporary file with just the modals
grep -A 20 '<div class="modal fade"' notika/green-horizotal/modals-vite.html | sed '/^--$/d' > /tmp/modals-content.txt

# Count how many modals we found
echo "Found $(grep -c '<div class="modal fade"' notika/green-horizotal/modals-vite.html) modals"

echo "Modals extracted to /tmp/modals-content.txt"
echo "You need to manually move these to before the closing body tag"