'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = function (_Component) {
  _inherits(BaseComponent, _Component);

  function BaseComponent(props, name) {
    _classCallCheck(this, BaseComponent);

    var _this = _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this, props));

    _this.getParentInfo = function () {
      return {
        id: _this.id,
        name: _this.name
      };
    };

    _this.name = name;
    return _this;
  }

  _createClass(BaseComponent, [{
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
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var context = this.context;
      this.id = context.createId();
      context.addElement(this.name, this.id, this.props, context.getParentInfo(), context.getViewId());
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.context.updateElement(this.name, this.id, nextProps, this.context.getParentInfo(), this.context.getViewId());
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.deleteElement(this.name, this.id);
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      if (children) {
        if (children.length) {
          children = _react2.default.createElement(
            'div',
            null,
            children
          );
        }
      } else {
        children = null;
      }

      return children;
    }
  }]);

  return BaseComponent;
}(_react.Component);

BaseComponent.contextTypes = {
  addElement: _propTypes2.default.func,
  updateElement: _propTypes2.default.func,
  deleteElement: _propTypes2.default.func,
  createId: _propTypes2.default.func,
  getParentInfo: _propTypes2.default.func,
  getViewId: _propTypes2.default.func
};
BaseComponent.childContextTypes = {
  addElement: _propTypes2.default.func,
  updateElement: _propTypes2.default.func,
  deleteElement: _propTypes2.default.func,
  createId: _propTypes2.default.func,
  getParentInfo: _propTypes2.default.func,
  getViewId: _propTypes2.default.func
};


function generateBaseTypedComponent(name) {
  var TypedComponent = function (_BaseComponent) {
    _inherits(TypedComponent, _BaseComponent);

    function TypedComponent(props) {
      _classCallCheck(this, TypedComponent);

      return _possibleConstructorReturn(this, (TypedComponent.__proto__ || Object.getPrototypeOf(TypedComponent)).call(this, props, name));
    }

    _createClass(TypedComponent, [{
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

    return TypedComponent;
  }(BaseComponent);

  TypedComponent.contextTypes = {
    addElement: _propTypes2.default.func,
    updateElement: _propTypes2.default.func,
    deleteElement: _propTypes2.default.func,
    createId: _propTypes2.default.func,
    getParentInfo: _propTypes2.default.func,
    getViewId: _propTypes2.default.func
  };
  TypedComponent.childContextTypes = {
    addElement: _propTypes2.default.func,
    updateElement: _propTypes2.default.func,
    deleteElement: _propTypes2.default.func,
    createId: _propTypes2.default.func,
    getParentInfo: _propTypes2.default.func,
    getViewId: _propTypes2.default.func
  };


  return TypedComponent;
}

BaseComponent.generateBaseTypedComponent = generateBaseTypedComponent;

exports.default = BaseComponent;