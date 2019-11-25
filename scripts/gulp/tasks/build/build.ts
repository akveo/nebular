import { task, src, dest, series } from 'gulp';

import { BUILD_DIR, SOURCE_DIR } from '../config';

task('copy-to-build-dir', () => {
  return src(`${SOURCE_DIR}/**/*`).pipe(dest(BUILD_DIR));
});

task(
  'build-js-packages',
  series(
    'compile-scss',
    'compile-packages',
    'copy-packages-resources',
    'bundle',
    'set-bundles-paths',
    done => done(),
  ),
);

task('build-packages-schematics',
  series(
    'compile-packages-schematics',
    'copy-packages-schematics-resources',
    done => done(),
  ),
);

task(
  'prepare-packages',
  series(
    'copy-to-build-dir',
    'build-js-packages',
    // copy non js packages
    'build-packages-schematics',
    done => done()),
);

task(
  'build-packages-schematics-for-test',
  series(
    'compile-packages-schematics-for-test',
    'copy-packages-schematics-resources-for-test',
    done => done(),
  ),
);

task(
  'build-development-schematics',
  series(
    'compile-development-schematics',
    'copy-development-schematics-resources',
    done => done(),
  ),
);
