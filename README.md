![](https://img.shields.io/badge/language-react-red.svg)  ![](https://img.shields.io/badge/license-MIT-000000.svg)  [![NPM Package](https://img.shields.io/npm/v/bizcharts.svg)](https://www.npmjs.com/package/bizcharts) [![NPM Downloads](https://img.shields.io/npm/dm/bizcharts.svg)](https://npmjs.org/package/bizcharts)

# BizCharts

BizCharts: a powerful data visualization library based [G2](https://antv.alipay.com/) React。

[More details about BizCharts](https://alibaba.github.io/BizCharts/)

## Features
- easy to use
- strong expansion capability
- support most data visualization charts

[see more demos](https://alibaba.github.io/BizCharts/demo.html)
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
- [quick start](doc/tutorial/start.md)
- [chart introduce](./doc/tutorial/chart.md)
- [chart type](./doc/tutorial/chartType.md)
- [data](./doc/tutorial/data.md)
- [DataSet](./doc/tutorial/dataset.md)
- [dataflow](./doc/tutorial/dataflow.md)
- [theme](./doc/tutorial/theme.md)
- [interaction](./doc/tutorial/interaction.md)
- [animation](./doc/tutorial/animate.md)
- [load according need](/doc/tutorial/needload.md)


### api
- [BizCharts](./doc/api/bizcharts.md)
- components
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
- Plugin
  - [Slider](//github.com/alibaba/BizCharts/blob/slider/plugin/slider/README.md)
- others
  - [scale](./doc/api/scale.md)
  - [shape](./doc/api/shape.md)
  - [dataset](./doc/api/dataset.md)
  - [connector](./doc/api/connector.md)
  - [transform](./doc/api/transform.md)
  - [theme](./doc/api/theme.md)

### [FAQ](./doc/faq/faq.md)
