

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

  // Startup:
  events.EventEmitter.call(this);
  this._addContainer();

};


/**
 * Create and inject the SVG element into the canvas.
 *
 * @private
 */

Heatmap.prototype._addContainer = function() {
  this.svg = this.target.append('svg:svg');
};


// Copy in EventEmitter.
Heatmap.prototype.__proto__ = events.EventEmitter.prototype;


module.exports = Heatmap;
