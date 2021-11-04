/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { task } from 'gulp';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { structure as DOCS_STRUCTURE } from '../../../docs/structure';
import { DOCS_DIR } from '../config';
import { flatten, routesTree } from './docs-utils';

task('create-docs-routes', (done) => {
  const docsStructure = flatten('docs', routesTree(DOCS_STRUCTURE));
  createRoutes(docsStructure);

  done();
});

function createRoutes(dirs) {
  writeFileSync(join(DOCS_DIR, 'routes.txt'), dirs.join('\r\n'));
}
