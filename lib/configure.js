'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = configure;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createReducer() {
  var reducers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return (0, _redux.combineReducers)(_extends({}, reducers, {
    routing: _reactRouterRedux.routerReducer
  }));
}

function configure() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _options$reducers = options.reducers;
  var reducers = _options$reducers === undefined ? {} : _options$reducers;
  var _options$middlewares = options.middlewares;
  var middlewares = _options$middlewares === undefined ? [] : _options$middlewares;
  var _options$enhancers = options.enhancers;
  var enhancers = _options$enhancers === undefined ? [] : _options$enhancers;
  var _options$initialState = options.initialState;
  var initialState = _options$initialState === undefined ? {} : _options$initialState;
  var history = options.history;

  // create reducer from reducers

  var reducer = createReducer(reducers);

  // Sync dispatched route actions to the history
  var reduxSimpleRouterMiddleware = (0, _reactRouterRedux.routerMiddleware)(history);

  // create middlewares
  var middleware = [reduxSimpleRouterMiddleware].concat(_toConsumableArray(middlewares));

  // apply middlewares & store enhancers to createStore
  var finalCreateStore = _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, _toConsumableArray(middleware))].concat(_toConsumableArray(enhancers)))(_redux.createStore);

  // finally create the store
  var store = finalCreateStore(reducer, initialState);

  // monkey patch replaceReducer to apply new reducers
  var replaceReducer = store.replaceReducer;
  store.replaceReducer = function patchedReplaceReducer() {
    var newReducers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    replaceReducer(createReducer(newReducers));
  };

  // Create an enhanced history that syncs navigation events with the store
  history = (0, _reactRouterRedux.syncHistoryWithStore)(history, store);

  return {
    store: store,
    history: history
  };
}
module.exports = exports['default'];
//# sourceMappingURL=configure.js.map