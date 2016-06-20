var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');


var paths = {
    pages: [
        'src/**/*.html'
    ]
};

gulp.task('html', function () {
    gulp.src(paths.pages)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});
