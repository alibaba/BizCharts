
/**
 * PureChart Component
 */
import G2 from '@antv/g2';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Util, GEvent } from '../../shared';
import Context from '../Context';
import Facet from '../Facet';

const EVENTS = [
  { prop: 'onPlotMove', event: 'plotmove' },
  { prop: 'onPlotEnter', event: 'plotenter' },
  { prop: 'onPlotLeave', event: 'plotleave' },
  { prop: 'onPlotClick', event: 'plotclick' },
  { prop: 'onPlotDblClick', event: 'plotdblclick' },
  { prop: 'onItemSelected', event: 'itemselected' },
  { prop: 'onItemUnselected', event: 'itemunselected' },
  { prop: 'onItemSelectedChange', event: 'itemselectedchange' },
  { prop: 'onTooltipChange', event: 'tooltip:change' },
  { prop: 'onTooltipShow', event: 'tooltip:show' },
  { prop: 'onTooltipHide', event: 'tooltip:hide' },
];

const baseEvents = [
  'mouseenter',
  'mousemove',
  'mouseleave',
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'touchstart',
  'touchmove',
  'touchend',
];

const baseEventsPostfix = [
  'Mouseenter',
  'Mousemove',
  'Mouseleave',
  'Click',
  'Dblclick',
  'Mousedown',
  'Mouseup',
  'Touchstart',
  'Touchmove',
  'Touchend',
];

const shapes = ['point', 'area', 'line', 'path', 'interval', 'schema', 'polygon', 'edge',
  'axis-title', 'axis-label', 'axis-ticks', 'axis-line', 'axis-grid', 'legend-title',
  'legend-item', 'legend-marker', 'legend-text', 'guide-text', 'guide-region',
  'guide-line', 'guide-image', 'label',
];

const shapesEvtNamePrefix = ['onPoint', 'onArea', 'onLine', 'onPath', 'onInterval', 'onSchema',
  'onPolygon', 'onEdge', 'onAxisTitle', 'onAxisLabel', 'onAxisTicks', 'onAxisLine', 'onAxisGrid',
  'onLegendTitle', 'onLegendItem', 'onLegendMarker', 'onLegendText', 'onGuideText', 'onGuideRegion',
  'onGuideLine', 'onGuideImage', 'onLabel',
];

const shapeEvents = [];
for (let i = 0; i < shapes.length; ++i) {
  for (let j = 0; j < baseEvents.length; ++j) {
    shapeEvents.push({
      prop: `${shapesEvtNamePrefix[i]}${baseEventsPostfix[j]}`,
      event: `${shapes[i]}:${baseEvents[j]}`,
    });
  }
}

const chartEvents = EVENTS.concat(shapeEvents);

export default class PureChart extends Component {

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object,
    ]),
    scale: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    animate: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number.isRequired,
    onGetG2Instance: PropTypes.func,
  }

  static childContextTypes = {
    batchedUpdates: PropTypes.func,
  }

  static contextTypes = {
    theme: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }

  static defaultProps = {
    data: [],
    onGetG2Instance: () => {},
  }

  getChildContext() {
    return {
      batchedUpdates: this.batchedUpdates,
    };
  }

  componentDidMount() {
    this.draw();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // re-create G2.Chart instance if theme changes
    if (nextContext.theme !== this.context.theme) {
      this.noUpdate = true;
      this.draw(nextProps);
      return;
    }

    const { chart, props } = this;
    const { width, height, animate, data, scale, filter } = props;
    const { width: nextWidth, height: nextHeight,
        animate: nextAnimate, data: nextData,
        scale: nextScale, filter: nextFilter } = nextProps;

    // refrence compare
    if (data !== nextData) {
      chart.changeData(nextData);
    }

    if (!Util.shallowEqual(scale, nextScale)) {
      if (Util.isArray(nextScale)) {
        chart.scale(nextScale[0], nextScale[1]);
      } else {
        chart.scale(nextScale);
      }
    }

    if (animate !== nextAnimate) {
      chart.animate(nextAnimate);
    }

    if (filter !== nextFilter) {
      chart.filter(nextFilter);
    }

    if (width !== nextWidth || height !== nextHeight) {
      chart.changeSize(nextWidth, nextHeight);
    }

    GEvent.updateEvents(chart, chartEvents, props, nextProps);
    GEvent.updateBaseEvents(chart, props, nextProps);
  }

  shouldComponentUpdate() {
    const { noUpdate = false } = this;
    // reset noUpdate flag
    noUpdate && (this.noUpdate = false);

    return !noUpdate;
  }

  componentDidUpdate() {
    this.repaint();
  }

  componentWillUnmount() {
    if (this.element) {
      ReactDOM.unmountComponentAtNode(this.element);
    }
    if (this.chart) {
      GEvent.unbindEvents(this.chart, chartEvents, this.props);
      GEvent.unbindBaseEvents(this.chart, this.props);
      this.chart.destroy();
      this.chart = null;
    }

    this.element = this.containerWrap = null;
  }

  getG2Instance() {
    return this.chart;
  }

  createG2Instance(props = this.props) {
    // dynamic container
    const container = document.createElement('div');

    this.containerWrap.appendChild(container);

    const { data, scale, filter, ...others } = props;

    // instantiate G2 chart instance
    const chart = new G2.Chart({
      ...others,
      container,
    });

    // set source
    chart.source(data, scale);

    // default invisible
    // use <Component /> instead
    chart.guide().clear();
    // 如果有 facet 的情况下默认不隐藏轴，因为让用户挨个配置每一根轴会很累。
    if ((props.children && !props.children.length && props.children.type !== Facet)
    || (props.children && props.children.length && !props.children.find(child => child.type === Facet)) || others.axis === false) {
      chart.axis(false);
    }

    if (filter) {
      chart.filter(...filter);
    }
    chart.legend(false);
    chart.tooltip(false);

    // set default coord
    chart.coord('rect', {});

    // bind events
    GEvent.bindEvents(chart, chartEvents, props);
    GEvent.bindBaseEvents(chart, props);

    this.chart = chart;

    return chart;
  }

  repaint() {
    const { chart, element } = this;
    const { children } = this.props;

    if (children) {
      this.batched = false;
      ReactDOM.unstable_renderSubtreeIntoContainer(this, (
        <Context chart={chart}>{ children }</Context>
      ), element, () => {
        if (this.batched) {
          // clear views in chart
          chart.clear();
          // unmount element
          ReactDOM.unmountComponentAtNode(this.element);
          // create new element to void children components update
          this.element = document.createElement('div');
          // repaint children
          this.repaint();
        } else {
          chart.repaint();
        }
      });
    } else {
      chart.repaint();
    }
  }

  draw(props = this.props) {
    const { children, _noRender, onGetG2Instance } = props;
    let { chart, element } = this;

    // set null for batchedUpdates
    if (chart) {
      this.chart = null;
    }

    if (element) {
      // unmount element
      ReactDOM.unmountComponentAtNode(element);
    }

    if (chart) {
      chart.destroy();
    }

    // G2.Chart instance
    chart = this.createG2Instance(props);

    // fake element dom for rendering children
    element = document.createElement('div');

    if (children) {
      ReactDOM.unstable_renderSubtreeIntoContainer(this, (
        <Context chart={chart}>{ children }</Context>
      ), element, () => {
        // for slider-chart
        !_noRender && chart.render();
      });
    } else {
      !_noRender && chart.render();
    }

    // get chart instance async
    // NOTE: should be called after all sub components have been inited, or chart is not complete
    onGetG2Instance(chart);

    this.element = element;
  }

  batchedUpdates = () => {
    if (this.chart && !this.batched) {
      // updates batched
      this.batched = true;
    }
  }

  refHandle = (cw) => {
    // chart container wrap for reset operation
    if (!this.containerWrap) {
      this.containerWrap = cw;
    }
  }

  render() {
    return (
      <div ref={this.refHandle} />
    );
  }
}
