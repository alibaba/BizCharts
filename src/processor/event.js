
/**
 * prop function
 */
import PropTypes from 'prop-types';
import Util from '../shared/util';

const chartItemEvents = [
  { prop: 'onPlotMove', event: 'plotmove' },
  { prop: 'onPlotEnter', event: 'plotenter' },
  { prop: 'onPlotLeave', event: 'plotleave' },
  { prop: 'onPlotClick', event: 'plotclick' },
  { prop: 'onPlotDblClick', event: 'plotdblclick' },
  { prop: 'onItemSelected', event: 'itemselected' },
  { prop: 'onItemUnselected', event: 'itemunselected' },
  { prop: 'onItemSelectedChange', event: 'itemselectedchange' },
  { prop: 'onTooltipChange', event: 'tooltip:change' },
  { prop: 'onTooltipShow', event: 'tooltip:show' },
  { prop: 'onTooltipHide', event: 'tooltip:hide' },
];

const baseEventNames = [
  'mouseenter',
  'mousemove',
  'mouseleave',
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'touchstart',
  'touchmove',
  'touchend',
];

const baseEventsPostfix = [
  'Mouseenter',
  'Mousemove',
  'Mouseleave',
  'Click',
  'Dblclick',
  'Mousedown',
  'Mouseup',
  'Touchstart',
  'Touchmove',
  'Touchend',
];

const shapes = ['point', 'area', 'line', 'path', 'interval', 'schema', 'polygon', 'edge',
  'axis-title', 'axis-label', 'axis-ticks', 'axis-line', 'axis-grid', 'legend-title',
  'legend-item', 'legend-marker', 'legend-text', 'guide-text', 'guide-region',
  'guide-line', 'guide-image', 'label',
];

const shapesEvtNamePrefix = ['onPoint', 'onArea', 'onLine', 'onPath', 'onInterval', 'onSchema',
  'onPolygon', 'onEdge', 'onAxisTitle', 'onAxisLabel', 'onAxisTicks', 'onAxisLine', 'onAxisGrid',
  'onLegendTitle', 'onLegendItem', 'onLegendMarker', 'onLegendText', 'onGuideText', 'onGuideRegion',
  'onGuideLine', 'onGuideImage', 'onLabel',
];

const shapeEvents = [];
for (let i = 0; i < shapes.length; i += 1) {
  for (let j = 0; j < baseEventNames.length; j += 1) {
    shapeEvents.push({
      prop: `${shapesEvtNamePrefix[i]}${baseEventsPostfix[j]}`,
      event: `${shapes[i]}:${baseEventNames[j]}`,
    });
  }
}

const chartEvents = chartItemEvents.concat(shapeEvents);

function genBaseEvents() {
  return [
    { prop: 'onMouseEnter', event: 'mouseenter' },
    { prop: 'onMouseMove', event: 'mousemove' },
    { prop: 'onMouseLeave', event: 'mouseleave' },
    { prop: 'onClick', event: 'click' },
    { prop: 'onDblClick', event: 'dblclick' },
    { prop: 'onMouseDown', event: 'mousedown' },
    { prop: 'onMouseUp', event: 'mouseup' },
    { prop: 'onTouchStart', event: 'touchstart' },
    { prop: 'onTouchMove', event: 'touchmove' },
    { prop: 'onTouchEnd', event: 'touchend' },
  ];
}

function genItemBaseEvents(type) {
  const geomEvents = genBaseEvents();
  Util.map(geomEvents, (key) => {
    const event = key.event;
    key.event = `${type}:${event}`;
    return key;
  });
  return geomEvents;
}

const baseEvents = genBaseEvents();

const baseEventObjectTypes = {
  onMouseEnter: PropTypes.object,
  onMouseMove: PropTypes.object,
  onMouseLeave: PropTypes.object,
  onClick: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  onDblClick: PropTypes.object,
  onMouseDown: PropTypes.object,
  onMouseUp: PropTypes.object,
  onTouchStart: PropTypes.object,
  onTouchMove: PropTypes.object,
  onTouchEnd: PropTypes.object,
};

const baseEventFuncTypes = {
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  onDblClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
};

function bindEvents(chart, EVENTS = {}, props) {
  Util.each(EVENTS, (key) => {
    const { prop, event } = key;
    const fns = props[prop];

    if (Util.isFunction(fns)) {
      chart.on(event, fns);
    } else if (Util.isObject(fns)) {
      for (const name in fns) {
        if (fns[name] !== undefined) {
          chart.on(`${name}:${event}`, fns[name]);
        }
      }
    }
  });
}

function bindBaseEvents(chart, props) {
  bindEvents(chart, baseEvents, props);
}

function updateEvents(chart, EVENTS = {}, props, nextProps) {
  Util.each(EVENTS, (key) => {
    const { prop, event } = key;
    const fns = props[prop];
    const nextFns = nextProps[prop];
    let name;

    if (!Util.shallowEqual(fns, nextFns)) {
      if (Util.isFunction(fns) && Util.isFunction(nextFns)) {
        chart.off(event, fns);
        chart.on(event, nextFns);
      } else if (Util.isObject(fns) && Util.isObject(nextFns)) {
        for (name in fns) {
          if (Object.prototype.hasOwnProperty.call(fns, name)) {
            chart.off(`${name}:${event}`, fns[name]);
          }
        }
        for (name in nextFns) {
          if (Object.prototype.hasOwnProperty.call(nextFns, name)) {
            chart.on(`${name}:${event}`, nextFns[name]);
          }
        }
      }
    }
  });
}

function updateBaseEvents(chart, props, nextProps) {
  updateEvents(chart, baseEvents, props, nextProps);
}

function unbindEvents(chart, EVENTS = {}, props) {
  Util.each(EVENTS, (key) => {
    const { prop, event } = key;
    const fns = props[prop];

    if (Util.isFunction(fns)) {
      chart.off(event, fns);
    } else if (Util.isObject(fns)) {
      for (const name in fns) {
        if (Object.prototype.hasOwnProperty.call(fns, name)) {
          chart.off(`${name}:${event}`, fns[name]);
        }
      }
    }
  });
}

function unbindBaseEvents(chart, props) {
  unbindEvents(chart, baseEvents, props);
}

export default {
  baseEventObjectTypes,
  baseEventFuncTypes,
  genBaseEvents,
  genItemBaseEvents,
  bindEvents,
  bindBaseEvents,
  updateEvents,
  updateBaseEvents,
  unbindEvents,
  unbindBaseEvents,
  chartEvents,
};
