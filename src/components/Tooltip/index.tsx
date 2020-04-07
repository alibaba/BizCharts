
import { useEffect } from 'react';
import _Tooltip from '@antv/g2/esm/chart/controller/tooltip';
import { registerComponentController } from '../../core';
import useChartView from '../../hooks/useChartView';
import './actions';

registerComponentController('tooltip', _Tooltip);

// Actions

export default function Tooltip(props) {
  const { visible = true, ...options } = props;
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
