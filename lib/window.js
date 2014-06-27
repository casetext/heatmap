

var $ = require('jquery');
var _ = require('lodash');


/**
 * A sliding region on the heatmap that represents the region of the source
 * document that's currently visible on the screen.
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
  var sourceTop     = this.heatmap.getSourceOffset().top;
  var docHeight     = $(document).outerHeight();
  var scrollTop     = $(window).scrollTop();
  var windowHeight  = $(window).outerHeight();
  var sourceBottom  = scrollTop + windowHeight;

  // Compute new dimensions for the occluders.
  var topHeight     = Math.max((scrollTop - sourceTop) * ratio, 0);
  var bottomHeight  = Math.max((docHeight - sourceBottom) * ratio, 0);
  var bottomOffset  = sourceBottom * ratio;

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
