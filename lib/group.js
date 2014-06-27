

var _ = require('lodash');


/**
 * A group of avatars on the heatmap.
 *
 * @param {Heatmap} heatmap: A Heatmap instance.
 */

var Group = function(heatmap) {
  this.heatmap = heatmap;
  this.groups = {};
  this._initEvents();
};


/**
 * When the containers are resized, re-render the heatmap avatars.
 */

Group.prototype._initEvents = function() {
  this.heatmap.on('updateSize', _.bind(function() {
    this.updateSize();
  }, this));
};


/**
 * Add a new span group to the heatmap.
 *
 * @param {String} name: A name for the group. Later on, this can be used to
 * identify the group if it needs to be changed or removed.
 *
 * @param {String} selector: A CSS selector that matches elements in the
 * source text should be represented in the heatmap group.
 */

Group.prototype.addGroup = function(name, selector) {

  this.groups[name] = {
    selector: selector,
    elements: []
  };

  this._injectAvatars(name);
  this._renderAvatars(name);

};


/**
 * Re-render all groups to match the current container sizes.
 */

Group.prototype.updateSize = function() {

  // Render the groups.
  _.each(this._getGroupNames(), _.bind(function(name) {
    this._renderAvatars(name);
  }, this));

};


/**
 * Get an array of all the group names.
 *
 * @return {Array}
 */

Group.prototype._getGroupNames = function() {
  return _.keys(this.groups);
};


/**
 * Inject the avatars.
 * @abstract
 */

Group.prototype._injectAvatars = function() {
  // NO-OP
};


/**
 * Position the avatars.
 * @abstract
 */

Group.prototype._renderAvatars = function() {
  // NO-OP
};


module.exports = Group;
