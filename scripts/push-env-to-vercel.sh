#!/bin/bash
# Prints the env vars you need to add in Vercel for opshub-lite.
# Usage: fill in .env.local first, then run: bash scripts/push-env-to-vercel.sh

set -euo pipefail
cd "$(dirname "$0")/.."

if [[ ! -f .env.local ]]; then
  echo "Create .env.local from .env.example first."
  exit 1
fi

echo "Adding env vars to Vercel (dev-axon/opshub-lite)..."
echo "You will be prompted for each value if not in .env.local."

while IFS='=' read -r key value; do
  [[ -z "$key" || "$key" =~ ^# ]] && continue
  value="${value%$'\r'}"
  value="${value#\"}"; value="${value%\"}"
  printf '%s' "$value" | npx vercel env add "$key" production --cwd . --force
  printf '%s' "$value" | npx vercel env add "$key" preview --cwd . --force
  printf '%s' "$value" | npx vercel env add "$key" development --cwd . --force
  echo "  ✓ $key"
done < .env.local

echo ""
echo "Done. Redeploy with: npx vercel --prod"
