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
        flags: [
          '--no-sandbox',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--remote-debugging-port=9222',
          '--window-size=1024,768',
        ],
      },
      BrowserstackChromeCI: {
        base: 'BrowserStack',
        browser: 'Chrome',
        version: 'latest',
        os: 'Windows',
        os_version: '11',
      },
    },
  };

  if (process.env.CI) {
    // Check if BrowserStack credentials are available
    const hasBrowserStackCredentials =
      (process.env.BROWSERSTACK_USERNAME || process.env.BSU) &&
      (process.env.BROWSERSTACK_ACCESS_KEY || process.env.BSK);

    // Check if we should force local testing (for debugging or when BrowserStack fails)
    const forceLocalTesting = process.env.FORCE_LOCAL_TESTING === 'true';

    if (hasBrowserStackCredentials && !forceLocalTesting) {
      config.browserStack = {
        startTunnel: false,
        build: process.env.BROWSERSTACK_BUILD_NAME,
        project: process.env.BROWSERSTACK_PROJECT_NAME,
        tunnelIdentifier: process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
        timeout: 300, // Reduced timeout to 5 minutes
        video: false,
        user: process.env.BROWSERSTACK_USERNAME || process.env.BSU,
        key: process.env.BROWSERSTACK_ACCESS_KEY || process.env.BSK,
      };
      configuration.browsers = ['BrowserstackChromeCI'];
      configuration.reporters.push('BrowserStack');
      configuration.browserNoActivityTimeout = 120000; // 2 minutes
      configuration.captureTimeout = 120000; // 2 minutes
      console.log('Using BrowserStack for CI testing');
    } else {
      if (forceLocalTesting) {
        console.log('FORCE_LOCAL_TESTING is enabled, using local Chrome');
      } else {
        console.log('BrowserStack credentials not found, falling back to local Chrome');
      }
      configuration.browsers = ['ChromeHeadlessLocal'];
    }

    configuration.singleRun = true;
  }

  config.set(configuration);
};
