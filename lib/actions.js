'use strict';

exports.__esModule = true;
exports.navigate = undefined;

var _reduxActions = require('redux-actions');

var _constants = require('./constants');

var navigate = exports.navigate = (0, _reduxActions.createAction)(_constants.NAVIGATE, function (payload) {
  if (typeof history !== 'undefined' && payload.source !== 'popState') {
    if (payload.push) {
      history.pushState({}, null, payload.url);
    } else if (payload.replace) {
      history.replaceState({}, null, payload.url);
    }
  }
  return payload;
});
//# sourceMappingURL=actions.js.map