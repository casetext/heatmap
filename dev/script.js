

var Heatmap = require('../lib/heatmap');
var Window = require('../lib/window');
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

  // Pages.
  var segments = new SegmentGroup(heatmap);
  segments.addGroup('pages', 'span[page]');

  // Slugs.
  var spans = new SpanGroup(heatmap);
  spans.addGroup('slugs', '[data-neatline-slug]');

  // Window.
  new Window(heatmap);

  $(window).resize(function() {
    heatmap.updateSize();
  });

});
