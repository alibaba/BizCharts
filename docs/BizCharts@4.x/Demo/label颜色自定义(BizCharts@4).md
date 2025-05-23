# label颜色自定义(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/e9ec52d0-c156-11ec-b286-a948fc2b85e5.png)

```js
import React from "react";
import ReactDOM from "react-dom";
import { Chart, Line, Point, Tooltip,getTheme, Axis } from "bizcharts";
console.log(getTheme())

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
		<>
			<Chart
				appendPadding={[10, 0, 0, 10]}
				autoFit
				height={500}
				data={data}
				onMouseleave={(e)=>{
					// debugger;
				}}
				scale={{ value: { min: 0, alias: '人均年收入', type: 'linear-strict' }, year: { range: [0, 1] } }}
			>
				<Axis name="year" label={{ style: () => Math.random() > 0.5 ? { fill: 'red' } : { fill: '#000' } }}/>
				<Line position="year*value" />
				<Point position="year*value" />
				<Tooltip showCrosshairs follow={false} />
			</Chart>
		</>
	);
}

ReactDOM.render(<Demo />, mountNode);

```
