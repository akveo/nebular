import { dest, src, task } from 'gulp';
import { ROLLUP_COMMON_CONFIG } from './rollup-config';
import { LIB_DIR } from '../config';

const rollup = require('gulp-rollup');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

task('bundle', [
  'bundle:umd:theme',
  'bundle:umd:auth',
  'bundle:umd:security',
  'bundle:umd:moment',
  'bundle:umd:date-fns',
  'bundle:umd:eva-icons',
]);

task('bundle:umd:theme', () => bundleUmdModule('theme'));
task('bundle:umd:auth', () => bundleUmdModule('auth'));
task('bundle:umd:security', () => bundleUmdModule('security'));
task('bundle:umd:moment', () => bundleUmdModule('moment'));
task('bundle:umd:date-fns', () => bundleUmdModule('date-fns'));
task('bundle:umd:eva-icons', () => bundleUmdModule('eva-icons'));
task('bundle:rename-dev', bundleRenameDev);

function bundleUmdModule(name: string) {
  bundle({
    src: `${LIB_DIR}/${name}/**/*.js`,
    moduleName: `nb.${name}`,
    entry: `${LIB_DIR}/${name}/index.js`,
    format: 'umd',
    output: `${name}.umd.js`,
    dest: `${LIB_DIR}/${name}/bundles`,
  });
}

function bundle(config: any) {
  src(config.src)
    .pipe(rollup(Object.assign({}, ROLLUP_COMMON_CONFIG, {
      moduleName: config.moduleName,
      entry: config.entry,
      format: config.format,
    })))
    .pipe(rename(config.output))
    .pipe(dest(config.dest));
}

function bundleRenameDev() {
  src([
    `${LIB_DIR}/**/*.*`,
  ], { base: './' })
    .pipe(replace('@nebular', '@nebular-dev'))
    .pipe(dest('./'));
}

