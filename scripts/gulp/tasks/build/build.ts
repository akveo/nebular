/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { main as ngc } from '@angular/compiler-cli/src/main';
import { dest, src, task } from 'gulp';
import * as path from 'path';
import * as fs from 'fs';

import { BUILD_DIR, LIB_DIR, LIB_DIST } from '../config';
import { createTsconfigContent } from './tsconfig';
import { copyResources } from '../inline-resources/copy-resources';


const packages = [
  'theme',
  'auth',
  'date-fns',
  'moment',
  'security',
];

task('compile-bundles', () => {
  compileTarget('es5');
  compileTarget('es2015');
});

task('copy-bundles', () => {
  return [
    ...packages.map(packageName => [
      copyBundles(packageName),
      copyHtmlAndCss(packageName),
      copyTypings(packageName),
    ]),

    copyBootstrapStyles(),
    copyPackagesMetadata(),
  ];
});

task('inline-resources', () => {
  return packages.map(packageName => inlineResources(packageName));
});

function copyBundles(packageName: string) {
  copyEs5Bundle(packageName);
  copyEs2015Bundle(packageName);
}

function copyEs5Bundle(packageName: string) {
  return src([
    `${LIB_DIST}/es5/${packageName}/**/*.js`,
    `${LIB_DIST}/es5/${packageName}/**/*.metadata.json`,
    `${LIB_DIST}/es5/${packageName}/**/*.shim.ngstyle.js.map`,
    `${LIB_DIST}/es5/${packageName}/**/*.ngfactory.js.map`,
  ])
    .pipe(dest(path.join(LIB_DIR, packageName)));
}

function copyEs2015Bundle(packageName: string) {
  return src([
    `${LIB_DIST}/es2015/${packageName}/**/*.js`,
    `${LIB_DIST}/es2015/${packageName}/**/*.metadata.json`,
    `${LIB_DIST}/es2015/${packageName}/**/*.shim.ngstyle.js.map`,
    `${LIB_DIST}/es2015/${packageName}/**/*.ngfactory.js.map`,
  ])
    .pipe(dest(path.join(LIB_DIR, packageName, 'esm2015')));
}

function copyTypings(packageName: string) {
  return src(`${LIB_DIST}/es5/${packageName}/**/*.d.ts`)
    .pipe(dest(path.join(LIB_DIR, packageName)));
}

function copyBootstrapStyles() {
  return src([
    `${BUILD_DIR}/bootstrap/**/*.html`,
    `${BUILD_DIR}/bootstrap/**/*.css`,
    `${BUILD_DIR}/bootstrap/**/*.scss`,
  ])
    .pipe(dest(path.join(LIB_DIR, 'bootstrap')));
}

function copyPackagesMetadata() {
  return src([
    `${BUILD_DIR}/**/LICENSE.txt`,
    `${BUILD_DIR}/**/README.md`,
    `${BUILD_DIR}/**/package.json`,
  ])
    .pipe(dest(path.join(LIB_DIR)));
}

function copyHtmlAndCss(packageName: string) {
  return [
    src([
      `${BUILD_DIR}/${packageName}/**/*.html`,
      `${BUILD_DIR}/${packageName}/**/*.css`,
      `${BUILD_DIR}/${packageName}/**/*.scss`,
    ])
      .pipe(dest(path.join(LIB_DIR, packageName))),

    src([
      `${BUILD_DIR}/${packageName}/components/**/*.html`,
      `${BUILD_DIR}/${packageName}/components/**/*.css`,
    ])
      .pipe(dest(path.join(LIB_DIR, packageName, 'esm2015', 'components'))),
  ];
}

function createTsconfig(target: string): string {
  const tsconfigPublish = createTsconfigContent(target);
  const tsconfigPath = path.join(BUILD_DIR, createTsconfigFileName(target));
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfigPublish, null, 2));

  return tsconfigPath;
}

function compileTarget(target: string) {
  const tsconfigPath: string = createTsconfig(target);
  compileTsconfig(tsconfigPath);
}

function compileTsconfig(tsconfigPath: string) {
  ngc(['-p', tsconfigPath]);
}

function createTsconfigFileName(target) {
  return `tsconfig.${target}.json`;
}

function inlineResources(packageName: string) {
  return copyResources(path.join(LIB_DIR, packageName));
}

