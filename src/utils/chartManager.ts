// todo: 图表联动方案

import { Chart } from '../interface';
import deepMix from '@antv/util/lib/deep-mix'
interface IAction {
  type: string,
  [string: string]: any
}

type IState = Record<string, any>;

type IReducer = (state: IState, action:IAction, chartMap: Record<string, Chart>) => Record<string, any>

export class Manager {
  constructor(private reducer: IReducer) {
    this.reducer = reducer;
  }
  public chartMap = {};
  public state = {};
  connect(id, chart: Chart) {
    this.chartMap[id] = chart;
  }
  unConnect(id) {
    delete this.chartMap[id];
  }
  dispatch(action: IAction) {
    const res = this.reducer(this.state, action, this.chartMap);
    deepMix(this.state, res);
  }
}

export const createChartManager = (reducer: IReducer) => {
  return new Manager(reducer);
}
