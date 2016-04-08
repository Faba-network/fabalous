var gulp = require('gulp');
var mocha = require('gulp-mocha');
require("./config/gulp/gulp.config.js");

gulp.task('default', ['backend-watch','frontend-watch']);

gulp.task('watch', ['backend-watch','frontend-watch']);
gulp.task('build', ['frontend-build', 'backend-build']);
gulp.task('tdd', ['testNode', 'testKarma']);
gulp.task('complete', ['backend-watch','frontend-watch', 'testNode', 'testKarma']);

gulp.task('testmocha', function() {
    return gulp.src('test.js')
        .pipe(mocha())
        .once('error', function() {
            process.exit(1);
        })
        .once('end', function() {
            process.exit();
        });
});