import React from 'react';
import { useEffect } from 'react';
import _isFunction from '@antv/util/esm/is-function';
import _Tooltip from '@antv/g2/esm/chart/controller/tooltip';
import { registerComponentController } from '@/core';
import useChartView from '@/hooks/useChartView';
import ReactTooltip from './ReactTooltip';
import './actions';

registerComponentController('tooltip', _Tooltip);

// Actions

export default function Tooltip(props) {
  const { visible = true, children, ...options } = props;

  useEffect(() => {
    return () => {
      // 销毁
      view.tooltip(false);
    };
  });

  const view = useChartView();
  if (visible === true) {
    if (_isFunction(children)) {
      return <ReactTooltip {...options}>{children}</ReactTooltip>;
    }
    view.tooltip({ showMarkers: false, options });
  } else {
    view.tooltip(false);
  }

  return null;
}
