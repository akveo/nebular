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
    client:{
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
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessLocal: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--window-size=1024,768'
        ]
      },
      ChromeHeadlessCI: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: 'latest'
      },
    },
    browserConsoleLogOptions: {
      terminal: true,
      level: 'log'
    },
    sauceLabs: {
      testName: 'nebular',
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

    configuration.sauceLabs.build = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;
    configuration.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_ID;

    configuration.browsers = ['ChromeHeadlessCI'];
  }

  console.log(configuration);
  config.set(configuration);
};
