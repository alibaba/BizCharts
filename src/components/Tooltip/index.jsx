/**
 * Tooltip Component
 */
import G2 from '@antv/g2';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Util, GEvent } from '../../shared';

const EVENTS = [
  { prop: 'onChange', event: 'tooltip:change' },
  { prop: 'onShow', event: 'tooltip:show' },
  { prop: 'onHide', event: 'tooltip:hide' },
];

export default class Tooltip extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
  }

  static contextTypes = {
    chart: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(G2.Chart),
    ]),
  }

  componentWillMount() {
    const { props, context } = this;
    const { chart } = context;

    invariant(chart, '`<Tooltip />` must be wrapped in `<Chart />`');

    // Why use ... ? Beacuse g2 will change props, which is forbidden in react.
    chart.tooltip({ ...props });

    GEvent.bindEvents(chart, EVENTS, props);
  }

  componentWillReceiveProps(nextProps) {
    const { props, context } = this;
    const { chart } = context;

    /* eslint-disable */
    const { onTooltipChange, onTooltipShow, onTooltipHide, ...otherProps } = props;
    const { onTooltipChange: nextOnTooltipChange, onTooltipShow: nextOnTooltipShow, onTooltipHide: nextOnTooltipHide, ...otherNextProps } = nextProps;
    /* eslint-enable */

    if (!Util.shallowEqual(otherProps, otherNextProps)) {
      chart.tooltip({ ...nextProps });
    }

    GEvent.updateEvents(chart, EVENTS, props, nextProps);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    const { props, context } = this;
    const { chart } = context;

    chart.tooltip(false);
    GEvent.unbindEvents(chart, EVENTS, props);
  }

  render() {
    return null;
  }
}
