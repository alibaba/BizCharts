import 'react';
import warn from 'warning';
import { Rose, RoseOptions as Options } from '@antv/g2plot/lib/plots/rose';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, replaceApi } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';
import { get } from '@antv/util';

const REPLACEAPILIST = [{
  sourceKey: 'groupField',
  targetKey: 'seriesField',
  notice: 'groupField 是 g2@1.0的属性，即将废弃，请使用seriesField替代',
}, {
  sourceKey: 'categoryField',
  targetKey: 'xField',
  notice: 'categoryField 是 g2@1.0的属性，即将废弃，请使用xField替代',
}, {
  sourceKey: 'radiusField',
  targetKey: 'yField',
  notice: 'radiusField 是 g2@1.0的属性，即将废弃，请使用yFeild替代',
}];

interface GroupedRoseOptions extends Options, BasePlotOptions {
  /** 请使用seriesField替代 */
  groupField?: string;
  /** 请使用xField替代 */
  categoryField?: string;
  /** 请使用yFeild替代 */
  radiusField?: string;
  /** 图例 */
  legend?: LengendAPIOptions;
  /** 图表提示框 */
  tooltip?: TooltipAPIOptions;
  /** 数据标注label */
  label?: LabelAPIOptions;
}

const polyfill = (opt: GroupedRoseOptions): GroupedRoseOptions => {
  warn(false, '<GroupedRose /> 即将在5.0后废弃，请使用<Rose />。')

  const options = polyfillOptions(opt);
  replaceApi(REPLACEAPILIST, options);
  if (get(options, 'label.type') === 'inner') {
    options.label.offset = -15;
    delete options.label.type;
  }

  if (get(options, 'label.type') === 'outer') {
    delete options.label.type;
  }

  return { ...options, isGroup: true };
}

export { GroupedRoseOptions };

export default createPlot<GroupedRoseOptions>(Rose, 'GroupedRoseChart', polyfill);
