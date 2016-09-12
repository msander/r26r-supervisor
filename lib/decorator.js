'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defer = exports.fetch = exports.prefetch = undefined;

var _makeDecorator = require('./fetch/makeDecorator');

var _makeDecorator2 = _interopRequireDefault(_makeDecorator);

var _type = require('./fetch/type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefetch = exports.prefetch = (0, _makeDecorator2.default)(_type.PREFETCH);
var fetch = exports.fetch = (0, _makeDecorator2.default)(_type.FETCH);
var defer = exports.defer = (0, _makeDecorator2.default)(_type.DEFER);
//# sourceMappingURL=decorator.js.map