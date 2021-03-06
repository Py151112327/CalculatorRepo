// Generated by CoffeeScript 1.7.0
(function() {
  var Adapter, MinifyCSS, W,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Adapter = require('../adapter_base');

  W = require('when');

  MinifyCSS = (function(_super) {
    var compile;

    __extends(MinifyCSS, _super);

    function MinifyCSS() {
      return MinifyCSS.__super__.constructor.apply(this, arguments);
    }

    MinifyCSS.prototype.name = 'minify-css';

    MinifyCSS.prototype.extensions = ['css'];

    MinifyCSS.prototype.output = 'css';

    MinifyCSS.prototype.supportedEngines = ['clean-css'];

    MinifyCSS.prototype._render = function(str, options) {
      return compile((function(_this) {
        return function() {
          return (new _this.engine(options)).minify(str);
        };
      })(this));
    };

    compile = function(fn) {
      var err, res;
      try {
        res = fn();
      } catch (_error) {
        err = _error;
        return W.reject(err);
      }
      return W.resolve(res);
    };

    return MinifyCSS;

  })(Adapter);

  module.exports = MinifyCSS;

}).call(this);
