

var _ = require('lodash');


/**
 * Set the parent Heatmap reference.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var Window = function(heatmap) {
  this.heatmap = heatmap;
};


module.exports = Window;
