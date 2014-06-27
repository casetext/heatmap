

var _ = require('lodash');


/**
 * A binding between an element in the source and its heatmap avatar.
 *
 * @param {Heatmap} heatmap: The parent heatmap.
 * @param {Object} source: A jQuery-wrapped element from the source container.
 * @param {Object} target: A d3-wrapped element from the target container.
 */

var Span = function(heatmap, source, target) {

  this.heatmap = heatmap;
  this.source = source;
  this.target = target;

  this._bindEvents();

};


/**
 * Bind cursor events on the source and target.
 */

Span.prototype._bindEvents = function() {

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


/**
 * Position the span.
 */

Span.prototype.position = function() {

  // Cache the scaling ratio.
  var ratio = this.heatmap.getTargetRatio();

  // Cache offsets of source/container.
  var sourceOffset = this.heatmap.$source.offset();
  var offset = this.source.offset();

  // Scale the coordinates to fit the heatmap.
  var x = (offset.left - sourceOffset.left) * ratio;
  var y = (offset.top - sourceOffset.top) * ratio;
  var w = this.source.outerWidth()  * ratio;
  var h = this.source.outerHeight() * ratio;

  // Position the span.
  this.target
    .attr('height', h)
    .attr('width', w)
    .attr('x', x)
    .attr('y', y);

};


module.exports = Span;
