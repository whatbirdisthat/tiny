import {Tasks, BuildChain} from './pipeline';
import gulp from 'gulp';
import gutil from 'gulp-util';

gulp.task(Tasks.build, BuildChain, function () {
    gutil.log('Finished build finished.');
});

gulp.task(Tasks.watch, BuildChain, function () {
    gulp.watch('src/svg/**/*.svg', [Tasks.svg]);
    gulp.watch('src/**/*.js', [Tasks.js]);
    gulp.watch('test/**/*.json', [Tasks.json]);
    gulp.watch('src/app/**/*.ts', [Tasks.ts]);
    gulp.watch('src/styles/**/*.scss', [Tasks.css]);
    gulp.watch('src/**/*.html', [Tasks.html]);
});
