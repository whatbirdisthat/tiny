import {Tasks, Paths} from './pipeline';
import gulp from 'gulp';
import del from "del";
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
import {handleError} from './pipeline';
import jsmin from 'gulp-jsmin';

gulp.task(Tasks.ts, ['systemjs'], () => {

    return gulp.src('src/app/**/*.ts')
        .pipe(gulp.dest('dist/app'));


//['tslib'],
//     return browserify({
//         basedir: '.',
//         debug: true,
//         entries: ['src/app/main.ts'],
//         cache: {},
//         packageCache: {}
//     })
//         .plugin(tsify, {target: 'es5'})
//         .transform(babelify, {extensions: ['.ts', '.js']})
//         .on('error', handleError)
//         .bundle()
//         .on('error', handleError)
//         .pipe(source('bundle.js'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init())
//         // .pipe(uglify())
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest("dist/js"));
//

});

gulp.task('systemjs', function() {

    return gulp.src('src/systemjs.config.js')
        .pipe(gulp.dest('dist'));

})

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

    return gulp
        .src(Paths.tsLibs, {cwd: 'node_modules/**'})
        .pipe(uglify())
        // .pipe(jsmin())
        .pipe(gulp.dest("dist/js/lib"))

});

gulp.task('clean-tslib', function (call_back) {
    return del('dist/js/lib', call_back);
});
