#!/usr/bin/env bash
# Fails when the branch changes application code (src/** or next.config.*;
# *.test.*, *.spec.* and the src/test/ helpers excluded) without touching
# CHANGELOG.md. Every change to the code gets an entry under "## [Unreleased]".
#
# Usage: scripts/check-changelog.sh [BASE]
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
cd "$(git rev-parse --show-toplevel)"
changed="$("$here/changed-files.sh" "$@")"

code="$(grep -E '^(src/|next\.config\.)' <<<"$changed" \
  | grep -vE '(\.(test|spec)\.[cm]?[jt]sx?$|^src/test/)' || true)"
if [ -z "$code" ]; then
  echo "check-changelog: no application code changed"
  exit 0
fi

if ! grep -qx 'CHANGELOG.md' <<<"$changed"; then
  echo "check-changelog: application code changed without a CHANGELOG.md entry:" >&2
  sed 's/^/  /' <<<"$code" >&2
  echo "Add an entry under '## [Unreleased]' in CHANGELOG.md." >&2
  exit 1
fi

if ! grep -q '^## \[Unreleased\]' CHANGELOG.md; then
  echo "check-changelog: CHANGELOG.md has no '## [Unreleased]' section" >&2
  exit 1
fi

echo "check-changelog: ok"
