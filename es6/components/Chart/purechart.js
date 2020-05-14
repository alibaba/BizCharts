'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _processor = require('../../processor/processor');

var _processor2 = _interopRequireDefault(_processor);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-unused-prop-types: "off" */


var PureChart = function (_Component) {
  _inherits(PureChart, _Component);

  function PureChart(props) {
    _classCallCheck(this, PureChart);

    var _this = _possibleConstructorReturn(this, (PureChart.__proto__ || Object.getPrototypeOf(PureChart)).call(this, props));

    _initialiseProps.call(_this);

    _this.name = 'Chart';
    _this.gId = 0;
    _this.id = _this.createId();
    _this.g2Processor = new _processor2.default();
    _this.forceFit = (0, _lodash2.default)(function () {
      if (!_this.chart) return;
      _this.chart.forceFit();
    }, 300);
    return _this;
  }

  _createClass(PureChart, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        addElement: this.addElement,
        updateElement: this.updateElement,
        deleteElement: this.deleteElement,
        createId: this.createId,
        getParentInfo: this.getParentInfo,
        getViewId: this.getViewId
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // 异步绘制
      this.addElement(this.name, this.id, _extends({}, this.props, {
        container: this.containerWrap
      }));
      this.chart = this.g2Processor.createG2Instance();
      this.notifyG2Instance();
      //  ResizeObserver style warning
      if (this.props.forceFit) {
        var ro = new _resizeObserverPolyfill2.default(this.forceFit);
        ro.observe(this.containerWrap);
        this.observe = ro;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateElement(this.name, this.id, _extends({}, this.props, {
        container: this.containerWrap
      }));
      var newChart = this.g2Processor.batchedUpdate();
      if (this.chart !== newChart) {
        this.chart = newChart;
        this.notifyG2Instance();
      }
      if (this.props.forceUpdate) {
        this.chart.forceFit();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.g2Processor.destory();
      this.chart = null;
      if (this.forceFit) {
        this.forceFit.cancel();
      }
      if (this.observe) {
        this.observe.unobserve(this.containerWrap);
      }
      this.containerWrap = null;
    }
  }, {
    key: 'getG2Instance',
    value: function getG2Instance() {
      return this.chart;
    }
  }, {
    key: 'notifyG2Instance',
    value: function notifyG2Instance() {
      if (this.props.onGetG2Instance) {
        this.props.onGetG2Instance(this.chart);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { ref: this.refHandle },
        this.props.children
      );
    }
  }]);

  return PureChart;
}(_react.Component);

PureChart.propTypes = {
  data: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.object), _propTypes2.default.object]),
  scale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  animate: _propTypes2.default.bool,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number.isRequired,
  onGetG2Instance: _propTypes2.default.func,
  forceFit: _propTypes2.default.bool,
  forceUpdate: _propTypes2.default.bool
};
PureChart.childContextTypes = {
  addElement: _propTypes2.default.func,
  updateElement: _propTypes2.default.func,
  deleteElement: _propTypes2.default.func,
  createId: _propTypes2.default.func,
  getParentInfo: _propTypes2.default.func,
  getViewId: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getViewId = function () {};

  this.getParentInfo = function () {
    return {
      id: _this2.id,
      name: _this2.name
    };
  };

  this.createId = function () {
    _this2.gId += 1;
    return _this2.gId;
  };

  this.addElement = function (name, id, props, parentInfo, viewId) {
    return _this2.g2Processor.addElement(name, id, props, parentInfo, viewId);
  };

  this.updateElement = function (name, id, props, parentInfo, viewId) {
    _this2.g2Processor.updateElement(name, id, props, parentInfo, viewId);
  };

  this.deleteElement = function (name, id, parentInfo) {
    _this2.g2Processor.deleteElement(name, id, parentInfo);
  };

  this.refHandle = function (cw) {
    // chart container wrap for reset operation
    if (!_this2.containerWrap) {
      _this2.containerWrap = cw;
    }
  };
};

exports.default = PureChart;