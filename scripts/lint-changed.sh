#!/usr/bin/env bash
# Runs ESLint with --max-warnings 0 on the JS/TS files this branch changes
# against BASE (see scripts/changed-files.sh). The Kinerja threshold rules in
# eslint.config.mjs are warnings so that `yarn lint` over the whole repo does
# not fail on the old backlog; here every warning in a changed file fails.
#
# Usage: scripts/lint-changed.sh [BASE]
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
cd "$(git rev-parse --show-toplevel)"
changed="$("$here/changed-files.sh" "$@")"

files=()
while IFS= read -r file; do
  [ -n "$file" ] && [ -f "$file" ] && files+=("$file")
done < <(grep -E '\.(js|jsx|mjs|cjs|ts|tsx|mts|cts)$' <<<"$changed" || true)

if [ ${#files[@]} -eq 0 ]; then
  echo "lint-changed: no JS/TS file changed"
  exit 0
fi

echo "lint-changed: ${#files[@]} file(s)"
node_modules/.bin/eslint --max-warnings 0 --no-warn-ignored "${files[@]}"
echo "lint-changed: ok"
