import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const engine = join(root, 'engine/anidoodle/engine');
const [action, name, ...args] = process.argv.slice(2);
if (!/^[a-z][a-z0-9-]*$/.test(name ?? '')) {
  throw new Error('Use a project slug: hello-anidoodle');
}
const project = join(root, 'projects', name);
const writeJson = (file, value) => writeFileSync(file, JSON.stringify(value, null, 2) + '\n');

function run(tool, params, cwd) {
  const result = spawnSync(process.execPath, [
    '--import', join(root, 'scripts/cloud-transport.mjs'),
    join(engine, 'tools', tool + '.mjs'), ...params,
  ], {
    cwd,
    stdio: 'inherit',
    env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: join(root, '.cache/browsers') },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (action === 'new') {
  if (existsSync(project)) throw new Error('Project exists; refusing to overwrite');
  const allowed = new Set(['--duration', '--size', '--format', '--fps', '--bpm']);
  for (let i = 0; i < args.length; i += 2) {
    if (!allowed.has(args[i]) || !args[i + 1] || args[i + 1].startsWith('--')) {
      throw new Error('new accepts paired --duration, --size, --format, --fps and --bpm options only');
    }
  }
  run('scaffold', [project, '--linked', '--film', 'scene', ...args], root);

  // Keep upstream's overlay marker, but remove machine-specific absolute paths.
  const pkg = JSON.parse(readFileSync(join(project, 'package.json')));
  delete pkg.dependencies;
  for (const key of Object.keys(pkg.scripts)) {
    pkg.scripts[key] = pkg.scripts[key].replaceAll(engine, '../../engine/anidoodle/engine');
  }
  writeJson(join(project, 'package.json'), pkg);
  writeJson(join(project, 'anidoodle-project.json'), {
    linked: true, film: 'scene', engine: '../../engine/anidoodle/engine',
  });
  for (const dir of ['assets', 'outputs']) {
    mkdirSync(join(project, dir), { recursive: true });
    writeFileSync(join(project, dir, '.gitkeep'), '');
  }
  writeFileSync(join(project, 'brief.md'), `# ${name}\n\nRecord subject, style, duration, dimensions, FPS, sound, references, and review notes before drawing.\n`);
} else {
  const tools = new Map([
    ['still', 'still'], ['render', 'render'], ['gate', 'gate'],
    ['verify', 'verify-export'], ['html', 'emit'],
  ]);
  if (!tools.has(action)) throw new Error('Commands: new, still, render, gate, verify, html');
  if (!existsSync(project)) throw new Error('Unknown project');
  const { film } = JSON.parse(readFileSync(join(project, 'anidoodle-project.json')));
  run(tools.get(action), [film, ...args], project);
}
