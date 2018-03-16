// Karma configuration
// Generated on Thu Mar 15 2018 14:29:12 GMT+0800 (中国标准时间)
'use strict';
const path = require('path');

module.exports = function(config) {
  if (process.env.RELEASE) {
    config.singleRun = true;
  }

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','chai'],


    // list of files / patterns to load in the browser
    files: [
      {
        pattern: 'test/index.js',
        included: true,
        watched: false
      }
    ],


    // list of files / patterns to exclude
    exclude: [//似乎是相对basePath
      'test/coverage/**',
      'node_modules'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },

    webpack:{
      devtool: 'inline-source-map',
      module:{

      }
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-coverage',
      'karma-chai',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'istanbul-instrumenter-loader',
      'karma-coveralls'
    ]

    
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage','coveralls'],
    coverageReporter: {
      dir: 'test',
      reporters: [{
        type: 'html',
        subdir: 'coverage'
      },{
        type: 'test'
      },{
        type: 'lcov',
        subdir: 'coverage'
      }]
    },
    webpackMiddleware: {
      noInfo: true
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    browsersNoActivityTimeout: 60000,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
