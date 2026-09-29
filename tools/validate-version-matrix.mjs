import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const failures = [];

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function expectValue(label, actual, expected) {
  if (actual !== expected) {
    failures.push(`${label}: expected ${expected}, received ${actual ?? '<missing>'}`);
  }
}

const root = readJson('package.json');
expectValue('root version', root.version, '18.0.0');

const rootDependencies = {
  '@angular/animations': '^22.2.0',
  '@angular/cdk': '^22.2.0',
  '@angular/common': '^22.2.0',
  '@angular/compiler': '^22.2.0',
  '@angular/core': '^22.2.0',
  '@angular/forms': '^22.2.0',
  '@angular/platform-browser': '^22.2.0',
  '@angular/platform-browser-dynamic': '^22.2.0',
  '@angular/router': '^22.2.0',
  '@angular/fire': '^20.1.0',
  'zone.js': '~0.16.3',
};

for (const [name, version] of Object.entries(rootDependencies)) {
  expectValue(`root dependency ${name}`, root.dependencies?.[name], version);
}

const rootDevDependencies = {
  '@angular-devkit/build-angular': '^22.1.8',
  '@angular-devkit/core': '^22.1.8',
  '@angular-devkit/schematics': '^22.1.8',
  '@angular/cli': '^22.1.8',
  '@angular/compiler-cli': '^22.2.0',
  '@angular/language-service': '^22.2.0',
  '@schematics/angular': '^22.1.8',
  '@typescript-eslint/eslint-plugin': '^8.70.1',
  '@typescript-eslint/parser': '^8.70.1',
  'angular-eslint': '~22.5.0',
  'ng-packagr': '^22.2.1',
  'typescript': '~6.0.3',
  'typescript-eslint': '^8.70.1',
};

for (const [name, version] of Object.entries(rootDevDependencies)) {
  expectValue(`root devDependency ${name}`, root.devDependencies?.[name], version);
}

expectValue('root script test:version-matrix', root.scripts?.['test:version-matrix'], 'node tools/validate-version-matrix.mjs');

const frameworkRoot = join('src', 'framework');
for (const directory of readdirSync(frameworkRoot)) {
  const manifestPath = join(frameworkRoot, directory, 'package.json');
  if (!existsSync(manifestPath)) continue;

  const manifest = readJson(manifestPath);
  expectValue(`${manifest.name} version`, manifest.version, '18.0.0');

  for (const [name, version] of Object.entries(manifest.peerDependencies ?? {})) {
    if (name.startsWith('@angular/') && name !== '@angular/fire') {
      expectValue(`${manifest.name} peer ${name}`, version, '^22.0.0');
    }
    if (name.startsWith('@nebular/')) {
      expectValue(`${manifest.name} peer ${name}`, version, '18.0.0');
    }
  }
}

const smoke = readJson(join('packages-smoke', 'package.json'));
expectValue('smoke version', smoke.version, '18.0.0');

const smokeDependencies = {
  '@angular/animations': '~22.2.0',
  '@angular/cdk': '~22.2.0',
  '@angular/common': '~22.2.0',
  '@angular/compiler': '~22.2.0',
  '@angular/core': '~22.2.0',
  '@angular/forms': '~22.2.0',
  '@angular/platform-browser': '~22.2.0',
  '@angular/platform-browser-dynamic': '~22.2.0',
  '@angular/platform-server': '~22.2.0',
  '@angular/router': '~22.2.0',
  '@angular/ssr': '^22.1.8',
};

for (const [name, version] of Object.entries(smokeDependencies)) {
  expectValue(`smoke dependency ${name}`, smoke.dependencies?.[name], version);
}

const smokeDevDependencies = {
  '@angular-devkit/build-angular': '~22.1.8',
  '@angular-eslint/builder': '~22.5.0',
  '@angular-eslint/eslint-plugin': '~22.5.0',
  '@angular-eslint/eslint-plugin-template': '~22.5.0',
  '@angular-eslint/schematics': '~22.5.0',
  '@angular-eslint/template-parser': '~22.5.0',
  '@angular/cli': '~22.1.8',
  '@angular/compiler-cli': '~22.2.0',
  '@schematics/angular': '~22.1.8',
  'typescript': '~6.0.3',
};

for (const [name, version] of Object.entries(smokeDevDependencies)) {
  expectValue(`smoke devDependency ${name}`, smoke.devDependencies?.[name], version);
}

expectValue('.nvmrc', readFileSync('.nvmrc', 'utf8').trim(), '22.22.3');

for (const workflow of ['.github/workflows/pr-check.yml', '.github/workflows/deploy-docs.yml']) {
  const content = readFileSync(workflow, 'utf8');
  if (!content.includes('node-version: 22.22.3')) {
    failures.push(`${workflow}: expected node-version 22.22.3`);
  }
  if (content.includes('node-version: 20.19.5')) {
    failures.push(`${workflow}: stale node-version 20.19.5`);
  }
}

console.log('Known blocker: @angular/fire 20.1.0 declares Angular 20 peers; installation succeeds, but Angular 22 remains outside its supported range.');

if (failures.length > 0) {
  console.error(`Version matrix validation failed (${failures.length} mismatches):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Version matrix OK: Nebular 18 / Angular 22.2 / TypeScript 6 / Node 22.22.3.');
