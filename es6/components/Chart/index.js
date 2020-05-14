'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _purechart = require('./purechart');

var _purechart2 = _interopRequireDefault(_purechart);

var _empty = require('./empty');

var _empty2 = _interopRequireDefault(_empty);

var _ErrorBoundary = require('../ErrorBoundary');

var _ErrorBoundary2 = _interopRequireDefault(_ErrorBoundary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Chart Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function hasSource(source) {
  var flag = true;

  if (source == null || source.length === 0 || source.rows && source.rows.length === 0) {
    flag = false;
  }

  return !!flag;
}

var Chart = function (_ref) {
  _inherits(Chart, _ref);

  function Chart() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Chart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Chart.__proto__ || Object.getPrototypeOf(Chart)).call.apply(_ref2, [this].concat(args))), _this), _this._refCallback = function (c) {
      if (c) {
        _this.chart = c.getG2Instance();
      }
    }, _this.hasViewSource = function () {
      var hasViewSource = false;
      _react2.default.Children.map(_this.props.children, function (child) {
        if (!hasViewSource && child && typeof child.type === 'function' && child.type.name === 'View' && child.props.data && hasSource(child.props.data)) {
          hasViewSource = true;
        }
      });
      return hasViewSource;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chart, [{
    key: 'getG2Instance',
    value: function getG2Instance() {
      return this.chart;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          width = _props.width,
          height = _props.height,
          placeholder = _props.placeholder,
          className = _props.className,
          style = _props.style;

      return _react2.default.createElement(
        'div',
        { className: className, style: style },
        hasSource(data) || this.hasViewSource() || !placeholder ? _react2.default.createElement(_purechart2.default, _extends({ ref: this._refCallback }, this.props)) : _react2.default.createElement(_empty2.default, {
          width: width,
          height: height,
          placeholder: placeholder === true ? undefined : placeholder
        })
      );
    }
  }]);

  return Chart;
}(_react2.default.PureComponent || _react2.default.Component);

var BChart = function (_React$Component) {
  _inherits(BChart, _React$Component);

  function BChart() {
    _classCallCheck(this, BChart);

    return _possibleConstructorReturn(this, (BChart.__proto__ || Object.getPrototypeOf(BChart)).apply(this, arguments));
  }

  _createClass(BChart, [{
    key: 'render',
    value: function render() {
      // ‘widthErrorBoundary’内部api，不对外
      // eslint-disable-next-line react/prop-types
      var _props2 = this.props,
          widthErrorBoundary = _props2.widthErrorBoundary,
          cfg = _objectWithoutProperties(_props2, ['widthErrorBoundary']);

      if (widthErrorBoundary === false) {
        return _react2.default.createElement(Chart, cfg);
      }
      return _react2.default.createElement(
        _ErrorBoundary2.default,
        null,
        _react2.default.createElement(Chart, cfg)
      );
    }
  }]);

  return BChart;
}(_react2.default.Component);

exports.default = BChart;