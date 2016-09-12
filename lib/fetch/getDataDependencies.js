'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDataDependencies;

var _propName = require('./propName');

var _propName2 = _interopRequireDefault(_propName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getHooks() {
  var component = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (component[_propName2.default]) {
    return { component: component, hooks: component[_propName2.default] };
  } else if (component.WrappedComponent) {
    return getHooks(component.WrappedComponent);
  }
  return null;
}

function getDataDependencies(type, components, getLocals) {
  return components
  // collect all components with their fetch hooks
  .map(getHooks)
  // filter out falsy components
  .filter(function (value) {
    return value;
  })
  // call fetch data methods sequentially and return single promise
  .reduce(function (promise, _ref) {
    var component = _ref.component;
    var hooks = _ref.hooks;
    return promise.then(function () {
      var hook = hooks[type];

      if (typeof hook !== 'function') {
        return Promise.resolve();
      }

      return hook(getLocals(component, components));
    });
  }, Promise.resolve());
}
module.exports = exports['default'];
//# sourceMappingURL=getDataDependencies.js.map