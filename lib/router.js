'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureRouter = configureRouter;

var _uniloc = require('uniloc');

var _uniloc2 = _interopRequireDefault(_uniloc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _uniloc2.default)();

function configureRouter(routes, aliases) {
  router = (0, _uniloc2.default)(routes, aliases);
}

exports.default = router;
//# sourceMappingURL=router.js.map