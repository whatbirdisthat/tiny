"use strict";

import {Tasks} from './pipeline';

import gulp from 'gulp';

import fs from 'fs';
import source from 'vinyl-source-stream';
import browserify from 'browserify';

import babelify from 'babelify';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import buffer from 'gulp-buffer';
import gutil from 'gulp-util';
import insert from 'gulp-insert';
import concat from 'gulp-concat';


function handleError(theError) {
    // gutil.log(theError);
    console.log(theError.message);
    this.emit('end');
}

gulp.task('libs', function () {

    // var jquery_contents = fs.readFileSync('./node_modules/jquery/dist/jquery.js', 'utf8');
    var tether_contents = fs.readFileSync('./node_modules/tether/dist/js/tether.js', 'utf8');
    var bootstrap_contents = fs.readFileSync('./node_modules/bootstrap/dist/js/bootstrap.js', 'utf8');

    return gulp.src('./node_modules/jquery/dist/jquery.js')
        .pipe(insert.transform(function(contents, file) {
            return contents + tether_contents;
        }))
        .pipe(insert.transform(function(contents, file) {
            return contents + bootstrap_contents;
        }))
        .pipe(uglify())
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/js/lib'));

});

gulp.task('app', ['libs'], function () {
    var b = browserify({
        entries: [
            './src/js/main.js'
        ],
        debug: true, // injects source map into bundle.js
        cache: {},
        packageCache: {}
    });
    
    return b.transform(babelify, {presets: ["es2015"]})
        .on('error', handleError)
        .bundle()
        .on('error', handleError)
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));

})

gulp.task(Tasks.js, ['app'], function () {

    console.log('oh dear')

});

gulp.task('jsclean', function (call_back) {
    return del('dist/lib/lib.js', call_back);
});
