import { basename, dirname } from 'path';
import * as through from 'through2';
import { dest, src, task } from 'gulp';

import { JS_PACKAGES, LIB_DIR } from '../../config';

task('set-bundles-paths', () => {
  return src(
    JS_PACKAGES.map(packageName => `${LIB_DIR}/${packageName}/package.json`),
    { base: LIB_DIR },
  )
    .pipe(setBundlesPathStream())
    .pipe(dest(LIB_DIR));
});

function setBundlesPathStream() {
  return through.obj(function (file, encoding, callback) {
    const packageName = basename(dirname(file.path));
    const packageJson = JSON.parse(file.contents.toString(encoding));

    packageJson['main'] = `bundles/${packageName}.umd.js`;
    packageJson['module'] = 'fesm5/index.js';
    packageJson['es2015'] = 'fesm2015/index.js';
    packageJson['esm5'] = 'esm5/index.js';
    packageJson['esm2015'] = 'esm2015/index.js';
    packageJson['fesm5'] = 'fesm5/index.js';
    packageJson['fesm2015'] = 'fesm2015/index.js';
    packageJson['typings'] = 'index.d.ts';
    packageJson['metadata'] = 'index.metadata.json';

    file.contents = Buffer.from(JSON.stringify(packageJson, null, 2) + '\n');
    callback(null, file);
  });
}
