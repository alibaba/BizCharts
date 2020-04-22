import _Legend from '@antv/g2/lib/chart/controller/legend';
import { registerComponentController } from '../../core';
import useChartView from '../../hooks/useChartView';

import './actions';

registerComponentController('legend', _Legend);


export interface ILegend {
  name: string;
  visible: boolean;
  view?: any; // 来自父级的 chart 或者 view实例
}
const isAllField = name => (name === "*" || name === undefined);

// 单纯的赋值，重复执行不影响性能
export default function Legend(props: ILegend) {
  const { name, visible = true, ...options } = props;
  const view = useChartView();
  if (isAllField(name)) {
    if (visible) {
      view.legend(options);
    } else {
      view.legend(false);
    }
    return null;
  }
  if (visible) {
    view.legend(name, options);
  } else {
    view.legend(name, false);
  }

  return null;
}
