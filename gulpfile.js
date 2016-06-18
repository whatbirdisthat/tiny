'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');

var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass'); // https://github.com/sass/node-sass#options
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');
var gutil = require('gulp-util');

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
        .pipe(sass({outputStyle: 'compressed', sourceComments: 'map'}).on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

function handleError(theError) {
    console.log(theError.toString());
    this.emit('end');
}

gulp.task('scripts', function () {
    var b = browserify({
        entries: ['./src/scripts/js/main.js'],
        debug: true,
        cache: {},
        packageCache: {},
        plugin: [watchify]
    });
//    return b.bundle().on('error', handleError)
    return b.bundle().on('error', handleError)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(uglify()).on('error', gutil.log)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['html', 'styles', 'scripts'], function () {
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/**/*.html', ['html']);
});

