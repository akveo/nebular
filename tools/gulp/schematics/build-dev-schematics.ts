/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { dest, series, src, task } from 'gulp';
import { join } from 'path';
import { DEV_SCHEMATICS_PATH } from '../config';
import { schematicFilePaths, tsCompile } from './schematics-utils';

function compile() {
  return tsCompile('tsc', ['-p', join(DEV_SCHEMATICS_PATH, 'tsconfig.json')]);
}

function copyResources() {
  return src(schematicFilePaths(DEV_SCHEMATICS_PATH)).pipe(dest(`${DEV_SCHEMATICS_PATH}/dist`));
}

task('build-development-schematics', series(compile, copyResources));
