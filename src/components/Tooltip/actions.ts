import { registerInteraction, registerAction } from '../../core';

import ActiveRegion from '@antv/g2/esm/interaction/action/active-region';
import SiblingTooltip from '@antv/g2/esm/interaction/action/component/sibling-tooltp';
import TooltipAction from '@antv/g2/esm/interaction/action/component/tooltip';

registerAction('tooltip', TooltipAction);
registerAction('sibling-tooltip', SiblingTooltip);
registerAction('active-region', ActiveRegion);

// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  // @ts-ignore
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});
