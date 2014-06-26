

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
  this.target.classed('highlighted', true);
  this.source.addClass('highlighted');
};


/**
 * Unhighlight both elements.
 */

Avatar.prototype.unhighlight = function() {
  this.target.classed('highlighted', false);
  this.source.removeClass('highlighted');
};


module.exports = Avatar;
