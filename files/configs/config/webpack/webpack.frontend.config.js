var path = require('path');
var webpack = require('webpack');

module.exports = {
    output: {
        path: path.join(__dirname,'../../dist/web/'),
        filename: 'bundle.js'
    },

    debug: true,
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.less']
    },
    entry: {
        vendor: [
            'react', 'react-dom'
        ],

        app: [
            'webpack-dev-server/client?http://localhost:8080/', // WebpackDevServer host and port
            'webpack/hot/dev-server', // "only" prevents reload on syntax errors
            './src/A_Web.ts' // Your appʼs entry point
        ]
    },
    module: {
        loaders: [
            {   test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {   test: /\.tsx?$/,
                loader: 'react-hot!babel?presets[]=es2015!ts-loader!preprocess?+CLIENT'
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        })
    ]
};