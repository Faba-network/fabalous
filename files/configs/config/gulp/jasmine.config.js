var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');

var frontendConfig = require("./../webpack/webpack.frontend-test.config.js");


gulp.task('testComp', function(done) {
    webpack(frontendConfig, function(e, r){
        done();
    });
});

gulp.task('testJasmine', function() {
    return gulp.src('./tmp/node_test_bundle.js')
        .pipe(jasmine());
});

gulp.task('testNode', function() {
    watch('**/*.ts', function(files) {
        runSequence( 'testComp', 'testJasmine' );
    });

    runSequence( 'testComp', 'testJasmine' );
});