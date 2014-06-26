

var Heatmap = require('../lib/heatmap');
var HeatmapSegments = require('../lib/plugins/segments');
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

  var segments = new HeatmapSegments(heatmap);
  segments.addGroup('pages', 'span[page]');

  $(window).resize(function() {
    heatmap.updateSize();
  });

});
