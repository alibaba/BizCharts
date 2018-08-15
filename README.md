![](https://img.shields.io/badge/language-react-red.svg)  ![](https://img.shields.io/badge/license-MIT-000000.svg)  [![NPM Package](https://img.shields.io/npm/v/bizcharts.svg)](https://www.npmjs.com/package/bizcharts) [![NPM Downloads](https://img.shields.io/npm/dm/bizcharts.svg)](https://npmjs.org/package/bizcharts)

# BizCharts

BizCharts: a powerful data visualization library based [G2](https://antv.alipay.com/) React。

[More details about BizCharts](http://bizcharts.net/index)

## Features
- easy to use
- strong expansion capability
- support most data visualization charts

[see more demos](http://bizcharts.net/products/bizCharts/demo)
<img src="https://user-images.githubusercontent.com/6628666/33157917-b970a70c-d040-11e7-9601-b1da1dbe26ab.png" width="800">

## Installation

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
// add 127.0.0.1 localhost
$ npm run[-script] demo
// open in browser http://localhost:3510/
```

## Usage
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

## Document
### tutorial
- [quick start](http://bizcharts.net/products/bizCharts/docs/start)
- [chart introduce](http://bizcharts.net/products/bizCharts/docs/chart)
- [chart type](http://bizcharts.net/products/bizCharts/docs/chartType)
- [data](http://bizcharts.net/products/bizCharts/docs/data)
- [DataSet](http://bizcharts.net/products/bizCharts/docs/dataset)
- [dataflow](http://bizcharts.net/products/bizCharts/docs/dataflow)
- [theme](http://bizcharts.net/products/bizCharts/docs/theme)
- [interaction](http://bizcharts.net/products/bizCharts/docs/interaction)
- [animation](http://bizcharts.net/products/bizCharts/docs/animate)

### api
- [BizCharts](http://bizcharts.net/products/bizCharts/api/bizcharts)
- components
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
- Plugin
  - [Slider](http://bizcharts.net/products/bizCharts/api/sliderPlugin)
- others
  - [scale](http://bizcharts.net/products/bizCharts/api/scale)
  - [shape](http://bizcharts.net/products/bizCharts/api/shape)
  - [dataset](http://bizcharts.net/products/bizCharts/api/dataset)
  - [connector](http://bizcharts.net/products/bizCharts/api/connector)
  - [transform](http://bizcharts.net/products/bizCharts/api/transform)
  - [theme](http://bizcharts.net/products/bizCharts/api/theme)

### [FAQ](http://bizcharts.net/products/bizCharts/docs/qa)
