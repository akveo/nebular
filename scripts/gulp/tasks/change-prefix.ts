import { dest, src, task } from 'gulp';
import * as rename from 'gulp-rename';
import * as replace from 'gulp-replace';
import * as minimist from 'minimist';

import { BUILD_DIR } from './config';
import { replaceScssWithCss } from './copy-sources';

const THEME_SRC_DIR = './src/framework/theme/**/*';
const THEME_BUILD_DIR = `${BUILD_DIR}/theme`;

interface ChangePrefixArguments {
  prefix: string;
  packageName: string;
}

function getArguments(): ChangePrefixArguments {
  const args = minimist(process.argv.slice(2));
  return { prefix: args.prefix, packageName: args['package-name'] || args.prefix };
}

function generatePrefixes(prefix: string): string[][] {
  return [
    [ 'nb', prefix.toLowerCase() ],
    [ 'NB', prefix.toUpperCase() ],
    [ 'Nb', prefix[0].toUpperCase() + prefix.slice(1).toLowerCase() ],
  ];
}

task('copy-theme', () => {
  return src([THEME_SRC_DIR]).pipe(dest(THEME_BUILD_DIR));
});

task('create-ts-config', () => {
  const { prefix, packageName }: ChangePrefixArguments = getArguments();

  if (!prefix) {
    throwNoPrefixSpecified();
  }

  return src('tsconfig.publish.json')
    .pipe(replace('nebular/theme', packageName))
    .pipe(rename('tsconfig-custom.publish.json'))
    .pipe(dest('.'));
});

task('change-prefix', ['copy-theme', 'create-ts-config'], () => {
  const { packageName, prefix }: ChangePrefixArguments = getArguments();

  if (!prefix) {
    throwNoPrefixSpecified();
  }

  const replacePairs = generatePrefixes(prefix);
  let stream = src(`${THEME_BUILD_DIR}/**/*`);

  for (const [ oldPrefix, newPrefix ] of replacePairs) {
    stream = stream.pipe(replace(oldPrefix, newPrefix));
  }

  return stream
    .pipe(replace('nebular/theme', packageName))
    .pipe(dest(THEME_BUILD_DIR))
    .on('end', replaceScssWithCss);
});

function throwNoPrefixSpecified() {
  throw new Error(`--prefix parameter must be specified`);
}
