var gulp = require('gulp');

var fs = require('fs');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

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

gulp.task('vendor', function() {

    var vendorfiles = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/tether/dist/js/tether.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ];

    return gulp.src(vendorfiles)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'));

});

gulp.task('scripts', function () {

    // var t = browserify({
    //     entries: [
    //         'src/scripts/ts/app.ts'
    //     ],
    //     debug: false,
    //     plugin: [tsify]
    // });

    var b = browserify({
        entries: [
            'src/scripts/js/main.js'
        ],
        debug: true, // injects source map into bundle.js
        cache: {},
        packageCache: {}
    });

    var b_src_as_js = b.transform("babelify", {presets: ["es2015"]})
        .on('error', handleError)
        .bundle()
        .on('error', handleError)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));

    return b_src_as_js;
});
