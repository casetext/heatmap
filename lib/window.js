

var $ = require('jquery');
var _ = require('lodash');


/**
 * Set the parent Heatmap reference.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var Window = function(heatmap) {

  this.heatmap = heatmap;

  // Top occluder:
  this.top = this.heatmap.svg.append('rect')
    .classed('occluder', true);

  // Bottom occluder:
  this.bottom = this.heatmap.svg.append('rect')
    .classed('occluder', true);

  // Position on scroll.
  $(window).scroll(_.bind(this._position, this));

};


/**
 * Position the occlusion overlays.
 */

Window.prototype._position = function() {

  var ratio         = this.heatmap.getScaleRatio();
  var targetWidth   = this.heatmap.getTargetWidth();

  // Size the top occluder.
  var sourceTop     = this.heatmap.getSourceOffset().top;
  var scrollTop     = $(window).scrollTop();
  var topHeight     = (scrollTop - sourceTop) * ratio;

  // Size the bottom occluder.
  var windowHeight  = $(window).outerHeight();
  var docHeight     = $(document).outerHeight();
  var sourceBottom  = scrollTop + windowHeight;
  var bottomHeight  = (docHeight - sourceBottom) * ratio;
  var bottomOffset  = sourceBottom * ratio;

  // Block negative heights, which can be caused by the "bounce" effect on
  // Macs when the scroll hits the top or bottom of the document.
  topHeight         = Math.max(topHeight, 0);
  bottomHeight      = Math.max(bottomHeight, 0);

  this.top
    .attr('height', topHeight)
    .attr('width', targetWidth)
    .attr('x', 0)
    .attr('y', 0);

  this.bottom
    .attr('height', bottomHeight)
    .attr('width', targetWidth)
    .attr('x', 0)
    .attr('y', bottomOffset);

};


module.exports = Window;
