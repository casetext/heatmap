

var $ = require('jquery');
var _ = require('lodash');
var d3 = require('d3');


/**
 * Set the parent Heatmap reference.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var SegmentGroup = function(heatmap) {

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

SegmentGroup.prototype.addGroup = function(name, selector) {

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

SegmentGroup.prototype.updateSize = function() {

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

SegmentGroup.prototype._getGroupNames = function() {
  return _.keys(this.groups);
};


/**
 * Select elements in the source container and create heatmap elements.
 *
 * @param {String} name: The name of the group.
 */

SegmentGroup.prototype._buildGroup = function(name) {

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

SegmentGroup.prototype._renderGroup = function(name) {
  // TODO
};


module.exports = SegmentGroup;
