'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Base = require('../Base');

var _Base2 = _interopRequireDefault(_Base);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Legend Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Legend = function (_BaseComponent) {
  _inherits(Legend, _BaseComponent);

  function Legend(props) {
    _classCallCheck(this, Legend);

    return _possibleConstructorReturn(this, (Legend.__proto__ || Object.getPrototypeOf(Legend)).call(this, props, 'Legend'));
  }

  return Legend;
}(_Base2.default);

Legend.contextTypes = {
  addElement: _propTypes2.default.func,
  updateElement: _propTypes2.default.func,
  deleteElement: _propTypes2.default.func,
  createId: _propTypes2.default.func,
  getParentInfo: _propTypes2.default.func,
  getViewId: _propTypes2.default.func
};
Legend.childContextTypes = {
  addElement: _propTypes2.default.func,
  updateElement: _propTypes2.default.func,
  deleteElement: _propTypes2.default.func,
  createId: _propTypes2.default.func,
  getParentInfo: _propTypes2.default.func,
  getViewId: _propTypes2.default.func
};
Legend.defaultProps = {
  visible: true
};
exports.default = Legend;