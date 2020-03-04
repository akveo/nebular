import { dest, src, task, series } from 'gulp';
import { BUILD_DIR, DEV_SCHEMATICS_PATH, JS_PACKAGES, LIB_DIR, SOURCE_DIR } from '../config';

task('copy-packages-resources', () => {
  return src([
    `${BUILD_DIR}/**/*.html`,
    `${BUILD_DIR}/**/*.css`,
    `${SOURCE_DIR}/**/*.scss`,
    `${SOURCE_DIR}/**/LICENSE.txt`,
    `${SOURCE_DIR}/**/README.md`,
    `${SOURCE_DIR}/**/package.json`,
    '!./**/dist/**/*',
  ])
    .pipe(dest(LIB_DIR));
});

task('copy-packages-schematics-resources', () => {
  const paths = JS_PACKAGES.reduce((allPaths: string[], packageName: string) => {
    return allPaths.concat(schematicFilePaths(`${SOURCE_DIR}/${packageName}/schematics`));
  }, []);

  return src(paths, { base: SOURCE_DIR }).pipe(dest(LIB_DIR));
});

task(
  'copy-packages-schematics-resources-for-test',
  series(
    'copy-packages-schematics-resources',
    () => {
      return src(
        JS_PACKAGES.map(packageName => `${SOURCE_DIR}/${packageName}/package.json`),
        { base: SOURCE_DIR },
      )
        .pipe(dest(LIB_DIR));
    },
  ),
);

task('copy-development-schematics-resources', () => {
  return src(schematicFilePaths(DEV_SCHEMATICS_PATH))
    .pipe(dest(`${DEV_SCHEMATICS_PATH}/dist`));
});

function schematicFilePaths(basePath: string): string[] {
  return [
    `${basePath}/**/*.json`,
    `${basePath}/**/files/**/*`,
    '!./**/dist/**/*',
  ];
}
