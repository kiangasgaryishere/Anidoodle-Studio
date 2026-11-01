#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/doctor.mjs
node scripts/studio.mjs still hello-anidoodle --frames 0,30,60,90,119 --out 'outputs/frame-{frame}.png' --sheet outputs/contact.jpg
node scripts/studio.mjs still hello-anidoodle --frame 30 --scale 2 --out outputs/preview-2x.png
node scripts/studio.mjs render hello-anidoodle --out outputs/hello-anidoodle.mp4 --workers 2
node scripts/studio.mjs render hello-anidoodle --out outputs/hello-anidoodle.gif --width 1280 --gif-fps 24 --workers 2
node scripts/studio.mjs verify hello-anidoodle --file outputs/hello-anidoodle.mp4 --loop --delivery
node scripts/studio.mjs verify hello-anidoodle --file outputs/hello-anidoodle.gif --loop
node scripts/studio.mjs html hello-anidoodle --out outputs/hello-anidoodle.html
