# Temporary Files Archive

This folder contains **temporary backup and work-in-progress files** created during the modernization process.

## Contents

- Backup versions (e.g., `index-backup.html`)
- Old versions (e.g., `index-old.html`)
- Temporary test files (e.g., `widgets-header-temp.html`)
- Work-in-progress files (e.g., `modals-vite-fixed2.html`)

## Status

These files can be **safely deleted** after the modernization is complete and tested.

They are kept temporarily for:
- Quick rollback if needed
- Reference during development
- Comparison of different approaches

## Cleanup

Once all modernized pages are tested and working:
```bash
rm -rf notika/green-horizotal/_archive/
```

---

*Created on: $(date +"%Y-%m-%d")*