import 'react';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import { Scatter, ScatterOptions as options } from '@antv/g2plot/lib/plots/scatter';
import { RegressionLineOptions } from '@antv/g2plot/lib/plots/scatter/types';
import { StyleAttr } from '@antv/g2plot/lib/types/attr';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, replaceAxis, polyfillVisible } from './core/polyfill';
import { AxisAPIOptions, LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';
import { isNil, isObject } from '@antv/util';

interface TrendLineAPIOptions extends RegressionLineOptions {
    showConfidence?: boolean,
    confidenceStyle?: StyleAttr,
}
interface ScatterOptions extends options, BasePlotOptions {
    legend?: LengendAPIOptions;

    tooltip?: TooltipAPIOptions;

    label?: LabelAPIOptions;

    /* 请使用regressionLine替代 */
    trendLine?: options['regressionLine'];
    xAxis?: AxisAPIOptions,
    yAxis?: AxisAPIOptions,
    pointSize?: options['size'],
    size?: options['size'],
    trendline?: TrendLineAPIOptions,
}

const polyfill = (opt: ScatterOptions): ScatterOptions => {
    const options = polyfillOptions(opt);
    if (get(options, 'pointSize')) {
        set(options, 'size', get(options, 'pointSize'));
    }

    replaceAxis(options, 'xAxis', 'xAxis');
    replaceAxis(options, 'yAxis', 'yAxis');

    polyfillVisible(options, 'quadrant')

    const quadrantLabel = get(options, 'quadrant.label');
    const qLabels = get(options, 'quadrant.labels')
    if (!qLabels && quadrantLabel) {
        const { text, style } = quadrantLabel;
        if (text && text.length && style) {
            const labels = text.map(txt => ({ style, content: txt }));
            set(options, 'quadrant.labels', labels);
        }
    }

    const regressionLine = get(options, 'regressionLine');
    if (!regressionLine) {
        const trendline = get(options, 'trendline');
        if (isObject(trendline) && get(trendline, 'visible') === false) {
            set(options, 'regressionLine', null);
        } else {
            set(options, 'regressionLine', trendline);
        }
    }

    return options;
}

export default createPlot<ScatterOptions>(Scatter, 'ScatterChart', polyfill);
