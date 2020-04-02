
import React, { useEffect } from 'react';
import useChartView from '../../hooks/useChartView';

export default function Tooltip(props) {
  const { visible, ...options } = props;
  const view = useChartView();
  if (visible === true) {
    view.tooltip(options);
  } else {
    view.tooltip(false);
  }
  useEffect(() => {
    return () => {
      // 销毁
      view.tooltip(false);
    }
  });
  return null;
}
