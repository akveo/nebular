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
  '@angular/cdk/platform': 'ng.cdk.platform',
  '@angular/cdk/portal': 'ng.cdk.portal',
  '@angular/cdk/a11y': 'ng.cdk.a11y',
  '@angular/cdk/scrolling': 'ng.cdk.scrolling',
  '@angular/cdk/table': 'ng.cdk.table',
  '@angular/cdk/bidi': 'ng.cdk.bidi',
  '@angular/cdk/keycodes': 'ng.cdk.keycodes',


  // RxJS dependencies
  'rxjs': 'Rx',
  'rxjs/operators': 'Rx.operators',

  // 3rd party dependencies
  'intersection-observer': 'intersection-observer',

  // date libs for date service
  'moment': 'moment',
  'date-fns/parse': 'date-fns.parse',
  'date-fns/format': 'date-fns.format',
  'date-fns/getWeek': 'date-fns.getWeek',

  // @nebular dependencies
  '@nebular/theme': 'nb.theme',
  '@nebular/auth': 'nb.auth',
  '@nebular/security': 'nb.security',
  '@nebular/moment': 'nb.moment',
  '@nebular/date-fns': 'nb.date-fns',
  '@nebular/eva-icons': 'nb.eva-icons',

  'eva-icons': 'eva-icons',
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
