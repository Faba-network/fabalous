var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");

var path = require('path');
var nodemon = require('nodemon');

var backendConfig = require("./../webpack/webpack.backend.config.js");

function onBuild(done) {
    return function(err, stats) {
        if(err)console.error('Error', err);
        else console.log(stats.toString());
        if(done) done();
    }
}

gulp.task('backend-build', function(done) {
    webpack(backendConfig).run(onBuild(done));
});

gulp.task('backend-watch', ['backend-wbp'], function() {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, "../../dist/node/server.js"),
        ignore: ['*'],
        watch: ['foo/'],
        ext: 'noop'
    }).on('restart', function(){

    });
});

gulp.task('backend-wbp', function(done) {
    var firedDone = false;
    webpack(backendConfig).watch(100, function(err, stats) {

        if(!firedDone) {
            firedDone = true;
            done();
        }
        nodemon.restart();
    });
});
