

var $ = require('jquery');
var _ = require('lodash');
var d3 = require('d3');


/**
 * Set the parent Heatmap reference..
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var HeatmapGroups = function(heatmap) {
  this.heatmap = heatmap;
  this.groups = {};
};


/**
 * Add a new highlight group to the heatmap.
 *
 * @param {String} name: A name for the group. Later on, this can be used to
 * identify the group if it needs to be changed or removed.
 *
 * @param {String} selector: A CSS selector that defines which elements in the
 * source text should be represented in the heatmap group.
 *
 * @param {Boolean} renderNow: If true, render the new group immediately.
 *
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
 * Get an array of all the group names.
 *
 * @return {Array}
 * @public
 */

HeatmapGroups.prototype.getGroupNames = function() {
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

  // Cache the width ratio.
  var sourceWidth = this.heatmap.$source.outerWidth();
  var targetWidth = this.heatmap.$target.outerWidth();
  var ratio = targetWidth / sourceWidth;

  // Cache the offset of the source.
  var sourceOffset = this.heatmap.$source.offset();

  // Iterate over all the matching elements.
  this.heatmap.$source.find(group.selector).each(_.bind(function(i, el) {

    var match = $(el);
    var offset = match.offset();

    // Scale down the coordinates.
    var x = (offset.left - sourceOffset.left) * ratio;
    var y = (offset.top - sourceOffset.top) * ratio;
    var w = match.outerWidth()  * ratio;
    var h = match.outerHeight() * ratio;

    // Render the avatar.
    var avatar = this.heatmap.svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('height', h)
      .attr('width', w);

    // Set the class.
    avatar.classed(name, true);

  }, this));

};


module.exports = HeatmapGroups;
