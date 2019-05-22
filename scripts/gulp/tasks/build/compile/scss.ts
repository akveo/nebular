import * as path from 'path';
import { dest, src, task } from 'gulp';
import * as sass from 'gulp-sass';

import { BUILD_DIR } from '../../config';

task('compile-scss', () => {
  return src(`${BUILD_DIR}/**/*.scss`)
    .pipe(sass({
      outputStyle: 'compressed',
      importer: function (url: any, _: any, done: any) {
        if (url[0] === '~') {
          url = path.resolve('node_modules', url.substr(1));
        }
        done({
          file: url,
        });
      },
    }))
    .pipe(dest(BUILD_DIR));
});
