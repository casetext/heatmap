

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

  events.EventEmitter.call(this);
  this._initSvgContainers();

};


/**
 * Mix in EventEmitter.
 */

Heatmap.prototype.__proto__ = events.EventEmitter.prototype;


/**
 * Create and inject the SVG element into the canvas.
 */

Heatmap.prototype._initSvgContainers = function() {
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
 * Get the outer width of the source.
 *
 * @return {Number}
 */

Heatmap.prototype.getSourceWidth = function() {
  return this.$source.outerWidth();
};


/**
 * Get the outer width of the target.
 *
 * @return {Number}
 */

Heatmap.prototype.getTargetWidth = function() {
  return this.$target.outerWidth();
};


/**
 * Get multiplier to convert source pixels -> target pixels.
 *
 * @return {Number}
 */

Heatmap.prototype.getTargetRatio = function() {
  return this.getTargetWidth() / this.getSourceWidth();
};


/**
 * Get multiplier to convert target pixels -> source pixels.
 *
 * @return {Number}
 */

Heatmap.prototype.getSourceRatio = function() {
  return this.getSourceWidth() / this.getTargetWidth();
};


/**
 * Scale source pixels -> target pixels.
 *
 * @return {Number}
 */

Heatmap.prototype.getTargetPx = function(sourcePx) {
  return (this.getTargetWidth() / this.getSourceWidth()) * sourcePx;
};


/**
 * Scale target pixels -> source pixels.
 *
 * @return {Number}
 */

Heatmap.prototype.getSourcePx = function(targetPx) {
  return (this.getSourceWidth() / this.getTargetWidth()) * targetPx;
};


/**
 * Get the offset of the source.
 *
 * @return {Object}
 */

Heatmap.prototype.getSourceOffset = function() {
  return this.$source.offset();
};


/**
 * Get the offset of the target.
 *
 * @return {Object}
 */

Heatmap.prototype.getTargetOffset = function() {
  return this.$target.offset();
};


module.exports = Heatmap;
