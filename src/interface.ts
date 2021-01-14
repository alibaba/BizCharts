
import { View, Chart } from '@antv/g2/lib/chart';
import { ErrorBoundaryProps } from 'react-error-boundary';
import {
  ViewPadding,
  ScaleOption,
  Datum,
  SizeAttrCallback,
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
} from '@antv/g2/lib/interface';

export * from '@antv/g2/lib/interface';
export { View, Chart };

export interface IEvent {
  target?: any, // 触发的对象，图形或者 Canvas 对象
  view?: View, // 当前 target 所属的 view
  gEvent?: any, // 从底层 G 的绘图层抛出来的事件，详情参考：G 的事件详解
  event?: any, // dom 层的事件
  x?: number, // 触发的位置 x，相对于画布左上角的位置
  y?: number, // 触发的位置 y，相对于画布左上角的位置
  clientX?: number, // 视窗的位置 x
  clientY?: number, // 视窗的位置 y
  type?: string, // 事件名
  [key: string]: any;
}

export type FieldString = string;
export type ColorString = string;
export type ShapeString = string;

/** [min: number, max: number] */
export type SizeRange = [number, number];

export interface IChartProps extends IViewProps {
  forceUpdate?: boolean;
  /** 指定 chart 绘制的 DOM，可以传入 DOM id，也可以直接传入 dom 实例。 */
  container?: HTMLElement;
  /** 图表宽度。 */
  width?: number;
  /** 当数据量过大的时候，可以手动关闭此选项，避免对比数据带来的性能开销 */
  notCompareData?: boolean;
  /** 图表高度。 */
  height?: number;
  /**
   * 图表是否自适应容器宽高，默认为 false，用户需要手动设置 width 和 height。
   * 当 `autoFit: true` 时，会自动取图表容器的宽高，如果用户设置了 height，那么会以用户设置的 height 为准。
   */
  autoFit?: boolean;
  /** 设置设备像素比，默认取浏览器的值 `window.devicePixelRatio`。 */
  pixelRatio?: number;
  /**
   * 设置图表的内边距，使用方式参考 CSS 盒模型。
   * 下图黄色区域即为 padding 的范围。
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*pYwiQrdXGJ8AAAAAAAAAAABkARQnAQ)
   *
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  padding?: ViewPadding;
  /**
   * 是否开启局部刷新，默认开启。
   */
  localRefresh?: boolean;
  /**
   * chart 是否可见，默认为 true，设置为 false 则会隐藏。
   */
  visible?: boolean;
  /**
   * 配置图表默认交互，仅支持字符串形式。
   */
  defaultInteractions?: string[];
  /** 是否对超出坐标系范围的 Geometry 进行剪切 */
  limitInPlot?: boolean;
  /** 主题 */
  theme?: object | string;
  pure?: boolean;
  // 基础鼠标事件
  onMousedown?: EventFunc,
  onMouseup?: EventFunc,
  onDblclick?: EventFunc,
  onMouseenter?: EventFunc,
  onMouseout?: EventFunc,
  onMouseover?: EventFunc,
  onMousemove?: EventFunc,
  onMouseleave?: EventFunc,
  onContextmenu?: EventFunc,
  onClick?: EventFunc,
  // 拖拽事件通过 mousedown, mousemove 和 mouse up 进行了模拟
  onDragstart?: EventFunc,
  onDrag?: EventFunc,
  onDragend?: EventFunc,
  onDragover?: EventFunc,
  onDragenter?: EventFunc,
  onDragleave?: EventFunc,
  onDrop?: EventFunc,
  // 生命周期勾子
  onBeforerender?: EventFunc, // 事件发生在渲染前
  onAfterrender?: EventFunc,// 事件发生在渲染后
  onBeforepaint?: EventFunc, // 组件、图形元素绘制前
  onAfterpaint?: EventFunc, // 组件、图形元素绘制后
  onBeforechangedata?: EventFunc, // 更新数据前
  onAfterchangedata?: EventFunc, // 更新数据后
  onBeforeclear?: EventFunc, // 调用 clear 方法清除 View 或者 Chart 前触发
  onAfterclear?: EventFunc, // 调用 clear 方法清除 View 或者 Chart 前触发
  onBeforedestroy?: EventFunc, // 销毁 View 或者 Chart 前触发
  // 移动端事件
  onTouchstart?: EventFunc,
  onTouchmove?: EventFunc,
  onTouchend?: EventFunc,
  events?: {
    [EventName: string]: EventFunc
  },
  /** 
   * 发生错误的时候显示的内容, errorContent api已调整，
   * 请使用 ErrorBoundaryProps
   * @example ErrorBoundaryProps={{FallbackComponent: error => <div>{error}</div>}}
  */
  errorContent? : React.ReactElement<unknown, string | React.FunctionComponent<{}>>,
  [key: string]: any;
  /** 
   *  ErrorBoundary 使用的是 react-error-boundary, 可通过ErrorBoundaryProps透传其属性
   *  @example ErrorBoundaryProps={{FallbackComponent: error => <div>{error}</div>}}
   */
  ErrorBoundaryProps?: ErrorBoundaryProps,
}


/**
 * @interface IViewProps
 * @extends {React.ComponentPropsWithRef<any>}
 */
export interface IViewProps extends React.ComponentPropsWithRef<any> {
  /** 数据源配置。 */
  data?: any[];
  /** 列定义配置，用于配置数值的类型等，以 data 中的数据属性为 key。 */
  scale?: {
    [field: string]: ScaleOption;
  };
  /**
   * 设置图表的内边距，使用方式参考 CSS 盒模型。
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  padding?: ViewPadding;
  /** view 的绘制范围，起始点为左上角。 */
  region?: {
    start?: number | string;
    end?: number | string;
  };
  /**
  * @memberof IView
  * 设置数据筛选规则。
  *
  * ```ts
  * 3.x 写法
  * <View filter={[
  *   ['city', (value: any, datum: Datum) => value !== '杭州'],
  *   ['value', (value: any, datum: Datum) => value > 100]
  * ]} />
  * 
  * <View filter={{
  *   'city': (value: any, datum: Datum) => value !== '杭州'],
  *   'value': (value: any, datum: Datum) => value > 100],
  * }} />
  *
  * // 删除 'city' 字段对应的筛选规则。
  * <View filter={{
  *  'city': null
  * }} />
  * ```
  *
  * @param filter [string, null | ((value: any, datum: Datum) => boolean)][] 或者 Record<string, (value: any, datum: Datum) => boolean>
  */
  filter?: [string, null | ((value: any, datum: Datum) => boolean)][] | Record<string, (value: any, datum: Datum) => boolean>;
  /** 其他 */
  [key:string] : any;
};

export interface IBaseGemoProps extends React.Props<any> {
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
   * @type {(ColorString | [ FieldString, ColorString | ColorString[] | ColorAttrCallback ])}
   * @memberof IBaseGemo
   */
  color?: ColorString | FieldString | [ FieldString, ColorString | ColorString[] | ColorAttrCallback ];
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
   * @type {(ShapeString | FieldString | [ShapeString, ShapeString[] | ShapeAttrCallback])}
   * @memberof IBaseGemo
   */
  shape?: ShapeString | FieldString | [ShapeString, ShapeString[] | ShapeAttrCallback];
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
   * @type {( number | FieldString | [FieldString, SizeAttrCallback | SizeRange])}
   * @memberof IBaseGemo
   */
  size?: number | FieldString | [FieldString, SizeAttrCallback | SizeRange];
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
   * <Geom state={{
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
  /**
   * 用来设置默认选中的图形元素，或者做条件样式。
   * 在图表绘制后执行。
   * <Geom setElements={(elements) => { 
   *   elements.forEach(ele => {
   *     const data = elements.data;
   *     if (data.id = 'xx') {
   *       ele.setState('selected', true); // 默认选中
   *     }
   *   })
   *  }} />
   * @type (elements:Element[]) => {}
   * @memberof IBaseGemoProps
   */
  setElements?: (elements:Element[]) => {}
  [key:string]: any
}

export type EventFunc = (IEvent) => any;
