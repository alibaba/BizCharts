import 'react';
import { Heatmap, HeatmapOptions } from '@antv/g2plot/lib/plots/heatmap';
import createPlot, { BasePlotOptions } from '../createPlot';
import warn from 'warning';
import { registerShape } from '../core';
import { polyfillOptions } from './core/polyfill';
import { get, set } from '@antv/util';

registerShape('polygon', 'boundary-polygon', {
  draw(cfg: any, container) {
    const group = container.addGroup();
    const attrs = {
      stroke: '#fff',
      lineWidth: 1,
      fill: cfg.color,
      paht: [],
    };
    const points = cfg.points as any;
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

    if (cfg.data.lastWeek) {
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
      if (cfg.data.lastDay) {
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

export interface CalendarOptions extends HeatmapOptions, BasePlotOptions {}

export default createPlot<CalendarOptions>(Heatmap, 'CalendarChart', (props) => {
  warn(true, '日历图即将被废弃，请使用<Heatmap />替代，具体用法请查看文档：');
  const options = polyfillOptions(props);
  if (get(props, 'shape')) {
    set(options, 'shape', 'boundary-polygon');
  }
  return options;
});
