'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('../Base');

var _Base2 = _interopRequireDefault(_Base);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * View Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var View = function (_BaseComponent) {
  _inherits(View, _BaseComponent);

  function View(props) {
    _classCallCheck(this, View);

    var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props, 'View'));

    _this.getViewId = function () {
      return _this.id;
    };

    return _this;
  }

  _createClass(View, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        addElement: this.context.addElement,
        updateElement: this.context.updateElement,
        deleteElement: this.context.deleteElement,
        createId: this.context.createId,
        getParentInfo: this.getParentInfo,
        getViewId: this.getViewId
      };
    }
  }]);

  return View;
}(_Base2.default);

View.contextTypes = {
  addElement: _propTypes2.default.func,
  updateElement: _propTypes2.default.func,
  deleteElement: _propTypes2.default.func,
  createId: _propTypes2.default.func,
  getParentInfo: _propTypes2.default.func,
  getViewId: _propTypes2.default.func
};
View.childContextTypes = {
  addElement: _propTypes2.default.func,
  updateElement: _propTypes2.default.func,
  deleteElement: _propTypes2.default.func,
  createId: _propTypes2.default.func,
  getParentInfo: _propTypes2.default.func,
  getViewId: _propTypes2.default.func
};
exports.default = View;