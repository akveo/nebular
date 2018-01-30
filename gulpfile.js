const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const replace = require('gulp-replace');
const rollup = require('gulp-rollup');
const rename = require('gulp-rename');
const resolve = require('rollup-plugin-node-resolve');
const semver = require('semver');
const bump = require('gulp-bump');
var typedoc = require('gulp-typedoc');
var exec = require('child_process').execSync;
const VERSION = require('./package.json').version;
var export_sass = require('./scripts/export-themes');
const inline_resources = require('./scripts/inline-resources');

const BUILD_DIR = './.ng_build';
const LIB_DIR = './src/.lib';
const ROLLUP_GLOBALS = {
  'tslib': 'tslib',

  // Angular dependencies
  '@angular/animations': 'ng.animations',
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/forms': 'ng.forms',
  '@angular/common/http': 'ng.common.http',
  '@angular/router': 'ng.router',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-server': 'ng.platformServer',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
  '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
  '@angular/core/testing': 'ng.core.testing',
  '@angular/common/testing': 'ng.common.testing',
  '@angular/common/http/testing': 'ng.common.http.testing',


  // RxJS dependencies
  'rxjs/BehaviorSubject': 'Rx',
  'rxjs/ReplaySubject': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/Subscription': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subscriber': 'Rx',
  'rxjs/Scheduler': 'Rx',

  'rxjs/observable/combineLatest': 'Rx.Observable',
  'rxjs/observable/forkJoin': 'Rx.Observable',
  'rxjs/observable/fromEvent': 'Rx.Observable',
  'rxjs/observable/merge': 'Rx.Observable',
  'rxjs/observable/of': 'Rx.Observable',
  'rxjs/observable/throw': 'Rx.Observable',
  'rxjs/observable/defer': 'Rx.Observable',
  'rxjs/observable/fromEventPattern': 'Rx.Observable',
  'rxjs/observable/empty': 'Rx.Observable',

  'rxjs/operators/debounceTime': 'Rx.operators',
  'rxjs/operators/takeUntil': 'Rx.operators',
  'rxjs/operators/take': 'Rx.operators',
  'rxjs/operators/first': 'Rx.operators',
  'rxjs/operators/filter': 'Rx.operators',
  'rxjs/operators/map': 'Rx.operators',
  'rxjs/operators/tap': 'Rx.operators',
  'rxjs/operators/startWith': 'Rx.operators',
  'rxjs/operators/auditTime': 'Rx.operators',
  'rxjs/operators/switchMap': 'Rx.operators',
  'rxjs/operators/finalize': 'Rx.operators',
  'rxjs/operators/catchError': 'Rx.operators',
  'rxjs/operators/share': 'Rx.operators',
  'rxjs/operators/delay': 'Rx.operators',
  'rxjs/operators/combineLatest': 'Rx.operators',
  'rxjs/operators/pairwise': 'Rx.operators',
  'rxjs/operators/distinctUntilChanged': 'Rx.operators',
  'rxjs/operators/takeWhile': 'Rx.operators',

  // 3rd party dependencies

  // @nebular dependencies
  '@nebular/theme': 'nb.theme',
  '@nebular/auth': 'nb.auth',
};
const ROLLUP_COMMON_CONFIG = {
  sourceMap: true,
  rollup: require('rollup'),
  context: 'this',
  globals: ROLLUP_GLOBALS,
  external: Object.keys(ROLLUP_GLOBALS),
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
  ],
};

gulp.task('copy-sources', copySources);
gulp.task('default', ['copy-sources']);
gulp.task('inline-resources', copyResources);
gulp.task('bundle:umd:theme', bundleUmdTheme);
gulp.task('bundle:umd:auth', bundleUmdAuth);
gulp.task('bundle', ['bundle:umd:theme', 'bundle:umd:auth']);
gulp.task('bump', bumpVersions);

function bumpVersions() {
  gulp.src(['./package.json', './src/framework/theme/package.json', './src/framework/auth/package.json'], {base: './'})
    .pipe(bump({
      version: VERSION
    }))
    .pipe(gulp.dest('./'));
}

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
      importer: function (url, prev, done) {
        if (url[0] === '~') {
          url = path.resolve('node_modules', url.substr(1));
        }
        done({
          file: url
        });
      }
    }))
    .pipe(gulp.dest(BUILD_DIR));
}

function copyResources() {
  gulp.src([
      `${BUILD_DIR}/**/*.html`,
      `${BUILD_DIR}/**/*.css`,
      `${BUILD_DIR}/**/*.scss`,
      `${BUILD_DIR}/**/LICENSE.txt`,
      `${BUILD_DIR}/**/README.md`,
      `${BUILD_DIR}/**/package.json`,
    ])
    .pipe(gulp.dest(LIB_DIR))
    .on('end', inlineResources);
}

function inlineResources() {
  inline_resources(LIB_DIR);
}

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

function bundle(config) {
  gulp.src(config.src)
    .pipe(rollup(Object.assign({}, ROLLUP_COMMON_CONFIG, {
      moduleName: config.moduleName,
      entry: config.entry,
      format: config.format,
    })))
    .pipe(rename(config.output))
    .pipe(gulp.dest(config.dest));
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
      noLib: true
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
