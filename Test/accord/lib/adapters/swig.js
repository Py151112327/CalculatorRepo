// Generated by CoffeeScript 1.7.0
(function() {
  var Adapter, Swig, UglifyJS, W, fs, path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Adapter = require('../adapter_base');

  path = require('path');

  fs = require('fs');

  W = require('when');

  UglifyJS = require('uglify-js');

  Swig = (function(_super) {
    var compile;

    __extends(Swig, _super);

    function Swig() {
      return Swig.__super__.constructor.apply(this, arguments);
    }

    Swig.prototype.name = 'swig';

    Swig.prototype.extensions = ['swig'];

    Swig.prototype.output = 'html';

    Swig.prototype._render = function(str, options) {
      return compile((function(_this) {
        return function() {
          return _this.engine.render(str, options);
        };
      })(this));
    };

    Swig.prototype._compile = function(str, options) {
      return compile((function(_this) {
        return function() {
          return _this.engine.compile(str, options);
        };
      })(this));
    };

    Swig.prototype._compileClient = function(str, options) {
      return compile((function(_this) {
        return function() {
          return _this.engine.precompile(str, options).tpl.toString();
        };
      })(this));
    };

    Swig.prototype.renderFile = function(path, options) {
      if (options == null) {
        options = {};
      }
      return compile((function(_this) {
        return function() {
          return _this.engine.renderFile(path, options.locals);
        };
      })(this));
    };

    Swig.prototype.compileFile = function(path, options) {
      if (options == null) {
        options = {};
      }
      return compile((function(_this) {
        return function() {
          return _this.engine.compileFile(path, options);
        };
      })(this));
    };

    Swig.prototype.clientHelpers = function() {
      var runtime_path;
      runtime_path = path.join(this.engine.__accord_path, 'dist/swig.min.js');
      return fs.readFileSync(runtime_path, 'utf8');
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

    return Swig;

  })(Adapter);

  module.exports = Swig;

}).call(this);