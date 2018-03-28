import { dest, src, task } from 'gulp';
import { ROLLUP_COMMON_CONFIG } from './rollup-config';
import { LIB_DIR } from '../config';

const rollup = require('gulp-rollup');
const rename = require('gulp-rename');

task('bundle', ['bundle:umd:theme', 'bundle:umd:auth', 'bundle:umd:security']);
task('bundle:umd:theme', bundleUmdTheme);
task('bundle:umd:auth', bundleUmdAuth);
task('bundle:umd:security', bundleUmdSecurity);

function bundleUmdTheme() {
  const config = {
    src: `${LIB_DIR}/theme/**/*.js`,
    moduleName: 'nb.theme',
    entry: `${LIB_DIR}/theme/index.js`,
    format: 'umd',
    output: 'theme.umd.js',
    dest: `${LIB_DIR}/theme/bundles`,
  };

  bundle(config);
}

function bundleUmdAuth() {
  const config = {
    src: `${LIB_DIR}/auth/**/*.js`,
    moduleName: 'nb.auth',
    entry: `${LIB_DIR}/auth/index.js`,
    format: 'umd',
    output: 'auth.umd.js',
    dest: `${LIB_DIR}/auth/bundles`,
  };

  bundle(config);
}

function bundleUmdSecurity() {
  const config = {
    src: `${LIB_DIR}/security/**/*.js`,
    moduleName: 'nb.security',
    entry: `${LIB_DIR}/security/index.js`,
    format: 'umd',
    output: 'security.umd.js',
    dest: `${LIB_DIR}/security/bundles`,
  };

  bundle(config);
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

