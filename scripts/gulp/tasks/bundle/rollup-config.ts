const resolve = require('rollup-plugin-node-resolve');

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
  '@angular/cdk/overlay': 'ng.cdk.overlay',
  '@angular/cdk/portal': 'ng.cdk.portal',
  '@angular/cdk/platform': 'ng.cdk.platform',


  // RxJS dependencies
  'rxjs': 'Rx',
  'rxjs/operators': 'Rx.operators',

  // 3rd party dependencies
  'intersection-observer': 'intersection-observer',

  // @nebular dependencies
  '@nebular/theme': 'nb.theme',
  '@nebular/auth': 'nb.auth',
  '@nebular/security': 'nb.security',
};

export const ROLLUP_COMMON_CONFIG = {
  sourceMap: true,
  rollup: require('rollup'),
  context: 'this',
  globals: ROLLUP_GLOBALS,
  external: Object.keys(ROLLUP_GLOBALS),
  plugins: [
    resolve({
      jsnext: true,
      main: true,
    }),
  ],
};
