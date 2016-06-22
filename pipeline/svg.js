import {Tasks, handleError} from './pipeline';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

gulp.task(Tasks.svg, function () {
    return gulp.src([
        'src/svg/**/*'
    ])
        .pipe(imagemin())
        .on('error', handleError)
        .pipe(gulp.dest('dist/svg'));
});
