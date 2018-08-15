![](https://img.shields.io/badge/language-react-red.svg)  ![](https://img.shields.io/badge/license-MIT-000000.svg)  [![NPM Package](https://img.shields.io/npm/v/bizcharts.svg)](https://www.npmjs.com/package/bizcharts)[![NPM Downloads](https://img.shields.io/npm/dm/bizcharts.svg)](https://npmjs.org/package/bizcharts)

# BizCharts

BizCharts 是基于 [G2](https://antv.alipay.com/) 的 React 图表库，历经阿里两年打磨，覆盖数十个产品，于 11.21 开源，并同步升级到 G2 3.0 版本。

[了解更多 BizCharts 详情](//bizcharts.net/index)

## 特性
- 简单、易用
- 强大的扩展能力
- 有跟 G2 1:1 的能力

[查看更多图表示例](//bizcharts.net/products/bizCharts/demo)
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
- [快速入门](//bizcharts.net/products/bizCharts/docs/start)
- [图表介绍](.///bizcharts.net/products/bizCharts/docs/chart)
- [图表类型](.///bizcharts.net/products/bizCharts/docs/chartType)
- [数据](.///bizcharts.net/products/bizCharts/docs/data)
- [DataSet](.///bizcharts.net/products/bizCharts/docs/dataset)
- [dataflow](.///bizcharts.net/products/bizCharts/docs/dataflow)
- [主题](.///bizcharts.net/products/bizCharts/docs/theme)
- [交互](.///bizcharts.net/products/bizCharts/docs/interaction)
- [动画](.///bizcharts.net/products/bizCharts/docs/animate)

### api 文档
- [BizCharts](//bizcharts.net/products/bizCharts/api/bizcharts)
- 组件
  - [Chart](//bizcharts.net/products/bizCharts/api/chart)
  - [Coord](//bizcharts.net/products/bizCharts/api/coord)
  - [Axis](//bizcharts.net/products/bizCharts/api/axis)
  - [Geom](//bizcharts.net/products/bizCharts/api/geom)
  - [Label](//bizcharts.net/products/bizCharts/api/label)
  - [Legend](//bizcharts.net/products/bizCharts/api/legend)
  - [Tooltip](//bizcharts.net/products/bizCharts/api/tooltip)
  - [Guide](//bizcharts.net/products/bizCharts/api/guide)
  - [Facet](//bizcharts.net/products/bizCharts/api/facet)
  - [View](//bizcharts.net/products/bizCharts/api/view)
- 插件
  - [Slider](//bizcharts.net/products/bizCharts/api/sliderPlugin)
- 其他
  - [scale](//bizcharts.net/products/bizCharts/api/scale)
  - [shape](//bizcharts.net/products/bizCharts/api/shape)
  - [dataset](//bizcharts.net/products/bizCharts/api/dataset)
  - [connector](//bizcharts.net/products/bizCharts/api/connector)
  - [transform](//bizcharts.net/products/bizCharts/api/transform)
  - [theme](//bizcharts.net/products/bizCharts/api/theme)

### 常见问题
- [有问题怎么办](./doc/faq/faq#ques)
- [坐标轴空间不够](./doc/faq/faq#axisSpace)
- [坐标轴label自定义](./doc/faq/faq#customLabel)
- [tooltip显示](./doc/faq/faq#tooltipShow)
- [tooltip自定义](./doc/faq/faq#customTooltip)
 
