# 通知
非常遗憾通知大家，因组织调整，BizCharts维护团队已解散。6月后官网站点数据库将被下线。
所有文档已迁移至本仓库docs目录下。  
感谢大家这么多年的陪伴，大家后续可迁移使用AntV图表组件。  
AntV API 和 Bizcharts本身是同源，迁移成本最低。同时[DeepSeek](https://www.deepseek.com/) 也可以帮助你完成迁移。同时如果您的项目只是维护不迭代，代码开发问题可以直接咨询DeepSeek 可以提供比较精准的答疑。


# BizCharts

[![](https://img.shields.io/travis/alibaba/BiaCharts.svg)](https://travis-ci.com/alibaba/BizCharts)
![](https://img.shields.io/badge/language-react-red.svg)  ![](https://img.shields.io/badge/license-MIT-000000.svg)  [![NPM Package](https://img.shields.io/npm/v/bizcharts.svg)](https://www.npmjs.com/package/bizcharts) [![NPM Downloads](https://img.shields.io/npm/dm/bizcharts.svg)](https://npmjs.org/package/bizcharts)

New charting and visualization library has been released: https://bizcharts.taobao.com/products/bizCharts.



## Features
- React ES6 grammar
- Easy to use
- Strong expansion capability
- Support most data visualization charts

[See more demos.](https://bizcharts.taobao.com/products/bizCharts/demo)

<img src="https://user-images.githubusercontent.com/6628666/33157917-b970a70c-d040-11e7-9601-b1da1dbe26ab.png" width="800">

## Releases

- v3.5.x: https://bizcharts.taobao.com/product/bizcharts/gallery
- V4.0.0: https://bizcharts.taobao.com/product/BizCharts4/gallery

Upgrade document: https://bizcharts.taobao.com/product/BizCharts4/category/61/page/104

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
[Try it out](https://bizcharts.taobao.com/product/BizCharts4/demo/305)

```jsx
import {Chart, Axis, Tooltip, Line, Point} from "bizcharts";

const data = [...];

<Chart height={400} data={data} forceFit>
  <Axis name="temperature" label={{formatter: val => `${val}°C`}} />
  <Line position="month*temperature" size={2} color={'city'} />
  <Point position="month*temperature" size={4} color={'city'} />
</Chart>
```


### [FAQ](https://bizcharts.taobao.com/products/bizCharts/docs/qa)

### How to Contribute
We welcome all contributions. You could submit any ideas as pull requests. Thank you for your interest and have a good time.
Please let us know how can we help. Do check out [issues](https://github.com/alibaba/BizCharts/issues) for bug reports or suggestions first.


#### Update

G2 decided to terminate the "Experience Improvement Program". In version `@antv/g2@3.4.7`（released at 2018.12.26）and above, all tracking code is removed, no unexpected remote request will be sent while you are using G2. And Bizcharts Upgrade the dependent version the first time at 2018.12.26 24:00.

### License
BizCharts is available under the License MIT.
