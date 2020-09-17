// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  const configuration = {
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-sauce-launcher'),
      require('karma-browserstack-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-spec-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: { random: false },
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['spec', 'kjhtml'],
    specReporter: {
      suppressSkipped: true,
    },
    port: 9876,
    browserNoActivityTimeout : 60000,
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
      SauceChromeCI: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: 'latest'
      },
      BrowserstackChromeCI: {
        base: 'BrowserStack',
        browser: 'Chrome',
        version: 'latest',
        os: 'Windows',
        os_version: '10'
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
    browserStack: {
      project: 'Nebular Unit Tests',
      startTunnel: false,
      retryLimit: 1,
      timeout: 600,
      pollingTimeout: 20000,
      video: false,
    }
  };

  if (process.env['TRAVIS']) {

    const [platform] = process.env.MODE.split('_');
    const buildId = `TRAVIS #${process.env['TRAVIS_BUILD_NUMBER']} (${process.env['TRAVIS_BUILD_ID']})`;

    configuration.singleRun = true;

    if (platform === 'sauce') {
      const key = require('./scripts/ci/sauce/config');

      configuration.reporters.push('saucelabs');
      configuration.sauceLabs.build = buildId;
      configuration.sauceLabs.tunnelIdentifier = process.env['TRAVIS_JOB_ID'];
      configuration.sauceLabs.username = process.env['SAUCE_USERNAME'];
      configuration.sauceLabs.accessKey = key;
      configuration.browsers = ['SauceChromeCI'];
    } else if (platform === 'browserstack') {
      const key = require('./scripts/ci/browserstack/config');

      configuration.reporters.push('BrowserStack');
      configuration.browserStack.build = buildId;
      configuration.browserStack.tunnelIdentifier = process.env['TRAVIS_JOB_ID'];
      configuration.browserStack.username = process.env['BROWSER_STACK_USERNAME'];
      configuration.browserStack.accessKey = key;
      configuration.browsers = ['BrowserstackChromeCI'];
    }
  }

  config.set(configuration);
};
