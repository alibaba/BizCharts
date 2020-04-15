import React from 'react';
import _isFunction from '@antv/util/esm/is-function';
import useChart from '@/hooks/useChartView';
import warn from '@/utils/warning';

export default function G2Function(props) {
  const chart = useChart();
  console.log(props.children)
  if (_isFunction(props.children)) {
    const res = props.children(chart);
    return React.isValidElement(res) ? res : null;
  } else {
    warn(false, 'G2Function 的子组件应当是一个函数 (chart) => {}');
    return null;
  }
}
