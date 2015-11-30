"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrl = getUrl;
function getUrl() {
  var universal = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var store = arguments[1];

  if (universal) {
    return store.getState().router.url;
  }
  return window.location.pathname + window.location.search;
}
//# sourceMappingURL=utils.js.map