

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
  $(window).scroll(_.bind(this._position, this));
  console.log('init');

};


/**
 * Position the occlusion overlays.
 */

Window.prototype._position = function() {
  console.log($(window).scrollTop());
};


module.exports = Window;
