

var $ = require('jquery');
var d3 = require('d3');


/**
 * Click on the heatmap, scroll the source.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var ClickScroll = function(heatmap) {
  this.heatmap = heatmap;
  this._initEvents();
};


/**
 * Scroll the source when the heatmap is clicked.
 */

ClickScroll.prototype._initEvents = function() {

  var self = this;

  this.heatmap.target.on('click', function() {

    // Get the click offset in source-space pixels
    var height = self.heatmap.targetPxToSourcePx(d3.mouse(this)[1]);

    // TODO|dev
    $('body').animate({
      scrollTop: height - 200
    }, {
      duration: 200
    });

  });

};


module.exports = ClickScroll;
