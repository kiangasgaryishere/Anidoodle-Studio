# Creating and rendering projects

Run from the studio root. Node 20+ is required; this instance uses Node 24.19.0.

```bash
bash scripts/setup.sh
node scripts/studio.mjs new my-new-video --duration 20 --size 1280x720 --fps 24
```

The new command refuses any existing project directory. It creates a linked project via upstream scaffold, a portable package/configuration, brief.md, assets/ and outputs/. `scene.ts` starts as upstream's particle example: replace its artwork, retain its Film shape. Duration is seconds and may be any positive length. Frame counts round to the nearest integer. Do not pass --world: upstream's world starter has independent timing defaults; ordinary --film scaffolding respects the duration flag. Prefer explicit --size; --format 16x9 defaults to 1920×1080 upstream.

The core resolver lets project modules import `./core`, `./film` and other engine modules without copying them. Place project-only supporting modules beside scene.ts. The film identifier is scene; the project slug may contain hyphens. Film metadata is the source of truth for resolution/FPS/frame count. The marker records the shared engine path; it is not a second installation.

```bash
node scripts/studio.mjs still my-new-video --frame 0 --out outputs/preview.png
node scripts/studio.mjs still my-new-video --frames 0,120,240 --out 'outputs/frame-{frame}.png' --sheet outputs/contact.jpg
node scripts/studio.mjs still my-new-video --frame 0 --scale 2 --out outputs/preview-2x.png
node scripts/studio.mjs render my-new-video --out outputs/video.mp4 --workers 2
node scripts/studio.mjs render my-new-video --out outputs/video.gif --width 1280 --gif-fps 24 --workers 2
node scripts/studio.mjs verify my-new-video --file outputs/video.mp4 --delivery
node scripts/studio.mjs verify my-new-video --file outputs/video.gif
node scripts/studio.mjs gate my-new-video --adapter html-player --mp4 outputs/video.mp4 --samples 8
node scripts/studio.mjs html my-new-video --out outputs/player.html
```

Paths supplied after the project name resolve inside that project. Add --loop only for intentionally periodic scenes. GIF stores centisecond delays, so 24 FPS alternates frame delays and its reported nominal rate may differ slightly; this sample has 120 frames and exactly five seconds. PNG is a single sampled frame. MP4 uses H.264/yuv420p, so use even dimensions. Outputs do not overwrite other projects. Export commands may overwrite the explicitly named file in the selected project.

A browser is launched per operation; there is no persistent dev server to restart. HTML can be downloaded and played in a normal browser. Cloud's managed browser disallows file navigation, so rendering uses the studio adapter. Relative external resource loading is intentionally unsupported by that adapter: use the engine's declared/inlined asset workflow. Retain media licenses and hashes. Future branded/3D/audio work should consult the corresponding upstream references.
