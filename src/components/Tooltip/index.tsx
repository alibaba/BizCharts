import React, { useCallback } from 'react';
import { Chart } from '@antv/g2/lib/chart';
import _isFunction from '@antv/util/lib/is-function';
import _Tooltip from '@antv/g2/lib/chart/controller/tooltip';
import { TooltipCfg } from '@antv/g2/lib/interface';
import { registerComponentController } from '../../core';
import useChartView from '../../hooks/useChartView';
import ReactTooltip from './ReactTooltip';
import './actions';

registerComponentController('tooltip', _Tooltip);

const isReactTooltip = (props) => {
  const { visible = true, children } = props;
  return visible && _isFunction(children);
}

export interface ITooltip extends TooltipCfg, React.ComponentProps<any> {
  visible?: boolean;
  children?: (title?: string, items?: any[], x?: number, y?: number) => {};
  [key: string]: any;
  triggerOn?: 'hover' | 'click';
  onShow?: (e?: ITooltipEvent, chart?: Chart) => void;
  onChange?: (e?: ITooltipEvent, chart?: Chart) => void;
  onHide?: (e?: ITooltipEvent, chart?: Chart) => void;
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

export interface ITooltipEvent {
  items: any[],
  title: string,
  x: number,
  y: number,
}

export default function Tooltip(props: ITooltip) {
  const { children, triggerOn, onShow, onChange, onHide, ...options } = props;
  const chartView = useChartView();
  chartView.removeInteraction('tooltip');
  chartView.removeInteraction('tooltip-click');

  if (triggerOn === 'click') {
    chartView.interaction(`tooltip-click`);
  } else {
    chartView.interaction(`tooltip`);
  }

  const showFnc = useCallback((ITooltipEvent) => {
    if (_isFunction(onShow)) {
      onShow(ITooltipEvent, chartView);
    }
  }, []);

  const changeFnc =  useCallback((ITooltipEvent) => {
    if (_isFunction(onShow)) {
      onChange(ITooltipEvent, chartView);
    }
  }, []);

  const hideFnc = useCallback((ITooltipEvent) => {
    if (_isFunction(onShow)) {
      onHide(ITooltipEvent, chartView);
    }
  }, []);

  chartView.off('tooltip:show', showFnc);
  chartView.on('tooltip:show', showFnc);

  chartView.off('tooltip:change', changeFnc);
  chartView.on('tooltip:change', changeFnc);

  chartView.off('tooltip:hide', hideFnc);
  chartView.on('tooltip:hide', hideFnc)

  return isReactTooltip(props) ? <ReactTooltip {...options} >{children}</ReactTooltip> : <TooltipNormal {...props} />;
}

Tooltip.defaultProps = {
  showMarkers: false,
  triggerOn: 'hover',
}
