'use strict';

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;
exports.routeState = routeState;

var _reduxActions = require('redux-actions');

var _index = require('../src/index');

var _router = require('../src/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routeState(url) {
  return { route: (0, _router2.default)().lookup(url), url: url };
}

exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _handleActions[_index.NAVIGATE] = function (state, action) {
  if (action.payload.push) {
    history.pushState({}, null, action.payload.url);
  } else if (action.payload.replace) {
    history.replaceState({}, null, action.payload.url);
  }

  return _extends({}, state, routeState(action.payload.url));
}, _handleActions));
//# sourceMappingURL=reducer.js.map