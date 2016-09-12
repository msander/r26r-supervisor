'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getLocals;
function getLocals(renderProps, store, getCustomLocals) {
  var location = renderProps.location;
  var params = renderProps.params;
  var dispatch = store.dispatch;
  var getState = store.getState;


  return function (component, components) {
    var customLocals = typeof getCustomLocals === 'function' ? getCustomLocals(component, components) : {}; // eslint-disable-line max-len
    return _extends({
      location: location,
      params: params,
      dispatch: dispatch,
      getState: getState
    }, customLocals);
  };
}
module.exports = exports['default'];
//# sourceMappingURL=getLocals.js.map