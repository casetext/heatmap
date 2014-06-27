

var _ = require('lodash');


/**
 * A binding between two elements in the source and the avatar on the heatmap
 * that represents the region between the elements.
 *
 * @param {Object} d1: A jQuery-mapped starting delimiter.
 * @param {Object} d2: A jQuery-mapped ending delimiter.
 * @param {Object} target: A d3-wrapped element from the target container.
 */

var Segment = function(d1, d2, target) {
  this.d1 = d1;
  this.d2 = d2;
  this.target = target;
  this._initEvents();
};


/**
 * Bind cursor events on the target.
 */

Segment.prototype._initEvents = function() {

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
