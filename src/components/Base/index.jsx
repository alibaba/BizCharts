import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BaseComponent extends Component {
  static contextTypes = {
    addElement: PropTypes.func,
    updateElement: PropTypes.func,
    deleteElement: PropTypes.func,
    createId: PropTypes.func,
    getParentInfo: PropTypes.func,
    getViewId: PropTypes.func,
  }

  static childContextTypes = {
    addElement: PropTypes.func,
    updateElement: PropTypes.func,
    deleteElement: PropTypes.func,
    createId: PropTypes.func,
    getParentInfo: PropTypes.func,
    getViewId: PropTypes.func,
  }

  constructor(props, name) {
    super(props);
    this.name = name;
  }

  getChildContext() {
    return {
      addElement: this.context.addElement,
      updateElement: this.context.updateElement,
      deleteElement: this.context.deleteElement,
      createId: this.context.createId,
      getParentInfo: this.getParentInfo,
      getViewId: this.context.getViewId,
    };
  }

  componentWillMount() {
    this.id = this.context.createId();
    this.context.addElement(
      this.name, this.id, this.props,
      this.context.getParentInfo(),
      this.context.getViewId()
    );
  }

  componentWillReceiveProps(nextProps) {
    this.context.updateElement(
      this.name, this.id, nextProps,
      this.context.getParentInfo(),
      this.context.getViewId()
    );
  }

  componentWillUnmount() {
    this.context.deleteElement(this.name, this.id);
  }

  getParentInfo = () => {
    return {
      id: this.id,
      name: this.name,
    };
  }

  render() {
    let children = this.props.children;

    if (children) {
      if (children.length) {
        children = <div>{ children }</div>;
      }
    } else {
      children = null;
    }

    return children;
  }
}

function generateBaseTypedComponent(name) {
  class TypedComponent extends BaseComponent {
    constructor(props) {
      super(props, name);
    }
  }

  return TypedComponent;
}

BaseComponent.generateBaseTypedComponent = generateBaseTypedComponent;

export default BaseComponent;
