'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = client;

var _reactRouter = require('react-router');

var _loadClientState = require('./fetch/loadClientState');

var _loadClientState2 = _interopRequireDefault(_loadClientState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function client(props, cb) {
  var store = props.store;
  var initialState = props.initialState;
  var routes = props.routes;
  var history = props.history;
  var getLocals = props.getLocals;
  var beforeResolve = props.beforeResolve;
  var afterResolve = props.afterResolve;

  (0, _reactRouter.match)({ routes: routes, history: history }, function (error, redirectLocation, renderProps) {
    if (redirectLocation) {
      history.replace(redirectLocation);
      client(props, cb);
    } else if (renderProps) {
      var data = {
        store: store,
        initialState: initialState,
        routes: routes,
        history: history,
        getLocals: getLocals,
        redirectLocation: redirectLocation,
        renderProps: renderProps,
        beforeResolve: beforeResolve,
        afterResolve: afterResolve
      };
      (0, _loadClientState2.default)(data, function (err) {
        cb(err, redirectLocation, renderProps);
      });
    } else {
      cb(error, redirectLocation, renderProps);
    }
  });
}
module.exports = exports['default'];
//# sourceMappingURL=client.js.map