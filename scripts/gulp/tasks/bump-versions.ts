import { dest, src, task } from 'gulp';

const modify = require('gulp-json-modify');
const seq = require('gulp-sequence');

const VERSION_APPENDIX = process.env.NEBULAR_VERSION_APPENDIX;
const VERSION = process.env.NEBULAR_VERSION || require('../../../package.json').version +
  (VERSION_APPENDIX ? '-' + VERSION_APPENDIX : '');

task('version', seq('bump', 'bump-peer'));

task('bump', () => {
  return bumpVersion([
    './package.json',
    './src/framework/theme/package.json',
    './src/framework/auth/package.json',
    './src/framework/security/package.json',
    './src/framework/bootstrap/package.json',
  ]);
});

task('bump-peer', seq('bump-theme', 'bump-bootstrap'));

task('bump-theme', () => {
  return bumpPeer([
    './src/framework/auth/package.json',
    './src/framework/bootstrap/package.json',
  ], 'theme');
});

task('bump-bootstrap', () => {
  return bumpPeer(['./src/framework/auth/package.json'], 'bootstrap');
});

function bumpPeer(packages: string[], peer: string) {
  return bump(packages, `peerDependencies.@nebular/${peer}`);
}

function bumpVersion(packages: string[]) {
  return bump(packages, 'version');
}

function bump(packages: string[], key: string) {
  return src(packages, { base: './' })
    .pipe(modify({ key, value: VERSION }))
    .pipe(dest('./'));
}
