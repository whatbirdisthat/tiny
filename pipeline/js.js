var gulp = require('gulp');

var fs = require('fs');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
// var tsify = require('tsify');

var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');
var gutil = require('gulp-util');
var insert = require('gulp-insert');
var concat = require('gulp-concat');


//TODO: just print the error message and source code snippet
// we really don't need a stacktrace telling us
// the location in gutil where this came from...)
function handleError(theError) {
    gutil.log(theError);
    this.emit('end');
}

gulp.task('jslib', function () {

    var run_task = false;
    try {
        if (fs.statSync('./dist/lib/lib.js').isFile()) {
            gutil.log('to reinstall js libs, run `gulp clean && gulp build`');
            // (gutil.noop(call_back));
            return;
        }
    } catch (e) {
        if (e.message != "ENOENT: no such file or directory, stat './dist/lib/lib.js'") {
            gutil.log(e);
        }
    }

    gutil.log('libjs not found, installing js libs');
    var vendorfiles = [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/tether/dist/js/tether.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js'
    ];

    return gulp.src(vendorfiles)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/lib'));

});

gulp.task('js', ['jslib'], function () {

    var b = browserify({
        entries: [
            './src/js/main.js'
        ],
        debug: true, // injects source map into bundle.js
        cache: {},
        packageCache: {}
    });
    // b.ignore('jquery');

    return b.transform("babelify", {presets: ["es2015"]})
        .on('error', handleError)
        .bundle()
        .on('error', handleError)
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));

});

gulp.task('jsclean', function (call_back) {
    return del('dist/js', call_back);
});
