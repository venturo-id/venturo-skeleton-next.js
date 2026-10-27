#!/usr/bin/env bash
# Fails when the branch changes the API surface without the matching contract
# document, and when a changed contract (docs/api/*.md except the README index)
# keeps its old "**Last Updated:**" line:
#   src/app/**/route.ts, src/pages/api/**  ->  docs/api/route-handlers.md
#   src/lib/api/**                         ->  docs/api/backend-client.md
# Test files do not count. A change that leaves the contract as it is (a pure
# refactor) runs with DOC_SYNC_SKIP=1; CI sets it from the PR label
# "no-doc-change".
#
# Usage: scripts/check-doc-sync.sh [BASE]
set -euo pipefail

if [ "${DOC_SYNC_SKIP:-}" = "1" ] || [ "${DOC_SYNC_SKIP:-}" = "true" ]; then
  echo "check-doc-sync: skipped (DOC_SYNC_SKIP)"
  exit 0
fi

here="$(cd "$(dirname "$0")" && pwd)"
cd "$(git rev-parse --show-toplevel)"
changed="$("$here/changed-files.sh" "$@")"
merge_base="$("$here/changed-files.sh" --merge-base "$@")"
route_doc="docs/api/route-handlers.md"
client_doc="docs/api/backend-client.md"
missing=()

touched() { grep -qxF "$1" <<<"$changed"; }

while IFS= read -r file; do
  case "$file" in
    "" | *.test.* | *.spec.*) continue ;;
  esac
  if [[ "$file" =~ ^src/app/(.+/)?route\.[cm]?[jt]s$ || "$file" =~ ^src/pages/api/ ]]; then
    touched "$route_doc" || missing+=("$file -> $route_doc")
  elif [[ "$file" =~ ^src/lib/api/ ]]; then
    touched "$client_doc" || missing+=("$file -> $client_doc")
  fi
done <<<"$changed"

stale=()
while IFS= read -r doc; do
  if [ -z "$doc" ] || [ ! -f "$doc" ]; then
    continue
  fi
  if git ls-files --error-unmatch "$doc" >/dev/null 2>&1; then
    git diff "$merge_base" -- "$doc" | grep -q '^+\*\*Last Updated:\*\*' || stale+=("$doc")
  else
    grep -q '^\*\*Last Updated:\*\*' "$doc" || stale+=("$doc")
  fi
done < <(grep -E '^docs/api/.*\.md$' <<<"$changed" | grep -vx 'docs/api/README.md' || true)

if [ ${#missing[@]} -gt 0 ]; then
  echo "check-doc-sync: changed without the matching document:" >&2
  printf '  %s\n' "${missing[@]}" >&2
fi
if [ ${#stale[@]} -gt 0 ]; then
  echo "check-doc-sync: contract changed but its '**Last Updated:**' line was not updated:" >&2
  printf '  %s\n' "${stale[@]}" >&2
fi
if [ ${#missing[@]} -gt 0 ] || [ ${#stale[@]} -gt 0 ]; then
  echo "See .claude/rules/api-docs.md. A pure refactor that leaves the contract as is: DOC_SYNC_SKIP=1 (PR label no-doc-change)." >&2
  exit 1
fi

echo "check-doc-sync: ok"
