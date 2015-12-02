'use strict';

exports.__esModule = true;
exports.handlePopState = undefined;
exports.default = init;

var _router = require('./router');

var _utils = require('./utils');

var _actions = require('./actions');

var handlePopState = exports.handlePopState = function handlePopState(store) {
  return function () {
    var url = (0, _utils.getUrl)();
    store.dispatch((0, _actions.navigate)({ url: url, push: true, source: 'popState' }));
  };
};

function init(store, routes, aliases) {
  var url = (0, _utils.getUrl)();

  (0, _router.configureRouter)(routes, aliases);

  store.dispatch((0, _actions.navigate)({ url: url, push: true, source: 'init' }));
  window.onpopstate = handlePopState(store);
}
//# sourceMappingURL=init.js.map