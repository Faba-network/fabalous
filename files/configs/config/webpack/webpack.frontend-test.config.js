var path = require('path');
var webpack = require('webpack');

module.exports = {
    output: {
        path: path.join(__dirname,'../../dist/test/'),
        filename: 'test.js'
    },

    debug: false,
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.less']
    },
    entry: {
        app: [
            './test/T_Web.ts' // Your appʼs entry point
        ]
    },
    module: {
        loaders: [
            {   test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {   test: /\.tsx?$/,
                loader: 'babel?presets[]=es2015!ts-loader!preprocess?+CLIENT'
            }
        ]
    }
};