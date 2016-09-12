'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref, cb) {
  var renderProps = _ref.renderProps;
  var store = _ref.store;
  var getLocals = _ref.getLocals;
  var getState = store.getState;
  var components = renderProps.components;

  var getAllLocals = (0, _getLocals2.default)(renderProps, store, getLocals);

  // fetch data
  return Promise.resolve().then(function () {
    return (0, _getDataDependencies2.default)(_type.PREFETCH, components, getAllLocals);
  }).then(function () {
    return (0, _getDataDependencies2.default)(_type.FETCH, components, getAllLocals);
  }).then(function () {
    cb(null, getState());
  }).catch(function (error) {
    cb(error, null);
  });
};

var _type = require('./type');

var _getLocals = require('./getLocals');

var _getLocals2 = _interopRequireDefault(_getLocals);

var _getDataDependencies = require('./getDataDependencies');

var _getDataDependencies2 = _interopRequireDefault(_getDataDependencies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
//# sourceMappingURL=loadServerState.js.map