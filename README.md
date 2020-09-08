# BizCharts

[![](https://img.shields.io/travis/alibaba/BiaCharts.svg)](https://travis-ci.com/alibaba/BizCharts)
![](https://img.shields.io/badge/language-react-red.svg)  ![](https://img.shields.io/badge/license-MIT-000000.svg)  [![NPM Package](https://img.shields.io/npm/v/bizcharts.svg)](https://www.npmjs.com/package/bizcharts) [![NPM Downloads](https://img.shields.io/npm/dm/bizcharts.svg)](https://npmjs.org/package/bizcharts)

New charting and visualization library has been released: http://bizcharts.net/products/bizCharts.

[More details about BizCharts](http://bizcharts.net/index)

## Features
- React ES6 grammar
- Easy to use
- Strong expansion capability
- Support most data visualization charts

[See more demos.](http://bizcharts.net/products/bizCharts/demo)

<img src="https://user-images.githubusercontent.com/6628666/33157917-b970a70c-d040-11e7-9601-b1da1dbe26ab.png" width="800">

## Releases

- v3.5.x: https://bizcharts.net/product/bizcharts/gallery
- V4.0.0: https://bizcharts.net/product/BizCharts4/gallery

Upgrade document: https://bizcharts.net/product/BizCharts4/category/61/page/104

## Installation

### npm
```sh
$ npm install bizcharts
```

### umd
```html
 <script src="https://unpkg.com/bizcharts@${version}/umd/BizCharts.min.js"></script>
```

### Dev build
```sh
$ git clone https://github.com/alibaba/BizCharts.git
$ cd BizCharts
$ npm install
$ npm start
$ npm run build
```

### Test snapshot
Does not support external network testing right now.
```
tnpm run uitest
```

## Usage
[Try it out](https://bizcharts.net/product/BizCharts4/demo/305)

```jsx
import {Chart, Axis, Tooltip, Line, Point} from "bizcharts";

const data = [...];

<Chart height={400} data={data} forceFit>
  <Axis name="temperature" label={{formatter: val => `${val}°C`}} />
  <Line position="month*temperature" size={2} color={'city'} />
  <Point position="month*temperature" size={4} color={'city'} />
</Chart>
```


### [FAQ](http://bizcharts.net/products/bizCharts/docs/qa)

### How to Contribute
We welcome all contributions. You could submit any ideas as pull requests. Thank you for your interest and have a good time.
Please let us know how can we help. Do check out [issues](https://github.com/alibaba/BizCharts/issues) for bug reports or suggestions first.


#### Update

G2 decided to terminate the "Experience Improvement Program". In verson `@antv/g2@3.4.7`（released at 2018.12.26） and above, all tracking code is removed, no unexpected remote request will be sent while you are using G2. And Bizcharts Upgrade the dependent version the first time at 2018.12.26 24:00.

### License
BizCharts is available under the License MIT.
