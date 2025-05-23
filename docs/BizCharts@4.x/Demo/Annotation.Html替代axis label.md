# Annotation.Html替代axis label

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/5c964fb0-a78f-11ed-bfcb-853eef9a9748.png)

```js
import React from "react";
import ReactDOM from "react-dom";
import {
	Chart,
	Interval,
	Point,
	Tooltip,
	Legend,
	getTheme,
	Axis,
	Annotation,
} from "bizcharts";
console.log(getTheme());

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
		value: 6.5,
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

data.forEach((item) => (item.type = item.value > 6 ? 1 : 0));

function Demo() {
	return (
		<>
			<Chart
				appendPadding={[10, 0, 0, 10]}
				autoFit
				height={500}
				data={data}
				onLineClick={console.log}
				scale={{
					value: { min: 0, alias: "人均年收入", type: "linear-strict" },
				}}
			>
				<Axis name="year" label={null} />
				{data.map((item) => (
					<Annotation.Html
						offsetY={10}
						position={{
							year: item.year,
							value: 0,
						}}
						html={`<div style='transform:translateX(-50%);color:${item.value <= 6 ? "red" : "auto"
							};'>${item.year}</div>`}
					/>
				))}
				<Interval
					position="year*value"
					color={["type", ["red", "dodgerblue"]]}
					label={['value', v => {
						return {
							style: {
								fill: v <= 6 ? 'red' : 'dodgerblue'
							}
						}
					}]}
					tooltip={['year*value',(title,value)=>{
						return {
							title,
							value,
							name:'人均年收入'
						}
					}]}
				/>
				<Legend name="type" visible={false} />
				<Tooltip showCrosshairs follow={false} />
			</Chart>
		</>
	);
}

ReactDOM.render(<Demo />, mountNode);

```
