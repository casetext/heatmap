

var $ = require('jquery');
var _ = require('lodash');
var d3 = require('d3');


/**
 * Set the parent Heatmap reference.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var HeatmapGroups = function(heatmap) {

  this.heatmap = heatmap;
  this.groups = {};

  // Re-render on container resize.
  this.heatmap.on('updateSize', _.bind(function() {
    this.updateSize();
  }, this));

};


/**
 * Add a new highlight group to the heatmap.
 *
 * @param {String} name: A name for the group. Later on, this can be used to
 * identify the group if it needs to be changed or removed.
 *
 * @param {String} selector: A CSS selector that defines which elements in the
 * source text should be represented in the heatmap group.
 */

HeatmapGroups.prototype.addGroup = function(name, selector) {

  this.groups[name] = {
    selector: selector,
    elements: []
  }

  this._selectGroup(name);
  this._renderGroup(name);

};


/**
 * Re-render all groups to match the current container sizes.
 */

HeatmapGroups.prototype.updateSize = function() {

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

HeatmapGroups.prototype._getGroupNames = function() {
  return _.keys(this.groups);
};


/**
 * Select elements in the source container and create heatmap elements.
 *
 * @param {String} name: The name of the group.
 */

HeatmapGroups.prototype._selectGroup = function(name) {

  var group = this.groups[name];
  var self = this;

  // Iterate over all the matching elements.
  this.heatmap.$source.find(group.selector).each(function(i, el) {

    var source = $(el);

    // Create the target element.
    var target = self.heatmap.svg.append('rect');
    target.classed(name, true);

    // Store the element pair.
    group.elements.push({
      source: source, target: target
    });

  });

};


/**
 * Add a new highlight group to the heatmap.
 *
 * @param {String} name: The name of the group.
 */

HeatmapGroups.prototype._renderGroup = function(name) {

  var group = this.groups[name];
  var self = this;

  // Cache the width ratio.
  var sourceWidth = this.heatmap.$source.outerWidth();
  var targetWidth = this.heatmap.$target.outerWidth();
  var ratio = targetWidth / sourceWidth;

  // Cache the offset of the source.
  var sourceOffset = this.heatmap.$source.offset();

  _.each(group.elements, function(els) {

    var offset = els.source.offset();

    // Scale the coordinates to fit on the heatmap.
    var x = (offset.left - sourceOffset.left) * ratio;
    var y = (offset.top - sourceOffset.top) * ratio;
    var w = els.source.outerWidth()  * ratio;
    var h = els.source.outerHeight() * ratio;

    // Position the avatar.
    els.target
      .attr('height', h)
      .attr('width', w)
      .attr('x', x)
      .attr('y', y);

  });

};


module.exports = HeatmapGroups;
