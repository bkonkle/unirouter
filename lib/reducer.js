'use strict';

var _handleActions;

exports.__esModule = true;
exports.routeState = routeState;

var _reduxActions = require('redux-actions');

var _constants = require('./constants');

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routeState(url) {
  return { route: (0, _router2.default)().lookup(url), url: url };
}

exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _handleActions[_constants.NAVIGATE] = function (state, action) {
  if (action.payload.push) {
    history.pushState({}, null, action.payload.url);
  } else if (action.payload.replace) {
    history.replaceState({}, null, action.payload.url);
  }

  return Object.assign({}, state, routeState(action.payload.url));
}, _handleActions));
//# sourceMappingURL=reducer.js.map