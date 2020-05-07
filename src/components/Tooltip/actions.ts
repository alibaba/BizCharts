
import ActiveRegion from '@antv/g2/lib/interaction/action/active-region';
import SiblingTooltip from '@antv/g2/lib/interaction/action/component/sibling-tooltp';
import TooltipAction from '@antv/g2/lib/interaction/action/component/tooltip';

import { registerInteraction, registerAction } from '../../core';

registerAction('tooltip', TooltipAction);
registerAction('sibling-tooltip', SiblingTooltip);
registerAction('active-region', ActiveRegion);

// 注册 tooltip 的 interaction
registerInteraction('tooltip-hover', {
  // @ts-ignore
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});

// 点击触发 tooltip事件
registerInteraction('tooltip-click', {
  start: [{ trigger: 'plot:mousedown', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});
