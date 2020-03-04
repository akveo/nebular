import { dest, src, task, series } from 'gulp';

const fs = require('fs');
const through = require('through2');

const VERSION_APPENDIX = process.env.NEBULAR_VERSION_APPENDIX;
const VERSION = process.env.NEBULAR_VERSION || require('../../../package.json').version +
  (VERSION_APPENDIX ? '-' + VERSION_APPENDIX : '');
const FRAMEWORK_ROOT = './src/framework';

const EXCLUDE = [
  'icons',
];


task('version', series(
  ...getPackages().map((packagePath) => () => bumpVersionAndNebularPeers(packagePath)),
));

function getPackages(): string[] {
  return fs.readdirSync(FRAMEWORK_ROOT)
    .filter(keepNebularPackages)
    .map(createFullPathToPackageJson)
    .concat(['./package.json', './packages-smoke/package.json']);
}

function createFullPathToPackageJson(pkgName: string): string {
  return `${FRAMEWORK_ROOT}/${pkgName}/package.json`;
}

function keepNebularPackages(pkgPath: string): boolean {
  return !EXCLUDE.includes(pkgPath);
}

function bumpVersionAndNebularPeers(pkgPath: string) {
  return src(pkgPath, { base: './' })
    .pipe(through.obj(function (file, encoding, callback) {
      const pkgJson = JSON.parse(file.contents.toString(encoding));

      pkgJson.version = VERSION;
      if (pkgJson.peerDependencies) {
        Object.keys(pkgJson.peerDependencies)
          .filter(peer => peer.includes('@nebular'))
          .forEach(peer => pkgJson.peerDependencies[peer] = VERSION);
      }

      file.contents = Buffer.from(JSON.stringify(pkgJson, null, 2) + '\n');
      callback(null, file);
    }))
    .pipe(dest('./'));
}
