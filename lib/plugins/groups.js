

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

  this.heatmap.on('updateSize', _.bind(function() {
    this.updateSize();
  }, this));

};


/**
 * Add a new highlight group to the heatmap.
 *
 * @param {String} name: A name for the group. Later on, this can be used to
 * identify the group if it needs to be changed or removed.
 * @param {String} selector: A CSS selector that defines which elements in the
 * source text should be represented in the heatmap group.
 * @param {Boolean} renderNow: If true, render the new group immediately.
 * @public
 */

HeatmapGroups.prototype.addGroup = function(name, selector, renderNow) {

  renderNow = renderNow || true;

  // Register the group.
  this.groups[name] = {
    selector: selector,
    elements: []
  }

  // If requested, render.
  if (renderNow) {
    this._renderGroup(name);
  }

};


/**
 * Clear all avatars and re-render all groups.
 *
 * @public
 */

HeatmapGroups.prototype.updateSize = function() {

  // Clear everything.
  this.heatmap.svg.selectAll('*').remove();

  // Render the groups.
  _.each(this._getGroupNames(), _.bind(function(name) {
    this._renderGroup(name);
  }, this));

};


/**
 * Get an array of all the group names.
 *
 * @return {Array}
 * @public
 */

HeatmapGroups.prototype._getGroupNames = function() {
  return _.keys(this.groups);
};


/**
 * Add a new highlight group to the heatmap.
 *
 * @param {String} name: The name of the group.
 * @private
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

  // Iterate over all the matching elements.
  this.heatmap.$source.find(group.selector).each(function(i, el) {

    var match = $(el);
    var offset = match.offset();

    // Scale the coordinates to fit on the heatmap.
    var x = (offset.left - sourceOffset.left) * ratio;
    var y = (offset.top - sourceOffset.top) * ratio;
    var w = match.outerWidth()  * ratio;
    var h = match.outerHeight() * ratio;

    // Render the avatar.
    var avatar = self.heatmap.svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('height', h)
      .attr('width', w);

    // Set the class.
    avatar.classed(name, true);

  });

};


module.exports = HeatmapGroups;
