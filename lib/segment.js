

/**
 * Set the element triple and bind event listeners.
 *
 * @param {Object} d1: A jQuery-mapped starting delimiter.
 * @param {Object} d2: A jQuery-mapped ending delimiter.
 * @param {Object} target: A d3-wrapped element from the target container.
 */

var Segment = function(d1, d2, target) {
  this.d1 = d1;
  this.d2 = d2;
  this.target = target;
};


module.exports = Segment;
