

var Heatmap = require('../lib/heatmap');
var SegmentGroup = require('../lib/segment-group');
var SpanGroup = require('../lib/span-group');
var Window = require('../lib/window');
var ClickScroll = require('../lib/click-scroll');
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

  new ClickScroll(heatmap);
  new Window(heatmap);

  $(window).resize(function() {
    heatmap.updateSize();
  });

});
