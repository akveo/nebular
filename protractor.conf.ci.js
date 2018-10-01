// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
// TODO this config is redundant but we'll keep it for the future purposes

const browserstack = require('browserstack-local');
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,

  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',

  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],

  commonCapabilities: {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    'build': '@nebular/theme',
    'name': '@nebular/theme',
    'browserstack.local': true,
    'browserstack.debug': true,
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true', '--no-sandbox']
    }
  },

  multiCapabilities: [
    {
      browserName: 'IE',
      browser_version: '11.0',
    },
    {
      browserName: 'Edge',
    },
    {
      browserName: 'Chrome'
    },
    {
      browserName: 'Safari',
    },
    {
      browserName: 'Firefox',
    },
  ],

  baseUrl: 'http://localhost:4200/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },

  // Code to start browserstack local before start of test
  beforeLaunch: function() {
    console.log("Connecting local");
    return new Promise(function(resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.commonCapabilities['browserstack.key'] }, function(error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  afterLaunch: function() {
    return new Promise(function(resolve, reject) {
      exports.bs_local.stop(resolve);
    });
  },

  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });

    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }

};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
