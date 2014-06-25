

var d3 = require('d3');
var events = require('events');


/**
 * Set the element pair and bind event listeners.
 *
 * @param {Object} source: A jQuery-mapped element from the source container.
 * @param {Object} target: A d3-wrapped element from the target container.
 */

var Avatar = function(source, target) {
  this.source = source;
  this.target = target;
  this._bindEvents();
};


/**
 * Bind cursor events on the elements.
 */

Avatar.prototype._bindEvents = function() {
  var self = this;
  // TODO
};


/**
 * Add a `highlighted` class to the elements.
 */

Avatar.prototype.highlight = function() {
  // TODO
};


/**
 * Remove the `highlighted` class from the elements.
 */

Avatar.prototype.unhighlight = function() {
  // TODO
};


/**
 * Add a `selected` class to the elements.
 */

Avatar.prototype.select = function() {
  // TODO
};


/**
 * Remove the `selected` class from the elements.
 */

Avatar.prototype.unselect = function() {
  // TODO
};


/**
 * Copy in EventEmitter.
 */

Avatar.prototype.__proto__ = events.EventEmitter.prototype;


module.exports = Avatar;
