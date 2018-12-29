import { dest, src, task } from 'gulp';
import { copyResources } from './copy-resources';
import { BUILD_DIR, LIB_DIR } from '../config';
import * as path from 'path';

const packages = [
  'theme',
  'auth',
  'date-fns',
  'moment',
  'security',
];


function inlineResources(packageName: string) {
  return [
    copyResources(path.join(LIB_DIR, packageName, 'esm5', 'components')),
    copyResources(path.join(LIB_DIR, packageName, 'esm2015', 'components')),
  ];
}

task('inline-resources', ['inline-schematics-resources'], () => {
  return packages.map(packageName => {
    inlineResources(packageName);
  });
});

task('inline-schematics-resources', () => {
  src([
    `./src/framework/**/schematics/**/*.json`,
    `./src/framework/**/package.json`,
  ]).pipe(dest(LIB_DIR));
});
