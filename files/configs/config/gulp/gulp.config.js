var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var nodemon = require('nodemon');

//require("./cordova.config.js");
require("./browser.config.js");
require("./node.config.js");
require("./jasmine.config.js");
//require("./karma.config.js");



var Server = require('karma').Server;
gulp.task('testKarma', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});