
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80: */

var path = require('path');
var express = require('express');
var app = express();

// Set port, defaulting to 3000.
app.set('port', process.env.PORT || 3000);

// Read static content in /demos.
app.use('/', express.static(path.join(__dirname, 'demos')));

// Spin up the server.
var server = app.listen(app.get('port'), function() {
  console.log('Sweet demos on port %d', server.address().port);
});
