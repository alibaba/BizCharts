import 'react';
import { Gauge, GaugeOptions as Options } from '@antv/g2plot/lib/plots/gauge';
import { Statistic } from '@antv/g2plot/lib/types';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { isArray, get, set, isNil, isFunction } from '@antv/util';
import warn from 'warning';
import { getTheme } from '@antv/g2';

interface GaugeOptions extends BasePlotOptions, Options {
  /** 该属性是g2Plot@1.0属性，即将废弃，请使用percent替代 */
  value?: number;
  statistic?: Statistic | Record<string, any>
}

export { GaugeOptions };

// 该plot 无法完全兼容
export default createPlot<GaugeOptions>(Gauge, 'GaugeChart', (opt) => {
  const {range, min = 0, max = 1, value, ...options} = polyfillOptions(opt);

  if (isArray(range)) {
    warn(false, 'range 应当是个对象，请修改配置。');
    options.range = {
      ticks: range.map(t => t / (max - min)),
      color: getTheme().colors10,
    }

  } else {
    options.range = range || {};
  }
  const color = get(options, 'color');
  if (!isNil(color)) {
    warn(false, '请通过配置属性range.color来配置颜色');
    options.range.color = color;
  }
  if (isNil(get(options, 'indicator'))) {
    // 默认灰色 indicator
    set(options, 'indicator', {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    })
  }
  if (get(options, 'statistic.visible')) {
    // 默认使用visible即使用旧版语法的人
    set(options, 'statistic.title', get(options, 'statistic'));
  }

  if (!isNil(min) && !isNil(max) && !isNil(value)) {
    // 旧版数据使用方式
    options.percent = value / (max - min);
    const formatter = get(options, 'axis.label.formatter');
    set(options, 'axis', {
      label: {
        formatter: v => {
          const val = v * (max - min);
          if (isFunction(formatter)) {
            return formatter(val)
          }
          return val;
        }
      },
    });
  }

  warn(!(get(options, 'min') || get(options, 'max')), '属性 `max` 和 `min` 不推荐使用， 请直接配置属性range.ticks');
  warn(!(get(options, 'rangeSize') || get(options, 'rangeStyle') || 'rangeBackgroundStyle'), '不再支持rangeSize、rangeStyle、rangeBackgroundStyle属性, 请查看新版仪表盘配置文档。')
  // value 转为data，用于placeholder统一判断
  const data = !isNil(options.percent) ? options.percent : value;
  return { data, ...options };
});
