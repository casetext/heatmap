

var $ = require('jquery');
var _ = require('lodash');
var d3 = require('d3');


/**
 * Construct a new heatmap.
 *
 * @param {String} source: A CSS selector for the container element that is
 * being represented by the heatmap.
 *
 * @param {String} target: A CSS selector for the element that should contain
 * the rendered heatmap.
 */

var Heatmap = function(source, target) {

  this.groups = {};

  // d3 containers:
  this.source = d3.select(source);
  this.target = d3.select(target);

  // jQuery containers:
  this.$source = $(source);
  this.$target = $(target);

  // Startup:
  this._addContainer();
  this._bindEvents();

};


/**
 * Create and inject the SVG element into the canvas.
 *
 * @private
 */

Heatmap.prototype._addContainer = function() {
  this.svg = this.target.append('svg:svg');
};


/**
 * Add move and click listeners to the containers.
 *
 * @private
 */

Heatmap.prototype._bindEvents = function() {

  var self = this;

  this.source
  .on('mousemove', function() {
    self._onSourceMousemove(d3.mouse(this));
  })
  .on('click', function() {
    self._onSourceClick(d3.mouse(this));
  });

  this.target
  .on('mousemove', function() {
    self._onTargetMousemove(d3.mouse(this));
  })
  .on('click', function() {
    self._onTargetClick(d3.mouse(this));
  });

};


/**
 * When the cursor moves over the source container.
 *
 * @param {Array} position: The cursor X and Y coordinates.
 * @private
 */

Heatmap.prototype._onSourceMousemove = function(position) {
  console.log('source mousemove', position);
};


/**
 * When the cursor clicks on the source container.
 *
 * @param {Array} position: The cursor X and Y coordinates.
 * @private
 */

Heatmap.prototype._onSourceClick = function(position) {
  console.log('source click', position);
};


/**
 * When the cursor moves over the target container.
 *
 * @param {Array} position: The cursor X and Y coordinates.
 * @private
 */

Heatmap.prototype._onTargetMousemove = function(position) {
  console.log('target mousemove', position);
};


/**
 * When the cursor clicks on the target container.
 *
 * @param {Array} position: The cursor X and Y coordinates.
 * @private
 */

Heatmap.prototype._onTargetClick = function(position) {
  console.log('target click', position);
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

Heatmap.prototype.addGroup = function(name, selector, renderNow) {

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
 * Remove a highlight group from the heatmap.
 *
 * @param {String} name: The name of the group that should be removed.
 * @public
 */

Heatmap.prototype.removeGroup = function(name) {
  console.log(name); // TODO
};


/**
 * Get an array of all the group names.
 *
 * @return {Array}
 * @public
 */

Heatmap.prototype.getGroupNames = function() {
  return _.keys(this.groups);
};


/**
 * Clear all avatars and re-render all groups.
 * @public
 */

Heatmap.prototype.updateSize = function() {

  // Clear everything.
  this.svg.selectAll('*').remove();

  // Re-render each of the registered groups.
  _.each(this.getGroupNames(), _.bind(function(name) {
    this._renderGroup(name);
  }, this));

};


/**
 * Add a new highlight group to the heatmap.
 *
 * @param {String} name: The name of the group.
 * @private
 */

Heatmap.prototype._renderGroup = function(name) {

  var group = this.groups[name];

  // Cache the width ratio.
  var sourceWidth = this.$source.outerWidth();
  var targetWidth = this.$target.outerWidth();
  var ratio = targetWidth / sourceWidth;

  // Cache the offset of the source.
  var sourceOffset = this.$source.offset();

  // Iterate over all the matching elements.
  this.$source.find(group.selector).each(_.bind(function(i, el) {

    var match = $(el);
    var offset = match.offset();

    // Scale down the coordinates.
    var x = (offset.left - sourceOffset.left) * ratio;
    var y = (offset.top - sourceOffset.top) * ratio;
    var w = match.outerWidth()  * ratio;
    var h = match.outerHeight() * ratio;

    // Render the avatar.
    var avatar = this.svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('height', h)
      .attr('width', w);

    // Set the class.
    avatar.classed(name, true);

  }, this));

};


module.exports = Heatmap;
