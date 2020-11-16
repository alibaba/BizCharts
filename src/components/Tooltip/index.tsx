import React, { useCallback, useEffect, useRef } from 'react';
import { Chart } from '@antv/g2/lib/chart';
import _isFunction from '@antv/util/lib/is-function';
import _Tooltip from '@antv/g2/lib/chart/controller/tooltip';
import _uniqueId from '@antv/util/lib/unique-id';
import _isArray from '@antv/util/lib/is-array';
import _isString from '@antv/util/lib/is-string';
import { TooltipCfg } from '@antv/g2/lib/interface';
import { registerComponentController } from '../../core';
import useChartView from '../../hooks/useChartView';
import ReactTooltip from './ReactTooltip';
import { registerConnector } from '../../connector/createTooltipConnector';
import './actions';

registerComponentController('tooltip', _Tooltip);

const isReactTooltip = (props) => {
  const { visible = true, children } = props;
  return visible && _isFunction(children);
}

export interface ITooltip extends TooltipCfg, React.ComponentProps<any> {
  /** 图例是否可见 */
  visible?: boolean;
  /** 自定义Tooltip */
  children?: (title?: string, items?: any[], x?: number, y?: number) => {};
  [key: string]: any;
  /** 触发事件条件 */
  triggerOn?: 'hover' | 'click';
  /** Tooltip显示时 */
  onShow?: (e?: ITooltipEvent, chart?: Chart) => void;
  /** Tooltip改变时 */
  onChange?: (e?: ITooltipEvent, chart?: Chart) => void;
  /** Tooltip隐藏时 */
  onHide?: (e?: ITooltipEvent, chart?: Chart) => void;
}

const TooltipNormal: React.FC<ITooltip> = (props) => {
  const { visible = true, children, ...options } = props;
  const chartView = useChartView();
  chartView.getController('tooltip').clear();
  if (visible === true) {
    chartView.tooltip({ customContent: null, showMarkers: false, ...options });
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
  const { children, triggerOn, onShow, onChange, onHide, lock, linkage, ...options } = props;
  const chartView = useChartView();
  chartView.removeInteraction('tooltip');
  chartView.removeInteraction('tooltip-click');
  chartView.removeInteraction('tooltip-lock');

  if (triggerOn === 'click') {
    // 只有click的时候才会出现tooltip，hover 无效
    chartView.interaction(`tooltip-click`);
  } else if (lock) {
    // hover的时候触发，但是点击的时候锁定位置
    chartView.interaction(`tooltip-lock`);
  }  else {
    // click不会有任何动作，只有hover的时候跟随
    chartView.interaction(`tooltip`);
  }

  const connectorId = useRef(_uniqueId('tooltip'));

  // tooltip 联动
  useEffect(() => {
    if (_isArray(linkage)) {
      registerConnector(linkage[0], connectorId.current, chartView, options.shared, linkage[1]);
    } else if (_isString(linkage)) {
      registerConnector(linkage, connectorId.current, chartView, options.shared);
    }
  }, [linkage, chartView]);

  const showFnc = useCallback((ITooltipEvent) => {
    if (_isFunction(onShow)) {
      onShow(ITooltipEvent, chartView);
    }
  }, []);

  const changeFnc = useCallback((ITooltipEvent) => {
    if (_isFunction(onChange)) {
      onChange(ITooltipEvent, chartView);
    }
  }, []);

  const hideFnc = useCallback((ITooltipEvent) => {
    if (_isFunction(onHide)) {
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
