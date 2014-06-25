

var Heatmap = require('./heatmap');
var $ = require('jquery');


$(function() {

  var position = function() {
    $('#target').height($(window).height());
  };

  $(window).resize(position);
  position();

  var heatmap = new Heatmap('#source', '#target');
  heatmap.addGroup('h1', '[data-neatline-slug]');

  $(window).resize(function() {
    heatmap.updateSize();
  });

})
