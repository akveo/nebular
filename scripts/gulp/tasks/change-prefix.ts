import { dest, src, task } from 'gulp';
import * as replace from 'gulp-replace';
import * as minimist from 'minimist';
import * as runSequence from 'run-sequence';
import { BUILD_DIR, LIB_DIR } from './config';
import { tsCompile } from './build/compile/typescript';
import { writeFileSync } from 'fs';
import { bundleFesm2015Module, bundleFesm5Module, bundleUmdModule } from './build/bundle/bundle';
import { setBundlesPathStream } from './build/bundle/bundles-paths';

const THEME_SRC_DIR = './src/framework/theme/**/*';

interface ChangePrefixArguments {
  prefix: string;
  packageName: string;
}

/**
 * Reads package prefix and custom theme package name passed as command line arguments.
 * List of supported arguments:
 * --prefix        - prefix for class names, selector prefixes etc.
 * --package-name  - replacement for @nebular/theme
 * @returns ParsedArguments
 */
function getArguments(): ChangePrefixArguments {
  const args = minimist(process.argv.slice(2));
  return { prefix: args.prefix, packageName: args['package-name'] || args.prefix };
}

/**
 * Replaces Nebular prefixes with custom one and builds theme package
 * with custom package name. Custom prefix and package name are passed as command line arguments.
 * See full list of arguments in `parseArguments` doc comment.
 *
 * This task not mean to be used directly. Rather you should use following command:
 * `$npm run build:custom-prefix -- --prefix @custom-prefix --package-name @package-name`.
 * It will create ready to publish bundle for theme package in `src/.lib/[package-name]` directory.
 */
task('custom-theme-prefix', (done) => {
  runSequence(
    'copy-to-build-dir:custom-theme',
    'change-prefix',
    'compile-scss',
    'replace-scss-with-css',
    'compile:custom-theme',
    'copy-custom-theme-resources',
    'bundle:custom-theme',
    'set-bundle-paths',
    done,
  );
});

task('copy-to-build-dir:custom-theme', () => {
  const { packageName }: ChangePrefixArguments = getArguments();
  return src([THEME_SRC_DIR]).pipe(dest(`${BUILD_DIR}/${packageName}`));
});

task('change-prefix', () => {
  const { packageName, prefix }: ChangePrefixArguments = getArguments();

  if (!prefix) {
    throwNoPrefixSpecified();
  }

  const replacePairs = generatePrefixes(prefix);
  let stream = src(`${BUILD_DIR}/**/*`);

  for (const [ oldPrefix, newPrefix ] of replacePairs) {
    stream = stream.pipe(replace(oldPrefix, newPrefix));
  }

  return stream
    .pipe(replace('nebular/theme', packageName))
    .pipe(dest(BUILD_DIR));
});

task(`compile:custom-theme`, () => {
  const { packageName } = getArguments();
  const esm2015configFileName = createCustomTsConfigEsm2015(packageName);
  const esm5configFileName = createCustomTsConfigEsm5(packageName);

  return Promise.all([
    tsCompile('ngc', ['-p', esm2015configFileName]),
    tsCompile('ngc', ['-p', esm5configFileName]),
  ]);
});

task(`bundle:custom-theme`, () => {
  const { packageName } = getArguments();
  bundleFesm2015Module(packageName);
  bundleFesm5Module(packageName);
  bundleUmdModule(packageName);
});

task('copy-custom-theme-resources', () => {
  const { packageName } = getArguments();
  return src([
    `${BUILD_DIR}/${packageName}/**/*.html`,
    `${BUILD_DIR}/${packageName}/**/*.css`,
    `${BUILD_DIR}/${packageName}/**/*.scss`,
    `${BUILD_DIR}/${packageName}/**/package.json`,
    `${BUILD_DIR}/${packageName}/**/LICENSE.txt`,
    `${BUILD_DIR}/${packageName}/**/README.md`,
    '!./**/dist/**/*',
  ])
    .pipe(dest(`${LIB_DIR}/${packageName}`));
});

task('set-bundle-paths', () => {
  const { packageName } = getArguments();
  return src(
    `${LIB_DIR}/${packageName}/package.json`,
    { base: LIB_DIR },
  )
    .pipe(setBundlesPathStream())
    .pipe(dest(LIB_DIR));
});

function generatePrefixes(prefix: string): string[][] {
  return [
    [ 'nb', prefix.toLowerCase() ],
    [ 'NB', prefix.toUpperCase() ],
    [ 'Nb', prefix[0].toUpperCase() + prefix.slice(1).toLowerCase() ],
  ];
}

function createCustomTsConfigEsm2015(packageName): string {
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
    "flatModuleId": "${packageName}"
  }
}`;

  const configName = `tsconfig.build-esm2015-custom.json`;
  writeFileSync(configName, config);

  return configName;
}

function createCustomTsConfigEsm5(packageName): string {
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
    "flatModuleId": "${packageName}"
  }
}`;

  const configName = `tsconfig.build-esm5-custom.json`;
  writeFileSync(configName, config);

  return configName;
}


function throwNoPrefixSpecified() {
  throw new Error(`--prefix parameter must be specified`);
}
