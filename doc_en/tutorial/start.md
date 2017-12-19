# BizCharts

BizCharts is a charting library based on G2 that allows users to construct charts using React components instead of the usual G2 syntax. This library is meant to be a comprehensive library supporting charts such as the following

* Many Base Chart Templates to Choose Form
* Visualization and Aggregation of large data sets
* Multi-axis / Charts on a non linear coordinate system
* Interactivity
* Map Based Charts

## Key Library Features

- Based on G2、React
- Robust
- Stable
- Extensible
- High customizability 

## Installation

### Using npm

We recommend that you install BizCharts using `npm` using the following command

```bash
npm install bizcharts --save
```

After installation is complete, you can include it in your application using either the  `import` or `require` keywords.

## Quick Start

Once Bizcharts has been imported, we can start building our first chart

Listed below is the code needed to build a basic bar chart

1. Create Wrapper NOde

	In the `<body>` of your html file, create an element if an `id` of your choice

	```html
	<div id="mountNode"></div>
	```

2. Write a component to render the chart

	- Pull in the base components needed by the chart component
	- Use these base components to construct the chart
	- Mount the chart on the element by specifying its id (`mountNode` in this example)

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

// Data Source
const data = [
  { genre: 'Sports', sold: 275, income: 2300 },
  { genre: 'Strategy', sold: 115, income: 667 },
  { genre: 'Action', sold: 120, income: 982 },
  { genre: 'Shooter', sold: 350, income: 5271 },
  { genre: 'Other', sold: 150, income: 3710 }
];

// Specify Options
const cols = {
  sold: { alias: 'Sales' },
  genre: { alias: 'Game Category' }
};

// Render Chart
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

The above code will render a bar chart looking something like this:

![](https://img.alicdn.com/tps/TB1PVaoPFXXXXcSaXXXXXXXXXXX-519-401.png)


## Telemetry
To serve its users better, G2 will send diagnostic info and the application URL back to AntV. As BizCharts is based on G2, this will happen as well and there is no explicitly blocking of this behavior. Request is currently being made to:

```https://kcart.alipay.com/web/bi.do```

Note that only the application URL and the G2 version is collected. All this information is used to help the development of G2. If you are concerned about this tracking behavior, you can turn it off by calling the following function

```js
// 关闭 G2 的体验改进计划打点请求（如：服务端渲染）
BizCharts.track(false);
```
