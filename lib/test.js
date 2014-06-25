

var Heatmap = require('./heatmap');
var HeatmapGroups = require('./plugins/groups');
var $ = require('jquery');


$(function() {

  var position = function() {
    $('#target').height($(window).height());
  };

  $(window).resize(position);
  position();

  var heatmap = new Heatmap('#source', '#target');
  var groups = new HeatmapGroups(heatmap);

  groups.addGroup('slugs', '[data-neatline-slug]');

  $(window).resize(function() {
    heatmap.updateSize();
  });

});
