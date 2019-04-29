import { dest, src, task } from 'gulp';
import * as path from 'path';
import { BUILD_DIR } from './config';

const sass = require('gulp-sass');
const replace = require('gulp-replace');

task('copy-sources', () => {
  src('./src/framework/**/*')
    .pipe(dest(BUILD_DIR))
    .on('end', replaceScssWithCss);
});

task('copy-schematics', () => {
  src([
    './schematics/**/*.json',
    './schematics/**/files/**/*',
    '!./schematics/dist/**/*',
  ])
    .pipe(dest('./schematics/dist/'));
});

export function replaceScssWithCss() {
  src(`${BUILD_DIR}/**/*.ts`)
    .pipe(replace('.scss', '.css'))
    .pipe(dest(BUILD_DIR))
    .on('end', compileSass);
}

function compileSass() {
  src(`${BUILD_DIR}/**/*.scss`)
    .pipe(sass({
      outputStyle: 'compressed',
      importer: function (url: any, _: any, done: any) {
        if (url[0] === '~') {
          url = path.resolve('node_modules', url.substr(1));
        }
        done({
          file: url,
        });
      },
    }))
    .pipe(dest(BUILD_DIR));
}

