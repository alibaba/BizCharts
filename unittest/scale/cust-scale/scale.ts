import { registerTickMethod, registerScale, getScale } from '@antv/scale';
import {isNil} from '@antv/util';
import * as d3 from 'd3-scale';


import Continuous from '@antv/scale/lib/continuous/base'

import linearTickMethod from './tickMethod';

registerTickMethod('linear-shrinking-tick-method', linearTickMethod);

/**
 * 线性度量
 * @class
 */
export default class LinearShriking extends Continuous {
  public minTickInterval: number;
  public type = 'linear';
  public readonly isLinear: boolean = true;
  private shrink: number;
  public base: number;
  // 用于解决 min: 0 的场景下的问题
  private positiveMin: number;
  private shrikLog: any;
  private shrikLinear: any;

  protected init() {
    super.init();

    if (this.shrink === undefined) {
      console.warn('请配置比例尺的shrink属性，即从shrink这个number起使用log比例尺收缩剩余的轴');
      this.shrink = this.min + (this.max - this.min) * 0.5;
    }
    if (this.range.length === 2) {
      this.range = [this.range[0], (this.range[1] + this.range[0]) * 0.5 , this.range[1]];
    }
    // log
    this.shrikLog = d3.scaleLog()
      .domain([this.shrink, this.max])
      .range([this.range[1], this.range[2]]);
    if (!isNil(this.base)) {
      this.shrikLog.base(this.base);
    }
    // 线性
    this.shrikLinear = d3.scaleLinear()
      .domain([this.min, this.shrink])
      .range([this.range[0], this.range[1]]);
  }

  protected rangeMax() {
    return this.range[2];
  }

  public scale(value: any): number {
    if (isNil(value)) {
      return NaN;
    }
    const max = this.max;
    const min = this.min;
    if (max === min) {
      return this.rangeMin();
    }
    if (value <= this.shrink) {
      return this.shrikLinear(value);
    }
    return this.shrikLog(value);
  }
  public invert(value: number): any {
    if (value <= this.range[1]) {
      return this.shrikLinear.invert(value)
    }
    return this.shrikLog.invert(value);
  }
  protected initCfg() {
    this.tickMethod = 'linear-shrinking-tick-method';
    this.nice = false;
  }
}

if (!getScale('linear-shrinking')) {
  registerScale('linear-shrinking', LinearShriking);
}

