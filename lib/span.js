

/**
 * A binding between an element in the source and its heatmap avatar.
 *
 * @param {Object} source: A jQuery-mapped element from the source container.
 * @param {Object} target: A d3-wrapped element from the target container.
 */

var Span = function(source, target) {

  this.source = source;
  this.target = target;

  this._bindTargetEvents();
  this._bindSourceEvents();

};


/**
 * Bind cursor events on the target.
 */

Span.prototype._bindTargetEvents = function() {

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
 * Bind cursor events on the source.
 */

Span.prototype._bindSourceEvents = function() {

  var self = this;

  this.source
    .on('mouseenter', function() {
      self.highlight();
    })
    .on('mouseleave', function() {
      self.unhighlight();
    });

};


/**
 * Highlight both elements.
 */

Span.prototype.highlight = function() {
  this.target.classed('highlighted', true);
  this.source.addClass('highlighted');
};


/**
 * Unhighlight both elements.
 */

Span.prototype.unhighlight = function() {
  this.target.classed('highlighted', false);
  this.source.removeClass('highlighted');
};


module.exports = Span;
