/*
* TODO
* Take out tasks from gulpfile.
**/
const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const replace = require('gulp-replace');
const typedoc = require('gulp-typedoc');
const exec = require('child_process').execSync;
const export_sass = require('../export-themes');

const BUILD_DIR = './.ng_build';

import './tasks/bundle';
import './tasks/bump-versions';
import './tasks/inline-resources';

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

gulp.task('generate-doc-json', generateDocJson);
function generateDocJson() {
  return gulp
    .src(['src/framework/**/*.ts', '!src/framework/theme/**/node_modules{,/**}'])
    .pipe(typedoc({
      module: 'commonjs',
      target: 'ES6',
      // TODO: ignoreCompilerErrors, huh?
      ignoreCompilerErrors: true,
      includeDeclarations: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      excludeExternals: true,
      exclude: 'node_modules/**/*',
      json: 'docs/docs.json',
      version: true,
      noLib: true,
    }));
}

gulp.task('docs', ['generate-doc-json'], parseSassThemes);
function parseSassThemes() {
  exec("prsr -g typedoc -f angular -i docs/docs.json -o docs/output.json");
  return gulp
    .src('docs/themes.scss')
    .pipe(sass({
      functions: export_sass('docs/'),
    }));
}
