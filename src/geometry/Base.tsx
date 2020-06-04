import uniqueId from '@antv/util/lib/unique-id';
import _isString from '@antv/util/lib/is-string';
import _isFunction from '@antv/util/lib/is-function';
import GeometryLabel from '@antv/g2/lib/geometry/label/base';
import {
  SizeRange,
  SizeAttrCallback,
  FieldString,
  ColorString,
  ShapeString,
  AttributeOption,
  AdjustOption,
  ColorAttrCallback,
  ShapeAttrCallback,
  StyleOption,
  LooseObject,
  StyleCallback,
  GeometryTooltipOption,
  TooltipCallback,
  AnimateOption,
  LabelOption,
  GeometryLabelCfg,
  LabelCallback,
  StateOption
} from '../interface';

import ChartViewContext from '../context/view';
import { withChartInstance } from '../context/root';
import { registerGeometryLabel } from '../core';
import Base, { IBaseProps } from '../Base';
import compareProps from '../utils/compareProps';
import warn from '../utils/warning';
import './Label';

// 交互事件
import './actions';

registerGeometryLabel('base', GeometryLabel);

export interface IBaseGemo extends IBaseProps, React.Props<any> {
  /** 图形数据坐标 */
  position: string;
  /**
   * @example
   * ```typescript
   * // data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
   * <Geomy color={{
   *   fields: [ 'x' ],
   *   values: [ '#1890ff', '#5AD8A6' ],
   * }} />;
   * 
   * // 使用 '#1890ff' 颜色渲染图形
   * <Geom color="#1890ff" />
   *
   * // 根据 x 字段的数据值进行颜色的映射，这时候会在内部调用默认的回调函数，读取默认提供的颜色进行数据值到颜色值的映射。
   * <Geom color="x" />
   *
   * // 将 'x' 字段的数据值映射至指定的颜色值 colors（可以是字符串也可以是数组），此时用于通常映射分类数据
   * <Geom color={['x', [ '#1890ff', '#5AD8A6' ]]} />
   *
   * // 使用回调函数进行颜色值的自定义；可以使用多个字段使用、*号连接
   * <Geom color={['x', (xVal) => {
   *   if (xVal === 'a') {
   *     return 'red';
   *   }
   *   return 'blue';
   * }]} />
   * 
   * // 指定颜色的渐变路径，用于映射连续的数据
   * <Geom color={['x', '#BAE7FF-#1890FF-#0050B3']} />
   * ```
   * @type {(AttributeOption | [ FieldString, ColorString | ColorString[] | ColorAttrCallback ])}
   * @memberof IBaseGemo
   */
  color?: AttributeOption | [ FieldString, ColorString | ColorString[] | ColorAttrCallback ];
  /**
   *
   * @example
   * ```typescript
   * // data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
   *
   * // 指定常量，将所有数据值映射到固定的 shape
   * <Geom shape="circle" />
   *
   * // 将指定的字段映射到内置的 shapes 数组中
   * <Geom shape="x" />
   *
   * // 将指定的字段映射到指定的 shapes 数组中
   * <Geom shape={['x', [ 'circle', 'diamond', 'square' ]]} />
   *
   * // 使用回调函数获取 shape，用于个性化的 shape 定制，可以根据单个或者多个字段确定
   * <Geom shape={[
   *   'x',
   *   (xVal) => {
   *     if (xVal === 'a') {
   *       return 'circle';
   *     }
   *     return 'diamond';
   *   }
   * ]} />
   * ```
   * @type {(AttributeOption | FieldString | [ShapeString, ShapeString[] | ShapeAttrCallback])}
   * @memberof IBaseGemo
   */
  shape?: AttributeOption | FieldString | [ShapeString, ShapeString[] | ShapeAttrCallback];
  /**
   *
   * @example
   * ```typescript
   * // data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
   *
   * // 直接指定像素大小
   * <Geom size={10} />
   *
   * // 指定映射到 size 的字段，使用内置的默认大小范围为 [1, 10]
   * <Geom size="x" />
   *
   * // 指定映射到 size 字段外，还提供了 size 的最大值和最小值范围
   * <Geom size={['x', [ 5, 30 ]]} />
   *
   * // 使用回调函数映射 size，用于个性化的 size 定制，可以使用多个字段进行映射
   * <Geom size={['x', (xVal) => {
   *   if (xVal === 'a') {
   *     return 10;
   *   }
   *   return 5;
   * }]} />
   * ```
   *
   * @type {(AttributeOption | number | FieldString | [FieldString, SizeAttrCallback | SizeRange])}
   * @memberof IBaseGemo
   */
  size?: AttributeOption | number | FieldString | [FieldString, SizeAttrCallback | SizeRange];
  /**
   * 设置数据调整方式。G2 目前内置了四种类型：
   * 1. dodge
   * 2. stack
   * 3. symmetric
   * 4. jitter
   *
   * **Tip**
   * + 对于 'dodge' 类型，可以额外进行如下属性的配置:
   * ```typescript
   * <Geom adjust={['dodge', {
   *   marginRatio: 0, // 取 0 到 1 范围的值（相对于每个柱子宽度），用于控制一个分组中柱子之间的间距
   *   dodgeBy: 'x', // 该属性只对 'dodge' 类型生效，声明以哪个数据字段为分组依据
   * }]}
   * ```
   *
   * + 对于 'stack' 类型，可以额外进行如下属性的配置:
   * ```typescript
   * <Geom adjust={{
   *   type: 'stack',
   *   reverseOrder: false, // 用于控制是否对数据进行反序操作
   * }} />
   * ```
   *
   * @example
   * ```typescript
   * <Geom adjust="stack" />
   *
   * <Geom adjust={{
   *   type: 'stack',
   *   reverseOrder: false,
   * }} />
   *
   * // 组合使用 adjust
   * <Geom adjust={[
   *   { type: 'stack' },
   *   { type: 'dodge', dodgeBy: 'x' },
   * ]} />
   * ```
   *
   * @type {('dodge' | 'stack' | 'symmetric' | 'jitter' | string | string[] | AdjustOption | AdjustOption[])}
   * @memberof IBaseGemo
   */
  adjust?: 'dodge' | 'stack' | 'symmetric' | 'jitter' | string | AdjustOption | AdjustOption[];
  /**
   *
   * 图形样式配置。
   *
   * @example
   * ```typescript
   * // 配置图形样式
   * <Geom style={{
   *   lineWidth: 2,
   *   stroke: '#1890ff',
   * }} />
   *
   * // 根据具体的数据进行详细配置
   * <Geom style={{
   *   fields: [ 'x', 'y' ], // 数据字段
   *   callback: (xVal, yVal) => {
   *     const style = { lineWidth: 2, stroke: '#1890ff' };
   *     if (xVal === 'a') {
   *       style.lineDash = [ 2, 2 ];
   *     }
   *     return style;
   *   },
   * }} />
   * ```
   * ```typescript
   * // 根据具体的数据进行详细配置 [FieldString, StyleCallback]
   * <Geom style={['x*y', (xVal, yVal) => {
   *   const style = { lineWidth: 2, stroke: '#1890ff' };
   *   if (xVal === 'a') {
   *     style.lineDash = [ 2, 2 ];
   *   }
   *   return style;
   * }]} />
   * ```
   *
   * @type {(StyleOption | LooseObject | [FieldString, StyleCallback])}
   * @memberof IBaseGemo
   */
  style?: StyleOption | LooseObject | [FieldString, StyleCallback];
  /**
   * 配置 Geometry 显示的 tooltip 内容。
   *
   * `tooltip={false}` 代表关闭 tooltip。
   * `tooltip={true}` 代表开启 tooltip。
   *
   * Geometry 默认允许 tooltip 展示，我们可以使用以下方法对 tooltip 的展示内容进行配置：
   *
   * @example
   * ```typescript
   * // data: [{x: 'a', y: 10}]
   * <Geom tooltip="x" />
   * ```
   * 
   * ```typescript
   * <Geom tooltip={{
   *   fields: [ 'x', 'y' ],
   * }} />
   * ```
   * 方法同样支持数据映射及回调用法：
   *
   * @example
   * ```typescript
   * <Tooltip itemTpl="<li>{x}: {y}</li>" />
   *
   * <Line tooltip={{
   *     fields: [ 'x', 'y' ],
   *     callback: (x, y) => {
   *       return {
   *         x,
   *         y,
   *       };
   *     },
   *   }} />
   * // 等同于
   * <Line tooltip={['x*y', (x, y) => {
   *       return {
   *         x,
   *         y,
   *       };
   *     }]} />
   *
   * 其返回的值必须为对象，该值中的属性同 Tooltip 的 itemTpl 模板相对应，返回的变量可用于 itemTpl 的字符串模板。
   *
   *
   * @type {(GeometryTooltipOption | boolean | FieldString | [FieldString, TooltipCallback])}
   * @memberof IBaseGemo
   */
  tooltip?: GeometryTooltipOption | boolean | FieldString | [FieldString, TooltipCallback];
  /**
   * Geometry 动画配置。
   *
   * + `<Geom animate={false} />` 关闭动画
   * + `<Geom animate />` 开启动画，默认开启。
   *
   * 我们将动画分为四个场景：
   * 1. appear: 图表第一次加载时的入场动画；
   * 2. enter: 图表绘制完成，发生更新后，产生的新图形的进场动画；
   * 3. update: 图表绘制完成，数据发生变更后，有状态变更的图形的更新动画；
   * 4. leave: 图表绘制完成，数据发生变更后，被销毁图形的销毁动画。
   *
   * @example
   * ```typescript
   * <Geom animate={{
   *   enter: {
   *     duration: 1000, // enter 动画执行时间
   *   },
   *   leave: false, // 关闭 leave 销毁动画
   * }} />;
   * ```
   *
   *
   * @type {(AnimateOption | boolean)}
   * @memberof IBaseGemo
   */
  animate?: AnimateOption | boolean;
  /**
   *
   * Geometry label 配置。
   *
   * @example
   * ```ts
   * // data: [ {x: 1, y: 2, z: 'a'}, {x: 2, y: 2, z: 'b'} ]
   * // 在每个图形上显示 z 字段对应的数值
   * label({
   *   fields: [ 'z' ]
   * });
   *
   * label(false); // 不展示 label
   *
   * // 在每个图形上显示 x 字段对应的数值，同时配置文本颜色为红色
   * label('x', {
   *   style: {
   *     fill: 'red',
   *   },
   * })
   *
   * // 以 type 类型的 label 渲染每个图形上显示 x 字段对应的数值，同时格式化文本内容
   * label('x', (xValue) => {
   *   return {
   *     content: xValue + '%',
   *   };
   * }, {
   *   type: 'base' // 声明 label 类型
   * })
   * ```
   *
   * @type {(LabelOption | false | FieldString | [FieldString, GeometryLabelCfg | LabelCallback] | [FieldString, LabelCallback, GeometryLabelCfg])}
   * @memberof IBaseGemo
   */
  label?: LabelOption | false | FieldString | [FieldString, GeometryLabelCfg | LabelCallback] | [FieldString, LabelCallback, GeometryLabelCfg];
  /**
   *设置状态对应的样式。
   *
   * @example
   * ```ts
   * <Geom state={{
   *   selected: {
   *     animate: { duration: 100, easing: 'easeLinear' },
   *     style: {
   *       lineWidth: 2,
   *       stroke: '#000',
   *     },
   *   },
   * }} />
   * ```
   *
   * 如果图形 shape 是由多个 shape 组成，即为一个 G.Group 对象，那么针对 group 中的每个 shape，我们需要使用下列方式进行状态样式设置：
   * 如果我们为 group 中的每个 shape 设置了 'name' 属性(shape.set('name', 'xx'))，则以 'name' 作为 key，否则默认以索引值（即 shape 的 添加顺序）为 key。
   *
   * ```ts
   * <Geom shape="groupShape" state={{
   *   selected: {
   *     style: {
   *       0: { lineWidth: 2 },
   *       1: { fillOpacity: 1 },
   *     }
   *   }
   * }} />
   * ```
   *
   * @type {StateOption}
   * @memberof IBaseGemo
   */
  state?: StateOption;
}

abstract class BaseGeom<T extends IBaseGemo> extends Base<T> {
  name = 'gemo';
  ChartBaseClass = null;
  static contextType: any;
  protected interactionTyps: string[] = [];
  protected abstract readonly GemoBaseClassName: string;

  /**
   * 通过ref调用公共方法获取当前geometry实例
   * @returns
   * @memberof BaseGeom
   */
  public getGeometry() {
    return this.g2Instance;
  }
  getInitalConfig() {
    return undefined;
  }
  // 处理elements，即geometry 的图形元素
  processElemens = () => {
    const chart = this.context;
    if (_isFunction(this.props.children)) {
      this.props.children(this.g2Instance.elements, this.g2Instance, chart);
    }
  }
  componentWillUnmount() {
    const chart = this.context;
    chart.off('processElemens', this.processElemens);
    // super.componentWillUnmount();
  }
  initInstance() {
    const chart = this.context;
    this.id = uniqueId(this.name);
    const options = this.getInitalConfig();
    this.g2Instance = chart[this.GemoBaseClassName](options);
    chart.on('processElemens', this.processElemens);
  }
  configInstance(preProps, curProps) {
    super.configInstance(preProps, curProps);
    compareProps(
      preProps,
      curProps,
      ['position', 'shape', 'color', 'label', 'style', 'tooltip', 'size', 'animate', 'state'],
      (value, key) => {
        // value 已被转为array
        warn(!(key === 'label' && value[0] === true), 'label 值类型错误，应为false | LabelOption | FieldString')
        this.g2Instance[key](...value);
      },
    );
    compareProps(
      preProps,
      curProps,
      ['adjust'],
      (value, key) => {
        if (_isString(value[0])) {
          this.g2Instance[key](value[0]);
        } else {
          this.g2Instance[key](value);
        }
      },
    );

    // interaction 
    compareProps(preProps, curProps, this.interactionTyps, (value, key) => {
      if (value[0]) {
        this.context.interaction(key);
      } else {
        this.context.removeInteraction(key);
      }
    });
  }
}

BaseGeom.contextType = ChartViewContext;

export default BaseGeom;
