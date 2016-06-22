import {Paths, Tasks} from './pipeline';

import gulp from 'gulp';
import jsmin from 'gulp-jsmin';

gulp.task(Tasks.json, function () {
    return gulp.src(Paths.json)
        .pipe(jsmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});
