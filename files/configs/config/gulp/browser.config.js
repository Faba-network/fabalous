var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');

var frontendConfig = require("./../webpack/webpack.frontend.config.js");
var CompressionPlugin = require('compression-webpack-plugin');


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
        contentBase: path.join(__dirname,'../../dist/web/'),
        hot: true,
        quiet: false,
        noInfo: false,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) console.error(err);
    });
});

gulp.task('frontend-build', function(done) {
    var myConfig = frontendConfig;
    myConfig.debug = false;
    myConfig.devtool = null;

    myConfig.entry = {
            vendor: [
                'react', 'react-dom','react-router','history','material-ui'
            ],
            app: [
                './src/A_Web.ts' // Your appʼs entry point
            ]
        };

    myConfig.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        }),
        new webpack.NoErrorsPlugin(),
        new CompressionPlugin()
    ];

    webpack(myConfig).run(onBuild(done));
});
