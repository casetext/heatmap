

var Heatmap = require('../lib/heatmap');
var WrappedGroups = require('../lib/plugins/wrappedGroups');
var $ = require('jquery');


$(function() {

  var position = function() {
    $('#target').height($(window).height());
  };

  $(window).resize(position);
  position();

  var heatmap = new Heatmap('#source', '#target');
  var groups = new WrappedGroups(heatmap);

  groups.addGroup('slugs', '[data-neatline-slug]');

  $(window).resize(function() {
    heatmap.updateSize();
  });

});
