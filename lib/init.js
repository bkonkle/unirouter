'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlePopState = undefined;
exports.default = init;

var _router = require('./router');

var _utils = require('./utils');

var _actions = require('./actions');

var handlePopState = exports.handlePopState = function handlePopState(store) {
  return function () {
    var url = (0, _utils.getUrl)();
    store.dispatch((0, _actions.urlChanged)({ url: url, source: 'popState' }));
  };
};

function init(store, routes, aliases) {
  var url = (0, _utils.getUrl)();

  (0, _router.configureRouter)(routes, aliases);

  store.dispatch((0, _actions.urlChanged)({ url: url, source: 'init' }));
  window.onpopstate = handlePopState(store);
}
//# sourceMappingURL=init.js.map