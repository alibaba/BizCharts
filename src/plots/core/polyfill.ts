import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import sum from '../../utils/data-transform/sum';
import max from '@antv/util/lib/max-by';
import min from '@antv/util/lib/min-by';

export const polyfillOptions = (opt) => {
  const polyfillOpt = { ...opt };

  if (get(polyfillOpt, 'tooltip.visible') === false ) {
    set(polyfillOpt,'point', false);
  }

  const guideLine = get(polyfillOpt, 'guideLine');
  const data = get(polyfillOpt, 'data', []);
  const yField = get(polyfillOpt, 'yField', 'y');
  if (guideLine && data.length > 0) {
    let y: number | string = 'median';
    switch (guideLine.type) {
      case 'max':
        y = max(data, d => d[yField]);
        break;
      case 'mean':
        y = sum(data.map(d => d[yField])) / data.length;
        break;
      default:
        // min
        y = min(data, d => d[yField]);
        break;
    }
    const line = {
      type: 'line',
      start: ['min', y],
      end: ['max', y],
      text: { content: '辅助文本' },
      style: guideLine.lineStyle,
      ...guideLine,
    }
    if (get(polyfillOpt, 'annotations')) {
      set(polyfillOpt, 'annotations', []);
    }
    polyfillOpt.annotations.push(line);
    set(polyfillOpt, 'point', false);
  }
  return polyfillOpt;
}
