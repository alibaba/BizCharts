import 'react';
import { WordCloud, WordCloudOptions } from '@antv/g2plot/lib/plots/word-cloud';
import createPlot, { BasePlotOptions } from '../createPlot';
import { TooltipAPIOptions } from './core/interface';
import { getTheme } from '@antv/g2';
import { ShapeStyle } from '@antv/g2plot/lib/types/attr';
import { WordStyle } from '@antv/g2plot/lib/plots/word-cloud/types';

interface WordStylePolyfill extends WordStyle {
  active?: ShapeStyle;
  // color?:string|Function;
  // gridSize?:number;
}

export interface WordCloudCfg extends Partial<WordCloudOptions>, BasePlotOptions {
  tooltip?: TooltipAPIOptions;
  wordStyle?: WordStylePolyfill;
  maskImage?: string;
  shuffle?: boolean;
  selected?: number;
  events?: {
    onWordCloudHover?: (item, dim, e) => void;
    onWordCloudClick?: (item, dim, e) => void;
  };
}

export default createPlot<WordCloudCfg>(WordCloud, 'WordCloudChart', cfg => {
  const {
    maskImage,
    wordField = 'word',
    weightField = 'weight',
    colorField = 'word',
    // shape,
    // backgroundColor='#fff',
    selected,
    shuffle,
    interactions = [{ type: 'element-active' }],
    onGetG2Instance,
    tooltip,
    wordStyle,
    onWordCloudHover,
    onWordCloudClick,
    ...others
  } = cfg;
  const { active, ...otherStyles } = wordStyle;
  return {
    colorField,
    wordField,
    weightField,
    imageMask: maskImage,
    random: shuffle,
    interactions,
    wordStyle: otherStyles,
    tooltip: tooltip && !tooltip.visible ? false : tooltip,
    onGetG2Instance: c => {
      onGetG2Instance && onGetG2Instance(c);
      if (selected >= 0) {
        const { chart } = c;
        const theme = getTheme();
        if (active) {
          // debugger;
          Object.assign(theme.geometries.point['hollow-circle'].active.style, active);
        }
        chart.on('afterrender', () => {
          if (chart.geometries.length) {
            chart.geometries[0].elements.forEach((e, idx) => {
              if (idx === selected) e.setState('active', true);
            });
          }
        });
        chart.on('plot:mousemove', e => {
          if (!e.data) {
            onWordCloudHover && onWordCloudHover(undefined, undefined, e.event);
            return;
          }
          const { datum, x, y, width, height } = e.data.data;
          onWordCloudHover && onWordCloudHover(datum, { x, y, w: width, h: height }, e.event);
        });
        chart.on('plot:click', e => {
          if (!e.data) {
            onWordCloudClick && onWordCloudClick(undefined, undefined, e.event);
            return;
          }
          const { datum, x, y, width, height } = e.data.data;
          onWordCloudClick && onWordCloudClick(datum, { x, y, w: width, h: height }, e.event);
        });
      }
    },
    ...others,
  };
});
