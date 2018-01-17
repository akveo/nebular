// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  const configuration = {
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-sauce-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessLocal'],
    customLaunchers: {
      ChromeHeadlessLocal: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--window-size=1024,768'
        ]
      },
      ChromeCI: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: 'latest'
      }
    },
    browserConsoleLogOptions: {
      terminal: true,
      level: 'log'
    },
    sauceLabs: {
      testName: 'Nebular Unit Tests',
      startConnect: false,
      recordVideo: false,
      recordScreenshots: false,
      idleTimeout: 600,
      commandTimeout: 600,
      maxDuration: 5400
    },
    singleRun: false
  };

  if (process.env['TRAVIS']) {

    const key = require('./scripts/ci/sauce/config');

    configuration.reporters.push('saucelabs');
    configuration.sauceLabs.build = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;
    configuration.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_ID;
    configuration.sauceLabs.username = process.env['SAUCE_USERNAME'];
    configuration.sauceLabs.accessKey = key;
    configuration.browsers = ['ChromeCI'];
  }
  config.set(configuration);
};
