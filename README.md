![](https://img.shields.io/badge/language-react-red.svg)  ![](https://img.shields.io/badge/license-MIT-000000.svg)  [![NPM Package](https://img.shields.io/npm/v/bizcharts.svg)](https://www.npmjs.com/package/bizcharts) [![NPM Downloads](https://img.shields.io/npm/dm/bizcharts.svg)](https://npmjs.org/package/bizcharts)

# BizCharts

BizCharts: a powerful data visualization library based [G2](https://antv.alipay.com/) React。

[More details about BizCharts](//bizcharts.net/index)

## Features
- easy to use
- strong expansion capability
- support most data visualization charts

[see more demos](//bizcharts.net/products/bizCharts/demo)
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
- [quick start](//bizcharts.net/products/bizCharts/docs/start)
- [chart introduce](//bizcharts.net/products/bizCharts/docs/chart)
- [chart type](//bizcharts.net/products/bizCharts/docs/chartType)
- [data](//bizcharts.net/products/bizCharts/docs/data)
- [DataSet](//bizcharts.net/products/bizCharts/docs/dataset)
- [dataflow](//bizcharts.net/products/bizCharts/docs/dataflow)
- [theme](//bizcharts.net/products/bizCharts/docs/theme)
- [interaction](//bizcharts.net/products/bizCharts/docs/interaction)
- [animation](//bizcharts.net/products/bizCharts/docs/animate)

### api
- [BizCharts](//bizcharts.net/products/bizCharts/api/bizcharts)
- components
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
- Plugin
  - [Slider](//bizcharts.net/products/bizCharts/api/sliderPlugin)
- others
  - [scale](//bizcharts.net/products/bizCharts/api/scale)
  - [shape](//bizcharts.net/products/bizCharts/api/shape)
  - [dataset](//bizcharts.net/products/bizCharts/api/dataset)
  - [connector](//bizcharts.net/products/bizCharts/api/connector)
  - [transform](//bizcharts.net/products/bizCharts/api/transform)
  - [theme](//bizcharts.net/products/bizCharts/api/theme)

### [FAQ](./doc/faq/faq)
