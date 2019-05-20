import { dest, src, task } from 'gulp';
import { BUILD_DIR, JS_PACKAGES, LIB_DIR, SOURCE_DIR } from './config';

task('copy-resources', () => {
  for (const packageName of JS_PACKAGES) {
    src([
      `${BUILD_DIR}/**/*.html`,
      `${BUILD_DIR}/**/*.css`,
      `${SOURCE_DIR}/**/*.scss`,
      `${SOURCE_DIR}/**/LICENSE.txt`,
      `${SOURCE_DIR}/**/README.md`,
      `${SOURCE_DIR}/**/package.json`,
      `${SOURCE_DIR}/**/schematics/**/*.json`,
      '!./**/dist/**/*',
    ])
      .pipe(dest(`${LIB_DIR}`));
  }
});
