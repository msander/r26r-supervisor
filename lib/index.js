'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorator = require('./decorator');

Object.defineProperty(exports, 'fetch', {
  enumerable: true,
  get: function get() {
    return _decorator.fetch;
  }
});
Object.defineProperty(exports, 'prefetch', {
  enumerable: true,
  get: function get() {
    return _decorator.prefetch;
  }
});
Object.defineProperty(exports, 'defer', {
  enumerable: true,
  get: function get() {
    return _decorator.defer;
  }
});

var _reactRouterRedux = require('react-router-redux');

Object.defineProperty(exports, 'pushAction', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.push;
  }
});
Object.defineProperty(exports, 'replaceAction', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.replace;
  }
});
Object.defineProperty(exports, 'goAction', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.go;
  }
});
Object.defineProperty(exports, 'goBackAction', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.goBack;
  }
});
Object.defineProperty(exports, 'goForwardAction', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.goForward;
  }
});
//# sourceMappingURL=index.js.map