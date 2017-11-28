/**
 * View Component
 */
import G2 from '@antv/g2';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Util from '../../shared/util';
import Context from '../Context';

export default class View extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object,
    ]),
    scale: PropTypes.object,
    start: PropTypes.object,
    end: PropTypes.object,
    index: PropTypes.number,
    animate: PropTypes.bool,
  }

  static defaultProps = {
    index: 0,
    scale: {},
  }

  static contextTypes = {
    chart: PropTypes.instanceOf(G2.Chart),
  }

  static childContextTypes = {
    batchedUpdates: PropTypes.func,
  }

  getChildContext() {
    return {
      batchedUpdates: this.batchedUpdates,
    };
  }

  componentWillMount() {
    const { chart } = this.context;

    invariant(chart, '`<View />` must be wrapped in `<Chart />`');
  }

  componentDidMount() {
    this.repaint();
  }

  componentWillReceiveProps(nextProps) {
    const { view, props } = this;
    const { data, animate, scale, axis } = props;
    const { data: nextData, animate: nextAnimate, scale: nextScale, axis: nextAxis } = nextProps;

    if (animate !== nextAnimate) {
      view.animate(nextAnimate);
    }

    if (data !== nextData) {
      view.changeData(nextData);
    }

    if (!Util.shallowEqual(scale, nextScale)) {
      view.source(nextData, nextScale);
    }

    if (axis != nextAxis) {
      view.axis(nextAxis);
    }
  }

  componentDidUpdate() {
    this.repaint();
  }

  componentWillUnmount() {
    const { chart } = this.context;

    if (this.element) {
      ReactDOM.unmountComponentAtNode(this.element);
    }
    if (!this.props.instance) {
      chart.removeView(this.view);
    }
    this.view = this.element = null;
  }

  batchedUpdates = () => {

  }

  createViewInstance(props) {
    const { chart } = this.context;
    const { scale, data, instance, axis, ...others } = props;
    let view;
    if (instance) {
      view = instance;
    } else {
      view = chart.view({ ...others });
    }

    if (data) {
      view.source(data, scale);
    }

    if (scale) {
      view.scale(scale);
    }

    if (!(axis === true || instance)) {
      view.axis(false);
    }

    return view;
  }

  repaint(props = this.props) {
    const { children } = props;
    const { chart } = this.context;
    let { view, element } = this;

    if (element) {
      // unmount element
      ReactDOM.unmountComponentAtNode(element);
    }

    if (view) {
      view.clear();
      chart.removeView(view);
    }

    view = this.createViewInstance(props);

    // fake element dom for rendering children
    element = document.createElement('div');

    if (children) {
      ReactDOM.unstable_renderSubtreeIntoContainer(this, (
        <Context chart={view}>{ children }</Context>
      ), element, () => {
       // should not render view singley because when update purechart component will render all views.
       // view.repaint();
      });
    } else {
      view.repaint();
    }

    this.view = view;
    this.element = element;
  }

  render() {
    return null;
  }
}
