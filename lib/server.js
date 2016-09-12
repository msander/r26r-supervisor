'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = server;

var _reactRouter = require('react-router');

var _loadServerState = require('./fetch/loadServerState');

var _loadServerState2 = _interopRequireDefault(_loadServerState);

var _PathUtils = require('history/lib/PathUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function server(_ref, cb) {
  var store = _ref.store;
  var routes = _ref.routes;
  var history = _ref.history;
  var url = _ref.url;
  var getLocals = _ref.getLocals;

  (0, _reactRouter.match)({ routes: routes, history: history, location: url }, function (error, redirectLocation, renderProps) {
    if (error) {
      cb(error, null, null, null); // error
      history.unsubscribe(); // stop the syncing process of store with history
    } else if (redirectLocation) {
      cb(null, redirectLocation, null, null); // redirect
      history.unsubscribe(); // stop the syncing process of store with history
    } else if (!renderProps) {
      cb(null, null, null, null); // 404
      history.unsubscribe(); // stop the syncing process of store with history
    } else {
      // success
      (0, _loadServerState2.default)({ renderProps: renderProps, store: store, getLocals: getLocals }, function (error, initialState) {
        // eslint-disable-line no-shadow, max-len
        history.unsubscribe(); // stop the syncing process of store with history
        if (error) {
          cb(error, null, null, null); // error
        } else {
          // Pick up current location from the history via synchronous history.listen
          history.listen(function (newLocation) {
            var oldLocation = (0, _PathUtils.parsePath)(url);
            if (oldLocation.pathname !== newLocation.pathname || oldLocation.search !== newLocation.search) {
              // eslint-disable-line max-len
              cb(null, newLocation, null, null); // location changed -> redirect to new location
            } else {
              cb(null, null, renderProps, initialState);
            }
          })();
        }
      });
    }
  });
}
module.exports = exports['default'];
//# sourceMappingURL=server.js.map