var path = require('path');
var fs = require('fs');

var nodeModules = fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    });

module.exports = {
    entry: [
        './test/T_Node.ts'
    ],
    target:'node',
    debug: true,
    output: {
        path: path.join(__dirname, '../../dist/test/node/'),
        filename: 'test.js'
    },
    node: {
        __dirname: true,
        __filename: true
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    quiet: true,
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader', exclude: /node_modules/},
            { test: /\.tsx?$/, loader: 'babel?presets[]=es2015!ts-loader!preprocess?+SERVER'}
        ]
    }
};