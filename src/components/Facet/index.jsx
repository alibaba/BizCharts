/**
 * Facet Component
 */
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Context from '../Context';
import { Util } from '../../shared';
import G2 from '@antv/g2';

export default class Facet extends Component {

  static contextTypes = {
    chart: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(G2.Chart),
    ]),
  }

  componentWillReceiveProps(nextProps) {
    const { type, ...others } = this.props;
    const { type: nextType, ...nextOthers } = nextProps;

    if (!Util.shallowEqual(others, nextOthers) || type !== nextType) {
      this.context.chart.facet(nextType, nextOthers);
    }
  }

  render() {
    const { children, type, ...others } = this.props;
    const { chart } = this.context;
    let relChildren;

    if (children) {
      invariant(Util.isFunction(children), '<Facet> only have one function child!');

      relChildren = [];
      let key = 0;
      others.eachView = (view, facet) => {
        let viewChild = children(view, facet);
        if (viewChild) {
          // 需要告诉 View 组件，无需创建 G2 view 示例，而使用此处的 view。
          viewChild = React.cloneElement(viewChild, Object.assign({}, viewChild.props, { instance: view, key: key++ }));
          relChildren.push(viewChild);
        }
      };
    }

    chart.facet(type, others);
    if (relChildren) {
      return <Context chart={chart}>{ relChildren }</Context>;
    }
    return null;
  }
}
