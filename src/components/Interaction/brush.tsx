// 提供给按需使用的同学使用，不需要引入主文件。
import DataRangeFilter from '@antv/g2/lib/interaction/action/data/range-filter';
import { IInteractionContext } from '@antv/g2/lib/interface';
import { registerAction, registerInteraction } from '../../core';

registerAction('brush', DataRangeFilter);
registerAction('brush-x', DataRangeFilter, { dims: ['x'] });
registerAction('brush-y', DataRangeFilter, { dims: ['y'] });

function isPointInView(context: IInteractionContext) {
  return context.isInPlot();
}

registerInteraction('brush', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'mousedown',
      isEnable: isPointInView,
      action: ['brush:start', 'rect-mask:start', 'rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'mousemove',
      isEnable: isPointInView,
      action: ['rect-mask:resize'],
    },
  ],
  end: [
    {
      trigger: 'mouseup',
      isEnable: isPointInView,
      action: ['brush:filter', 'brush:end', 'rect-mask:end', 'rect-mask:hide', 'reset-button:show'],
    },
  ],
  rollback: [{ trigger: 'reset-button:click', action: ['brush:reset', 'reset-button:hide', 'cursor:crosshair'] }],
});

registerInteraction('brush-visible', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'plot:mousedown',
      action: ['rect-mask:start', 'rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'plot:mousemove',
      action: ['rect-mask:resize'],
    },
    { trigger: 'mask:change', action: ['element-range-highlight:highlight'] },
  ],
  end: [
    {
      trigger: 'plot:mouseup',
      action: ['rect-mask:end', 'rect-mask:hide', 'element-filter:filter', 'element-range-highlight:clear'],
    },
  ],
  rollback: [
    {
      trigger: 'dblclick',
      action: ['element-filter:clear'],
    },
  ],
});

registerInteraction('brush-x', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'mousedown',
      isEnable: isPointInView,
      action: ['brush-x:start', 'x-rect-mask:start', 'x-rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'mousemove',
      isEnable: isPointInView,
      action: ['x-rect-mask:resize'],
    },
  ],
  end: [
    {
      trigger: 'mouseup',
      isEnable: isPointInView,
      action: ['brush-x:filter', 'brush-x:end', 'x-rect-mask:end', 'x-rect-mask:hide'],
    },
  ],
  rollback: [{ trigger: 'dblclick', action: ['brush-x:reset'] }],
});
