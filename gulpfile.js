'use strict';

require('require-dir')('./gulp_tasks');

var gulp = require('gulp');
var del = require('del');
var gutil = require('gulp-util');
var DIST_FOLDER = 'dist';

var task_dependencies = ['scripts', 'html', 'styles', 'vendor'];

gulp.task('build', task_dependencies, function (call_back) {
    return (gutil.noop(call_back));
});

var PROCESS_FOLDERS = function () {
    gulp.watch('node_modules/jquery/src/**/*.js', ['vendor']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/**/*.html', ['html']);
};

gulp.task('watch', task_dependencies, PROCESS_FOLDERS);

gulp.task('clean', function (call_back) {
    return del(DIST_FOLDER, call_back);
});
