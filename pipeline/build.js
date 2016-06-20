var gulp = require('gulp');
var gutil = require('gulp-util');

var task_dependencies = ['js', 'ts', 'styles', 'html'];

gulp.task('build', task_dependencies, function () {
    gutil.log('Finished build finished.');
});

gulp.task('watch', function () {
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/app/**/*.ts', ['ts']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/**/*.html', ['html']);
});
