(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('jquery'), require('underscore'), require('d3'));
  }
  else if (typeof define === 'function' && define.amd) {
    define(['jquery', 'underscore', 'd3'], factory);
  }
  else {
    root['Heatmap'] = factory(root['jquery'], root['underscore'], root['d3']);
  }
}(this, function(jquery, underscore, d3) {
  function _requireDep(name) {
    return {'jquery': jquery, 'underscore': underscore, 'd3': d3}[name];
  }

  var _bundleExports = (function (define) {
    function _require(index) {
        var module = _require.cache[index];
        if (!module) {
            var exports = {};
            module = _require.cache[index] = {
                id: index,
                exports: exports
            };
            _require.modules[index].call(exports, module, exports);
        }
        return module.exports;
    }
    _require.cache = [];
    _require.modules = [function (module, exports) {
            var $ = _requireDep('jquery');
            var _ = _requireDep('underscore');
            var d3 = _requireDep('d3');
            var Heatmap = function (source, target) {
                this.source = source;
                this.target = target;
            };
            Heatmap.prototype = {
                addGroup: function (name, selector) {
                },
                removeGroup: function (name) {
                }
            };
            module.exports = Heatmap;
        }];
    return  _require(0);
}());

  return _bundleExports;
}));