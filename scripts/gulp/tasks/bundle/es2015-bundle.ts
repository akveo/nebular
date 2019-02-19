import { dest, src, task } from 'gulp';
import { ES_2015_LIB_DIR, JS_PACKAGES, LIB_DIR } from '../config';

task('move-es2015-bundle', () => {
  return Promise.all(JS_PACKAGES.map((packageName) => {
    return src([`${ES_2015_LIB_DIR}/${packageName}/**`])
      .pipe(dest(`${LIB_DIR}/${packageName}/es2015`));
  }));
});
