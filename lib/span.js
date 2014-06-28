

var _ = require('lodash');


/**
 * A binding between an element in the source and its heatmap avatar.
 *
 * @param {Heatmap} heatmap: The parent heatmap.
 * @param {Object} span: A jQuery-wrapped span from the source container.
 */

var Span = function(heatmap, span) {

  this.heatmap = heatmap;
  this.span = span;

  this._injectAvatar();
  this._bindEvents();

};


/**
 * Bind cursor events on the source and target.
 */

Span.prototype._injectAvatar = function() {

  this.avatar = this.heatmap.targetSVG.append('rect')
    .classed('span', true)
    .classed(name, true);

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

  this.span
    .on('mouseenter', this.highlightSource)
    .on('mouseleave', this.unhighlight);

  this.avatar
    .on('mouseenter', this.highlightTarget)
    .on('mouseleave', this.unhighlight);

};


/**
 * Manifest a source highlight.
 */

Span.prototype.highlightSource = function() {

  this.span.addClass(
    'highlight highlight-source'
  );

  this.avatar.classed({
    'highlight': true,
    'highlight-source': true
  });

};


/**
 * Manifest a target highlight.
 */

Span.prototype.highlightTarget = function() {

  this.span.addClass(
    'highlight highlight-target'
  );

  this.avatar.classed({
    'highlight': true,
    'highlight-target': true
  });

};


/**
 * Unhighlight both elements.
 */

Span.prototype.unhighlight = function() {

  this.span.removeClass(
    'highlight highlight-source highlight-target'
  );

  this.avatar.classed({
    'highlight': false,
    'highlight-source': false,
    'highlight-target': false
  });

};


/**
 * Position the span.
 */

Span.prototype.position = function() {

  // Cache the scaling ratio.
  var ratio = this.heatmap.getTargetRatio();

  // Cache offsets of source/container.
  var sourceOffset = this.heatmap.$source.offset();
  var spanOffset = this.span.offset();

  // Scale the coordinates to fit the heatmap.
  var x = (spanOffset.left - sourceOffset.left) * ratio;
  var y = (spanOffset.top - sourceOffset.top) * ratio;
  var w = this.span.outerWidth()  * ratio;
  var h = this.span.outerHeight() * ratio;

  // Position the span.
  this.avatar
    .attr('height', h)
    .attr('width', w)
    .attr('x', x)
    .attr('y', y);

};


module.exports = Span;
