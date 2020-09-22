import { spawn } from 'child_process';
import { resolve as resolvePath } from 'path';
import { dest, series, src, task } from 'gulp';
import * as replace from 'gulp-replace';
import * as log from 'fancy-log';

import { createTsConfigEsm2015, createTsConfigEsm5 } from './ts-configs';
import { BUILD_DIR, DEV_SCHEMATICS_PATH, JS_PACKAGES } from '../../config';

task('compile-packages-schematics', () => {
  return tsCompile('tsc', ['-p', 'tsconfig.schematics.publish.json']);
});

task('compile-packages-schematics-for-test', () => {
  return tsCompile('tsc', ['-p', 'tsconfig.schematics.json']);
});

task('compile-development-schematics', () => {
  return tsCompile('tsc', ['-p', `${DEV_SCHEMATICS_PATH}/tsconfig.json`]);
});

task('replace-scss-with-css', () => {
  return src(`${BUILD_DIR}/**/*.ts`)
    .pipe(replace('.scss', '.css'))
    .pipe(dest(BUILD_DIR));
});

for (const packageName of JS_PACKAGES) {
  task(`compile-${packageName}`, () => {
    const esm2015configFileName = createTsConfigEsm2015(packageName);
    const esm5configFileName = createTsConfigEsm5(packageName);

    return Promise.all([
      tsCompile('ngc', ['-p', esm2015configFileName]),
      tsCompile('ngc', ['-p', esm5configFileName]),
    ]);
  });
}

task(
  'compile-packages',
  series(
    'replace-scss-with-css',
    // theme package should be built first so then we can direct other dependant packages
    // to the theme typings
    'compile-theme',
    ...JS_PACKAGES.filter(p => p !== 'theme')
      .map(p => `compile-${p}`),
    done => done(),
  ),
);

// github.com/angular/components/blob/3a237bd254cd3c02a913e3cd2faef8546203c252/tools/package-tools/ts-compile.ts#L11
function tsCompile(binary: 'ngc' | 'tsc', flags: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const binaryPath = resolvePath(`./node_modules/.bin/${binary}`);
    const childProcess = spawn(binaryPath, flags, {shell: true});

    childProcess.stdout.on('data', (data: string|Buffer) => log(`${data}`));
    childProcess.stderr.on('data', (data: string|Buffer) => log.error(`${data}`));
    childProcess.on('exit', (exitCode: number) => {
      exitCode === 0 ? resolve() : reject(`${binary} compilation failure`);
    });
  });
}
