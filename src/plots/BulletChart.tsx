import 'react';
import { Bullet, BulletOptions as Options } from '@antv/g2plot/lib/plots/bullet';
import warn from 'warning';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import createPlot, { BasePlotOptions } from '../createPlot';
import isNil from '@antv/util/lib/is-nil';
import isArray from '@antv/util/lib/is-array';
import { polyfillOptions } from './core/polyfill';

export interface BulletOptions extends Options, BasePlotOptions {
  /**
   * 该属性已废弃，请使用size.measure替代
   * @example 
   * size={{
   *   measure: 20,
   * }}
   */
  measureSize?: number | [number, number] | ((datum) => number);
  /**
   * 该属性已废弃，请使用size.range替代
   * @example 
   * size={{
   *   range: 50,
   * }}
   */
  rangeSize?: number | [number, number] | ((datum) => number);
  /**
   * 该属性已废弃，请使用size.target替代
   * @example 
   * size={{
   *   target: 40,
   * }}
   */
  markerSize?: number | [number, number] | ((datum) => number);
  /**
   * 该属性已废弃，请使用color.measure替代
   * @example 
   * color={{
   *   measure: ['#d62728', '#2ca02c', '#000000'],
   * }}
   */
  measureColors?: any;
  /**
   * 该属性已废弃，请使用color.range替代
   * @example 
   * color={{
   *   range: ['#d62728', '#2ca02c', '#000000'],
   * }}
   */
  rangeColors?: any;
  /**
   * 该属性已废弃，请使用color.target替代
   * @example 
   * color={{
   *   target: ['#d62728', '#2ca02c', '#000000'],
   * }}
   */
  markerColors?: any;
  /**
   * 该属性已废弃，请使用bulletStyle.target替代
   * @example 
   * bulletStyle={{
   *   target: {
   *     fill: 'red'
   *   },
   *   range: {}
   * }}
   */
  markerStyle?: any;
  /**
   * 该属性已废弃，请在数据中配置range，并配置rangeField
   *
   * @type {number}
   * @memberof BulletOptions
   */
  rangeMax?: number;
}


const polyfill = (opt: BulletOptions): BulletOptions => {
  const options = polyfillOptions(opt);
  // size
  if (!isNil(get(opt, 'measureSize'))) {
    warn(false, 'measureSize已废弃，请使用size.measure替代');
    set(options, 'size.measure', get(opt, 'measureSize'));
  }
  if (!isNil(get(opt, 'rangeSize'))) {
    warn(false, 'rangeSize已废弃，请使用size.range替代');
    set(options, 'size.range', get(opt, 'rangeSize'));
  }
  if (!isNil(get(opt, 'markerSize'))) { 
    warn(false, 'markerSizee已废弃，请使用size.target替代');
    set(options, 'size.target', get(opt, 'markerSize'));
  }
  // color
  if (!isNil(get(opt, 'measureColors'))) {
    warn(false, 'measureColors已废弃，请使用color.measure替代');
    set(options, 'color.measure', get(opt, 'measureColors'));
  }
  if (!isNil(get(opt, 'rangeColors'))) {
    warn(false, 'rangeColors已废弃，请使用color.range替代');
    set(options, 'color.range', get(opt, 'rangeColors'));
  }
  if (!isNil(get(opt, 'markerColors'))) { 
    warn(false, 'markerColors已废弃，请使用color.target替代');
    set(options, 'color.target', get(opt, 'markerColors'));
  }
  // bulletStyle
  if (!isNil(get(opt, 'markerStyle'))) {
    warn(false, 'markerStyle已废弃，请使用bulletStyle.target替代');
    set(options, 'bulletStyle.target', get(opt, 'markerStyle'));
  }

  if (isNil(get(opt, 'xAxis.line'))) {
    // 默认不显示轴线
    set(options, 'xAxis.line', false);
  }
  if (isNil(get(opt, 'yAxis'))) {
    // 默认不显示y轴
    set(options, 'yAxis', false);
  }
  if (isNil(get(opt, 'measureField'))) {
    // 默认measureField
    set(options, 'measureField', 'measures');
  }
  if (isNil(get(opt, 'rangeField'))) {
    // 默认rangeField
    set(options, 'rangeField', 'ranges');
  }
  if (isNil(get(opt, 'targetField'))) {
    // 默认targetField
    set(options, 'targetField', 'target');
  }
  // polyfill
  if (isArray(get(opt, 'data.0.targets'))) {
    // 兼容旧版数据格式
    set(options, 'data.0.target', get(opt, 'data.0.targets')[0]);
  }
  if (!isNil(get(opt, 'rangeMax'))) {
    warn(false, '该属性已废弃，请在数据中配置range，并配置rangeField');
    set(options, 'data.0.ranges', [get(opt, 'rangeMax')]);
  }
  return options;
}
// 子弹图
export default createPlot<BulletOptions>(Bullet, 'BulletChart', polyfill);
