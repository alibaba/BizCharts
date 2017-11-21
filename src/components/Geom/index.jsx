/**
 * Geom Component
 */
import G2 from '@antv/g2';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Util, Prop } from '../../shared';

const GEOM_PROPS = ['position', 'color', 'size', 'shape', 'opacity', 'tooltip', 'style', 'animate', 'active', 'select'];

export default class Geom extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['line', 'interval', 'intervalStack', 'area', 'areaStack', 'point', 'polygon', 'edge',
      'schema', 'pointStack', 'pointJitter', 'pointDodge', 'intervalDodge', 'schemaDodge', 'intervalSymmetric']),
    active: PropTypes.bool,
    select: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.array,
    ]),
    position: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    type: 'interval',
  }

  static contextTypes = {
    batchedUpdates: PropTypes.func,
    chart: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(G2.Chart),
    ]),
  }

  static childContextTypes = {
    geom: PropTypes.object,
    batchedUpdates: PropTypes.func,
  }

  constructor(props, context) {
    super(props);

    invariant(context.chart, '`<Geom />` must be wrapped in `<Chart />`');

    this.createG2Instance(props, context);
  }

  getChildContext() {
    return {
      geom: this.geom,
      batchedUpdates: this.context.batchedUpdates,
    };
  }

  componentWillMount() {
    const { geom, props } = this;

    invariant(props.position, '`<Geom />` must have `position` property');

    if (props.adjust) {
      geom.adjust(props.adjust);
    }
    Prop.init(GEOM_PROPS, props, (value, key) => {
      geom[key](...value);
    });
  }

  componentWillReceiveProps(nextProps) {
    // repaint geom if type changes
    if (nextProps.type !== this.props.type) {
      this.noUpdate = true;
      this.context.batchedUpdates();
      return;
    }

    if (Util.shallowEqual(this.props, nextProps)) {
      return;
    }

    const { geom } = this;
    const { adjust, ...props } = this.props;
    const { adjust: nextAdjust, ...nextAttrs } = nextProps;

    if (adjust || nextAdjust) {
      geom.adjust(nextAdjust);
    }
    Prop.update(GEOM_PROPS, props, nextAttrs, (value, key) => {
      geom[key](...value);
    });
  }

  shouldComponentUpdate() {
    const { noUpdate = false } = this;
    // reset noUpdate flag
    noUpdate && (this.noUpdate = false);

    return !noUpdate;
  }

  componentWillUnmount() {
    const { context } = this;

    // notify chart to clear gemo
    this.geom = null;
    context.batchedUpdates();
  }

  createG2Instance(props = this.props, context = this.context) {
    const { type, initConfig } = props;
    const geom = context.chart[type](initConfig);

    this.geom = geom;

    return geom;
  }

  render() {
    if (this.props.children == null) {
      return null;
    }

    return this.props.children;
  }
}
