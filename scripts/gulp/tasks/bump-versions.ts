import { dest, src, task } from 'gulp';

const modify = require('gulp-json-modify');

const VERSION_APPENDIX = process.env.NEBULAR_VERSION_APPENDIX;
const VERSION = process.env.NEBULAR_VERSION || require('../../../package.json').version +
  (VERSION_APPENDIX ? '-' + VERSION_APPENDIX : '');

task('bump', () => {
  src([
    './package.json',
    './src/framework/theme/package.json',
    './src/framework/auth/package.json',
    './src/framework/security/package.json',
  ], { base: './' })
    .pipe(modify({
      key: 'version',
      value: VERSION,
    }))
    .pipe(dest('./'));
});

task('bump-peer', () => {
  src([
    './src/framework/auth/package.json',
  ], { base: './' })
    .pipe(modify({
      key: 'peerDependencies.@nebular/theme',
      value: VERSION,
    }))
    .pipe(dest('./'));
});
