/**
 * Chart Context Component
 */
import G2 from '@antv/g2';
import warning from 'warning';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React, { Component, Children } from 'react';
import Util from '../../shared/util';
import Coord from '../Coord';
import Axis from '../Axis';
import Legend from '../Legend';
import Tooltip from '../Tooltip';
import Geom from '../Geom';
import View from '../View';
import Guide from '../Guide';
import Facet from '../Facet';


// Chart`s child components
const CHART_CHILDREN = [Coord, Axis, Legend, Tooltip, Geom, View, Guide, Facet];

export default class Context extends Component {
  static propTypes = {
    chart: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(G2.Chart),
    ]),
  }

  static childContextTypes = {
    chart: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(G2.Chart),
    ]),
  }

  getChildContext() {
    return {
      chart: this.props.chart,
    };
  }

  render() {
    const { chart } = this.props;
    let children = [];

    // sort children components for valid render
    Children.forEach(this.props.children, (child, key) => {
      if (!child) return;
      if (!(chart instanceof G2.Chart)) {
        invariant(child.type !== CHART_CHILDREN[5], '`<View />` cannot be nested in another `<View />`');
        invariant(child.type !== CHART_CHILDREN[2], '`<Legend />` cannot be wrapped in `<View />`');
      }
      Util.each(CHART_CHILDREN, (type, index) => {
        if (child.type === type) {
          children[index] || (children[index] = []);
          children[index].push(React.cloneElement(child, { key }));
          return false; // optmize traverse
        }
        return true;
      });
    });

    const warnMsg = 'Only one `%s` is allowed in `<Chart />`';
    warning(!children[0] || children[0].length === 1, warnMsg, '<Coord/>');
    warning(!children[3] || children[3].length === 1, warnMsg, '<Tooltip />');

    // filter null/undefined element
    // don`t need to flattern children array，cause React suppots that
    children = Util.filter(children, child => !!child);

    if (children.length) {
      children = <div>{ children }</div>;
    } else {
      children = null;
    }

    return children;
  }
}
