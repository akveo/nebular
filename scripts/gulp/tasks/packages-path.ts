import * as through from 'through2';
import { dest, src, task } from 'gulp';

import { JS_PACKAGES, LIB_DIR } from './config';

function setPackagePathStream(packageName) {
  return through.obj(function (file, encoding, callback) {
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

function setBundlePaths() {
  JS_PACKAGES.forEach(packageName => {
    const packagePath = `${LIB_DIR}/${packageName}`;

    src(`${packagePath}/package.json`)
      .pipe(setPackagePathStream(packageName))
      .pipe(dest(packagePath));
  });
}

task('set-bundles-paths', setBundlePaths);
