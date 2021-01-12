import 'react';
import { Heatmap, HeatmapOptions } from '@antv/g2plot/lib/plots/heatmap';
import { ColorAttr } from '@antv/g2plot/lib/types/attr'
import createPlot, { BasePlotOptions } from '../createPlot';
import { G2 } from '@antv/g2plot';
import { polyfillOptions, replaceApi } from './core/polyfill';
import { get, isNil, set } from '@antv/util';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

G2.registerShape('polygon', 'boundary-polygon', {
  draw(cfg, container) {
    const group = container.addGroup();
    const attrs = {
      stroke: '#fff',
      lineWidth: 1,
      fill: cfg.color,
      paht: [],
    };
    const points: any = cfg.points;
    const path = [
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', points[2].x, points[2].y],
      ['L', points[3].x, points[3].y],
      ['Z'],
    ];
    // @ts-ignore
    attrs.path = this.parsePath(path);
    group.addShape('path', {
      attrs,
    });

    if (get(cfg, 'data.lastWeek')) {
      const linePath = [
        ['M', points[2].x, points[2].y],
        ['L', points[3].x, points[3].y],
      ];
      // 最后一周的多边形添加右侧边框
      group.addShape('path', {
        attrs: {
          path: this.parsePath(linePath),
          lineWidth: 4,
          stroke: '#404040',
        },
      });
      if (get(cfg, 'data.lastDay')) {
        group.addShape('path', {
          attrs: {
            path: this.parsePath([
              ['M', points[1].x, points[1].y],
              ['L', points[2].x, points[2].y],
            ]),
            lineWidth: 4,
            stroke: '#404040',
          },
        });
      }
    }
    return group;
  },
});

const REPLACEAPILIST = [{
  sourceKey: 'colors',
  targetKey: 'color',
  notice: 'colors 是 g2Plot@1.0 的属性，请使用 color 属性替代',
}, {
  sourceKey: 'valueField',
  targetKey: 'colorField',
  notice: 'valueField 是 g2@1.0的属性，即将废弃，请使用colorField替代',
}, {
  sourceKey: 'radiusField',
  targetKey: 'yField',
  notice: 'radiusField 是 g2@1.0的属性，即将废弃，请使用yFeild替代',
}];

export interface CalendarOptions extends HeatmapOptions, BasePlotOptions {
  /** 图例 */
  legend?: LengendAPIOptions;
  /** 图表提示框 */
  tooltip?: TooltipAPIOptions;
  /** 数据标注label */
  label?: LabelAPIOptions;
  dateField?: string;
  /** valueField 是 g2@1.0的属性，即将废弃，请使用colorField替代 */
  valueField?: string;
  dateRange?: string[];
  /** colors 是 g2Plot@1.0 的属性，即将废弃， 请使用 color 属性替代 */
  colors?: ColorAttr;
}

export default createPlot<CalendarOptions>(Heatmap, 'CalendarChart', (props) => {
  const options = polyfillOptions(props);
  replaceApi(REPLACEAPILIST, options);
  if (isNil(get(props, 'shape'))) {
    set(options, 'shape', 'boundary-polygon');
  }

  // 1.0 的默认值
  if (isNil(get(options, 'xField')) && isNil(get(options, 'yField'))) {
    set(options, 'xField', 'week');
    set(options, 'meta.week', {
      type: 'cat',
      ...get(options, 'meta.week', {})
    });
    set(options, 'yField', 'day');
    set(options, 'meta.day', {
      type: 'cat',
      values: ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'],
    });
    set(options, 'reflect', 'y');
    set(options, 'xAxis', {
      tickLine: null,
      line: null,
      title: null,
      label: {
        offset: 20,
        style: {
          fontSize: 12,
          fill: '#bbb',
          textBaseline: 'top',
        },
        formatter: (val) => {
          if (val == '2') {
            return 'MAY';
          } else if (val === '6') {
            return 'JUN';
          } else if (val == '10') {
            return 'JUL';
          } else if (val === '14') {
            return 'AUG';
          } else if (val == '18') {
            return 'SEP';
          } else if (val === '24') {
            return 'OCT';
          }
          return '';
        },
      },
      ...get(options, 'xAxis', {})
    })
  }

  return options;
});
