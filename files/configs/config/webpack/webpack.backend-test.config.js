var path = require('path');
var fs = require('fs');

var nodeModules = fs.readdirSync('node_modules')
    .filter(function(x) {

        return ['.bin'].indexOf(x) === -1;
    });

module.exports = {
    entry: [
        './src/S_Main.ts'
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
    externals: [
        function(context, request, callback) {
            var pathStart = request.split('/')[0];
            if (pathStart == "fabalous" || pathStart == "fabalous-login"){
                callback();
                return;
            }

            if (nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
                return callback(null, "commonjs " + request);
            };
            callback();
        }
    ],
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