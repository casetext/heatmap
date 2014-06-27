

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
  this._initElements();
  this._initEvents();
};


/**
 * Inject the occluders.
 */

Window.prototype._initElements = function() {

  // Top occluder:
  this.top = this.heatmap.svg.append('rect')
    .classed('occluder', true);

  // Bottom occluder:
  this.bottom = this.heatmap.svg.append('rect')
    .classed('occluder', true);

};


/**
 * Position the occluders when the window is scroller.
 */

Window.prototype._initEvents = function() {
  $(window).scroll(_.bind(this._position, this));
  this._position();
};


/**
 * Position the occlusion overlays.
 */

Window.prototype._position = function() {

  // Size ratio between source and target.
  var ratio = this.heatmap.getTargetRatio();

  // Width of the heatmap.
  var targetWidth = this.heatmap.getTargetWidth();

  // Offset of source relative to document.
  var sourceTop = this.heatmap.getSourceOffset().top;

  // Total height of the document.
  var docHeight = $(document).outerHeight();

  // Offset of the top of the window.
  var scrollTop = $(window).scrollTop();

  // Total height of the window.
  var windowHeight = $(window).outerHeight();

  // Offset of the bottom of the window.
  var sourceBottom = scrollTop + windowHeight;

  // Height of the top occluder.
  var topHeight = Math.max((scrollTop - sourceTop) * ratio, 0);

  // Height of the bottom occluder.
  var bottomHeight = Math.max((docHeight - sourceBottom) * ratio, 0);

  // Offset of the bottom occluder.
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
