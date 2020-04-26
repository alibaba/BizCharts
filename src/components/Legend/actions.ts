
import ListHighlight from '@antv/g2/lib/interaction/action/component/list-highlight';
import ListActive from '@antv/g2/lib/interaction/action/component/list-active';
import ListUnchecked from '@antv/g2/lib/interaction/action/component/list-unchecked';

import DataFilter from '@antv/g2/lib/interaction/action/data/filter';
import ListSelected from '@antv/g2/lib/interaction/action/component/list-selected';


import { registerAction, registerInteraction } from '../../core';

registerAction('list-active', ListActive);
registerAction('list-selected', ListSelected);
registerAction('list-highlight', ListHighlight);
registerAction('list-unchecked', ListUnchecked);
// 筛选数据
registerAction('data-filter', DataFilter);
registerAction('legend-item-highlight', ListHighlight, {
  componentNames: ['legend']
});

registerInteraction('legend-active', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['list-active:active', 'element-active:active'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['list-active:reset', 'element-active:reset'] }],
});

// legend hover，element active
registerInteraction('legend-highlight', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['legend-item-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['legend-item-highlight:reset', 'element-highlight:reset'] }],
});

registerInteraction('legend-filter', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: 'cursor:pointer' },
    { trigger: 'legend-item:mouseleave', action: 'cursor:default' },
  ],
  start: [
    { trigger: 'legend-item:click', action: 'list-unchecked:toggle' },
    { trigger: 'legend-item:click', action: 'data-filter:filter' },
  ],
});
