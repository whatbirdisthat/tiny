var gulp = require('gulp');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');
var gutil = require('gulp-util');
var insert = require('gulp-insert');
var fs = require('fs');

//TODO: just print the error message and source code snippet
// (we really don't need a stacktrace telling us the location in gutil where this came from...)
function handleError(theError) {
    gutil.log(theError);
    this.emit('end');
}

gulp.task('scripts', function () {
    var b = browserify({
        entries: [
            // './node_modules/jquery/dist/jquery.js',
            // './node_modules/bootstrap/dist/js/bootstrap.js',
            './src/scripts/js/main.js'
        ],
        debug: true,
        cache: {},
        packageCache: {}//,
//        plugin: [watchify]
    });

    var jquery_content = fs.readFileSync("node_modules/jquery/dist/jquery.min.js", "utf8");
    var tether_content = fs.readFileSync("node_modules/tether/dist/js/tether.min.js", "utf8");
    var bootstrap_content = fs.readFileSync("node_modules/bootstrap/dist/js/bootstrap.min.js", "utf8");

    return b.transform("babelify", {presets: ["es2015"]})
        .on('error', handleError)
        .bundle()
        .on('error', handleError)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        // .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // .pipe(uglify()).on('error', gutil.log)
        // .pipe(sourcemaps.write('.'))
        .pipe(insert.transform(function (contents, file) {
            return contents + "\n" + jquery_content
        }))
        .pipe(insert.transform(function (contents, file) {
            return contents + "\n" + tether_content
        }))
        .pipe(insert.transform(function (contents, file) {
            return contents + "\n" + bootstrap_content
        }))
        .pipe(uglify()).on('error', handleError)
        .pipe(gulp.dest('dist/js'));

});
