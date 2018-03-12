import { dest, src, task } from 'gulp';

const bump = require('gulp-bump');
const VERSION = require('../../../package.json').version;

task('bump', () => {
  src([
    './package.json',
    './src/framework/theme/package.json',
    './src/framework/auth/package.json',
    './src/framework/security/package.json',
  ], { base: './' })
    .pipe(bump({
      version: VERSION,
    }))
    .pipe(dest('./'));
});
