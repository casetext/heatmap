

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

  this.source = $(source);
  this.target = $(target);
  this.groups = {};

  this._addContainer();

};


/**
 * Create and inject the SVG element into the canvas.
 *
 * @private
 */

Heatmap.prototype._addContainer = function() {
  this.svg = d3.select(this.target.get(0)).append('svg:svg');
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
 * @param {Boolean} render: If true, render the new group immediately.
 *
 * @public
 */

Heatmap.prototype.addGroup = function(name, selector, render) {

  render = render || true;

  this.groups[name] = {
    selector: selector,
    elements: []
  }

  if (render) {
    this._renderGroup(name);
  }

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
 * @param {Boolean} render: If true, render the new group immediately.
 *
 * @private
 */

Heatmap.prototype._renderGroup = function(name) {

  var group = this.groups[name];

  // Iterate over all the matching elements.
  this.source.find(group.selector).each(function(i, el) {
    console.log(el);
  });

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
