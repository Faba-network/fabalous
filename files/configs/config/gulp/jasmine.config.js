var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var webpack = require('webpack');


var config = require("./../webpack/webpack.backend-test.config.js");

gulp.task('testComp', function(done) {
    webpack(config, function(e, r){
        done();
    });
});

gulp.task('testJasmine', function() {
    return gulp.src('./dist/test/node/test.js')
        .pipe(jasmine());
});

gulp.task('testNode', function() {
    //watch('**/*.ts', function(files) {
    //    runSequence( 'testComp', 'testJasmine' );
    //});

    runSequence( 'testComp', 'testJasmine' );
});