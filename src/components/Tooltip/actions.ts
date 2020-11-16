
import ActiveRegion from '@antv/g2/lib/interaction/action/active-region';
import SiblingTooltip from '@antv/g2/lib/interaction/action/component/tooltip/sibling';
import TooltipAction from '@antv/g2/lib/interaction/action/component/tooltip/geometry';
import EllipsisTextAction from '@antv/g2/lib/interaction/action/component/tooltip/ellipsis-text';

import { registerInteraction, registerAction } from '../../core';


registerAction('tooltip', TooltipAction);
registerAction('sibling-tooltip', SiblingTooltip);
registerAction('active-region', ActiveRegion);
registerAction('ellipsis-text', EllipsisTextAction);

// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [
    { trigger: 'plot:mousemove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } },
    { trigger: 'plot:touchmove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } },
  ],
  end: [
    { trigger: 'plot:mouseleave', action: 'tooltip:hide' },
    { trigger: 'plot:leave', action: 'tooltip:hide' },
    { trigger: 'plot:touchend', action: 'tooltip:hide' },
  ],
});

registerInteraction('ellipsis-text', {
  start: [
    {
      trigger: 'legend-item-name:mousemove',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'legend-item-name:touchstart',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'axis-label:mousemove',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'axis-label:touchstart',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
  ],
  end: [
    { trigger: 'legend-item-name:mouseleave', action: 'ellipsis-text:hide' },
    { trigger: 'legend-item-name:touchend', action: 'ellipsis-text:hide' },
    { trigger: 'axis-label:mouseleave', action: 'ellipsis-text:hide' },
    { trigger: 'axis-label:touchend', action: 'ellipsis-text:hide' },
  ],
});


// click 触发
registerInteraction('tooltip-click', {
  start: [
    { trigger: 'plot:click', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } },
    { trigger: 'plot:touchstart', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } },
  ],
  end: [
    { trigger: 'plot:leave', action: 'tooltip:hide' },
    // 移动端没有leave事件
  ],
});

// tooltip 跟随和不跟随之间切换
const toggleLock = context => {
  const locked = context.view.isTooltipLocked();
  if (locked) {
    context.view.unlockTooltip();
  } else {
    context.view.lockTooltip();
  }
};
registerInteraction('tooltip-lock', {
  start: [
    { trigger: 'plot:click', action: toggleLock },
    { trigger: 'plot:touchstart', action: toggleLock },
    { trigger: 'plot:touchmove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } },
    { trigger: 'plot:mousemove', action: 'tooltip:show' },
  ],
  end: [
    { trigger: 'plot:click', action: 'tooltip:hide' },
    { trigger: 'plot:leave', action: 'tooltip:hide' },
    { trigger: 'plot:touchend', action: 'tooltip:hide' },
  ],
});


// 注册 sibling-tooltip 的 interaction
registerInteraction('sibling-tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'sibling-tooltip:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'sibling-tooltip:hide' }],
});
