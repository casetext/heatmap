

var $ = require('jquery');
var _ = require('lodash');
var d3 = require('d3');
var Group = require('./group');
var Span = require('./span');


/**
 * A group of avatars that represent elements in the source container.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var SpanGroup = function(heatmap) {
  Group.apply(this, arguments);
};


/**
 * Inherit from Group.
 */

SpanGroup.prototype = Object.create(Group.prototype);
SpanGroup.prototype.constructor = SpanGroup;


/**
 * Select elements in the source container and create heatmap elements.
 *
 * @param {String} name: The name of the group.
 */

SpanGroup.prototype._injectAvatars = function(name) {

  var group = this.groups[name];
  var self = this;

  // Iterate over all the matching elements.
  this.heatmap.$source.find(group.selector).each(function(i, el) {

    var source = $(el);

    // Create the target element.
    var target = self.heatmap.svg.append('rect')
      .classed('span', true)
      .classed(name, true);

    // Store the element pair.
    group.elements.push(new Span(source, target));

  });

};


/**
 * Add a new highlight group to the heatmap.
 *
 * @param {String} name: The name of the group.
 */

SpanGroup.prototype._renderAvatars = function(name) {

  var group = this.groups[name];
  var self = this;

  // Cache the scaling ratio.
  var ratio = this.heatmap.getTargetRatio();

  // Cache the offset of the source.
  var sourceOffset = this.heatmap.$source.offset();

  _.each(group.elements, function(span) {

    var offset = span.source.offset();

    // Scale the coordinates to fit the heatmap.
    var x = (offset.left - sourceOffset.left) * ratio;
    var y = (offset.top - sourceOffset.top) * ratio;
    var w = span.source.outerWidth()  * ratio;
    var h = span.source.outerHeight() * ratio;

    // Position the span.
    span.target
      .attr('height', h)
      .attr('width', w)
      .attr('x', x)
      .attr('y', y);

  });

};


module.exports = SpanGroup;
