import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Processor from '../../processor/processor';

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

class View extends BaseComponent {
  constructor(props) {
    super(props, 'View');
  }

  getChildContext() {
    return {
      getViewId: this.getViewId,
    };
  }

  getViewId = () => { 
    return this.id;
  }
}

const Geom = generateBaseTypedComponent('Geom');
const Axis = generateBaseTypedComponent('Axis');
const Tooltip = generateBaseTypedComponent('Tooltip');
const Legend = generateBaseTypedComponent('Legend');
const Guide = generateBaseTypedComponent('Guide');
const Coord = generateBaseTypedComponent('Coord');
const Label = generateBaseTypedComponent('Label');


Guide.Line = generateBaseTypedComponent('GuideLine');
Guide.Image = generateBaseTypedComponent('GuideImage');
Guide.Text = generateBaseTypedComponent('GuideText');
Guide.Region = generateBaseTypedComponent('GuideRegion');
Guide.Html = generateBaseTypedComponent('GuideHtml');
Guide.Arc = generateBaseTypedComponent('GuideArc');

export {
  Geom,
  Axis,
  Tooltip,
  Legend,
  Guide,
  Coord,
  Label,
  View,
};
