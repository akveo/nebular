// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  const configuration = {
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-browserstack-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: { random: false },
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'lcovonly' }],
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessLocal'],
    singleRun: false,
    restartOnFileChange: true,
    customLaunchers: {
      ChromeHeadlessLocal: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--window-size=1024,768'],
      },
      BrowserstackChromeCI: {
        base: 'BrowserStack',
        browser: 'Chrome',
        version: 'latest',
        os: 'Windows',
        os_version: '10',
      },
    },
    browserStack: {
      project: 'Nebular Unit Tests',
      startTunnel: false,
      retryLimit: 1,
      timeout: 600,
      pollingTimeout: 20000,
      video: false,
    },
  };

  if (process.env['TRAVIS']) {
    const buildId = `TRAVIS #${process.env['TRAVIS_BUILD_NUMBER']} (${process.env['TRAVIS_BUILD_ID']})`;
    const key = require('./scripts/ci/browserstack/config');
    configuration.singleRun = true;
    configuration.reporters.push('BrowserStack');
    configuration.browserStack.build = buildId;
    configuration.browserStack.tunnelIdentifier = process.env['TRAVIS_JOB_ID'];
    configuration.browserStack.username = process.env['BROWSER_STACK_USERNAME'];
    configuration.browserStack.accessKey = key;
    configuration.browsers = ['BrowserstackChromeCI'];
  }

  config.set(configuration);
};
