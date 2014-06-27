

var _ = require('lodash');


/**
 * A binding between an element in the source and its heatmap avatar.
 *
 * @param {Object} source: A jQuery-mapped element from the source container.
 * @param {Object} target: A d3-wrapped element from the target container.
 */

var Span = function(source, target) {
  this.source = source;
  this.target = target;
  this._initEvents();
};


/**
 * Bind cursor events on the source and target.
 */

Span.prototype._initEvents = function() {

  _.bindAll(this, [
    'highlightSource',
    'highlightTarget',
    'unhighlight'
  ]);

  this.source
    .on('mouseenter', this.highlightSource)
    .on('mouseleave', this.unhighlight);

  this.target
    .on('mouseenter', this.highlightTarget)
    .on('mouseleave', this.unhighlight);

};


/**
 * Manifest a source highlight.
 */

Span.prototype.highlightSource = function() {

  this.target.classed({
    'highlight': true,
    'highlight-source': true
  });

  this.source.addClass(
    'highlight highlight-source'
  );

};


/**
 * Manifest a target highlight.
 */

Span.prototype.highlightTarget = function() {

  this.target.classed({
    'highlight': true,
    'highlight-target': true
  });

  this.source.addClass(
    'highlight highlight-target'
  );

};


/**
 * Unhighlight both elements.
 */

Span.prototype.unhighlight = function() {

  this.target.classed({
    'highlight': false,
    'highlight-source': false,
    'highlight-target': false
  });

  this.source.removeClass(
    'highlight highlight-source highlight-target'
  );

};


module.exports = Span;
