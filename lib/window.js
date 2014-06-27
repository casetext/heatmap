

var $ = require('jquery');
var _ = require('lodash');


/**
 * Set the parent Heatmap reference.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var Window = function(heatmap) {

  this.heatmap = heatmap;

  // Inject occlusion overlays.
  this.top    = this.heatmap.svg.append('rect');
  this.bottom = this.heatmap.svg.append('rect');

  // Position on scroll.
  $(window).scroll(_.bind(function() {
    this._positionTop();
    this._positionBottom();
  }, this));

};


/**
 * Position the top occlusion overlay.
 */

Window.prototype._positionTop = function() {

  // Compute the top occluder height.
  var ratio     = this.heatmap.getScaleRatio();
  var scrollTop = $(window).scrollTop();
  var sourceTop = this.heatmap.getSourceOffset().top;
  var topHeight = (scrollTop - sourceTop) * ratio;

  // Position the occluder.
  this.top
    .attr('height', topHeight)
    .attr('width', this.heatmap.$target.outerWidth())
    .attr('x', 0)
    .attr('y', 0);

};


/**
 * Position the top occlusion overlay.
 */

Window.prototype._positionBottom = function() {

  // Compute the bottom occluder height.
  var ratio           = this.heatmap.getScaleRatio();
  var windowHeight    = $(window).outerHeight();
  var documentHeight  = $(document).outerHeight();
  var scrollTop       = $(window).scrollTop();
  var sourceBottom    = scrollTop + windowHeight;
  var bottomHeight    = (documentHeight - sourceBottom) * ratio;

  // Position the occluder.
  this.bottom
    .attr('height', bottomHeight)
    .attr('width', this.heatmap.$target.outerWidth())
    .attr('x', 0)
    .attr('y', sourceBottom * ratio);

};


module.exports = Window;
