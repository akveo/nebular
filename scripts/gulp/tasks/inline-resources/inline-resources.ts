import { dest, src, task } from 'gulp';
import { LIB_DIR } from '../config';


task('inline-schematics-resources', () => {
  src([
    `./src/framework/**/schematics/**/*.json`,
    `./src/framework/**/package.json`,
  ]).pipe(dest(LIB_DIR));
});
