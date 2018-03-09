![](https://img.shields.io/badge/language-react-red.svg)  ![](https://img.shields.io/badge/license-MIT-000000.svg)  [![NPM Package](https://img.shields.io/npm/v/bizcharts.svg)](https://www.npmjs.com/package/bizcharts)[![NPM Downloads](https://img.shields.io/npm/dm/bizcharts.svg)](https://npmjs.org/package/bizcharts)

# BizCharts

BizCharts 是基于 [G2](https://antv.alipay.com/) 的 React 图表库，历经阿里两年打磨，覆盖数十个产品，于 11.21 开源，并同步升级到 G2 3.0 版本。

[了解更多 BizCharts 详情](https://alibaba.github.io/BizCharts/)

## 特性
- 简单、易用
- 强大的扩展能力
- 有跟 G2 1:1 的能力

[查看更多图表示例](https://alibaba.github.io/BizCharts/demo.html)
<img src="https://user-images.githubusercontent.com/6628666/33157917-b970a70c-d040-11e7-9601-b1da1dbe26ab.png" width="800">

## 安装

### npm
```sh
$ npm install bizcharts
```

### umd
```html
 <script src="https://unpkg.com/bizcharts@${version}/umd/BizCharts.min.js"></script>
```

### dev build
```sh
$ git clone https://github.com/alibaba/BizCharts.git
$ cd BizCharts
$ npm install
$ npm run build
```

### dev demo

```sh
$ sudo vi /etc/hosts
// 加入 127.0.0.1 localhost
$ npm run[-script] demo
// 浏览器打开 http://localhost:3510/
```

## 快速开始
```jsx
import {Chart, Axis, Tooltip, Geom} from "bizcharts";

const data = [...];

<Chart height={400} data={data} forceFit>
  <Axis name="month" />
  <Axis name="temperature" label={{formatter: val => `${val}°C`}} />
  <Tooltip crosshairs={{type : "y"}} />
  <Geom type="line" position="month*temperature" size={2} color={'city'} />
  <Geom type='point' position="month*temperature" size={4} color={'city'} />
</Chart>
```

## 文档
### 教程
- [快速入门](doc/tutorial/start.md)
- [图表介绍](./doc/tutorial/chart.md)
- [图表类型](./doc/tutorial/chartType.md)
- [数据](./doc/tutorial/data.md)
- [DataSet](./doc/tutorial/dataset.md)
- [dataflow](./doc/tutorial/dataflow.md)
- [主题](./doc/tutorial/theme.md)
- [交互](./doc/tutorial/interaction.md)
- [动画](./doc/tutorial/animate.md)

### api 文档
- [BizCharts](./doc/api/bizcharts.md)
- 组件
  - [Chart](./doc/api/chart.md)
  - [Coord](./doc/api/coord.md)
  - [Axis](./doc/api/axis.md)
  - [Geom](./doc/api/geom.md)
  - [Label](./doc/api/label.md)
  - [Legend](./doc/api/legend.md)
  - [Tooltip](./doc/api/tooltip.md)
  - [Guide](./doc/api/guide.md)
  - [Facet](./doc/api/facet.md)
  - [View](./doc/api/view.md)
- 插件
  - [Slider](//github.com/alibaba/BizCharts/blob/slider/plugin/slider/README.md)
- 其他
  - [scale](./doc/api/scale.md)
  - [shape](./doc/api/shape.md)
  - [dataset](./doc/api/dataset.md)
  - [connector](./doc/api/connector.md)
  - [transform](./doc/api/transform.md)
  - [theme](./doc/api/theme.md)

### 常见问题
- [有问题怎么办](./doc/faq/faq.md#ques)
- [坐标轴空间不够](./doc/faq/faq.md#axisSpace)
- [坐标轴label自定义](./doc/faq/faq.md#customLabel)
- [tooltip显示](./doc/faq/faq.md#tooltipShow)
- [tooltip自定义](./doc/faq/faq.md#customTooltip)
 
