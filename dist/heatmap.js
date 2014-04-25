!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Heatmap=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80: */

//var $ = require('jquery');
//var _ = require('underscore');
//var d3 = require('d3');


/*
 * Construct a new heatmap.
 *
 * @param {String} source: A CSS selector for the container element that is
 * being represented by the heatmap.
 *
 * @param {String} target: A CSS selector for the element that should contain
 * the rendered heatmap.
 */
var Heatmap = function(source, target) {
  this.source = source;
  this.target = target;
};


Heatmap.prototype = {


  /*
   * Add a new highlight group to the heatmap.
   *
   * @param {String} name: A name for the group. Later on, this can be used to
   * identify the group if it needs to be changed or removed.
   *
   * @param {String} selector: A CSS selector that defines which elements in
   * the source text should be represented in the heatmap group.
   */
  addGroup: function(name, selector) {
    console.log('addGroup', name, selector);
    // TODO
  },


  /*
   * Remove a highlight group from the heatmap.
   *
   * @param {String} name: The name of the group that should be removed.
   */
  removeGroup: function(name) {
    console.log('removeGroup', name);
    // TODO
  }


};

module.exports = Heatmap;

},{}]},{},[1])
(1)
});