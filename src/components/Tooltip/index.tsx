import React, { useEffect } from 'react';
import _isFunction from '@antv/util/lib/is-function';
import _Tooltip from '@antv/g2/lib/chart/controller/tooltip';
import { registerComponentController } from '../../core';
import useChartView from '../../hooks/useChartView';
import ReactTooltip from './ReactTooltip';
import './actions';

registerComponentController('tooltip', _Tooltip);

const isReactTooltip = (props) => {
  const { visible = true, children } = props;
  return visible && _isFunction(children);
}

export interface ITooltip extends React.ComponentProps<any> {
  visible?: boolean;
  children?: (title?: string, items?: any[], x?: number, y?: number) => {};
  [key: string]: any;
}

function TooltipNormal(props: ITooltip) {
  const { visible = true, children, ...options } = props;
  const chartView = useChartView();
  if (visible === true) {
    chartView.tooltip({ showMarkers: false, ...options });
  } else {
    chartView.tooltip(false);
  }
  return null;
}

export default function Tooltip(props: ITooltip) {
  const { visible = true, children, ...options } = props;
  return isReactTooltip(props) ? <ReactTooltip {...options} /> : <TooltipNormal {...props} />;
}
