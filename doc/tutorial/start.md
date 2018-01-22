
# BizCharts

BizCharts 是一个基于G2封装的React图表库，具有G2、React的全部优点，可以让用户以组件的形式组合出无数种图表；并且集成了大量的统计工具，支持多种坐标系绘制，交互定制，动画定制以及图形定制等等。相信 BizCharts 定能成为您的数据可视化项目的强力助手。

## 特性
- 基于 G2、React
- 健壮
- 稳定
- 强大的扩展能力
- 高自定义能力

## 安装

### 通过 npm 引入

我们提供了 BizCharts npm 包，通过下面的命令即可完成安装

```bash
npm install bizcharts --save
```

成功安装完成之后，即可使用 import 或 require 进行引用。

## 快速开始

在 BizCharts 引入页面后，我们就已经做好了创建第一个图表的准备了。

下面是以一个基础的柱状图为例开始我们的第一个图表创建。

1. 创建容器

	在页面的 *body* 部分创建一个节点，指定一个 id

	```html
	<div id="mountNode"></div>
	```

2. 使用组件生成图表

	- 引入图表需要的组件
	- 用组件组装成需要的图表
	- 把图表渲染到 mountNode 节点上

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

// 数据源
const data = [
  { genre: 'Sports', sold: 275, income: 2300 },
  { genre: 'Strategy', sold: 115, income: 667 },
  { genre: 'Action', sold: 120, income: 982 },
  { genre: 'Shooter', sold: 350, income: 5271 },
  { genre: 'Other', sold: 150, income: 3710 }
];

// 定义度量
const cols = {
  sold: { alias: '销售量' },
  genre: { alias: '游戏种类' }
};

// 渲染图表
ReactDOM.render((
  <Chart width={600} height={400} data={data} scale={cols}>
      <Axis name="genre" />
      <Axis name="sold" />
      <Legend position="top" dy={-20} />
      <Tooltip />
      <Geom type="interval" position="genre*sold" color="genre" />
    </Chart>
), document.getElementById('mountNode'));

```

一张柱状图就绘制成功了：

![](https://img.alicdn.com/tps/TB1PVaoPFXXXXcSaXXXXXXXXXXX-519-401.png)


## 体验改进计划说明
为了更好服务用户，G2 会将打点监控，将 URL 等信息发送回 AntV 服务器，BizCharts 没有关闭这个请求：```https://kcart.alipay.com/web/bi.do```

除了 URL 与 G2 版本信息外，不会收集任何其他信息，一切为了能对 G2 的运行情况有更多了解，以更好服务于用户。如有担心，可以通过下面的代码关闭：

```js
// 关闭 G2 的体验改进计划打点请求（如：服务端渲染）
BizCharts.track(false);
```
