'use strict';

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeState = routeState;

var _utils = require('./utils');

var _reduxActions = require('redux-actions');

var _index = require('../src/index');

var _router = require('../src/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function routeState(url) {
  return { route: (0, _router2.default)().lookup(url), url: url };
}

exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _index.URL_CHANGED, function (state, action) {
  return _extends({}, state, routeState(action.payload.url));
}), _defineProperty(_handleActions, _index.NAVIGATE, function (state, action) {
  if ((0, _utils.getUrl)() !== action.payload.url) {
    if (action.payload.silent) {
      history.replaceState({}, null, action.payload.url);
    } else {
      history.pushState({}, null, action.payload.url);
    }

    return _extends({}, state, routeState(action.payload.url));
  }
  return state;
}), _handleActions));
//# sourceMappingURL=reducer.js.map