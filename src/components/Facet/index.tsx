import React from 'react';
import { FacetCfg, FacetTitle, Line } from '@antv/g2/lib/interface';
import _isFunction from '@antv/util/lib/is-function';

import Circle from '@antv/g2/lib/facet/circle';
import List from '@antv/g2/lib/facet/list';
import Matrix from '@antv/g2/lib/facet/matrix';
import Mirror from '@antv/g2/lib/facet/mirror';
import Rect from '@antv/g2/lib/facet/rect';
import Tree from '@antv/g2/lib/facet/tree';

import useChartView from '../../hooks/useChartView';
import useChartInstance from '../../hooks/useChartInstance';
import { registerFacet } from '../../core';

registerFacet('rect', Rect);
registerFacet('mirror', Mirror);
registerFacet('list', List);
registerFacet('matrix', Matrix);
registerFacet('circle', Circle);
registerFacet('tree', Tree);

export interface IFacetProps extends FacetCfg<any>, React.Props<any> {
  type: "circle" | "rect" | "mirror" | "list" | "matrix" | "tree";
  /** 行标题的样式。 */
  columnTitle?: FacetTitle,
  /** 列标题的样式。 */
  rowTitle?: FacetTitle,
  /** 是否转置。 */
  transpose?: boolean;
  /** 标题样式。 */
  title?: FacetTitle;
  /** 指定每行可显示分面的个数，超出时会自动换行。 */
  cols?: number;
  line?: Line;
  /** 绘制每个分面 */
  eachView: (view, facet) => void;
};

function Facet(props: IFacetProps) {
  const chart = useChartView();
  const chartInstance = useChartInstance();
  const { type, children, ...cfg } = props;
  // @ts-ignore
  if (chart.facetInstance) {
    // 分面如果已存在不能重复执行，销毁重新配置
    // @ts-ignore
    chart.facetInstance.destroy();
    // @ts-ignore
    chart.facetInstance = null;
    // todo: 是否有必要区分数据更新和配置项更新，当前处理为全部都重绘
    chartInstance.forceReRender = true; // 重新渲染，不能更新
  }
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

export default Facet;
