// todo: 图表联动方案
import { registerInteraction, registerAction } from '../core';
import { unregisterAction } from '@antv/g2/lib/interaction/action/register';
import TooltipAction from '@antv/g2/lib/interaction/action/component/tooltip';

import { Chart } from '../interface';
import { uniqueId, forIn, get, set } from '@antv/util';

const CONNECTOR_MAP = {};

export class Connector {
  public id: string;
  protected type: string;
  constructor(type) {
    this.id = uniqueId('bx-action');
    this.type = type;
  }
  public chartMap = {};
  public state = {};
  connect(id, chart: Chart, pointFinder?: Function) {
    this.chartMap[id] = { chart, pointFinder };
    chart.interaction(`connect-${this.type}-${this.id}`);
    if (get(chart, ['options', 'tooltip', 'shared']) === undefined) {
      set(chart, ['options', 'tooltip', 'shared'], true);
    };
    return this;
  }
  unConnect(id) {
    this.chartMap[id].chart.removeInteraction(`connect-${this.type}-${this.id}`);
    delete this.chartMap[id];
  }
  destroy() {
    unregisterAction(`connect-tooltip-${this.id}`);
  }
}
/** 
 * @finder 关联图表何处触发tooltip
 * 
 **/ 
export default () => {
  const cm = new Connector('tooltip');
  registerAction(`connect-tooltip-${cm.id}`, class ConnectTooltip extends TooltipAction {
    private CM: Connector = cm;
    protected showTooltip(view, point) {
      const records = view.getSnapRecords(point);
      forIn(this.CM.chartMap, item => {
        const { chart, pointFinder } = item;
        if (records[0] && pointFinder) {
          const triggerPoint = pointFinder(records[0], view);
          chart.showTooltip(triggerPoint);
        } else {
          chart.showTooltip(point);
        }
      })
    }
    protected hideTooltip(view) {
      forIn(this.CM.chartMap, ({chart}) => chart.hideTooltip())
    }
  });
  registerInteraction(`connect-tooltip-${cm.id}`, {
    start: [{ trigger: 'plot:mousemove', action: `connect-tooltip-${cm.id}:show` }],
    end: [{ trigger: 'plot:mouseleave', action: `connect-tooltip-${cm.id}:hide` }],
  });
  return cm;
}

