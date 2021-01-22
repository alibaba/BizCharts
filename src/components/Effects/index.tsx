import React from 'react';
import _isFunction from '@antv/util/lib/is-function';
import useChart from '../../hooks/useChartInstance';
import warn from 'warning';

interface IEffectsProps extends React.Props<any> {}

export default function Effects(props: IEffectsProps) {
  const chart = useChart();

  if (_isFunction(props.children)) {
    const res = props.children(chart);
    return React.isValidElement(res) ? res : null;
  }

  warn(false, 'Effects 的子组件应当是一个函数 (chart) => {}');
  return null;
}
