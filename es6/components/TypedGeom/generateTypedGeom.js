'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Base = require('../Base');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function generateTypedGeom(name, geomType) {
  var TypedGeom = function (_BaseComponent) {
    _inherits(TypedGeom, _BaseComponent);

    function TypedGeom(props) {
      _classCallCheck(this, TypedGeom);

      return _possibleConstructorReturn(this, (TypedGeom.__proto__ || Object.getPrototypeOf(TypedGeom)).call(this, props, name));
    }

    _createClass(TypedGeom, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          addElement: this.context.addElement,
          updateElement: this.context.updateElement,
          deleteElement: this.context.deleteElement,
          createId: this.context.createId,
          getParentInfo: this.getParentInfo,
          getViewId: this.context.getViewId
        };
      }
    }]);

    return TypedGeom;
  }(_Base2.default);

  TypedGeom.contextTypes = {
    addElement: _propTypes2.default.func,
    updateElement: _propTypes2.default.func,
    deleteElement: _propTypes2.default.func,
    createId: _propTypes2.default.func,
    getParentInfo: _propTypes2.default.func,
    getViewId: _propTypes2.default.func
  };
  TypedGeom.childContextTypes = {
    addElement: _propTypes2.default.func,
    updateElement: _propTypes2.default.func,
    deleteElement: _propTypes2.default.func,
    createId: _propTypes2.default.func,
    getParentInfo: _propTypes2.default.func,
    getViewId: _propTypes2.default.func
  };
  TypedGeom.propTypes = {
    type: _propTypes2.default.string
  };
  TypedGeom.defaultProps = {
    type: geomType
  };


  return TypedGeom;
}

exports.default = generateTypedGeom;