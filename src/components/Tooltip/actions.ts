
import ActiveRegion from '@antv/g2/lib/interaction/action/active-region';
import SiblingTooltip from '@antv/g2/lib/interaction/action/component/sibling-tooltp';
import TooltipAction from '@antv/g2/lib/interaction/action/component/tooltip';

import { registerInteraction, registerAction } from '../../core';

registerAction('tooltip', TooltipAction);
registerAction('sibling-tooltip', SiblingTooltip);
registerAction('active-region', ActiveRegion);

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
