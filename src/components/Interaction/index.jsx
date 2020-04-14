import React, { useEffect } from 'react';
import _isFunction from '@antv/util/esm/is-function';
import useChart from '@/hooks/useChartView';

export default function Interaction(props) {
  const chart = useChart();
  const { type, config } = props;

  useEffect(() => () => {
    // unSave: g2-primaryApi
    chart.interactions[type].destroy();
  })

  chart.interaction(type, config);
  if (_isFunction(props.children)) {
    const res = props.children(chart);
    return React.isValidElement(res) ? res : null;
  }
  return null;
}
