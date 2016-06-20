'use strict';

require('require-dir')('./gulp_tasks');

var gulp = require('gulp');

gulp.task('watch', ['html', 'styles', 'scripts'], function () {
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/**/*.html', ['html']);
});
