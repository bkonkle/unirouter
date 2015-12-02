'use strict';

exports.__esModule = true;
exports.configureRouter = configureRouter;
exports.default = getRouter;

var _uniloc = require('uniloc');

var _uniloc2 = _interopRequireDefault(_uniloc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _uniloc2.default)();

function configureRouter(routes, aliases) {
  router = (0, _uniloc2.default)(routes, aliases);
}

function getRouter() {
  return router;
}
//# sourceMappingURL=router.js.map