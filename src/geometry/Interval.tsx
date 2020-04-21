import Interval from '@antv/g2/lib/geometry/interval';
import PropsTypes from 'prop-types';
import IntervalLabel from '@antv/g2/lib/geometry/label/interval';
import PieLabel from '@antv/g2/lib/geometry/label/pie';
import BaseGemo, { IBaseGemo } from './Base';
import { registerGeometry, registerInteraction, registerGeometryLabel } from '../core';

registerGeometry('Interval', Interval);
registerGeometryLabel('interval', IntervalLabel);
registerGeometryLabel('pie', PieLabel);
// 出现背景框
registerInteraction('active-region', {
  start: [{ trigger: 'plot:mousemove', action: 'active-region:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
});

interface IIntervalGemo extends IBaseGemo {}

export default class IntervalGeom extends BaseGemo<IIntervalGemo> {
  interactionTyps = ['active-region', 'element-highlight'];
  static propsTypes = {
    'active-region': PropsTypes.bool,
    'element-highlight': PropsTypes.bool,
  }
  static defaultProps = {
    'active-region': true,
    'element-highlight': false,
    'position': 'x*y'
  }
  GemoBaseClassName = 'interval'
}
