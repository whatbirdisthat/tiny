import {Tasks, BuildChain} from './pipeline';
import gulp from 'gulp';
import gutil from 'gulp-util';

gulp.task(Tasks.build, BuildChain, function () {
    gutil.log('Finished build finished.');
});

gulp.task(Tasks.watch, BuildChain, function () {
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/app/**/*.ts', ['ts']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/**/*.html', ['html']);
});
