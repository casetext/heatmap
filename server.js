
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80: */

var path = require('path');
var browserify = require('browserify-middleware');
var express = require('express');

var app = express();

// Use Jade for templates.
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'dev'));

// Browserify the Javascripts.
app.use('/js', browserify(__dirname));

// Route to the index.jade templates.
app.get('/demos/:demo', function(req, res) {
  res.render(req.params.demo + '/index');
});

// Listen on port 3000, by default.
app.set('port', process.env.PORT || 3000);

// Spin up the server.
var server = app.listen(app.get('port'), function() {
  console.log('Demos on %d', server.address().port);
});
