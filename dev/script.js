

var Heatmap = require('../lib/heatmap');
var HeatmapSpans = require('../lib/plugins/spans');
var $ = require('jquery');


$(function() {

  var position = function() {
    $('#target').height($(window).height());
  };

  $(window).resize(position);
  position();

  var heatmap = new Heatmap('#source', '#target');
  var spans = new HeatmapSpans(heatmap);

  spans.addGroup('slugs', '[data-neatline-slug]');

  $(window).resize(function() {
    heatmap.updateSize();
  });

});
