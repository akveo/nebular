import { task, src, dest } from 'gulp';
import * as runSequence from 'run-sequence';

import { BUILD_DIR, SOURCE_DIR } from '../config';

task('prepare-packages', (done) => {
  runSequence(
    'copy-to-build-dir',
    'build-js-packages',
    // copy non js packages

    'build-packages-schematics',

    done,
  );
});

task('copy-to-build-dir', () => {
  return src(`${SOURCE_DIR}/**/*`).pipe(dest(BUILD_DIR));
});

task('build-js-packages', (done) => {
  runSequence(
    'compile-scss',
    'compile-packages',
    'copy-packages-resources',
    'bundle',
    'set-bundles-paths',
    done,
  );
});

task('build-packages-schematics', (done) => {
  runSequence(
    'compile-packages-schematics',
    'copy-packages-schematics-resources',
    done,
  );
});

task('build-packages-schematics-for-test', (done) => {
  runSequence(
    'compile-packages-schematics-for-test',
    'copy-packages-schematics-resources-for-test',
    done,
  );
});

task('build-development-schematics', (done) => {
  runSequence(
    'compile-development-schematics',
    'copy-development-schematics-resources',
    done,
  );
});
