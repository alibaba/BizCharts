/**
 * Axis Component
 */
import G2 from '@antv/g2';
import warning from 'warning';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Util } from '../../shared';

export default class Axis extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    visible: PropTypes.bool,
  }

  static defaultProps = {
    visible: true,
  }

  static contextTypes = {
    chart: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(G2.Chart),
    ]),
  }

  componentWillMount() {
    const { chart } = this.context;
    const { name, visible, ...others } = this.props;

    invariant(chart, '`<Axis />` must be wrapped in `<Chart />`');

    // axis style
    if (visible) {
      chart.axis(name, others);
    } else {
      chart.axis(name, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props;
    const { chart } = this.context;
    const { name, visible, ...others } = props;
    const { name: nextName, visible: nextVisible, ...nextOthers } = nextProps;

    warning(name === nextName, '`name` propertry should not be changed in `<Axis />`');

    if (visible !== nextVisible) {
      if (!nextVisible) {
        chart.axis(name, false);
        return;
      }
    }

    if (!Util.shallowEqual(others, nextOthers)) {
      chart.axis(name, nextOthers);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    const { context, props } = this;
    context.chart.axis(props.name, false);
  }

  render() {
    return null;
  }
}
