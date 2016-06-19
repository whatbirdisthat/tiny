'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass'); // https://github.com/sass/node-sass#options
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');
var gutil = require('gulp-util');
// var merge2 = require('merge2');
// var wrap = require('gulp-wrap');
var addsrc = require('gulp-add-src');
var insert = require('gulp-insert');
var fs = require('fs')


var paths = {
    pages: ['src/**/*.html']
};

gulp.task('html', function () {
    return gulp.src(paths.pages)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('styles', function () {
    return gulp.src([
        'node_modules/tether/src/css/tether.sass',
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/styles/styles.scss'
    ])
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
        entries: [
            // './node_modules/jquery/dist/jquery.js',
            // './node_modules/bootstrap/dist/js/bootstrap.js',
            './src/scripts/js/main.js'
        ],
        debug: true,
        cache: {},
        packageCache: {},
        plugin: [watchify]
    });

    // var jquery_stream = gulp.src('node_modules/jquery/dist/jquery.min.js').pipe(buffer());
    // var bootstrap_stream = gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js').pipe(buffer());

    var jquery_content = fs.readFileSync("node_modules/jquery/dist/jquery.min.js", "utf8");
    var tether_content = fs.readFileSync("node_modules/tether/dist/js/tether.min.js", "utf8");
    var bootstrap_content = fs.readFileSync("node_modules/bootstrap/dist/js/bootstrap.min.js", "utf8");


    return b.transform("babelify", {presets: ["es2015"]})
        .on('error', handleError)
        .bundle()
        .on('error', handleError)
        .pipe(source('bundle.js'))
        // .pipe(wrap('(function () { var define = undefined; <%=contents%> ; })();'))
        .pipe(buffer())
        // .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // .pipe(uglify()).on('error', gutil.log)
        // .pipe(sourcemaps.write('.'))
        .pipe(insert.transform(function(contents, file){
            return contents + "\n" + jquery_content
        }))
        .pipe(insert.transform(function(contents, file){
            return contents + "\n" + tether_content
        }))
        .pipe(insert.transform(function(contents, file){
            return contents + "\n" + bootstrap_content
        }))
        // .pipe(addsrc('./node_modules/jquery/dist/jquery.js'))
        // .pipe(addsrc('./node_modules/bootstrap/dist/js/bootstrap.js'))
        .pipe(uglify()).on('error', gutil.log)
        .pipe(gulp.dest('dist/js'));

    // var js_stream = merge2(jquery_stream, bootstrap_stream, es6_stream);
    // return js_stream.pipe(concat('bundle.js')).pipe(gulp.dest('dist/js'));

});

gulp.task('watch', ['html', 'styles', 'scripts'], function () {
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/**/*.html', ['html']);
});

