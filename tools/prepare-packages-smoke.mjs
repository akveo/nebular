import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const packages = ['theme', 'auth', 'security', 'moment', 'date-fns', 'eva-icons'];
const root = resolve(import.meta.dirname, '..');
const tarballDirectory = resolve(root, '.tmp/package-tarballs');
const smokeDirectory = resolve(root, 'packages-smoke');
const availableTarballs = readdirSync(tarballDirectory);
const tarballs = packages.map((packageName) => {
  const filename = availableTarballs.find((candidate) => candidate.startsWith(`nebular-${packageName}-`));
  if (!filename) {
    throw new Error(`Missing tarball for @nebular/${packageName}`);
  }
  return resolve(tarballDirectory, filename);
});

const result = spawnSync('npm', ['install', '--no-save', '--package-lock=false', ...tarballs], {
  cwd: smokeDirectory,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.status !== 0) {
  throw (
    result.error || new Error(`Failed to install packed Nebular libraries into packages-smoke (exit ${result.status})`)
  );
}
