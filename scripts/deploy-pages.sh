#!/usr/bin/env bash
# Build the Vue app and publish dist to the gh-pages branch.
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_root"

remote="${1:-origin}"
repo_name="$(basename -s .git "$(git remote get-url "$remote")")"

VITE_BASE="/${repo_name}/" npm run build
cp dist/index.html dist/404.html
touch dist/.nojekyll

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

git -C "$tmp" init
git -C "$tmp" checkout -b gh-pages
cp -a dist/. "$tmp/"
git -C "$tmp" add -A
git -C "$tmp" -c user.email="agent@cursor.com" -c user.name="Cursor Agent" \
  commit -m "Deploy Vue app to GitHub Pages"
git -C "$tmp" remote add origin "$(git remote get-url "$remote")"
git -C "$tmp" push -f origin gh-pages
