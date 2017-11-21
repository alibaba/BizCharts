/**
 * Coord Component
 */
import G2 from '@antv/g2';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Util, Prop } from '../../shared';

const COORD_ATTRS = ['rotate', 'scale', 'reflect', 'transpose'];

export default class Coord extends Component {
  static propTypes = {
    type: PropTypes.string,
  }

  static defaultProps = {
    type: 'rect',
  }

  static contextTypes = {
    batchedUpdates: PropTypes.func,
    chart: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(G2.Chart),
    ]),
  }

  constructor(props, context) {
    super(props);

    invariant(context.chart, '`<Coord />` must be wrapped in `<Chart />`');

    const { type, ...others } = this.props;
    this.coord = context.chart.coord(type, Util.without(others, COORD_ATTRS));
  }

  componentWillMount() {
    const { coord, props } = this;

    // init no-empty value
    Prop.init(COORD_ATTRS, props, (value, key) => {
      coord[key](...value);
    });
  }

  componentWillReceiveProps(nextProps) {
    // repaint coord if type changes
    if (nextProps.type !== this.props.type) {
      this.context.batchedUpdates();
      return;
    }

    const { props } = this;

    const attrs = Util.without(props, COORD_ATTRS);
    const nextAttrs = Util.without(nextProps, COORD_ATTRS);
    if (!Util.shallowEqual(attrs, nextAttrs)) {
      this.coord = this.context.chart.coord(nextProps.type, nextAttrs);
    }

    const { coord } = this;

    // diff value
    Prop.update(COORD_ATTRS, props, nextProps, (value, key) => {
      coord[key](...value);
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    const { context } = this;
    this.coord = null;
    context.chart.coord('rect', {});
    context.batchedUpdates();
  }

  render() {
    return null;
  }
}
