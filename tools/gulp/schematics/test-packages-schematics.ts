/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { dest, series, src, task } from 'gulp';
import { join } from 'path';
import { DIST_DIR, SOURCE_DIR, SCHEMATICS_SPEC_TSCONFIG } from '../config';
import { getPackagesWithSchematicsSpecs, schematicFilePaths, tsCompile } from './schematics-utils';

function compileForTest() {
  return Promise.all(
    getPackagesWithSchematicsSpecs().map((p) => {
      return tsCompile('tsc', ['-p', join(SOURCE_DIR, p, SCHEMATICS_SPEC_TSCONFIG)]);
    }),
  );
}

function copySchematicsResources() {
  const paths = getPackagesWithSchematicsSpecs().reduce((allPaths: string[], packageName: string) => {
    const basePath = `${SOURCE_DIR}/${packageName}/schematics`;
    const resourcesPaths = schematicFilePaths(basePath);
    resourcesPaths.push(join(SOURCE_DIR, packageName, 'package.json'));
    return allPaths.concat(resourcesPaths);
  }, []);

  return src(paths, { base: SOURCE_DIR }).pipe(dest(DIST_DIR));
}

task('build-packages-schematics-for-test', series(compileForTest, copySchematicsResources));
