
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80: */

var gulp = require('gulp');
var gulpBrowserify = require('gulp-browserify');
var expressBrowserify = require('browserify-middleware');
var path = require('path');
var express = require('express');

// Browserify the library.
gulp.task('scripts', function() {
  gulp.src('lib/heatmap.js')
    .pipe(gulpBrowserify({ standalone: 'Heatmap' }))
    .pipe(gulp.dest('dist/'));
});

// Recompile on file change.
gulp.task('watch', function() {

  gulp.watch(['lib/**/*.js'], ['scripts'])

  var app = express();

  // Spin up an Express server.
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'dev'));
  app.use('/js', expressBrowserify(__dirname));
  app.set('view engine', 'jade');

  // Route to the index.jade templates.
  app.get('/dev/:demo', function(req, res) {
    res.render(req.params.demo + '/index');
  });

  // Listen on 3000.
  var server = app.listen(app.get('port'), function() {
    console.log('Demos on %d', server.address().port);
  });

});
