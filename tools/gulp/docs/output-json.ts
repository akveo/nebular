/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { series, src } from 'gulp';
import { exec } from 'child_process';
const typedoc = require('gulp-typedoc');
const sass = require('gulp-sass')(require('sass'));
import { getExportFunction } from './sass-export';

export const generateOuputJson = series(jsdoc, prsr, parseThemes);

function jsdoc() {
  return src(['src/framework/**/*.ts', '!src/**/*.spec.ts', '!src/framework/theme/**/node_modules{,/**}']).pipe(
    typedoc({
      module: 'commonjs',
      target: 'ES6',
      // TODO: ignoreCompilerErrors, huh?
      ignoreCompilerErrors: true,
      includeDeclarations: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      excludeExternals: true,
      exclude: 'node_modules/**/*',
      json: 'docs/docs.json',
      version: true,
      noLib: true,
    }),
  );
}

function prsr() {
  return exec('prsr -g typedoc -f angular -i docs/docs.json -o docs/output.json');
}

export function parseThemes() {
  return src('docs/themes.scss').pipe(
    sass({
      functions: getExportFunction('docs/'),
    }),
  );
}
