var path = require('path');
var fs = require('fs');

var nodeModules = fs.readdirSync('node_modules')
    .filter(function(x) {

        return ['.bin'].indexOf(x) === -1;
    });

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: [
        './src/A_Server.ts'
    ],
    target:'node',
    debug: true,
    output: {
        path: path.join(__dirname, '../../dist/node/'),
        filename: 'server.js'
    },
    node: {
        __dirname: true,
        __filename: true
    },
    externals:nodeModules,

    devtool: 'source-map',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    recordsPath: path.join(__dirname, '../../dist/node/_records'),
    quiet: true,
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader', exclude: /node_modules/},
            { test: /\.tsx?$/, loader: 'babel?presets[]=es2015!ts-loader!preprocess?+SERVER'}
        ]
    }
};