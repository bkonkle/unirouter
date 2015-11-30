'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigate = exports.urlChanged = undefined;

var _reduxActions = require('redux-actions');

var _index = require('./index');

var urlChanged = exports.urlChanged = (0, _reduxActions.createAction)(_index.URL_CHANGED);
var navigate = exports.navigate = (0, _reduxActions.createAction)(_index.NAVIGATE);
//# sourceMappingURL=actions.js.map