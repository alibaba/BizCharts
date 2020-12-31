import warn from 'warning';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import isNil from '@antv/util/lib/is-nil';

interface ReplaceApi {
    sourceKey: string,
    targetKey: string,
    notice: string,
}

export const replaceApi = (replaceApiList: Array<ReplaceApi>, options: object) => {
    replaceApiList.forEach((item) => {
        const { sourceKey, targetKey, notice } = item;
        const value = get(options, sourceKey);
        if (value) {
            warn(true, notice);
            set(options, targetKey, value);
        }
    })
}

export const replaceLegend = (options) => {
    const legend = get(options, 'legend');
    if (legend === null || legend == false) {
        set(options, 'legend', false);
        return;
    }

    if (get(options, 'legend.visible') === false) {
        set(options, 'legend', false);
        return;
    }

    if (get(options, 'legend.title.visible') === false) {
        set(options, 'legend.title', false);
    }

    const formatter = get(options, 'legend.formatter');
    if (formatter) {
        const itemName = get(options, 'legend.itemName', {});
        set(options, 'legend.itemName', { formatter, ...itemName });
    }

    const textConfig = get(options, 'legend.text');
    if (textConfig) {
        set(options, 'legend.itemName', textConfig);
    }
}

/**
 * 将的sourceKey的配置作为targetKey的配置； 
 * 例如：将angleAxis的作为xAxis的配置
 * @param options object 图表配置项
 * @param sourceKey string
 * @param targetKey  string
 */
export const replaceAxis = (options, sourceKey = 'angleAxis', targetKey = 'xAxis') => {
    if (get(options, `${sourceKey}.visible`) === false) {
        set(options, targetKey, false);
        return;
    }

    let config = { ...get(options, sourceKey, {}) };
    if (get(options, `${sourceKey}.line.visible`) === false) {
        config.line = null
    }

    if (get(options, `${sourceKey}.grid.visible`) === false) {
        config.grid = null
    }

    if (get(options, `${sourceKey}.label.visible`) === false) {
        config.label = false
    } else {
        const label = get(options, `${sourceKey}.label`, {});
        if (label) {
            const suffix = label.suffix;
            if (!isNil(suffix) || suffix) { // 不是undefined null 或 suffix存在
                config.label = { ...label, formatter: val => `${val}${suffix}` }
            }
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