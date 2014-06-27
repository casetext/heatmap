

var $ = require('jquery');
var _ = require('lodash');
var events = require('events');
var d3 = require('d3');


/**
 * A small, schematic representation of a document.
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

  // Mix in EventEmitter.
  events.EventEmitter.call(this);
  this._injectSvgContainers();

};


/**
 * Mix in EventEmitter.
 */

Heatmap.prototype.__proto__ = events.EventEmitter.prototype;


/**
 * Create and inject the SVG element into the canvas.
 */

Heatmap.prototype._injectSvgContainers = function() {
  this.sourceSVG = this.source.append('svg:svg');
  this.targetSVG = this.target.append('svg:svg');
};


/**
 * Trigger the `updateSize` event, which is consumed by plugins that render
 * elements that are dependent on the dimensions of the source.
 */

Heatmap.prototype.updateSize = function() {
  this.emit('updateSize');
};


/**
 * Get multiplier to convert source pixels -> target pixels.
 *
 * @return {Number}
 */

Heatmap.prototype.getTargetRatio = function() {
  return this.$target.outerWidth() / this.$source.outerWidth();
};


/**
 * Get multiplier to convert target pixels -> source pixels.
 *
 * @return {Number}
 */

Heatmap.prototype.getSourceRatio = function() {
  return this.$source.outerWidth() / this.$target.outerWidth();
};


/**
 * Scale source pixels -> target pixels.
 *
 * @return {Number}
 */

Heatmap.prototype.getTargetPx = function(sourcePx) {
  return this.getTargetRatio() * sourcePx;
};


/**
 * Scale target pixels -> source pixels.
 *
 * @return {Number}
 */

Heatmap.prototype.getSourcePx = function(targetPx) {
  return this.getSourceRatio() * targetPx;
};


module.exports = Heatmap;
