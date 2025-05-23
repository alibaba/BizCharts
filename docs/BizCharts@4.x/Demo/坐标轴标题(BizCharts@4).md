# 坐标轴标题(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/4e175710-dd40-11eb-b65f-17e3e7c5eaa2.png)

```js
import React from "react";
import ReactDOM from "react-dom";
import { Chart, Annotation, Line, Point, Tooltip } from "bizcharts";

// 数据源
const data = [
	{
		year: "1991",
		value: 3,
	},
	{
		year: "1992",
		value: 4,
	},
	{
		year: "1993",
		value: 3.5,
	},
	{
		year: "1994",
		value: 5,
	},
	{
		year: "1995",
		value: 4.9,
	},
	{
		year: "1996",
		value: 6,
	},
	{
		year: "1997",
		value: 7,
	},
	{
		year: "1998",
		value: 9,
	},
	{
		year: "1999",
		value: 13,
	},
];

function Demo() {
	return (
		<Chart
			appendPadding={[10, 0, 0, 10]}
			autoFit
			height={500}
			data={data}
			scale={{ value: { min: 0, alias: '人均年收入' }, year: { range: [0, 1] } }}
		>
			<Annotation.Text
				position={['min', 'max']}
				content="人均年收入(单位:千)"
				offsetX={-30}
				style={{
					textAlign: 'left',
					fontSize: 14
				}} />
			<Line position="year*value" />
			<Point position="year*value" />
			<Tooltip showCrosshairs />
		</Chart>
	);
}

ReactDOM.render(<Demo />, mountNode);

```
