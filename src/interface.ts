
import { View } from '@antv/g2/lib/chart';
import { IView } from './components/View';
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

export interface IChart extends IView {
  container?: HTMLElement;
  height?: number | string;
  width?: number | string;
  pure?: boolean;
  autoFit?: boolean;
  theme?: string | object;
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
