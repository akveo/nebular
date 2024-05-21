/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { task } from 'gulp';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { isAbsolute, join, resolve, sep } from 'path';
import { structure as DOCS_STRUCTURE } from '../../../docs/structure';
import { DOCS_DIST } from '../config';
import { flatten, routesTree } from './docs-utils';

task('docs-copy-index', (done) => {
  const docsStructure = flatten('docs', routesTree(DOCS_STRUCTURE));
  createDirsStructure(docsStructure);

  done();
});

function createDirsStructure(dirs) {
  const index = readFileSync(join(DOCS_DIST, 'index.html'), 'utf8');
  dirs.forEach((dir: any) => {
    const fullPath = join(DOCS_DIST, dir);
    if (!existsSync(fullPath)) {
      mkDirByPathSync(fullPath);
    }

    writeFileSync(join(fullPath, 'index.html'), index);
  });
}

function mkDirByPathSync(targetDir) {
  const initDir = isAbsolute(targetDir) ? sep : '';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = resolve('.', parentDir, childDir);
    try {
      mkdirSync(curDir);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    return curDir;
  }, initDir);
}
