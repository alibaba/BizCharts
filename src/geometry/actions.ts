
// TODO: 按照element 详细分类
import ElmentActive from '@antv/g2/lib/interaction/action/element/active';
import ElementLinkByColor from '@antv/g2/lib/interaction/action/element/link-by-color';
import ElmentRangeActive from '@antv/g2/lib/interaction/action/element/range-active';
import ElmentSingleActive from '@antv/g2/lib/interaction/action/element/single-active';


import ElmentHighlight from '@antv/g2/lib/interaction/action/element/highlight';
import ElmentHighlightByX from '@antv/g2/lib/interaction/action/element/highlight-by-x';
import ElmentHighlightByColor from '@antv/g2/lib/interaction/action/element/highlight-by-color';

import ElmentSingleHighlight from '@antv/g2/lib/interaction/action/element/single-highlight';
import ElmentRangeHighlight from '@antv/g2/lib/interaction/action/element/range-highlight';

import ElementSelected from '@antv/g2/lib/interaction/action/element/selected';
import ElementSingleSelected from '@antv/g2/lib/interaction/action/element/single-selected';
import ElementRangeSelected from '@antv/g2/lib/interaction/action/element/range-selected';

import CursorAction from '@antv/g2/lib/interaction/action/cursor';


import { registerInteraction, registerAction } from '../core';

registerAction('cursor', CursorAction);

registerAction('element-active', ElmentActive);
registerAction('element-single-active', ElmentSingleActive);
registerAction('element-range-active', ElmentRangeActive);

registerAction('element-highlight', ElmentHighlight);
registerAction('element-highlight-by-x', ElmentHighlightByX);
registerAction('element-highlight-by-color', ElmentHighlightByColor);

registerAction('element-single-highlight', ElmentSingleHighlight);
registerAction('element-range-highlight', ElmentRangeHighlight);
registerAction('element-sibling-highlight', ElmentRangeHighlight, {
  effectSiblings: true,
  effectByRecord: true
});

registerAction('element-selected', ElementSelected);
registerAction('element-single-selected', ElementSingleSelected);
registerAction('element-range-selected', ElementRangeSelected);
registerAction('element-link-by-color', ElementLinkByColor);


// 移动到 elment 上 active
registerInteraction('element-active', {
  start: [{ trigger: 'element:mouseenter', action: 'element-active:active' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-active:reset' }],
});

// 点击选中，允许取消
registerInteraction('element-selected', {
  start: [{ trigger: 'element:click', action: 'element-selected:toggle' }],
});

// hover highlight，允许取消
registerInteraction('element-highlight', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight:reset' }],
});

// hover highlight by x，允许取消
registerInteraction('element-highlight-by-x', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight-by-x:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight-by-x:reset' }],
});

// hover highlight by y，允许取消
registerInteraction('element-highlight-by-color', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight-by-color:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight-by-color:reset' }],
});
