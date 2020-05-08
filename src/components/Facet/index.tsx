import React from 'react';
import { FacetCfg } from '@antv/g2/lib/interface';
import _isFunction from '@antv/util/lib/is-function';
import shallowEqual from '../../utils/shallowEqual';
import useChartView from '../../hooks/useChartView';

import { registerFacet } from '../../core';
import Circle from '@antv/g2/lib/facet/circle';
import List from '@antv/g2/lib/facet/list';
import Matrix from '@antv/g2/lib/facet/matrix';
import Mirror from '@antv/g2/lib/facet/mirror';
import Rect from '@antv/g2/lib/facet/rect';
import Tree from '@antv/g2/lib/facet/tree';

registerFacet('rect', Rect);
registerFacet('mirror', Mirror);
registerFacet('list', List);
registerFacet('matrix', Matrix);
registerFacet('circle', Circle);
registerFacet('tree', Tree);

export interface IFacetProps extends FacetCfg<any>, React.Props<any> {
  type: "circle" | "rect" | "mirror" | "list" | "matrix" | "tree";
};

function Facet(props: IFacetProps) {
  const chart = useChartView();
  const { type, children, ...cfg } = props;
  if (_isFunction(children)) {
    chart.facet(type, {
      ...cfg,
      // @ts-ignore
      eachView: children
    });
  } else {
    chart.facet(type, {
      ...cfg,
    });
  }
  return null;
}

export default React.memo(Facet, (preProps, nextProps) => {
  return shallowEqual(preProps, nextProps);
})
