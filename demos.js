
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80: */

var path = require('path');
var browserify = require('browserify-middleware');
var express = require('express');

var app = express();

// Use Jade for templates.
app.set('views', path.join(__dirname, 'demos'));
app.set('view engine', 'jade');

// Browserify the Javascripts.
app.use('/js', browserify(path.join(__dirname, 'demos')));

// Listen on port 3000, by default.
app.set('port', process.env.PORT || 3000);

// Route to the demo templates.
app.get('/demos/:demo', function(req, res) {
  res.render(req.params.demo + '/index');
});

// Spin up the server.
var server = app.listen(app.get('port'), function() {
  console.log('Sweet demos on port %d', server.address().port);
});
