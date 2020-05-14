
import { View } from '@antv/g2/lib/chart';
import { IView } from './components/View';
import { ViewPadding } from '@antv/g2/lib/interface';
export * from '@antv/g2/lib/interface';
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

export interface IChart extends IView {
  /** 指定 chart 绘制的 DOM，可以传入 DOM id，也可以直接传入 dom 实例。 */
  readonly container?: HTMLElement;
  /** 图表宽度。 */
  readonly width?: number;
  /** 图表高度。 */
  readonly height?: number;
  /**
   * 图表是否自适应容器宽高，默认为 false，用户需要手动设置 width 和 height。
   * 当 `autoFit: true` 时，会自动取图表容器的宽高，如果用户设置了 height，那么会以用户设置的 height 为准。
   */
  readonly autoFit?: boolean;
  /** 设置设备像素比，默认取浏览器的值 `window.devicePixelRatio`。 */
  readonly pixelRatio?: number;
  /**
   * 设置图表的内边距，使用方式参考 CSS 盒模型。
   * 下图黄色区域即为 padding 的范围。
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*pYwiQrdXGJ8AAAAAAAAAAABkARQnAQ)
   *
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  readonly padding?: ViewPadding;
  /**
   * 是否开启局部刷新，默认开启。
   */
  readonly localRefresh?: boolean;
  /**
   * chart 是否可见，默认为 true，设置为 false 则会隐藏。
   */
  readonly visible?: boolean;
  /**
   * 配置图表默认交互，仅支持字符串形式。
   */
  readonly defaultInteractions?: string[];
  /** 是否对超出坐标系范围的 Geometry 进行剪切 */
  readonly limitInPlot?: boolean;
  /** 主题 */
  readonly theme?: object | string;
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
  [key: string]: any;
}

export type EventFunc = (IEvent) => any;
