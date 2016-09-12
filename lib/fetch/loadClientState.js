'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref2, cb) {
  var history = _ref2.history;
  var routes = _ref2.routes;
  var store = _ref2.store;
  var getLocals = _ref2.getLocals;
  var _ref2$initialState = _ref2.initialState;
  var initialState = _ref2$initialState === undefined ? {} : _ref2$initialState;
  var renderProps = _ref2.renderProps;
  var beforeResolve = _ref2.beforeResolve;
  var afterResolve = _ref2.afterResolve;
  // eslint-disable-line max-len
  var hasInitialState = !(0, _isEmpty2.default)(initialState);

  // use synchronous listen to get current url -> changes with history v3
  history.listen(function (location) {
    var hooksData = { history: history, routes: routes, store: store, getLocals: getLocals, location: location, beforeResolve: beforeResolve, afterResolve: afterResolve };

    if (!hasInitialState) {
      var components = renderProps.components;

      var getAllLocals = (0, _getLocals2.default)(renderProps, store, getLocals);

      resolveDataDependencies(components, getAllLocals, renderProps, beforeResolve, afterResolve).then(function () {
        registerHook(hooksData);
        cb();
      }).catch(function (err) {
        registerHook(hooksData);
        cb(err);
      });
    } else {
      registerHook(hooksData);
      cb();
    }
  })();
};

var _reactRouter = require('react-router');

var _type = require('./type');

var _getLocals = require('./getLocals');

var _getLocals2 = _interopRequireDefault(_getLocals);

var _getDataDependencies = require('./getDataDependencies');

var _getDataDependencies2 = _interopRequireDefault(_getDataDependencies);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shouldFetch = function shouldFetch(oldLocation, newLocation) {
  return !oldLocation && newLocation || oldLocation.pathname !== newLocation.pathname || oldLocation.search !== newLocation.search;
}; // eslint-disable-line max-len

/* eslint-disable max-len */
var log = function log(e) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(e); // eslint-disable-line no-console
  }
};

var resolveDataDependencies = function resolveDataDependencies(components, getAllLocals, renderProps, beforeResolve, afterResolve) {
  return Promise.resolve().then(function () {
    if (typeof beforeResolve === 'function') {
      beforeResolve(renderProps);
    }
  }).catch(log).then(function () {
    return (0, _getDataDependencies2.default)(_type.PREFETCH, components, getAllLocals);
  }).then(function () {
    // call fetch but doesn't wait for it
    (0, _getDataDependencies2.default)(_type.FETCH, components, getAllLocals).catch(log).then(function () {
      if (typeof afterResolve === 'function') {
        afterResolve(renderProps);
      }
    }).catch(log);

    // call defer but doesn't wait for it
    (0, _getDataDependencies2.default)(_type.DEFER, components, getAllLocals).catch(log);

    return Promise.resolve();
  });
};

var registerHook = function registerHook(_ref) {
  var history = _ref.history;
  var routes = _ref.routes;
  var store = _ref.store;
  var getLocals = _ref.getLocals;
  var location = _ref.location;
  var beforeResolve = _ref.beforeResolve;
  var afterResolve = _ref.afterResolve;

  var oldLocation = location;

  history.listenBefore(function (location, continueTransition) {
    // eslint-disable-line no-shadow
    if (!shouldFetch(oldLocation, location)) {
      continueTransition();
      return;
    }
    oldLocation = location;

    (0, _reactRouter.match)({ location: location, routes: routes }, function (error, redirectLocation, renderProps) {
      if (redirectLocation) {
        continueTransition();
        history.transitionTo(redirectLocation);
      } else if (renderProps) {
        var components = renderProps.components;

        var getAllLocals = (0, _getLocals2.default)(renderProps, store, getLocals);

        resolveDataDependencies(components, getAllLocals, renderProps, beforeResolve, afterResolve).then(continueTransition, continueTransition).catch(log);
      } else {
        continueTransition();
      }
    });
  });
};

module.exports = exports['default'];
//# sourceMappingURL=loadClientState.js.map