

var _ = require('lodash');


/**
 * A binding between two elements in the source and the avatar on the heatmap
 * that represents the region between the elements.
 *
 * @param {Heatmap} heatmap: The parent heatmap.
 * @param {Object} d1: A jQuery-mapped starting delimiter.
 * @param {Object} d2: A jQuery-mapped ending delimiter.
 * @param {Object} source: A d3-wrapped avatar in the source.
 * @param {Object} target: A d3-wrapped avatar in the target.
 */

var Segment = function(heatmap, d1, d2, source, target) {

  this.heatmap  = heatmap;
  this.d1       = d1;
  this.d2       = d2;
  this.source   = source;
  this.target   = target;

  this._bindEvents();

};


/**
 * Bind cursor events on the target.
 */

Segment.prototype._bindEvents = function() {

  _.bindAll(this, [
    'highlightTarget',
    'unhighlight'
  ]);

  this.target
    .on('mouseenter', this.highlightTarget)
    .on('mouseleave', this.unhighlight);

};


/**
 * Highlight the target.
 */

Segment.prototype.highlightTarget = function() {

  this.target.classed({
    'highlight': true,
    'highlight-target': true
  });

};


/**
 * Unhighlight the target.
 */

Segment.prototype.unhighlight = function() {

  this.target.classed({
    'highlight': false,
    'highlight-target': false
  });

};


module.exports = Segment;
