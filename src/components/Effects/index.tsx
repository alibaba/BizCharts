import React from 'react';
import _isFunction from '@antv/util/lib/is-function';
import useChart from '../../hooks/useChartInstance';
import warn from '../../utils/warning';

export default function Effects(props) {
  const chart = useChart();
  // console.log(props.children)
  console.log(123)
  if (_isFunction(props.children)) {
    const res = props.children(chart);
    return React.isValidElement(res) ? res : null;
  }

  warn(false, 'Effects 的子组件应当是一个函数 (chart) => {}');
  return null;
}
