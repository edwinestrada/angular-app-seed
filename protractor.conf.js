exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'test/e2e/**/*.js'
  ],
  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
  },
  browsers: [
    'Chrome'
  ],
  jasmineNodeOpts: {
    print: function(){}
  }
};
