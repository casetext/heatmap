

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

  this._bindTargetEvents();

};


/**
 * Bind cursor events on the target.
 */

Segment.prototype._bindTargetEvents = function() {

  var self = this;

  this.target
    .on('mouseenter', function() {
      self.highlight();
    })
    .on('mouseleave', function() {
      self.unhighlight();
    });

};


/**
 * Highlight the target.
 */

Segment.prototype.highlight = function() {
  this.target.classed('highlighted', true);
};


/**
 * Unhighlight the target.
 */

Segment.prototype.unhighlight = function() {
  this.target.classed('highlighted', false);
};


module.exports = Segment;
