"use strict";

import {Tasks, Paths, handleError} from './pipeline';

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

gulp.task('libs', function () {

    try {
        if (fs.statSync("dist/js/lib/lib.js").isFile()) {
            gutil.log('to reinstall ts libs, run `gulp clean && gulp build`');
            return;
        }
    } catch (e) {
        if (e.message != "ENOENT: no such file or directory, stat 'dist/js/lib/lib.js'") {
            gutil.log(e);
        }
    }

    return gulp.src('./node_modules/jquery/dist/jquery.js')
        .pipe(insert.transform(function(contents, file) {
            var outputJs = contents;
            Paths.jsLibs.forEach(eachFile => outputJs += fs.readFileSync(eachFile));
            return outputJs;
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

});

gulp.task(Tasks.js, ['app'], function () {
    gutil.log('Javascripts complete.')
});

gulp.task('jsclean', function (call_back) {
    return del('dist/lib/lib.js', call_back);
});
