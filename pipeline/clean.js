var gulp = require('gulp');
var DIST_FOLDER = 'dist';

var del = require('del');
gulp.task('clean', function (call_back) {
    return del(DIST_FOLDER, call_back);
});
