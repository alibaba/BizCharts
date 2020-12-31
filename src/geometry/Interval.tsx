import Interval from '@antv/g2/lib/geometry/interval';
// import PropsTypes from 'prop-types';
import IntervalLabel from '@antv/g2/lib/geometry/label/interval';
import PieLabel from '@antv/g2/lib/geometry/label/pie';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry, registerInteraction, registerGeometryLabel } from '../core';

registerGeometry('Interval', Interval);
registerGeometryLabel('interval', IntervalLabel);
registerGeometryLabel('pie', PieLabel);

import '@antv/g2/lib/geometry/shape/interval/funnel';
import '@antv/g2/lib/geometry/shape/interval/hollow-rect';
import '@antv/g2/lib/geometry/shape/interval/line';
import '@antv/g2/lib/geometry/shape/interval/pyramid';
import '@antv/g2/lib/geometry/shape/interval/tick';

// 出现背景框
registerInteraction('active-region', {
  start: [{ trigger: 'plot:mousemove', action: 'active-region:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
});

export interface IIntervalGemoProps extends IBaseGemoProps {}

export default class IntervalGeom extends BaseGemo<IIntervalGemoProps> {
  interactionTypes = ['active-region', 'element-highlight'];
  // static propsTypes = {
  //   'active-region': PropsTypes.bool,
  //   'element-highlight': PropsTypes.bool,
  // }
  // static defaultProps = {
  //   'active-region': true,
  //   'element-highlight': false,
  //   'position': 'x*y'
  // }

  GemoBaseClassName = 'interval';
}
