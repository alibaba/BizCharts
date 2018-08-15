![](https://img.shields.io/badge/language-react-red.svg)  ![](https://img.shields.io/badge/license-MIT-000000.svg)  [![NPM Package](https://img.shields.io/npm/v/bizcharts.svg)](https://www.npmjs.com/package/bizcharts)[![NPM Downloads](https://img.shields.io/npm/dm/bizcharts.svg)](https://npmjs.org/package/bizcharts)

# BizCharts

BizCharts 是基于 [G2](https://antv.alipay.com/) 的 React 图表库，历经阿里两年打磨，覆盖数十个产品，于 11.21 开源，并同步升级到 G2 3.0 版本。

[了解更多 BizCharts 详情](http://bizcharts.net/index)

## 特性
- 简单、易用
- 强大的扩展能力
- 有跟 G2 1:1 的能力

[查看更多图表示例](http://bizcharts.net/products/bizCharts/demo)
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
- [快速入门](http://bizcharts.net/products/bizCharts/docs/start)
- [图表介绍](http:http://bizcharts.net/products/bizCharts/docs/chart)
- [图表类型](http:http://bizcharts.net/products/bizCharts/docs/chartType)
- [数据](http:http://bizcharts.net/products/bizCharts/docs/data)
- [DataSet](http:http://bizcharts.net/products/bizCharts/docs/dataset)
- [dataflow](http:http://bizcharts.net/products/bizCharts/docs/dataflow)
- [主题](http:http://bizcharts.net/products/bizCharts/docs/theme)
- [交互](http:http://bizcharts.net/products/bizCharts/docs/interaction)
- [动画](http:http://bizcharts.net/products/bizCharts/docs/animate)

### api 文档
- [BizCharts](http://bizcharts.net/products/bizCharts/api/bizcharts)
- 组件
  - [Chart](http://bizcharts.net/products/bizCharts/api/chart)
  - [Coord](http://bizcharts.net/products/bizCharts/api/coord)
  - [Axis](http://bizcharts.net/products/bizCharts/api/axis)
  - [Geom](http://bizcharts.net/products/bizCharts/api/geom)
  - [Label](http://bizcharts.net/products/bizCharts/api/label)
  - [Legend](http://bizcharts.net/products/bizCharts/api/legend)
  - [Tooltip](http://bizcharts.net/products/bizCharts/api/tooltip)
  - [Guide](http://bizcharts.net/products/bizCharts/api/guide)
  - [Facet](http://bizcharts.net/products/bizCharts/api/facet)
  - [View](http://bizcharts.net/products/bizCharts/api/view)
- 插件
  - [Slider](http://bizcharts.net/products/bizCharts/api/sliderPlugin)
- 其他
  - [scale](http://bizcharts.net/products/bizCharts/api/scale)
  - [shape](http://bizcharts.net/products/bizCharts/api/shape)
  - [dataset](http://bizcharts.net/products/bizCharts/api/dataset)
  - [connector](http://bizcharts.net/products/bizCharts/api/connector)
  - [transform](http://bizcharts.net/products/bizCharts/api/transform)
  - [theme](http://bizcharts.net/products/bizCharts/api/theme)

### 常见问题(http://bizcharts.net/products/bizCharts/docs/qa)

