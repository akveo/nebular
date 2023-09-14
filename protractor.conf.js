// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

const E2E_BASE_URL = process.env['E2E_BASE_URL'] || 'http://localhost:4200';

const config = {
  useAllAngular2AppRoots: true,
  allScriptsTimeout: 120000,
  getPageTimeout: 120000,
  chromeDriver: '/opt/homebrew/bin/chromedriver',
  specs: ['./e2e/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['show-fps-counter=true', '--no-sandbox'],
    },
  },
  // directConnect: true,
  baseUrl: E2E_BASE_URL,
  framework: 'jasmine',
  directConnect: true,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 120000,
    print: function () {},
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json',
    });

    const failFast = require('jasmine-fail-fast');
    jasmine.getEnv().addReporter(failFast.init());
    jasmine.getEnv().addReporter(new SpecReporter({ acspec: { displayStacktrace: true } }));
  },
};

if (process.env.CI) {
  config.directConnect = false;
  config.browserstackUser = process.env.BROWSERSTACK_USERNAME;
  config.browserstackKey = process.env.BROWSERSTACK_ACCESS_KEY;
  config.capabilities = {
    'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
    'browserstack.local': 'true',
    build: process.env.BROWSERSTACK_BUILD_NAME,
    name: process.env.BROWSERSTACK_PROJECT_NAME,
    browserName: 'chrome',
  };
}

exports.config = config;
