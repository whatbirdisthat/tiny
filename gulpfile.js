var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass'); // https://github.com/sass/node-sass#options
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    pages: ['src/**/*.html']
};

gulp.task('html', function () {
    return gulp.src(paths.pages)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('styles', function () {
    return gulp.src('src/styles/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed', sourceComments: 'map'}).on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('dist/css/maps'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/**/*.html', ['html']);
});
