

var $ = require('jquery');
var _ = require('lodash');
var d3 = require('d3');

var Avatar = require('../avatar');


/**
 * Set the parent Heatmap reference.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var HeatmapSegments = function(heatmap) {

  this.heatmap = heatmap;
  this.groups = {};

  // Re-render on container resize.
  this.heatmap.on('updateSize', _.bind(function() {
    this.updateSize();
  }, this));

};


/**
 * Add a new segment group to the heatmap.
 *
 * @param {String} name: A name for the group. Later on, this can be used to
 * identify the group if it needs to be changed or removed.
 *
 * @param {String} selector: A CSS selector that matches the "delimiter"
 * elements in the source text that separate the segments.
 */

HeatmapSegments.prototype.addGroup = function(name, selector) {

  this.groups[name] = {
    selector: selector,
    elements: []
  };

  this._buildGroup(name);
  this._renderGroup(name);

};


/**
 * Re-render all groups to match the current container sizes.
 */

HeatmapSegments.prototype.updateSize = function() {

  // Render the groups.
  _.each(this._getGroupNames(), _.bind(function(name) {
    this._renderGroup(name);
  }, this));

};


/**
 * Get an array of all the group names.
 *
 * @return {Array}
 */

HeatmapSegments.prototype._getGroupNames = function() {
  return _.keys(this.groups);
};


/**
 * Select elements in the source container and create heatmap elements.
 *
 * @param {String} name: The name of the group.
 */

HeatmapSegments.prototype._buildGroup = function(name) {

  var group = this.groups[name];
  var self = this;

  // Iterate over all the matching elements.
  var last = null;
  this.heatmap.$source.find(group.selector).each(function(i, el) {

    var delimiter = $(el);

    if (last) {

      // Create the target element.
      var target = self.heatmap.svg.append('rect');
      target.classed(name, true);

      // Store the element trio.
      // TODO

    }

    last = delimiter;

  });

};


/**
 * Add a new highlight group to the heatmap.
 *
 * @param {String} name: The name of the group.
 */

HeatmapSegments.prototype._renderGroup = function(name) {

  //var group = this.groups[name];
  //var self = this;

  //// Cache the width ratio.
  //var sourceWidth = this.heatmap.$source.outerWidth();
  //var targetWidth = this.heatmap.$target.outerWidth();
  //var ratio = targetWidth / sourceWidth;

  //// Iterate over all the matching elements.
  //var last = null;
  //this.heatmap.$source.find(group.selector).each(function(i, el) {

    //var delimiter = $(el);

    //if (last) {

      //// Get the delimiter positions.
      //var thisOffset = delimiter.offset();
      //var lastOffset = last.offset();

      //// Scale the height to fit the heatmap.
      //var h = (thisOffset.top - lastOffset.top) * ratio;
      //var y = lastOffset.top * ratio;

    //}

    //last = delimiter;

  //});

};


module.exports = HeatmapSegments;
