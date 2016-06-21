const gulp = require("gulp");
const del = require("del");
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
var gutil = require('gulp-util');
var fs = require('fs');

var browserify = require("browserify");
var tsify = require("tsify");
var source = require("vinyl-source-stream");

const tsc = require("gulp-typescript");
const tsProject = tsc.createProject("tsconfig.json");

//"tslint"
gulp.task("ts", ["tslib", "copy-systemjs-config"], () => {

    // let tsResult = gulp.src("src/**/*.ts")
    //     .pipe(sourcemaps.init())
    //     .pipe(tsc(tsProject));
    // return tsResult.js
    //     .pipe(sourcemaps.write("."))
    //     .pipe(gulp.dest("dist"));

    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/app/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));


});


gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

gulp.task("tslib", () => {

    try {
        if (fs.statSync("dist/lib/es6-shim/es6-shim.min.js").isFile()) {
            gutil.log('to reinstall ts libs, run `gulp clean && gulp build`');
            return;
        }
    } catch (e) {
        if (e.message != "ENOENT: no such file or directory, stat 'dist/lib/es6-shim/es6-shim.min.js'") {
            gutil.log(e);
        }
    }

    gutil.log('installing ts / ng2 libs');
    return gulp.src(
        [
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**'
        ], {cwd: "node_modules/**"}/* Glob required here. */)
        .pipe(gulp.dest("dist/lib"));

});

gulp.task('copy-systemjs-config', function () {
    return gulp.src('src/systemjs.config.js').pipe(gulp.dest('dist/app'))
});
