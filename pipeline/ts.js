import { Tasks } from './pipeline';
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import tslint from 'gulp-tslint';
import gutil from 'gulp-util';
import fs from 'fs';
import browserify  from "browserify";
import babelify  from "babelify";
import tsify  from "tsify";
import source  from "vinyl-source-stream";
import uglify  from 'gulp-uglify';
import buffer  from 'gulp-buffer';


gulp.task(Tasks.ts, ['tslib'], () => {

    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/app/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify, { target: 'es5' })
        .transform(babelify, { extensions: [ '.ts', '.js' ] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist/js"));


});

gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

gulp.task("tslib", () => {

    try {
        if (fs.statSync("dist/js/lib/reflect-metadata/Reflect.js").isFile()) {
            gutil.log('to reinstall ts libs, run `gulp clean && gulp build`');
            return;
        }
    } catch (e) {
        if (e.message != "ENOENT: no such file or directory, stat 'dist/js/lib/reflect-metadata/Reflect.js'") {
            gutil.log(e);
        }
    }

    gutil.log('installing ts / ng2 libs');
    return gulp.src(
        [
            'reflect-metadata/Reflect.js',
            'zone.js/dist/**',
        ], {cwd: "node_modules/**"})
        .pipe(gulp.dest("dist/js/lib"));

});
