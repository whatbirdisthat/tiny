var gulp = require('gulp');
var sass = require('gulp-sass'); // https://github.com/sass/node-sass#options
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('styles', function () {
    return gulp.src([
        'node_modules/tether/src/css/tether.sass',
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/styles/styles.scss'
    ])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed', sourceComments: 'map'})
            .on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});