

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
  var self = this;

  // Inject the bar.
  this.bar = this.heatmap.svg.append('rect')
    .classed('bar', true);

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
