

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

  this._bindTargetEvents();
  this._bindSourceEvents();

};


/**
 * Bind cursor events on the target.
 */

Avatar.prototype._bindTargetEvents = function() {

  var self = this;

  this.target
    .on('mouseenter', function() {
      self.highlight();
    })
    .on('mouseleave', function() {
      self.unhighlight();
    });

};


/**
 * Bind cursor events on the source.
 */

Avatar.prototype._bindSourceEvents = function() {

  var self = this;

  this.source
    .on('mouseenter', function() {
      self.highlight();
    })
    .on('mouseleave', function() {
      self.unhighlight();
    });

};


/**
 * Highlight both elements.
 */

Avatar.prototype.highlight = function() {
  this.highlightTarget();
  this.highlightSource();
};


/**
 * Highlight the target element.
 */

Avatar.prototype.highlightTarget = function() {
  this.target.classed('highlighted', true);
};


/**
 * Highlight the source element.
 */

Avatar.prototype.highlightSource = function() {
  this.source.addClass('highlighted');
};


/**
 * Unhighlight both elements.
 */

Avatar.prototype.unhighlight = function() {
  this.unhighlightTarget();
  this.unhighlightSource();
};


/**
 * Unhighlight the target element.
 */

Avatar.prototype.unhighlightTarget = function() {
  this.target.classed('highlighted', false);
};


/**
 * Unhighlight the source element.
 */

Avatar.prototype.unhighlightSource = function() {
  this.source.removeClass('highlighted');
};


/**
 * Copy in EventEmitter.
 */

Avatar.prototype.__proto__ = events.EventEmitter.prototype;


module.exports = Avatar;
