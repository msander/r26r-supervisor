'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propName = require('./propName');

var _propName2 = _interopRequireDefault(_propName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (name) {
  return function (fetch) {
    return function (ComposedComponent) {
      if (ComposedComponent[_propName2.default]) {
        ComposedComponent[_propName2.default][name] = fetch; // eslint-disable-line no-param-reassign
      } else {
        ComposedComponent[_propName2.default] = _defineProperty({}, name, fetch);
      }

      return ComposedComponent;
    };
  };
};

module.exports = exports['default'];
//# sourceMappingURL=makeDecorator.js.map