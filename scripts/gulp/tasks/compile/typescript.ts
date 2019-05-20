import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import { dest, src, task } from 'gulp';
import { resolve as resolvePath } from 'path';
import * as runSequence from 'run-sequence';
import { BUILD_DIR, JS_PACKAGES } from '../config';
const replace = require('gulp-replace');
const log = require('fancy-log');

const packagesBuildTasks = JS_PACKAGES.map(packageName => `build-${packageName}`);

task('replace-scss-with-css', function replaceScssWithCss() {
  src(`${BUILD_DIR}/**/*.ts`)
    .pipe(replace('.scss', '.css'))
    .pipe(dest(BUILD_DIR));
});

task('compile-ts', ['replace-scss-with-css'], (done) => {
  runSequence(
    'create-ts-configs',
    'build-theme',
    // theme package should be built first so then we can direct other dependant packages
    // to the theme typings
    packagesBuildTasks.filter(p => p !== 'build-theme'),
    done,
  );
});

task('create-ts-configs', (done) => {
  JS_PACKAGES.forEach((packageName: string) => {
    createTsConfigEsm2015(packageName);
    createTsConfigEsm5(packageName);
  });
  done();
});

packagesBuildTasks.forEach((taskName, i) => {
  const packageName = JS_PACKAGES[i];
  task(taskName, packageBuildTask(packageName));
});

function packageBuildTask(packageName: string): () => Promise<any> {
  return () => {
    return Promise.all([
      tsCompile('ngc', ['-p', getPackageEsm2015TsConfigFileName(packageName), '--showConfig']),
      tsCompile('ngc', ['-p', getPackageEsm5TsConfigFileName(packageName), '--showConfig']),
    ]);
  };
}

// github.com/angular/components/blob/3a237bd254cd3c02a913e3cd2faef8546203c252/tools/package-tools/ts-compile.ts#L11
export function tsCompile(binary: 'ngc' | 'tsc', flags: string[]): Promise<void> {
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

function getPackageEsm2015TsConfigFileName(packageName: string): string {
  return `tsconfig.build-esm2015.${packageName}.json`;
}

function getPackageEsm5TsConfigFileName(packageName: string): string {
  return `tsconfig.build-esm5.${packageName}.json`;
}

function createTsConfigEsm2015(packageName) {
  const config = `{
  "extends": "./tsconfig.publish",
  "compilerOptions": {
    "outDir": "./src/.lib/${packageName}/esm2015",
    "declaration": true,
    "declarationDir": "./src/.lib/${packageName}",
    "rootDir": "./.ng_build/${packageName}"
  },
  "files": ["./.ng_build/${packageName}/public_api.ts"],
  "angularCompilerOptions": {
    "skipTemplateCodegen": true,
    "strictMetadataEmit": true,
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true,
    "enableResourceInlining": true,
    "skipMetadataEmit": false,
    "strictTypeChecks": true,
    "flatModuleOutFile": "index.js",
    "flatModuleId": "@nebular/${packageName}"
  }
}`;

  writeConfig(getPackageEsm2015TsConfigFileName(packageName), config);
}

function createTsConfigEsm5(packageName) {
  const config = `
{
  "extends": "./tsconfig.publish",
  "compilerOptions": {
    "outDir": "./src/.lib/${packageName}/esm5",
    "declaration": false,
    "target": "es5",
    "rootDir": "./.ng_build/${packageName}"
  },
  "files": ["./.ng_build/${packageName}/public_api.ts"],
  "angularCompilerOptions": {
    "skipTemplateCodegen": true,
    "strictMetadataEmit": false,
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true,
    "enableResourceInlining": true,
    "skipMetadataEmit": true,
    "strictTypeChecks": true,
    "flatModuleOutFile": "index.js",
    "flatModuleId": "@nebular/${packageName}"
  }
}`;

  writeConfig(getPackageEsm5TsConfigFileName(packageName), config);
}

function writeConfig(fileName: string, config: string): void {
  writeFileSync(fileName, config);
}
