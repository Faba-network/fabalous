/**
 * Created by creativecode on 13.03.16.
 */

var create = require('gulp-cordova-create');
var plugin = require('gulp-cordova-plugin');
var android = require('gulp-cordova-build-android');
var gulp = require('gulp');

gulp.task('cordova',function(){
    return gulp.src('build')
        .pipe(create({"dir":"./../../bin/cordova"}))
        .pipe(plugin('org.apache.cordova.dialogs'))
        .pipe(plugin('org.apache.cordova.camera'))
        .pipe(android())
        .pipe(gulp.dest('apk'));
});
