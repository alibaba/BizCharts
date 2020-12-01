import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import sum from '../../utils/data-transform/sum';
import max from '@antv/util/lib/max-by';
import min from '@antv/util/lib/min-by';
import { pickEventName } from '../../components/Chart/events';

export const polyfillOptions = (opt) => {
  const polyfillOpt = { ...opt };

  if (get(polyfillOpt, 'tooltip.visible') === false) {
    set(polyfillOpt, 'point', false);
  }
  if (get(polyfillOpt, 'forceFit')) {
    set(polyfillOpt, 'autoFit', get(polyfillOpt, 'forceFit'));
  }

  // 辅助线
  const guideLine = get(polyfillOpt, 'guideLine', []);
  const data = get(polyfillOpt, 'data', []);
  const yField = get(polyfillOpt, 'yField', 'y');
  guideLine.forEach(element => {
    if (data.length > 0) {
      let y: number | string = 'median';
      switch (element.type) {
        case 'max':
          y = max(data, d => d[yField])[yField];
          break;
        case 'mean':
          y = sum(data.map(d => d[yField])) / data.length;
          break;
        default:
          // min
          y = min(data, d => d[yField])[yField];
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
    console.log(11111, newOptions.events[ev[0]])
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
