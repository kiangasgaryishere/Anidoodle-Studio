# Upstream integration

Source: https://github.com/alexgreensh/anidoodle
Commit: `9c20e77467be393e54c7193611eeec2f7bfb8cc7` (inspected 2026-11-01).
Engine package: 0.10.1. Apache-2.0; original LICENSE, NOTICE, font licenses and provenance are retained.

`anidoodle/` is an unmodified copy of upstream `skills/anidoodle/`, including its engine, skill, references, style assets and Mechanical Lepidoptera example. It is committed here so a GitHub clone is sufficient; no submodule, plugin installation or upstream fetch is required for each project. The original engine lockfile is retained.

The engine uses a portable TypeScript Canvas 2D core (`Gfx`, seeded watercolor washes, pencil strokes and textures). `Film` is metadata, assets and frame-indexed shots. Browser hosts draw it; esbuild bundles it. Three.js 0.170.0 is included for 3D. Built-in code synthesizes audio; the recorded instrument pack is an optional, separately licensed/hash-verified download, not installed here.

Use upstream's `scaffold.mjs --linked`: project sources overlay the shared engine with its original resolver. One npm installation serves every project. Studio wrappers normalize scaffold's absolute machine paths into relative paths. Upstream engine files are not edited.

Supported upstream outputs: PNG, MP4, GIF, WebM, APNG and self-contained HTML. Four adapter families: Playwright, HTML player, optional Remotion and optional Hyperframes. See docs/validation.md for what was actually exercised here.

Examples: `anidoodle/example/` contains Mechanical Lepidoptera (47-second scored film); `anidoodle/engine/src/canvas-core/` contains the 32 style plates, drawing films, motion and launch kits. Study rather than retitle those artworks. The archival UPSTREAM-README.md uses upstream-relative links; consult the original repository for its media.

## Updates

Update deliberately in a separate branch, recording the new commit. Preserve LICENSE/NOTICE, compare engine APIs and lockfile, reinstall, render an existing project and run export checks before accepting an upgrade. Existing projects share the engine, so an upgrade can affect their future renders. Keep outputs before upgrading; browser version also affects pixels.
