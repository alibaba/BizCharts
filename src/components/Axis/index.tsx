import React, { useEffect } from 'react';
import _isBoolean from '@antv/util/esm/is-boolean';
import _Axis from '@antv/g2/esm/chart/controller/axis';
import { requiredPropWarn } from '../../utils/warning';
import useChartView from '../../hooks/useChartView';

import { registerComponentController } from '../../core';

registerComponentController('axis', _Axis);

export interface IAxis {
  name: string;
  view?: any; // 来自父级的 chart 或者 view实例
}

const isAllField = name => (name === "*" || name === undefined);

export default function Axis(props) {
  const { name, visible, ...options } = props;
  const view = useChartView();
  requiredPropWarn(!!name, 'Axis', 'name', `name属性为数据字段名, name="*" 表示配置所有字段。`);
  if (_isBoolean(visible)) {
    if (isAllField(name)) {
      view.axis(false);
    } else {
      view.axis(name, false);
    }
  } else {
    if (isAllField(name)) {
      view.axis(false);
    } else {
      view.axis(name, false);
    }
    view.axis(name, options); // 单纯的赋值，重复执行不影响性能
  }
  useEffect(() => {
    return () => {
      if (isAllField(name)) {
        view.axis(false);
      } else {
        view.axis(name, false);
      }
    }
  })
  return null;
}
