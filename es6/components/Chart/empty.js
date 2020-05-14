'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Empty Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 用 g2 创建 chart 一开始没有数据，有数据时对当前 chart 更新数据时，会有问题。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 因此用了 Empty 作为无数据 chart，PureChart 作为有数据的 chart。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


(0, _warning2.default)(_react2.default.PureComponent, '`React.PureComponent` needs React >=15.3.0');

// react 15.3.0 以下不支持 PureComponent 就做一个兼容

var Empty = function (_ref) {
  _inherits(Empty, _ref);

  function Empty() {
    _classCallCheck(this, Empty);

    return _possibleConstructorReturn(this, (Empty.__proto__ || Object.getPrototypeOf(Empty)).apply(this, arguments));
  }

  _createClass(Empty, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          placeholder = _props.placeholder;


      return _react2.default.createElement(
        'div',
        { style: { width: width, height: height } },
        placeholder
      );
    }
  }]);

  return Empty;
}(_react2.default.PureComponent || _react2.default.Component);

Empty.propTypes = {
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  placeholder: _propTypes2.default.node
};
Empty.defaultProps = {
  width: '100%',
  placeholder: _react2.default.createElement(
    'div',
    { style: { position: 'relative', top: '48%', textAlign: 'center' } },
    '\u6682\u65E0\u6570\u636E'
  )
};
exports.default = Empty;