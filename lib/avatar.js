

var events = require('events');
var d3 = require('d3');


/**
 * Set the element pair and bind event listeners.
 *
 * @param {Object} source: A jQuery-mapped element from the source container.
 * @param {Object} target: A d3-wrapped element from the target container.
 */

var Avatar = function(source, target) {
  this.source = source;
  this.target = target;
};


/**
 * Copy in EventEmitter.
 */

Avatar.prototype.__proto__ = events.EventEmitter.prototype;


module.exports = Avatar;
