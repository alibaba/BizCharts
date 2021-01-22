// /[^on]+\S+(?=(Click)\b)/
import forIn from '@antv/util/lib/for-in';

export const BASE_EVENT_NAMES = [
  'mousedown',
  'mouseup',
  'dblclick',
  'mouseenter',
  'mouseout',
  'mouseover',
  'mousemove',
  'mouseleave',
  'contextmenu',
  'click',
]

const EVENT_ACTION_NAMES = [
  'mousedown',
  'mouseup',
  'dblclick',
  'mouseenter',
  'mouseout',
  'mouseover',
  'mousemove',
  'mouseleave',
  'contextmenu',
  'click',
  'show',
  'hide',
  'change',
]

const RegExpEvent = new RegExp(`^on(.*)(?=(${EVENT_ACTION_NAMES.map(k => k.replace(/^\S/, s => s.toUpperCase())).join('|')}))`);

export const pickEventName = (props) => {
  const names: [ string, string][] = [];
  forIn(props, (v, k: string) => {
    const event = k.match(/^on(.*)/)
    if (event) {
      const res = k.match(RegExpEvent);
      if (res) {
        const target = res[1].replace(/([A-Z])/g,"-$1").toLowerCase();
        if (target) {
          names.push([k, `${target.replace('-', '')}:${res[2].toLowerCase()}`]);
        } else {
          names.push([k, res[2].toLowerCase()]);
        }
      } else {
        names.push([k, event[1].toLowerCase()]);
      }
    }
  });
  return names;
}

export const DRAG_EVENT_NAMES = [
  'dragstart',
  'drag',
  'dragend',
  'dragover',
  'dragenter',
  'dragleave',
  'drop'
]

export const MOBILE_EVENT_NAMES = [
  'touchstart',
  'touchmove',
  'touchend',
];

export const LIFE_CIRCLE_NAMES = [
  'beforerender', // 事件发生在渲染前
  'afterrender',// 事件发生在渲染后
  'beforepaint', // 组件、图形元素绘制前
  'afterpaint', // 组件、图形元素绘制后
  'beforechangedata', // 更新数据前
  'afterchangedata', // 更新数据后
  'beforeclear', // 调用 clear 方法清除 View 或者 Chart 前触发
  'afterclear', // 调用 clear 方法清除 View 或者 Chart 前触发
  'beforedestroy', // 销毁 View 或者 Chart 前触发
];

export const LEGEND_EVENT_TARGETS = [
  'legend', // 图例的事件前缀，无论点击了图例的任意图形上
  'legend-title', // 图例标题的事件前缀
  'legend-item', // 图例选项的事件前缀
  'legend-item-name', // 图例选项 name 文本 的事件前缀
  'legend-item-Maker', // 图例选项 marke 图标 的事件前缀
  'legend-item-value', // 图例选项 value 的事件前缀
];


export const GEOM_NAME = [
  'line',
  'area',
  'point',
  'interval',
  'polygon',
  'edge',
  'schema'
];

export const LEGEND_EVENT = [ 'legend:valuechanged' ];

export const AXIS_EVENT_TARGET = [
  'axis-label', // 坐标轴文本的事件前缀
  'axis-line', // 坐标轴轴线的事件前缀
  'axis-tick', // 坐标轴刻度线的事件前缀
  'axis-title', // 坐标轴标题事件前缀
];

export const ANNOTATION_EVENT_TARGET = [
  'annotation', // 所有辅助图形共同的事件前缀
  'annotation-line', // 辅助线的事件前缀
  'annotation-line-text', // 辅助线上的文本的前缀
  'annotation-image', // 辅助图形的事件前缀
  'annotation-region', // 辅助区域的事件前缀
  'annotation-text', // 辅助文本的事件前缀
];

export const TOOLTIP_EVENT = [
  'tooltip:show',
  'tooltip:hide',
  'tooltip:change',
];
