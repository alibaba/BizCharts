// todo: 图表联动方案
import { registerInteraction, registerAction } from '../core';
import { unregisterAction } from '@antv/g2/lib/interaction/action/register';
import TooltipAction from '@antv/g2/lib/interaction/action/component/tooltip';


import { Chart } from '../interface';
import { uniqueId, forIn, get, set } from '@antv/util';

export class ChartConnector {
  public id: string;
  protected type: string;
  constructor(type) {
    this.id = uniqueId('bx-action');
    this.type = type;
  }
  public chartMap = {};
  public state = {};
  connect(id, chart: Chart) {
    this.chartMap[id] = chart;
    chart.interaction(`connect-${this.type}-${this.id}`);
    if (get(chart, ['options', 'tooltip', 'shared']) === undefined) {
      set(chart, ['options', 'tooltip', 'shared'], true);
    };
  }
  unConnect(id) {
    this.chartMap[id].removeInteraction(`connect-${this.type}-${this.id}`);
    delete this.chartMap[id];
  }
  destroy() {
    unregisterAction(`connect-tooltip-${this.id}`);
  }
}

export default () => {
  const cm = new ChartConnector('tooltip');
  registerAction(`connect-tooltip-${cm.id}`, class ConnectTooltip extends TooltipAction {
    private CM: ChartConnector = cm;
  
    protected showTooltip(view, point) {
      forIn(this.CM.chartMap, chart => chart.showTooltip(point))
    }
    protected hideTooltip(view) {
      forIn(this.CM.chartMap, chart => chart.hideTooltip())
    }
  });
  registerInteraction(`connect-tooltip-${cm.id}`, {
    start: [{ trigger: 'plot:mousemove', action: `connect-tooltip-${cm.id}:show` }],
    end: [{ trigger: 'plot:mouseleave', action: `connect-tooltip-${cm.id}:hide` }],
  });
  return cm;
}

