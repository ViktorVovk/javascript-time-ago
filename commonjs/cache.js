"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A basic in-memory cache.
 *
 * import Cache from 'javascript-time-ago/Cache'
 * const cache = new Cache()
 * const object = cache.get('key1', 'key2', ...) || cache.put('key1', 'key2', ..., createObject())
 */
var Cache =
/*#__PURE__*/
function () {
  function Cache() {
    _classCallCheck(this, Cache);

    _defineProperty(this, "cache", {});
  }

  _createClass(Cache, [{
    key: "get",
    value: function get() {
      var cache = this.cache;

      for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      for (var _i = 0; _i < keys.length; _i++) {
        var key = keys[_i];

        if (_typeof(cache) !== 'object') {
          return;
        }

        cache = cache[key];
      }

      return cache;
    }
  }, {
    key: "put",
    value: function put() {
      for (var _len2 = arguments.length, keys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      var value = keys.pop();
      var lastKey = keys.pop();
      var cache = this.cache;

      for (var _i2 = 0; _i2 < keys.length; _i2++) {
        var key = keys[_i2];

        if (_typeof(cache[key]) !== 'object') {
          cache[key] = {};
        }

        cache = cache[key];
      }

      return cache[lastKey] = value;
    }
  }]);

  return Cache;
}();

exports.default = Cache;
//# sourceMappingURL=cache.js.map