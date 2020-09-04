// todo: 图表联动方案
import { unregisterAction } from '@antv/g2/lib/interaction/action/register';
import TooltipAction from '@antv/g2/lib/interaction/action/component/tooltip/geometry';
import { uniqueId, forIn, get, set } from '@antv/util';

import { registerInteraction, registerAction } from '../core';
import { Chart } from '../interface';

const CONNECTOR_MAP = {};


export class Connector {
  public id: string;
  protected type: string;
  protected cfg: Record<string, any> = { shared: true };
  constructor(type) {
    this.id = uniqueId('bx-action');
    this.type = type || 'tooltip';
  }
  public chartMap = {};
  public state = {};
  connect(id, chart: Chart, pointFinder?: Function) {
    this.chartMap[id] = { chart, pointFinder };
    chart.interaction(`connect-${this.type}-${this.id}`);
    if (this.type === 'tooltip' && this.cfg.shared) {
      if (get(chart, ['options', 'tooltip', 'shared']) === undefined) {
        set(chart, ['options', 'tooltip', 'shared'], true);
      };
    }
    return this;
  }
  unConnect(id) {
    this.chartMap[id].chart.removeInteraction(`connect-${this.type}-${this.id}`);
    delete this.chartMap[id];
  }
  destroy() {
    unregisterAction(`connect-${this.type}-${this.id}`);
  }
}

// 关联图表何处触发tooltip
const createTooltipConnector = () => {
  const cm = new Connector('tooltip');
  registerAction(`connect-tooltip-${cm.id}`, class ConnectTooltip extends TooltipAction {
    private CM: Connector = cm;
    protected showTooltip(view, point) {
      const records = view.getTooltipItems(point) || point;
      forIn(this.CM.chartMap, item => {
        const { chart, pointFinder } = item;
        if (chart.destroyed || !chart.visible) {
          return;
        }
        if (pointFinder) {
          const triggerPoint = pointFinder(records, chart);
          // 如果没有返回值，则不联动
          if (triggerPoint) {
            chart.showTooltip(triggerPoint)
          };
        } else {
          chart.showTooltip(point);
        }
      })
    }
    protected hideTooltip() {
      forIn(this.CM.chartMap, ({chart}) => chart.hideTooltip())
    }
  });
  registerInteraction(`connect-tooltip-${cm.id}`, {
    start: [{ trigger: 'plot:mousemove', action: `connect-tooltip-${cm.id}:show` }],
    end: [{ trigger: 'plot:mouseleave', action: `connect-tooltip-${cm.id}:hide` }],
  });
  return cm;
}


export const registerConnector = (cid: string, tid: string, chart: Chart | null, shared,  pointFinder?: Function ) => {
  const connector = CONNECTOR_MAP[cid];
  // 销毁
  if (chart === null && connector) {
    connector.unConnect(tid);
    return;
  }
  // 创建 & 注册
  if (connector) {
    connector.connect(tid, chart, pointFinder);
  } else {
    CONNECTOR_MAP[cid] = createTooltipConnector();
    // shared false 是为了兼容饼图不支持shared的tooltip
    CONNECTOR_MAP[cid].cfg.shared = !!shared;
    CONNECTOR_MAP[cid].connect(tid, chart, pointFinder);
  }
}



export default createTooltipConnector;
