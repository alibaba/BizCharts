import warn from 'warning';
import { get, set, maxBy, minBy, isNil, isObject } from '@antv/util';
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
      warn(false, notice);
      set(options, targetKey, value);
    }
  })
}

/**
 * 将的sourceKey的配置作为targetKey的配置； 
 * 例如：将angleAxis的作为xAxis的配置
 */
export const polyfillAxis = (cfg, name) => {
  const options = get(cfg, name);
  if (options === false || options === null) {
    cfg[name] = null;
    return;
  }
  if (options === undefined) {
    return;
  }
  if (options === true) {
    cfg[name] = {};
    return;
  }
  if (!isObject(options)) {
    warn(true, `${name} 配置参数不正确`);
    return;
  }

  polyfillVisible(options, 'line');
  polyfillVisible(options, 'grid');
  polyfillVisible(options, 'label');
  polyfillVisible(options, 'tickLine');
  polyfillVisible(options, 'title');

  let label: any = get(options, 'label');

  if (label) {
    if (isObject(label)) {
      const { suffix } = label as any;
      if (suffix) { // 不是undefined null 或 suffix存在
        set(label, 'formatter', val => `${val}${suffix}`);
      }

      // @ts-ignore
      const { offsetX, offsetY, offset } = label;
      if (isNil(offset) && (!isNil(offsetX) || !isNil(offsetY))) {
        if (name === 'xAxis') {
          set(label, 'offset', !isNil(offsetX) ? offsetX : offsetY);
        }
        if (name === 'yAxis') {
          set(label, 'offset', !isNil(offsetY) ? offsetY : offsetX);
        }
        
      }
    }
  }

  cfg[name] = {
    ...options,
    label,
  };
}

// visible的使用转化
export const polyfillVisible = (polyfillOpt, path) => {
  const vis = get(polyfillOpt, `${path}.visible`);
  if (vis === false || vis === null) {
    set(polyfillOpt, path, false);
  }
  return vis;
}

export const polyfillOptions = (opt) => {
  const polyfillOpt = { ...opt };

  // tooltip
  polyfillVisible(polyfillOpt, 'tooltip');

  // legend
  const legendVis = polyfillVisible(polyfillOpt, 'legend');

  if (legendVis) {
    polyfillVisible(polyfillOpt, 'legend.title');
    const position = get(polyfillOpt, 'legend.position')
    if (position) {
      set(polyfillOpt, 'legend.position', ({
        'top-center': 'top',
        'right-center': 'right',
        'left-center': 'left',
        'bottom-center': 'bottom',
      })[position] || position)
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

  // axis
  polyfillAxis(polyfillOpt, 'xAxis');
  polyfillAxis(polyfillOpt, 'yAxis');

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

  // slider
  const interactions = get(polyfillOpt, 'interactions', []);
  const slider = interactions.find(it => it.type === 'slider');
  if (slider && isNil(polyfillOpt.slider)) {
    polyfillOpt.slider = slider.cfg;
  }
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
      titleEvents[e.replace('Description', '')] = events[e];
    }
  })
  return titleEvents;
}
