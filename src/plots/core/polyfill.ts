import warn from 'warning';
import { get, set, maxBy, minBy } from '@antv/util';
import sum from '../../utils/data-transform/sum';
import { pickEventName } from '../../components/Chart/events';

interface ReplaceApi {
  sourceKey: string,
  targetKey: string,
  notice: string,
}

// 批量替换api
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

// visible的使用转化
export const polyfillVisible = (polyfillOpt, path) => {
  const vis = get(polyfillOpt, `${path}.visible`);
  if (vis === false) {
    set(polyfillOpt, path, false);
  }
  return vis;
}

export const polyfillOptions = (opt) => {
  const polyfillOpt = { ...opt };

  // tooltip
  polyfillVisible(polyfillOpt, 'tooltip');


  if (get(polyfillOpt, 'forceFit')) {
    set(polyfillOpt, 'autoFit', get(polyfillOpt, 'forceFit'));
  }

  // legend
  const legendVis = polyfillVisible(polyfillOpt, 'legend');

  if (legendVis) {
    if (get(polyfillOpt, 'legend.title.visible') === false) {
      set(polyfillOpt, 'legend.title', false);
    }
  }
  const formatter = get(polyfillOpt, 'legend.formatter');
  if (formatter) {
      const itemName = get(polyfillOpt, 'legend.itemName', {});
      set(polyfillOpt, 'legend.itemName', { ...itemName, formatter });
  }
  const textConfig = get(polyfillOpt, 'legend.text');
  if (textConfig) {
      set(polyfillOpt, 'legend.itemName', textConfig);
  }

  // label
  polyfillVisible(polyfillOpt, 'label');

  // 辅助线
  const guideLine = get(polyfillOpt, 'guideLine', []);
  const data = get(polyfillOpt, 'data', []);
  const yField = get(polyfillOpt, 'yField', 'y');
  guideLine.forEach(element => {
    if (data.length > 0) {
      let y: number | string = 'median';
      switch (element.type) {
        case 'max':
          y = maxBy(data, d => d[yField])[yField];
          break;
        case 'mean':
          y = sum(data.map(d => d[yField])) / data.length;
          break;
        default:
          // min
          y = minBy(data, d => d[yField])[yField];
          break;
      }
      const line = {
        start: ['min', y],
        end: ['max', y],
        style: element.lineStyle,
        text: { content: y },
        ...element,
        type: 'line',
      }
      if (!get(polyfillOpt, 'annotations')) {
        set(polyfillOpt, 'annotations', []);
      }
      polyfillOpt.annotations.push(line);
      set(polyfillOpt, 'point', false);
    }
  });

  return polyfillOpt;
}


export const polyfillEvents = (chart, preOptions, newOptions) => {
  // 事件兼容
  const eventNames = pickEventName(get(preOptions, 'events', []));
  const newEventNames = pickEventName(get(newOptions, 'events', []));
  // 取消事件绑定
  eventNames.forEach(ev => {
    chart.off(ev[1], preOptions.events[ev[0]]);
  });
  // 重新事件绑定
  newEventNames.forEach(ev => {
    chart.on(ev[1], newOptions.events[ev[0]]);
  });
}

export const polyfillTitleEvent = (options) => {
  const events = get(options, 'events', {});
  const titleEvents = {};
  [
    'onTitleClick',
    'onTitleDblClick',
    'onTitleMouseleave',
    'onTitleMousemove',
    'onTitleMousedown',
    'onTitleMouseup',
    'onTitleMouseenter'
  ].forEach(e => {
    if (events[e]) {
      titleEvents[e.replace('Title', '')] = events[e];
    }
  })
  return titleEvents;
}

export const polyfillDescriptionEvent = (options) => {
  const events = get(options, 'events', {});
  const titleEvents = {};
  [
    'onDescriptionClick',
    'onDescriptionDblClick',
    'onDescriptionMouseleave',
    'onDescriptionMousemove',
    'onDescriptionMousedown',
    'onDescriptionMouseup',
    'onDescriptionMouseenter'
  ].forEach(e => {
    if (events[e]) {
      titleEvents[e.replace('Title', '')] = events[e];
    }
  })
  return titleEvents;
}
