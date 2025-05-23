# GComponent的使用介绍

G组件是一款易用、高效、强大的 2D 可视化渲染引擎，提供 Canvas、SVG 等多种渲染方式的实现。

## 特性

- 强大、可扩展的渲染能力，并内置常用的基础图形。
- 极致的渲染性能，支持大数据量的可视化场景。
- 完整模拟浏览器 DOM 的事件，与原生事件的表现无差异。
- 流畅的动画实现，以及丰富的配置接口。
- 同时提供了基于 Canvas 和 SVG 两种渲染技术的实现：
    - [g-canvas](https://www.npmjs.com/package/@antv/g-canvas)：Canvas 版本的实现，是性能最优的一个 2D 渲染版本。
    - [g-svg](https://www.npmjs.com/package/@antv/g-svg): SVG 版本的实现，提供一些 SVG 的特性。
- 这两个版本除了各自支持的一些特性外，对外 API 均保持一致。两者在使用层面的差异性主要在于:
    - g-canvas：
        - 支持局部渲染/全局渲染的切换。
        - 支持自动渲染/手动渲染的切换。
    - g-svg：
        - 支持 CSS
        - 支持嵌入 HTML

## 使用方式

解构使用
```js
import { GComponents } from 'bizcharts';
const { Canvas, Ellipse } = GComponents;
```
也可按需使用
```js
import Canvas from "bizcharts/g-components/Canvas";
import Ellipse from "bizcharts/g-components/Ellipse";
```



## 组件API
[详细组件](/product/BizCharts4/category/62/page/166)