

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
    var target = self.heatmap.targetSVG.append('rect')
      .classed('span', true)
      .classed(name, true);

    // Store the element pair.
    group.elements.push(new Span(self.heatmap, source, target));

  });

};


/**
 * Position each of the heatmap avatars.
 *
 * @param {String} name: The name of the group.
 */

SpanGroup.prototype._renderAvatars = function(name) {

  _.each(this.groups[name].elements, function(span) {
    span.position();
  });

};


module.exports = SpanGroup;
