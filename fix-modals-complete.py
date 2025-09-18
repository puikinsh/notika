#!/usr/bin/env python3

# Define all modals with proper Bootstrap 5 structure
modals_html = '''
    <!-- All Modals (moved to body root for proper z-index) -->

    <!-- Default Modal -->
    <div class="modal fade" id="myModalone" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Small Modal -->
    <div class="modal fade" id="myModaltwo" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec min odio, faucibus at, scelerisquese quis, convallisdse. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Large Modal -->
    <div class="modal fade" id="myModalthree" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bounce Animation Modal -->
    <div class="modal fade" id="myModalfour" role="dialog">
        <div class="modal-dialog modal-animate-bounce">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Bounce Animation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Flash Animation Modal -->
    <div class="modal fade" id="myModalfive" role="dialog">
        <div class="modal-dialog modal-animate-flash">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Flash Animation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- RubberBand Animation Modal -->
    <div class="modal fade" id="myModalsix" role="dialog">
        <div class="modal-dialog modal-animate-rubberband">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">RubberBand Animation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Shake Animation Modal -->
    <div class="modal fade" id="myModalseven" role="dialog">
        <div class="modal-dialog modal-animate-shake">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Shake Animation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Red Theme Modal -->
    <div class="modal fade" id="myModalnine" role="dialog">
        <div class="modal-dialog nk-red">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Red Theme Modal</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Light Blue Theme Modal -->
    <div class="modal fade" id="myModalten" role="dialog">
        <div class="modal-dialog nk-light-blue">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Light Blue Theme Modal</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Cyan Theme Modal -->
    <div class="modal fade" id="myModaleleven" role="dialog">
        <div class="modal-dialog nk-cyan">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cyan Theme Modal</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Deep Purple Theme Modal -->
    <div class="modal fade" id="myModaltwelve" role="dialog">
        <div class="modal-dialog nk-deep-purple">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Deep Purple Theme Modal</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Indigo Theme Modal -->
    <div class="modal fade" id="myModalthirteen" role="dialog">
        <div class="modal-dialog nk-indigo">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Indigo Theme Modal</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Blue Theme Modal -->
    <div class="modal fade" id="myModalfourteen" role="dialog">
        <div class="modal-dialog nk-blue">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Blue Theme Modal</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Curabitur blandit mollis lacus. Nulla sit amet est. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Cras sagittis.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
'''

# Read the backup file
with open('notika/green-horizotal/modals-vite-backup.html', 'r') as f:
    content = f.read()

# Remove any existing modal definitions
import re
# Remove all modals that are incorrectly placed
modal_ids = [
    'myModalone', 'myModaltwo', 'myModalthree', 'myModalfour',
    'myModalfive', 'myModalsix', 'myModalseven', 'myModalnine',
    'myModalten', 'myModaleleven', 'myModaltwelve', 'myModalthirteen',
    'myModalfourteen'
]

for modal_id in modal_ids:
    # Remove any incorrectly placed modal
    pattern = f'<div class="modal[^>]*" id="{modal_id}"[^>]*>.*?(?=<div class="modal|<!-- All Modals|<!-- Main JS|</body>)'
    content = re.sub(pattern, '', content, flags=re.DOTALL)

# Clean up duplicate "All Modals" comments
content = re.sub(r'<!-- All Modals.*?-->\s*', '', content)

# Find the insertion point
insert_point = content.find('    <!-- Main JS Module Entry -->')

if insert_point != -1:
    # Insert the properly formatted modals
    final_content = content[:insert_point] + modals_html + '\n\n' + content[insert_point:]

    # Write the fixed file
    with open('notika/green-horizotal/modals-vite-final.html', 'w') as f:
        f.write(final_content)

    print("Fixed file written to modals-vite-final.html")
else:
    print("Could not find insertion point")