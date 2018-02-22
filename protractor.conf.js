// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

const E2E_BASE_URL = process.env['E2E_BASE_URL'] || 'http://localhost:4200';

const config = {
  useAllAngular2AppRoots: true,
  allScriptsTimeout: 120000,
  getPageTimeout: 120000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true', '--no-sandbox']
    }
  },
  // directConnect: true,
  baseUrl: E2E_BASE_URL,
  framework: 'jasmine',
  directConnect: true,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 120000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });

    const failFast = require('jasmine-fail-fast');
    jasmine.getEnv().addReporter(failFast.init());
    jasmine.getEnv().addReporter(new SpecReporter({ acspec: { displayStacktrace: true } }));
  }
};

if (process.env['TRAVIS']) {

  const [platform] = process.env.MODE.split('_');

  config.directConnect = false;

  if (platform === 'sauce') {
    const key = require('./scripts/ci/sauce/config');
    config.sauceUser = process.env['SAUCE_USERNAME'];
    config.sauceKey = key;
    config.capabilities = {
      'browserName': 'chrome',
      'version': 'latest',
      'tunnel-identifier': process.env['TRAVIS_JOB_ID'],
      'build': process.env['TRAVIS_JOB_ID'],
      'name': 'Nebular E2E Tests',

      // Enables concurrent testing in the Webdriver. Currently runs five e2e files in parallel.
      'maxInstances': 5,
      'shardTestFiles': true,

      // By default Saucelabs tries to record the whole e2e run. This can slow down the builds.
      'recordVideo': false,
      'recordScreenshots': false
    };
  } else if (platform === 'browserstack') {

    const key = require('./scripts/ci/browserstack/config');

    config.browserstackUser = process.env['BROWSER_STACK_USERNAME'];
    config.browserstackKey = key;

    config.capabilities = {
      'browserstack.localIdentifier': process.env['TRAVIS_JOB_ID'],
      'browserstack.local': 'true',
      'build': process.env['TRAVIS_JOB_ID'],
      'name': 'Nebular E2E Tests',
      'browserName': 'chrome',
    };
  }
}


exports.config = config;
