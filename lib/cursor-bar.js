

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
  this._initSourceEvents();
  this._initTargetEvents();
};


/**
 * Inject the bar element.
 */

CursorBar.prototype._initElement = function() {
  this.bar = this.heatmap.svg.append('rect').classed('bar', true);
};


/**
 * Listen for cursor enter/leave/move on the source.
 */

CursorBar.prototype._initSourceEvents = function() {

  this.heatmap.$source
    .on('mouseenter', function() {
      console.log('source enter');
      // TODO
    })
    .on('mouseleave', function() {
      console.log('source leave');
      // TODO
    })
    .on('mousemove', function() {
      console.log('source move');
      // TODO
    });

};


/**
 * Listen for cursor enter/leave/move on the target.
 */

CursorBar.prototype._initTargetEvents = function() {

  this.heatmap.$target
    .on('mouseenter', function() {
      console.log('target enter');
      // TODO
    })
    .on('mouseleave', function() {
      console.log('target leave');
      // TODO
    })
    .on('mousemove', function() {
      console.log('target move');
      // TODO
    });

};


module.exports = CursorBar;
