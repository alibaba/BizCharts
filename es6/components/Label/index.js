'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Base = require('../Base');

var _Base2 = _interopRequireDefault(_Base);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Label Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Label = function (_BaseComponent) {
  _inherits(Label, _BaseComponent);

  function Label(props) {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).call(this, props, 'Label'));
  }

  _createClass(Label, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var parentInfo = this.context.getParentInfo();
      (0, _invariant2.default)(parentInfo.name === 'Geom', '`<Label />` must be wrapped in `<Geom />`');

      this.id = this.context.createId();

      this.context.addElement(this.name, this.id, this.props, this.context.getParentInfo(), this.context.getViewId());
    }
  }]);

  return Label;
}(_Base2.default);

Label.contextTypes = {
  addElement: _propTypes2.default.func,
  updateElement: _propTypes2.default.func,
  deleteElement: _propTypes2.default.func,
  createId: _propTypes2.default.func,
  getParentInfo: _propTypes2.default.func,
  getViewId: _propTypes2.default.func
};
Label.childContextTypes = {
  addElement: _propTypes2.default.func,
  updateElement: _propTypes2.default.func,
  deleteElement: _propTypes2.default.func,
  createId: _propTypes2.default.func,
  getParentInfo: _propTypes2.default.func,
  getViewId: _propTypes2.default.func
};
exports.default = Label;