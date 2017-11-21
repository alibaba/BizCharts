/**
 * Legend Component
 */
import G2 from '@antv/g2';
import PropTypes from 'prop-types';
import { Component } from 'react';
import invariant from 'invariant';
import Util from '../../shared/util';

export default class Legend extends Component {
  static propTypes = {
    name: PropTypes.string,
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
    invariant(this.context.chart, '`<Legend />` must be wrapped in `<Chart />`');
    this.legend(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!Util.shallowEqual(this.props, nextProps)) {
      this.legend(this.props);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    const { context, props } = this;
    const { name } = props;
    context.chart.legend(...(name ? [name, false] : [false]));
  }

  legend(props) {
    const { name, visible, ...cfg } = props;

    if (!Util.isFunction(props.onClick)) {
      delete cfg.onClick;
    }
    const arg = !visible ? visible : cfg;

    this.context.chart.legend(...(name ? [name, arg] : [arg]));
  }

  render() {
    return null;
  }
}
