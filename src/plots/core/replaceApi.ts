import warn from 'warning';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';

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
        set(options, 'legend.itemName', { ...itemName, formatter });
    }

    const textConfig = get(options, 'legend.text');
    if (textConfig) {
        set(options, 'legend.itemName', textConfig);
    }
}