

var Heatmap = require('../lib/heatmap');
var SegmentGroup = require('../lib/segment-group');
var SpanGroup = require('../lib/span-group');
var $ = require('jquery');


$(function() {

  var position = function() {
    $('#target').height($(window).height());
  };

  $(window).resize(position);
  position();

  var heatmap = new Heatmap('#source', '#target');

  var segments = new SegmentGroup(heatmap);
  segments.addGroup('pages', 'span[page]');

  var spans = new SpanGroup(heatmap);
  spans.addGroup('slugs', '[data-neatline-slug]');

  $(window).resize(function() {
    heatmap.updateSize();
  });

});
