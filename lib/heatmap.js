

var $ = require('jquery');
var _ = require('lodash');
var events = require('events');
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

  // d3 containers:
  this.source = d3.select(source);
  this.target = d3.select(target);

  // jQuery containers:
  this.$source = $(source);
  this.$target = $(target);

  events.EventEmitter.call(this);
  this._addContainer();

};


/**
 * Create and inject the SVG element into the canvas.
 */

Heatmap.prototype._addContainer = function() {
  this.svg = this.target.append('svg:svg');
};


/**
 * Trigger the `updateSize` event, which is consumed by plugins that render
 * elements that are dependent on the dimensions of the source.
 */

Heatmap.prototype.updateSize = function() {
  this.emit('updateSize');
};


/**
 * Compute the ratio between the dimensions of the heatmap and the source.
 *
 * @return {Number}
 */

Heatmap.prototype.getScaleRatio = function() {
  var sourceWidth = this.$source.outerWidth();
  var targetWidth = this.$target.outerWidth();
  return targetWidth / sourceWidth;
};


/**
 * Copy in EventEmitter.
 */

Heatmap.prototype.__proto__ = events.EventEmitter.prototype;


module.exports = Heatmap;
