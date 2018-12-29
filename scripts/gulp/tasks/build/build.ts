/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { main as ngc } from '@angular/compiler-cli/src/main';
import { dest, src, task } from 'gulp';
import * as path from 'path';
import * as fs from 'fs';

import { LIB_DIR } from '../config';
import { createTsconfigFile } from './tsconfig';
import { copyResources } from '../inline-resources/copy-resources';

const BUILD_DIR = '.ng_build';


const packages = [
  'theme',
  'auth',
  'date-fns',
  'moment',
  'security',
];

task('build', ['copy']);

task('copy', [
  'compile',
  // 'copy-bundles',
  // 'copy-bootstrap',
  // 'copy-packages-metadata',
], () => {
  return [
    packages.map(packageName => [
      copyHtmlAndStyles(packageName),
      copyEs5Bundle(packageName),
      copyEs2015Bundle(packageName),
      copyTypings(packageName),
    ]),
    copyBootstrapStyles(),
    copyPackagesMetadata(),
  ];
});

task('compile', () => {
  compileTsconfig('es5');
  compileTsconfig('es2015');
});

task('copy-bundles', () => {
  return packages.map(packageName => [
    copyEs5Bundle(packageName),
    copyEs2015Bundle(packageName),
    copyTypings(packageName),
  ]);
});

task('copy-bootstrap', () => copyBootstrapStyles());
task('copy-packages-metadata', () => copyPackagesMetadata());

function copyEs5Bundle(packageName: string) {
  return src([
    `.lib_dist/es5/${packageName}/**/*.js`,
    `.lib_dist/es5/${packageName}/**/*.metadata.json`,
    `.lib_dist/es5/${packageName}/**/*.shim.ngstyle.js.map`,
    `.lib_dist/es5/${packageName}/**/*.ngfactory.js.map`,
  ])
    .pipe(dest(path.join(LIB_DIR, packageName, 'esm5')));
}

function copyEs2015Bundle(packageName: string) {
  return src([
    `.lib_dist/es2015/${packageName}/**/*.js`,
    `.lib_dist/es2015/${packageName}/**/*.metadata.json`,
    `.lib_dist/es2015/${packageName}/**/*.shim.ngstyle.js.map`,
    `.lib_dist/es2015/${packageName}/**/*.ngfactory.js.map`,
  ])
    .pipe(dest(path.join(LIB_DIR, packageName, 'esm2015')));
}

function copyTypings(packageName: string) {
  return src(`.lib_dist/es2015/${packageName}/**/*.d.ts`)
    .pipe(dest(path.join(LIB_DIR, packageName, 'src')));
}

function copyPackagesMetadata() {
  return src([
    `${BUILD_DIR}/**/LICENSE.txt`,
    `${BUILD_DIR}/**/README.md`,
    `${BUILD_DIR}/**/package.json`,
  ])
    .pipe(dest(path.join(LIB_DIR)));
}

function copyBootstrapStyles() {
  return src([
    `${BUILD_DIR}/bootstrap/**/*.html`,
    `${BUILD_DIR}/bootstrap/**/*.css`,
    `${BUILD_DIR}/bootstrap/**/*.scss`,
  ])
    .pipe(dest(path.join(LIB_DIR, 'bootstrap')))
    .on('end', () => copyResources(path.join(LIB_DIR, 'bootstrap')));
}

function copyHtmlAndStyles(packageName: string) {
  return [
    src(`${BUILD_DIR}/${packageName}/**/*.theme.scss`)
      .pipe(dest(path.join(LIB_DIR, packageName))),

    src(`${BUILD_DIR}/${packageName}/styles/**/*.scss`)
      .pipe(dest(path.join(LIB_DIR, packageName, 'styles'))),

    src(`${BUILD_DIR}/${packageName}/styles/prebuilt/**/*.css`)
      .pipe(dest(path.join(LIB_DIR, packageName, 'styles', 'prebuilt'))),

    src([
      `${BUILD_DIR}/${packageName}/components/**/*.html`,
      `${BUILD_DIR}/${packageName}/components/**/*.css`,
    ])
      .pipe(dest(path.join(LIB_DIR, packageName, 'esm5', 'components'))),
    src([
      `${BUILD_DIR}/${packageName}/components/**/*.html`,
      `${BUILD_DIR}/${packageName}/components/**/*.css`,
    ])
      .pipe(dest(path.join(LIB_DIR, packageName, 'esm2015', 'components'))),
  ];
}

function compileTsconfig(target: string) {
  const tsconfigPublish = createTsconfigFile(target);
  const tsconfigPath = path.join(BUILD_DIR, createTsconfigFileName(target));
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfigPublish, null, 2));
  compile(tsconfigPath);
}

function compile(tsconfigPath: string) {
  ngc(['-p', tsconfigPath]);
}

function createTsconfigFileName(target) {
  return `tsconfig.${target}.json`;
}
