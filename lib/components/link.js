'use strict';

exports.__esModule = true;
exports.Link = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = exports.Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Link.prototype.handleClick = function handleClick(event, url) {
    event.preventDefault();
    this.props.navigate({ url: url, push: true });
  };

  Link.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        href = _props.href,
        name = _props.name,
        options = _props.options,
        rest = _objectWithoutProperties(_props, ['href', 'name', 'options']);

    var url = (0, _router2.default)().generate(name, options);

    return _react2.default.createElement(
      'a',
      _extends({ href: href || url, onClick: function onClick(event) {
          return _this2.handleClick(event, url);
        } }, rest),
      this.props.children
    );
  };

  return Link;
}(_react2.default.Component);

Link.propTypes = {
  children: _react.PropTypes.node,
  href: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  navigate: _react.PropTypes.func.isRequired,
  options: _react.PropTypes.object
};
exports.default = (0, _reactRedux.connect)(function () {
  return {};
}, actions)(Link);
//# sourceMappingURL=link.js.map