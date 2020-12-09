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