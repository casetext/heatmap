
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80: */

var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('compile', function() {
  gulp.src('src/heatmap.js')
    .pipe(browserify())
    .pipe(gulp.dest('dist/'))
});
