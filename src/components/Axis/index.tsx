
import _Axis from '@antv/g2/lib/chart/controller/axis';
import { ComponentAnimateOption, AxisGridCfg } from '@antv/g2/lib/interface';
import { AxisTitleCfg, AxisLineCfg, AxisTickLineCfg, AxisSubTickLineCfg, AxisLabelCfg } from '@antv/g2/lib/dependents';
import { Chart } from '../Chart';
import { View } from '../View';
import useChartView from '../../hooks/useChartView';
import _transBooleanCfg from '../../utils/transBooleanCfg';


import { registerComponentController } from '../../core';

registerComponentController('axis', _Axis);

/** 坐标轴配置属性，<Axis name="" /> */
export interface IAxis {
  /** Axis 对应的数据字段名，如果不配置则对所有轴生效，但只支持配置visible */
  name?: string;
  visible?: boolean;
  /** 来自父级的 chart 或者 view实例 */
  view?: Chart | View;
  /**
   * 标题的配置项，null | false 表示不展示。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   offset?: number; // 标题距离坐标轴的距离
   *   style?: ShapeAttrs; // 标题文本配置项
   *   autoRotate?: boolean; // 是否自动旋转
   * }
   * ```
   *
   */
  title?: boolean | AxisTitleCfg | null;
  /**
   * 适用于直角坐标系，设置坐标轴的位置。
   */
  position?: 'top' | 'bottom' | 'right' | 'left';
  /**
   * 坐标轴线的配置项，null | false 表示不展示。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   style?: ShapeAttrs; // 坐标轴线的样式配置项
   * }
   * ```
   */
  line?: AxisLineCfg | null | boolean ;
  /**
   * 坐标轴刻度线线的配置项，null | false 表示不展示。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   style?: ShapeAttrs; // 坐标轴刻度线的样式配置项
   *   alignTick?: boolean; // 是否同 tick 对齐
   *   length?: number;  // 长度
   * }
   * ```
   */
  tickLine?: AxisTickLineCfg | null | boolean ;
  /**
   * 坐标轴子刻度线的配置项，false | null 表示不展示。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   style?: ShapeAttrs; // 坐标轴刻度线的样式配置项
   *   count?: number; // 子刻度个数
   *   length?: number; // 子刻度线长度
   * }
   * ```
   */
  subTickLine?: AxisSubTickLineCfg | null | boolean ;
  /**
   * 文本标签的配置项，false | null 表示不展示。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   // 坐标轴文本的样式
   *   style?: ShapeAttrs;
   *   // label 的偏移量
   *   offset?: number;
   *   // 文本旋转角度
   *   rotate?: number;
   *   // 格式化函数
   *   formatter?: (text: string, item: ListItem, index: number) => any;
   *   // 是否自动旋转，默认 true
   *   autoRotate?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string;
   *   // 是否自动隐藏，默认 false
   *   autoHide?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string;
   *   // 是否自动省略，默认 false
   *   autoEllipsis?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string;
   * }
   * ```
   */
  label?: AxisLabelCfg | null | boolean ;
  /** 坐标轴网格线的配置项，false 表示不展示。 */
  grid?: AxisGridCfg | null | boolean ;
  /** 动画开关，默认开启。 */
  animate?: boolean;
  /** 动画参数配置。 */
  animateOption?: ComponentAnimateOption;
  /** 标记坐标轴 label 的方向，左侧为 1，右侧为 -1。 */
  verticalFactor?: number;
}

const undefinedField = name => (name === undefined);
const mixinAxisCfg = (options) => {
  // 兼容boolean类型的配置 例： <Axis title /> 
  return _transBooleanCfg(options, ['title', 'line', 'tickLine', 'subTickLine', 'label', 'grid']);
}



export default function Axis(props: IAxis) {
  const { name, visible = true, ...options } = props;
  const view = useChartView();
  const newConfig = mixinAxisCfg(options);
  // warning(newConfig.grid !== null, 'fix g2 bug: Axis null 请先在Chart上配置forceUpdate 强制刷新以等待g2 修复。');
  if (visible) {
    if (undefinedField(name)) {
      // 不指定字段名称，仅visible生效
      view.axis(true);
    } else {
      view.axis(name, newConfig);
    }
  } else {
    if (undefinedField(name)) {
      view.axis(false);
    } else {
      view.axis(name, false);
    }
  }
  return null;
}
