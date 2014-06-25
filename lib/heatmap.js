

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
  this.source = source;
  this.target = target;
  this._addContainer();
};


/**
 * Create and inject the SVG element into the canvas.
 *
 * @private
 */

Heatmap.prototype._addContainer = function() {
  this.svg = d3.select(this.target).append('svg:svg');
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
 * @public
 */

Heatmap.prototype.addGroup = function(name, selector) {
  console.log(name, selector);
};


/**
 * Remove a highlight group from the heatmap.
 *
 * @param {String} name: The name of the group that should be removed.
 *
 * @public
 */

Heatmap.prototype.removeGroup = function(name) {
  console.log(name);
};


module.exports = Heatmap;
