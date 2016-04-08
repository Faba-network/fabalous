var wallabyWebpack = require('wallaby-webpack');
var pp = require('preprocess');
var webpack = require('webpack');

var wallabyPostprocessor = wallabyWebpack({
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/\.(gif|png|less|css)$/, 'node-noop')
    ]
});


module.exports = function (wallaby) {
    wallaby.defaults.files.load = false;
    wallaby.defaults.tests.load = true;

    return {
        files: [
            {pattern: 'src/**/*.ts*'},
            {pattern: 'node_modules/faba**/**/*.ts*'}
        ],

        tests: [
            {pattern: 'test/node/*Spec.ts'}
        ],

        preprocessors: {
            '**/*.js': function(file) {
                return require("babel-core").transform(file.content, {
                    sourceMap: true,
                    presets: ["es2015", "react"],
                    compact: false
                });
            },
            'src/**/*.ts': function(file) {
                return pp.preprocess(file.content, {SERVER:true}, {type: 'ts'});
            },
            'node_modules/faba**/**/*.ts': function(file) {
                return pp.preprocess(file.content, {SERVER:true}, {type: 'ts'});
            }
        },

        //postprocessor: wallabyPostprocessor,

        compilers: {
            '**/*.ts*': wallaby.compilers.typeScript()
        },

        env: {
            type: 'node'
        },

        testFramework: 'jasmine',

        workers: {
            recycle: true
        }
    }
};