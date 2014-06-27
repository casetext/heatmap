

var $ = require('jquery');
var _ = require('lodash');
var d3 = require('d3');
var Segment = require('./segment');
var Group = require('./group');


/**
 * A group of avatars that represent the regions between elements.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var SegmentGroup = function(heatmap) {
  Group.apply(this, arguments);
};


/**
 * Inherit from Group.
 */

SegmentGroup.prototype = Object.create(Group.prototype);
SegmentGroup.prototype.constructor = SegmentGroup;


/**
 * Select elements in the source container and create heatmap elements.
 *
 * @param {String} name: The name of the group.
 */

SegmentGroup.prototype._injectAvatars = function(name) {

  var group = this.groups[name];
  var self = this;

  var delimiters = this.heatmap.$source.find(group.selector);

  // Iterate over all the matching elements.
  var last = null;
  _.times(delimiters.length + 1, function(i) {

    // Wrap the source element, if it exists.
    var delimiter = delimiters[i] ? $(delimiters[i]) : null;

    // Source avatar:
    var source = self.heatmap.sourceSVG.append('rect')
      .classed('segment', true)
      .classed(name, true);

    // Target avatar:
    var target = self.heatmap.targetSVG.append('rect')
      .classed('segment', true)
      .classed(name, true);

    // Store the new segment.
    var segment = new Segment(
      self.heatmap, last, delimiter, source, target
    );

    group.elements.push(segment);
    last = delimiter;

  });

};


/**
 * Add a new highlight group to the heatmap.
 *
 * @param {String} name: The name of the group.
 */

SegmentGroup.prototype._renderAvatars = function(name) {

  var group = this.groups[name];
  var self = this;

  // Cache the scaling ratio.
  var ratio = this.heatmap.getTargetRatio();

  _.each(group.elements, function(segment) {

    var x = 0;
    var y;
    var w = self.heatmap.$target.outerWidth();
    var h;

    // First page:
    if (!segment.d1 && segment.d2) {
      y = 0;
      h = segment.d2.offset().top * ratio;
    }

    // Middle pages:
    else if (segment.d1 && segment.d2) {

      var d1Offset = segment.d1.offset();
      var d2Offset = segment.d2.offset();

      y = d1Offset.top * ratio;
      h = (d2Offset.top - d1Offset.top) * ratio;

    }

    // Last page:
    else if (segment.d1 && !segment.d2) {

      var sourceHeight = self.heatmap.$source.outerHeight();
      var d1Offset = segment.d1.offset();

      y = d1Offset.top * ratio;
      h = (sourceHeight - d1Offset.top) * ratio;

    }

    segment.target
      .attr('height', h)
      .attr('width', w)
      .attr('x', x)
      .attr('y', y);

  });

};


module.exports = SegmentGroup;
