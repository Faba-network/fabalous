var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var frontendConfig = require("./../webpack/webpack.frontend-test.config.js");

var Server = require('karma').Server;
gulp.task('testKarma', function(done) {
    new Server({
        configFile: __dirname + '/../karma/karma.conf.js'
    }, done).start();
});