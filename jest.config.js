// jest.config.js
// Sync object
global.XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;

module.exports = {
  verbose: true,
  testRegex: "/unittest/.*-spec\\.tsx?$",
  preset: "ts-jest",
  setupFiles: ["w3c-xmlhttprequest/lib/index.js", 'jest-canvas-mock', './unittest/setup.js'],
  testEnvironment: 'jsdom',
  "coverageReporters": [
    "json",
    "text",
    "lcov",
    "clover"
  ],
};

