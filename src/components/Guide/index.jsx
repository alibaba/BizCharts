import G2 from '@antv/g2';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


function generateTypedGuide(type) {
  return class extends React.Component {
    static contextTypes = {
      guide: PropTypes.object,
      updateAllGuides: PropTypes.func,
    }

    componentWillMount() {
      const { guide } = this.context;
      const { ...props } = this.props;
      invariant(guide, `<${type} /> must be wrapped in <Guide />`);

      guide[type](props);

      // g2 will set guide[type] param
      // this.props.guide[type](props);
    }

    componentWillReceiveProps() {
      // g2 不支持更新单个 guide，必须将所有 guide 都 clear 掉，然后重新绘制所有 guide。
      this.context.updateAllGuides();
    }

    componentWillUnmount() {
      this.context.updateAllGuides();
    }

    render() {
      return null;
    }
  };
}

class Guide extends Component {
  static contextTypes = {
    chart: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(G2.Chart),
    ]),
  }

  static childContextTypes = {
    guide: PropTypes.object,
    updateAllGuides: PropTypes.func,
  }

  getChildContext() {
    return {
      guide: this.guide,
      updateAllGuides: this.updateAllGuides,
    };
  }

  updateAllGuides = () => {
    if (!this.needRepaint) {
      // updates all guides
      this.needRepaint = true;
    }
  }

  componentDidUpdate() {
    if (this.needRepaint) {
      this.needRepaint = false;

      // repaint children
      this.repaint();
    }
  }

  componentWillMount() {
    invariant(this.context.chart, '`<Guide />` must be wrapped in `<Chart />`');
    this.guide = this.context.chart.guide();
  }

  componentWillUnmount() {
    if (this.element) {
      ReactDOM.unmountComponentAtNode(this.element);
    }
    const { chart } = this.context;
    chart.guide().clear();
    this.element = null;
  }

  repaint() {
    const { children } = this.props;
    const { chart } = this.context;
    let { element } = this;

    chart.guide().clear();
    if (element) {
      // unmount element
      ReactDOM.unmountComponentAtNode(element);
    }

    // fake element dom for rendering children
    element = document.createElement('div');

    if (children) {
      ReactDOM.unstable_renderSubtreeIntoContainer(this, (
        this.generateChildren()
      ), element);
    }
    this.element = element;
  }

  generateChildren() {
    let { children } = this.props;
    if (children == null) {
      return null;
    }

    children = <div>{ children }</div>;
    return children;
  }

  render() {
    return this.generateChildren();
  }
}
Guide.Line = generateTypedGuide('line');
Guide.Image = generateTypedGuide('image');
Guide.Text = generateTypedGuide('text');
Guide.Region = generateTypedGuide('region');
Guide.Arc = generateTypedGuide('arc');
Guide.Html = generateTypedGuide('html');

export default Guide;
