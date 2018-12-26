# BizCharts

[![](https://img.shields.io/travis/alibaba/BiaCharts.svg)](https://travis-ci.com/alibaba/BizCharts)
![](https://img.shields.io/badge/language-react-red.svg)  ![](https://img.shields.io/badge/license-MIT-000000.svg)  [![NPM Package](https://img.shields.io/npm/v/bizcharts.svg)](https://www.npmjs.com/package/bizcharts) [![NPM Downloads](https://img.shields.io/npm/dm/bizcharts.svg)](https://npmjs.org/package/bizcharts)

New charting and visualization library has been released: http://bizcharts.net/products/bizCharts.

Please move to it and we won't maintain the old version soon.

[More details about BizCharts](http://bizcharts.net/index)

## Features
- React es6 grammar
- Easy to use
- Strong expansion capability
- Support most data visualization charts

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
  <Tooltip crosshairs={{type : 'y'}} />
  <Geom type="line" position="month*temperature" size={2} color={'city'} />
  <Geom type="point" position="month*temperature" size={4} color={'city'} />
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

### How to Contribute
We welcome all contributions. You could submit any ideas as pull requests. Thank you for your interest and have a good time.
Please let us know how can we help. Do check out [issues](https://github.com/alibaba/BizCharts/issues) for bug reports or suggestions first.

### Experience improvement plan description

~~In order to better service to users, and G2 will monitoring, such as URL information is sent back to AntV server, BizCharts did not close the request: https://kcart.alipay.com/web/bi.do~~

~~No other information is collected except the URL and G2 version information, all in order to have a better understanding of how G2 works and better serve users. If you are worried, you can close it by the following code:~~

```
// close G2 experience improvement plan dot request (such as server-side rendering)
BizCharts.Track (false);
```

#### update:

G2 decided to terminate the "Experience Improvement Program". In verson @antv/g2@3.4.7（released at 2018.12.26） and above, all tracking code is removed, no unexpected remote request will be sent while you are using G2. And Bizcharts Upgrade the dependent version the first time at 2018.12.26 24:00.

### License
BizCharts is available under the License MIT.
