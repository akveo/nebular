const path = require('path');

const E2E_BASE_URL = process.env['E2E_BASE_URL'] || 'http://localhost:4200';
const config = {
  useAllAngular2AppRoots: true,
  specs: [ path.join(__dirname, './e2e/**/*.e2e-spec.ts') ],
  baseUrl: E2E_BASE_URL,
  allScriptsTimeout: 120000,
  getPageTimeout: 120000,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000,
  },

  plugins: [
  ]
};

if (process.env['TRAVIS']) {
  const key = require('./scripts/ci/sauce/config.js');
  config.sauceUser = process.env['SAUCE_USERNAME'];
  config.sauceKey = key;
  config.capabilities = {
    'browserName': 'chrome',
    'version': 'latest',
    'tunnel-identifier': process.env['TRAVIS_JOB_ID'],
    'build': process.env['TRAVIS_JOB_ID'],
    'name': 'Material E2E Tests',

    // Enables concurrent testing in the Webdriver. Currently runs five e2e files in parallel.
    // 'maxInstances': 5,
    // 'shardTestFiles': true,

    // By default Saucelabs tries to record the whole e2e run. This can slow down the builds.
    'recordVideo': false,
    'recordScreenshots': false
  };
}


console.log(config);

exports.config = config;
