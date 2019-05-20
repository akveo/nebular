import { task, src, dest } from 'gulp';
import * as runSequence from 'run-sequence';

import { BUILD_DIR, SOURCE_DIR } from './config';

task('build-packages', (done) => {
  runSequence(
    'copy-packages-to-build-dir',
    'compile-scss',
    'compile-ts',
    'copy-resources',
    'bundle',
    'set-bundles-paths',
    // 'build-schematics',
    done,
  );
});

task('copy-packages-to-build-dir', () => {
  return src(`${SOURCE_DIR}/**/*`).pipe(dest(BUILD_DIR));
});
