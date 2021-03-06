// Generated by CoffeeScript 1.7.0
(function() {
  var Adapter, Stylus, nodefn, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Adapter = require('../adapter_base');

  nodefn = require('when/node/function');

  _ = require('lodash');

  Stylus = (function(_super) {
    __extends(Stylus, _super);

    function Stylus() {
      return Stylus.__super__.constructor.apply(this, arguments);
    }

    Stylus.prototype.name = 'stylus';

    Stylus.prototype.extensions = ['styl'];

    Stylus.prototype.output = 'css';

    Stylus.prototype._render = function(str, options) {
      var base, defines, i, imports, includes, k, obj, plugins, sets, v, _i, _j, _k, _len, _len1, _len2;
      sets = {};
      defines = {};
      includes = [];
      imports = [];
      plugins = [];
      for (k in options) {
        v = options[k];
        switch (k) {
          case 'define':
            _.extend(defines, v);
            break;
          case 'include':
            includes.push(v);
            break;
          case 'import':
            imports.push(v);
            break;
          case 'use':
            plugins.push(v);
            break;
          case 'url':
            if (typeof v === 'string') {
              obj = {};
              obj[v] = this.engine.url();
              _.extend(defines, obj);
            } else {
              obj = {};
              obj[v.name] = this.engine.url({
                limit: v.limit != null ? v.limit : 30000,
                paths: v.paths || []
              });
              _.extend(defines, obj);
            }
            break;
          default:
            sets[k] = v;
        }
      }
      includes = _.flatten(includes);
      imports = _.flatten(imports);
      plugins = _.flatten(plugins);
      base = this.engine(str);
      for (k in sets) {
        v = sets[k];
        base.set(k, v);
      }
      for (k in defines) {
        v = defines[k];
        base.define(k, v);
      }
      for (_i = 0, _len = includes.length; _i < _len; _i++) {
        i = includes[_i];
        base.include(i);
      }
      for (_j = 0, _len1 = imports.length; _j < _len1; _j++) {
        i = imports[_j];
        base["import"](i);
      }
      for (_k = 0, _len2 = plugins.length; _k < _len2; _k++) {
        i = plugins[_k];
        base.use(i);
      }
      return nodefn.call(base.render.bind(base));
    };

    return Stylus;

  })(Adapter);

  module.exports = Stylus;

}).call(this);
