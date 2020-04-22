import React, { useEffect } from 'react';
import _isFunction from '@antv/util/lib/is-function';
import useChart from '../../hooks/useChartView';

export default function Interaction(props) {
  const chart = useChart();
  const { type, config } = props;

  useEffect(() => {
    chart.interaction(type, config);
    if (_isFunction(props.children)) {
      const res = props.children(chart);
      return React.isValidElement(res) ? res : null;
    }
    return () => {
      // unSave: g2-primaryApi
      chart.interactions[type].destroy();
    }
  })

  return null;
}
