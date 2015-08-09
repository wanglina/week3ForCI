module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        jasmine: {
            src: 'public/**/*.js',
            options: {
                specs: 'spec/**/*.js',
                vendor: [
                    "public/javascripts/lib/jasmine-jquery-1.3.1.js",
                    "public/javascripts/lib/jquery-1.8.3.min.js"
                ],
                keepRunner: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('default', ['test']);
};

