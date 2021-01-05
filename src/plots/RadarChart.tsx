import 'react';
import isNil from '@antv/util/lib/is-nil';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import { Radar, RadarOptions as options } from '@antv/g2plot/lib/plots/radar';
import { MappingOptions } from '@antv/g2plot/lib/adaptor/geometries/base';

import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, replaceApi } from './core/polyfill';

import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

const REPLACEAPILIST = [{
    sourceKey: 'angleField',
    targetKey: 'xField',
    notice: '请使用xField替代',
}, {
    sourceKey: 'radiusField',
    targetKey: 'yField',
    notice: '请使用yFeild替代',
}];

interface LineAPIOptions {
    visible?: boolean,
    size?: number,
    style?: options['lineStyle'], // ShapeAttrs,
}

interface PointAPIOptions extends MappingOptions {
    visible?: boolean,
}
interface AreaAPIOptions extends MappingOptions {
    visible?: boolean,
}

interface RadarOptions extends options, BasePlotOptions {
    /** 请使用xField替代 */
    angleField?: string;
    /** 请使用yFeild替代 */
    radiusField?: string;

    line?: LineAPIOptions,

    point?: PointAPIOptions,

    area?: AreaAPIOptions,

    legend?: LengendAPIOptions,

    tooltip?: TooltipAPIOptions,

    label?: LabelAPIOptions,

    /** 请使用xAxis替代 */
    angleAxis?: any,
    /** 请使用YAxis替代 */
    radiusAxis?: any,

}

const getVisibleStyle: (visible: boolean) => object = (visible) => {
    if (isNil(visible) || visible) { // // null,undefined : 要展示    visible为true: 要展示
        return { fillOpacity: 1, strokeOpacity: 1 }
    }
    // 不显示
    return { fillOpacity: 0, strokeOpacity: 0 };
}

// 将bizcharts.plots的radaChart的Line的API 替换成G2.plots的API替换成LineStyle
const replaceLineWithLinestyle = (options: RadarOptions) => {
    const { visible, size, style } = get(options, 'line', {})
    let newStyle = Object.assign({}, style || {},
        {
            opacity: 1,
            lineWidth: typeof size === 'number' ? size : 2,
            ...getVisibleStyle(visible),
        },
    );
    set(options, 'lineStyle', newStyle);
}


const replaceAxis = (options: RadarOptions, sourceKey = 'angleAxis', targetKey = 'xAxis') => {
    if (get(options, `${sourceKey}.visible`) === false) {
        set(options, targetKey, false);
        return;
    }

    let config = { ...get(options, sourceKey, {}) };
    if (get(options, `${sourceKey}.line.visible`) === false) {
        config.line = false
    }

    if (get(options, `${sourceKey}.grid.visible`) === false) {
        config.grid = false
    }

    if (get(options, `${sourceKey}.label.visible`) === false) {
        config.label = false
    } else {
        const label = get(options, `${sourceKey}.label`, {});
        const suffix = label.suffix;
        if (!isNil(suffix) || suffix) { // 不是undefined null / suffix存在
            config.label = { ...label, formatter: val => `${val}${suffix}` }
        }
    }

    if (get(options, `${sourceKey}.tickLine.visible`) === false) {
        config.tickLine = false
    }

    if (get(options, `${sourceKey}.title.visible`) === false) {
        config.title = false
    }

    set(options, targetKey, config);

}

const polyfill = (opt: RadarOptions): RadarOptions => {
    const options = polyfillOptions(opt);
    replaceApi(REPLACEAPILIST, options); // angleField,statusField  api替换

    if (get(options, 'area.visible') === false) {
        set(options, 'area', false);
    }

    if (get(options, 'point.visible') === false) {
        set(options, 'point', false);
    }

    replaceLineWithLinestyle(options);

    replaceAxis(options, 'angleAxis', 'xAxis');
    replaceAxis(options, 'radiusAxis', 'yAxis');

    if (get(options, 'tooltip.visible') === false) {
        set(options, 'tooltip', false);
    }

    if (get(options, 'label.visible') === false) {
        set(options, 'label', false);
    }

    console.log(options, 'radaChart')

    return options;
}

export { RadarOptions };

export default createPlot<RadarOptions>(Radar, 'RadarChart', polyfill);
