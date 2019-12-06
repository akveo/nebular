import { dest, src, task, parallel } from 'gulp';
import * as rollup from 'gulp-rollup';
import * as rename from 'gulp-rename';
import * as replace from 'gulp-replace';

import { JS_PACKAGES, LIB_DIR } from '../../config';
import { ROLLUP_COMMON_CONFIG } from './rollup-config';

for (const packageName of JS_PACKAGES) {
  task(`bundle:fesm2015:${packageName}`, () => bundleFesm2015Module(packageName));
  task(`bundle:fesm5:${packageName}`, () => bundleFesm5Module(packageName));
  task(`bundle:umd:${packageName}`, () => bundleUmdModule(packageName));
}

task(
  'bundle',
  parallel(
    ...JS_PACKAGES.map(packageName => `bundle:fesm2015:${packageName}`),
    ...JS_PACKAGES.map(packageName => `bundle:fesm5:${packageName}`),
    ...JS_PACKAGES.map(packageName => `bundle:umd:${packageName}`),
  ),
);

task('bundle:rename-dev', bundleRenameDev);

function bundleFesm2015Module(name: string) {
  return bundle({
    src: `${LIB_DIR}/${name}/esm2015/**/*.js`,
    moduleName: `nb.${name}`,
    entry: `${LIB_DIR}/${name}/esm2015/index.js`,
    format: 'es',
    output: `index.js`,
    dest: `${LIB_DIR}/${name}/fesm2015`,
  });
}

function bundleFesm5Module(name: string) {
  return bundle({
    src: `${LIB_DIR}/${name}/esm5/**/*.js`,
    moduleName: `nb.${name}`,
    entry: `${LIB_DIR}/${name}/esm5/index.js`,
    format: 'es',
    output: `index.js`,
    dest: `${LIB_DIR}/${name}/fesm5`,
  });
}

function bundleUmdModule(name: string) {
  return bundle({
    src: `${LIB_DIR}/${name}/esm5/**/*.js`,
    moduleName: `nb.${name}`,
    entry: `${LIB_DIR}/${name}/esm5/index.js`,
    format: 'umd',
    output: `${name}.umd.js`,
    dest: `${LIB_DIR}/${name}/bundles`,
  });
}

function bundle(config: any) {
  return src(config.src)
    .pipe(rollup(Object.assign({}, ROLLUP_COMMON_CONFIG, {
      moduleName: config.moduleName,
      entry: config.entry,
      format: config.format,
    })))
    .pipe(rename(config.output))
    .pipe(dest(config.dest));
}

function bundleRenameDev() {
  return src([
    `${LIB_DIR}/**/*.*`,
  ], { base: './' })
    .pipe(replace('@nebular', '@nebular-dev'))
    .pipe(dest('./'));
}

