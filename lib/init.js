'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrl = getUrl;
exports.handleUnload = handleUnload;
exports.handlePopState = handlePopState;
exports.default = init;

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _curry = require('curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getUrl() {
  var universal = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var store = arguments[1];

  if (universal) {
    return store.getState().router.url;
  }
  return window.location.pathname + window.location.search;
}

function handleUnload(store, event) {
  var state = store.getState();
  var message = state.router.preventNavigationMessage;
  if (state.router.preventNavigation && message && message.length > 0) {
    event.returnValue = message;
    return message;
  }
}

function handlePopState(store) {
  var url = getUrl();
  store.dispatch(actions.urlChanged({ url: url, source: 'popState' }));
}

function init(store) {
  var url = getUrl();
  store.dispatch(actions.urlChanged({ url: url, source: 'init' }));

  window.onbeforeunload = (0, _curry2.default)(handleUnload)(store);
  window.onpopstate = (0, _curry2.default)(handlePopState)(store);
}
//# sourceMappingURL=init.js.map