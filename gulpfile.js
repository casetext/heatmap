
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80: */

var gulp = require('gulp');
var browserify = require('gulp-browserify');

// Browserify the library.
gulp.task('scripts', function() {
  gulp.src('lib/heatmap.js')
    .pipe(browserify({ standalone: 'Heatmap' }))
    .pipe(gulp.dest('dist/'));
});

// Recompile on file change.
gulp.task('watch', function() {
  gulp.watch(['lib/**/*.js'], ['scripts'])
});
