// Karma configuration
// Generated on Wed Mar 18 2015 11:41:18 GMT+0800 (CST)

'use strict';

const path = require('path');

module.exports = function (config) {
  const reporters = ['progress', 'coverage'];

  let browserName = 'Chrome';

  if (process.env.NODE_ENV === 'testPre') {
    config.singleRun = true; // eslint-disable-line

    browserName = 'ChromeHeadless';
  } else {
    reporters.push('coveralls');
  }

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to l/oad in the browser
    files: [
      { pattern: 'test/index.js', included: true, watched: false },
    ],

    // list of files to exclude
    exclude: [
      'test/coverage/**',
      'lib/**',
      'node_modules/',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        noParse: [
          /node_modules\/sinon\//,
        ],
        loaders: [{
          test: /\.(js|jsx)$/,
          exclude: [
            path.resolve('node_modules/'),
          ],
          loader: 'babel-loader',
        }, {
          test: /\.json$/,
          loader: 'json-loader',
        }],
      },
      externals: {
        jsdom: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window',
      },
      resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
        alias: {
          sinon: 'sinon/pkg/sinon',
          bizcharts: path.resolve('./src/index.jsx'),
        },
      },
    },

    webpackMiddleware: {
      stats: 'errors-only',
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-coverage',
      'karma-chai',
      'karma-sourcemap-loader',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
      'karma-coveralls',
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters,

    coverageReporter: {
      files: [
        'src/**/*.js',
        'test/**/*.js'
      ],
      dir: 'test',
      reporters: [{
        type: 'html',
        subdir: 'coverage',
      }, {
        type: 'text',
      }, {
        type: 'lcov',
        subdir: 'coverage',
      }],
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [browserName],

    browserNoActivityTimeout: 60000,

    // customLaunchers: {
    //   ChromeHeadless: {
    //     base: 'Chrome',
    //     flags: ['--headless'],
    //   },
    // },
  });
};
