var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');

var paths = {
    pages: ['src/**/*.html']
};

gulp.task('html', function () {
    return gulp.src(paths.pages)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('styles', function () {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/**/*.html', ['html']);
});
