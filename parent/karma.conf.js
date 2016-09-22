// Karma configuration
// Generated on Tue Sep 20 2016 12:39:09 GMT+0530 (IST)

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'fixture', 'sinon-chai'],
        // list of files / patterns to load in the browser
        files: [
            {pattern: 'about1.html'},
            'js/jquery2.1.0.js',
            'css/main.ma.css',
            'css/desktop_landing.3.css',
            'css/mobile_landing.3.css',
            'css/media_landscap.ma.css',
            'js/abanalytics.ma.js',
            'js/mobile-detect.min.js',
            'js/commonFB.ma.js',
            'test/global.js',
            'js/track.ma.js',
            "js/bootstrap.min.js",
            "js/lazysizes.min.js",
            "js/validate.ma.js",
            'css/minified_design.css',
            'test/qa.html',
            'test/validateForms.js',
            'test/validation.ma.spec.js',
            'test/abanalytics.ma.spec.js'
        ],
        // list of files to exclude
        exclude: [
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'js/validate.ma.js': 'coverage',
            'js/abanalytics.ma.js': 'coverage'
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],
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
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
