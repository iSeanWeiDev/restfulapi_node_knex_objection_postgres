const _ = require('lodash');
const config = require('./jest.config');

const overrides = {
  setupTestFrameworkScriptFile: '<rootDir>/__test__/e2e/setup.js',
  testMatch: ['**/__test__/e2e/specs/*.spec.js'],
  bail: true // To learn about errors sooner
};
const merges = {
  // Merge in changes to deeper objects
  globals: {
    // This sets the BASE_URL for the target of the e2e tests (what the tests are testing)
    BASE_URL: 'localhost:8000'
  }
};

module.exports = _.chain(config).assign(overrides).merge(merges).value();
