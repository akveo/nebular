import { mkdirSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const packages = ['theme', 'auth', 'security', 'moment', 'date-fns', 'firebase-auth', 'eva-icons'];
const root = resolve(import.meta.dirname, '..');
const destination = resolve(root, '.tmp/package-tarballs');

mkdirSync(destination, { recursive: true });

for (const packageName of packages) {
  const packageDirectory = resolve(root, 'dist', packageName);
  const manifestPath = resolve(packageDirectory, 'package.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const result = spawnSync(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['pack', '--json', '--pack-destination', destination],
    { cwd: packageDirectory, encoding: 'utf8' },
  );

  if (result.status !== 0) {
    throw new Error(`npm pack failed for ${manifest.name}: ${result.stderr || result.stdout}`);
  }

  const [{ filename }] = JSON.parse(result.stdout);
  const size = statSync(resolve(destination, filename)).size;
  if (size <= 0) {
    throw new Error(`Empty tarball produced for ${manifest.name}`);
  }

  console.log(`${manifest.name}\t${manifest.version}\t${filename}\t${size} bytes`);
}
