import { Linear, registerTickMethod, registerScale, getScale } from '@antv/scale';

import linearTickMethod from './linear-tick';

registerTickMethod('linear-strict-tick-method', linearTickMethod);

/**
 * 线性度量
 * @class
 */
class LinearStrict extends Linear {
  [x: string]: any;
  constructor(props) {
    super(props);
    this.type = 'linear-strict';
  }
  initCfg() {
    super.initCfg();
    this.tickMethod = 'linear-strict-tick-method';
  }

  calculateTicks() {
    const preNice = this.nice;
    // 强制按照计算出来的ticks，需要设置nice为true，不然会根据最值进行过滤
    this.nice = true;
    const ticks = super.calculateTicks();
    this.nice = preNice;
    // 根据ticks设置最值
    if (ticks.length) {
      this.min = ticks[0];
      this.max = ticks[ticks.length - 1];
    }
    return ticks;
  }
}
export default LinearStrict;

if (!getScale('linear-strict')) {
  registerScale('linear-strict', LinearStrict);
}

