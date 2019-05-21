import { dest, src, task } from 'gulp';
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
    const packagePaths = schematicFilePaths(`${SOURCE_DIR}/${packageName}/schematics`);

    return allPaths.concat(packagePaths);
  }, []);

  return src(paths, { base: SOURCE_DIR }).pipe(dest(LIB_DIR));
});

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
