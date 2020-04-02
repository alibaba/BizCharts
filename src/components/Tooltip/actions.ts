import { registerInteraction, registerAction } from '../../core';

import ActiveRegion from '@antv/g2/esm/interaction/action/active-region';
import SiblingTooltip from '@antv/g2/esm/interaction/action/component/sibling-tooltp';
import TooltipAction from '@antv/g2/esm/interaction/action/component/tooltip';

registerAction('tooltip', TooltipAction);
registerAction('sibling-tooltip', SiblingTooltip);
registerAction('active-region', ActiveRegion);
