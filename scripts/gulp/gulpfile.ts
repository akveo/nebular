/*
* TODO
* Take out tasks from gulpfile.
**/
const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const replace = require('gulp-replace');

const BUILD_DIR = './.ng_build';

import './tasks/inline-resources/inline-resources';
import './tasks/bundle/bundle';
import './tasks/docs/docs';
import './tasks/bump-versions';

gulp.task('copy-sources', copySources);
gulp.task('default', ['copy-sources']);
function copySources() {
  gulp.src('./src/framework/**/*')
    .pipe(gulp.dest(BUILD_DIR))
    .on('end', replaceScssWithCss);
}

function replaceScssWithCss() {
  gulp.src(`${BUILD_DIR}/**/*.ts`)
    .pipe(replace('.scss', '.css'))
    .pipe(gulp.dest(BUILD_DIR))
    .on('end', compileSass);
}

function compileSass() {
  gulp.src(`${BUILD_DIR}/**/*.scss`)
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
    .pipe(gulp.dest(BUILD_DIR));
}

