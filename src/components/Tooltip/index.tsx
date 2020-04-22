import React, { useEffect } from 'react';
import _isFunction from '@antv/util/lib/is-function';
import _Tooltip from '@antv/g2/lib/chart/controller/tooltip';
import { registerComponentController } from '../../core';
import useChartView from '../../hooks/useChartView';
import ReactTooltip from './ReactTooltip';
import './actions';

registerComponentController('tooltip', _Tooltip);

// Actions

export default function Tooltip(props) {
  const { visible = true, children, ...options } = props;
  const view = useChartView();
  useEffect(() => {
    return () => {
      // 销毁
      view.tooltip(false);
    };
  });
  if (visible === true) {
    if (_isFunction(children)) {
      return <ReactTooltip {...options}>{children}</ReactTooltip>;
    }
    view.tooltip({ showMarkers: false, ...options });
  } else {
    view.tooltip(false);
  }
  return null;
}
