#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
node -e 'if(Number(process.versions.node.split(".")[0])<20)process.exit(1)'
command -v ffmpeg >/dev/null
command -v ffprobe >/dev/null
npm ci --prefix engine/anidoodle/engine --omit=optional
# Projects resolve the one shared dependency installation through their parent.
if [[ ! -e node_modules && ! -L node_modules ]]; then ln -s engine/anidoodle/engine/node_modules node_modules; fi
if command -v chromium >/dev/null; then
  mkdir -p .cache/browsers/chromium-0
  ln -sfn "$(command -v chromium)" .cache/browsers/chromium-0/chrome
else
  PLAYWRIGHT_BROWSERS_PATH="$PWD/.cache/browsers" node engine/anidoodle/engine/node_modules/playwright-core/cli.js install chromium
fi
# Upstream prefers playwright over playwright-core; alias to the pinned shared build.
ln -sfn playwright-core engine/anidoodle/engine/node_modules/playwright
node scripts/doctor.mjs
