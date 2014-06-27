

var $ = require('jquery');
var _ = require('lodash');
var d3 = require('d3');


/**
 * Click on the heatmap, scroll the source.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 * @param {Options} options: Custom options.
 */

var ClickScroll = function(heatmap, options) {

  this.heatmap = heatmap;

  var opts = {
    container:  $('body'),
    padding:    200,
    duration:   200
  };

  this.options = _.extend(opts, options);
  this._bindClickEvent();

};


/**
 * Scroll the source when the heatmap is clicked.
 */

ClickScroll.prototype._bindClickEvent = function() {

  var self = this;

  this.heatmap.target.on('click', function() {

    // Get the click offset in source pixels
    var height = self.heatmap.getSourcePx(d3.mouse(this)[1]);

    // Scroll the source container.
    self.options.container.animate({
      scrollTop: height - self.options.padding
    }, {
      duration: self.options.duration
    });

  });

};


module.exports = ClickScroll;
