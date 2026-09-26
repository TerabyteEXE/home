#!/usr/bin/env bash
#
# backup.sh — a small rsync wrapper for backing up your home folder.
#
# What it does:
#   Copies SOURCE into a timestamped folder under DEST, skipping the
#   usual junk (caches, trash, node_modules, build output). Nothing is
#   ever deleted from SOURCE, and existing backups are never overwritten.
#
# Usage:
#   ./backup.sh                 run the backup
#   ./backup.sh --dry-run       show what would be copied, change nothing
#
# Edit SOURCE and DEST below before you use this for real.

set -euo pipefail

SOURCE="$HOME"
DEST="/mnt/backups"
STAMP="$(date +%Y-%m-%d_%H%M)"
TARGET="$DEST/$STAMP"

EXCLUDES=(
  "--exclude=.cache"
  "--exclude=.local/share/Trash"
  "--exclude=node_modules"
  "--exclude=.venv"
  "--exclude=target"
  "--exclude=*.iso"
)

RSYNC_FLAGS=(-avh --progress "${EXCLUDES[@]}")

if [[ "${1:-}" == "--dry-run" ]]; then
  RSYNC_FLAGS+=(--dry-run)
  echo "Dry run — nothing will actually be copied."
fi

mkdir -p "$TARGET"
echo "Backing up $SOURCE -> $TARGET"
rsync "${RSYNC_FLAGS[@]}" "$SOURCE"/ "$TARGET"/

echo "Done. $(du -sh "$TARGET" | cut -f1) written to $TARGET"
