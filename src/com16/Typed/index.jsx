import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { Util } from '../../shared';


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

class Facet extends BaseComponent {
  constructor(props) {
    super(props, 'Facet');

    const { children } = props;
    let relChildren = null;

    if (children) {
      invariant(Util.isFunction(children), '<Facet> only have one function child!');

      relChildren = [];
      let key = 0;
      this.eachView = (view, facet) => {
        let viewChild = children(view, facet);
        if (viewChild) {
          key += 1;
          // 需要告诉 View 组件，无需创建 G2 view 示例，而使用此处的 view。
          viewChild = React.cloneElement(
            viewChild,
            Object.assign({}, viewChild.props, { instance: view, key })
          );
          relChildren.push(viewChild);
        }
      };
      // must 
    }

    this.relChildren = relChildren;
  }

  componentWillMount() {
    this.id = this.context.createId();
    this.context.addElement(
      this.name,
      this.id,
      this.eachView ? { eachView: this.eachView, ...this.props } : { ...this.props },
      this.context.getParentInfo(),
      this.context.getViewId()
    );
  }

  render() {
    if (this.relChildren) {
      return <div>{ this.relChildren }</div>;
    }

    return null;
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
  Facet,
};
