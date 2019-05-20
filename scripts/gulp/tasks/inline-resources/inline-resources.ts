import { dest, src, task } from 'gulp';
import { copyResources } from './copy-resources';
import { BUILD_DIR, LIB_DIR } from '../config';

task('inline-resources', () => {
  return Promise.all([
      movePackageFiles(),
      copyResources(BUILD_DIR),
    ]);
});

function movePackageFiles() {
  return new Promise((resolve) => {
    src([
      `${BUILD_DIR}/theme/package.json`,
      `${BUILD_DIR}/theme/LICENSE.txt`,
      `${BUILD_DIR}/theme/README.md`,
    ])
      .pipe(dest(`${LIB_DIR}/theme/`))
      .on('end', resolve);
  });
}

task('inline-schematics-resources', () => {
  src([
    `./src/framework/**/schematics/**/*.json`,
    `./src/framework/**/package.json`,
  ]).pipe(dest(LIB_DIR));
});
