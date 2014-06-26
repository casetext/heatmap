

var $ = require('jquery');
var _ = require('lodash');
var d3 = require('d3');
var Segment = require('./segment');


/**
 * Set the parent Heatmap reference.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var SegmentGroup = function(heatmap) {

  this.heatmap = heatmap;
  this.groups = {};

  // Re-render on container resize.
  this.heatmap.on('updateSize', _.bind(function() {
    this.updateSize();
  }, this));

};


/**
 * Add a new segment group to the heatmap.
 *
 * @param {String} name: A name for the group. Later on, this can be used to
 * identify the group if it needs to be changed or removed.
 *
 * @param {String} selector: A CSS selector that matches the "delimiter"
 * elements in the source text that separate the segments.
 */

SegmentGroup.prototype.addGroup = function(name, selector) {

  this.groups[name] = {
    selector: selector,
    elements: []
  };

  this._buildGroup(name);
  this._renderGroup(name);

};


/**
 * Re-render all groups to match the current container sizes.
 */

SegmentGroup.prototype.updateSize = function() {

  // Render the groups.
  _.each(this._getGroupNames(), _.bind(function(name) {
    this._renderGroup(name);
  }, this));

};


/**
 * Get an array of all the group names.
 *
 * @return {Array}
 */

SegmentGroup.prototype._getGroupNames = function() {
  return _.keys(this.groups);
};


/**
 * Select elements in the source container and create heatmap elements.
 *
 * @param {String} name: The name of the group.
 */

SegmentGroup.prototype._buildGroup = function(name) {

  var group = this.groups[name];
  var self = this;

  var delimiters = this.heatmap.$source.find(group.selector);

  // Iterate over all the matching elements.
  var last = null;
  _.times(delimiters.length + 1, function(i) {

    // Wrap the source element, if it exists.
    var delimiter = delimiters[i] ? $(delimiters[i]) : null;

    // Create the target element.
    var target = self.heatmap.svg.append('rect')
      .classed('segment', true)
      .classed(name, true);

    // Store the element triple.
    group.elements.push(new Segment(last, delimiter, target));
    last = delimiter;

  });

};


/**
 * Add a new highlight group to the heatmap.
 *
 * @param {String} name: The name of the group.
 */

SegmentGroup.prototype._renderGroup = function(name) {

  var group = this.groups[name];
  var self = this;

  // Compute the scaling ratio.
  var sourceWidth = this.heatmap.$source.outerWidth();
  var targetWidth = this.heatmap.$target.outerWidth();
  var ratio = targetWidth / sourceWidth;

  _.each(group.elements, function(segment) {

    // First page:
    if (!segment.d1 && segment.d2) {
      // TODO
    }

    // Middle pages:
    else if (segment.d1 && segment.d2) {

      var d1Offset = segment.d1.offset();
      var d2Offset = segment.d2.offset();

      var x = 0;
      var y = d1Offset.top * ratio;
      var w = targetWidth;
      var h = (d2Offset.top - d1Offset.top) * ratio;

      // Position the avatar.
      segment.target
        .attr('height', h)
        .attr('width', w)
        .attr('x', x)
        .attr('y', y);

    }

    // Last page:
    else if (segment.d1 && !segment.d2) {
      // TODO
    }

  });

};


module.exports = SegmentGroup;
