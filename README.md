# Anidoodle Creative Studio

A permanent, code-driven creative workspace with one shared, pinned Anidoodle engine and independent projects. No local development environment is required: run these commands in Codex Cloud.

```bash
bash scripts/setup.sh
node scripts/studio.mjs new my-new-video --duration 20 --size 1280x720 --fps 24
```

Edit `projects/my-new-video/brief.md` and `src/canvas-core/scene.ts`, then:

```bash
node scripts/studio.mjs still my-new-video --frame 0 --out outputs/preview.png
node scripts/studio.mjs render my-new-video --out outputs/my-new-video.mp4 --workers 2
node scripts/studio.mjs verify my-new-video --file outputs/my-new-video.mp4
```

Or ask Codex: **“Create a new 20-second watercolor animation and save it under projects/my-new-video.”** AGENTS.md defines the permanent workflow. New projects reuse installed dependencies and do not require another repository.

| Folder | Purpose |
|---|---|
| `engine/anidoodle/` | Preserved upstream skill, engine, references and examples |
| `projects/<slug>/` | That project's source, brief, configuration, assets and outputs |
| `assets/` | Shared reusable media and provenance |
| `templates/` | Reusable briefs and guidance |
| `outputs/` | Optional studio-wide contact sheets; normally use project outputs |
| `scripts/` | Setup, rendering wrapper, browser compatibility, validation |
| `docs/` | Cloud setup, workflow and actual validation results |

Start with [usage](docs/usage.md), [cloud setup](docs/cloud-setup.md), [validation](docs/validation.md), and [upstream provenance](engine/UPSTREAM.md).

The first scene is `projects/hello-anidoodle/`: a five-second watercolor landscape with moving sun, drifting clouds and grass. Its renders are generated locally and ignored by Git. Regenerate all requested formats with `bash scripts/validate-hello.sh`. Generated files persist in the prepared cloud filesystem/snapshot; Git alone retains sources, not those exports. Download or archive important finished media separately.
