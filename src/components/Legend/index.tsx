import React from 'react';
import _isBoolean from '@antv/util/esm/is-boolean';
import _Legend from '@antv/g2/esm/chart/controller/legend';
import { registerComponentController } from '../../core';
import useChartView from '../../hooks/useChartView';

import './actions';

registerComponentController('legend', _Legend);


export interface IAxis {
  name: string;
  view?: any; // 来自父级的 chart 或者 view实例
}

export default function Legend(props) {
  const { name, visible, ...options } = props;
  const view = useChartView();
  if (_isBoolean(visible)) {
    if (name === undefined || name === "*") {
      view.legend(false);
    } else {
      view.legend(name, false);
    }
  } else {
    if (name === undefined || name === "*") {
      view.legend(options);
    } else {
      view.legend(name, options); // 单纯的赋值，重复执行不影响性能
    }
  }
  return null;
}
