

var $ = require('jquery');
var _ = require('lodash');


/**
 * A horizontal bar on the heatmap that reflects the current vertical offset
 * of the cursor on the heatmap or the source container.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var CursorBar = function(heatmap) {
  this.heatmap = heatmap;
  this._initElement();
  this._initEvents();
};


/**
 * Inject the bar element.
 */

CursorBar.prototype._initElement = function() {

  // Hidden by default.
  this.bar = this.heatmap.svg.append('rect')
    .classed('bar', true)
    .style('display', 'none');

};


/**
 * Listen for cursor enter/leave/move on the source and target.
 */

CursorBar.prototype._initEvents = function() {

  _.bindAll(this, 'show', 'hide', 'position');

  this.heatmap.$source
    .on('mouseenter', this.show)
    .on('mouseleave', this.hide)
    .on('mousemove', this.position);

  this.heatmap.$target
    .on('mouseenter', this.show)
    .on('mouseleave', this.hide)
    .on('mousemove', this.position);

};


/**
 * Display and position the bar.
 */

CursorBar.prototype.show = function() {
  this.bar.style('display', 'block');
  this.position();
};


/**
 * Hide the bar.
 */

CursorBar.prototype.hide = function() {
  this.bar.style('display', 'none');
};


/**
 * Position the bar.
 *
 * @param {Object} e; The move event.
 */

CursorBar.prototype.position = function(e) {
  console.log(e);
};


module.exports = CursorBar;
