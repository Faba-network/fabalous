var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');

var frontendConfig = require("./../webpack/webpack.frontend.config.js");

function onBuild(done) {
    return function(err, stats) {
        if(err)console.error('Error', err);
        else console.log(stats.toString());
        if(done) done();
    }
}

gulp.task('frontend-watch', function() {
    new WebpackDevServer(webpack(frontendConfig), {
        publicPath: '/',
        hot: true,
        quiet: false,
        noInfo: true,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) console.error(err);
    });
});

gulp.task('frontend-build', function(done) {
    var myConfig = frontendConfig;

    myConfig.plugins = [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ];

    webpack(myConfig).run(onBuild(done));
});
