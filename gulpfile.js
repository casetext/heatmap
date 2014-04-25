
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80: */

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var watch = require('gulp-watch');

gulp.task('scripts', function() {
  gulp.src('heatmap.js')
    .pipe(browserify({ standalone: 'Heatmap' }))
    .pipe(gulp.dest('dist/'));
});
