# 缩略轴使用demo

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/1e1f9ba0-3216-11ec-87eb-ffd7ec19ab6e.png)

```js
import React from "react";
import ReactDOM from "react-dom";
import { Chart, Line, Point, Slider } from "bizcharts";

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
		value: undefined,
	},
	{
		year: "1996",
		value: undefined,
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
	let flag = false;
	return (
		<Chart
			padding={[10, 20, 50, 40]}
			autoFit
			height={250}
			data={data}
			scale={{ value: { min: 0 } }}
			onGetG2Instance={(c => {
				const slider = c.getController('slider').slider.component
				slider.on('sliderchange', console.log);
				c.on('afterrender', () => {
					// 获取设置的slider padding
					const [paddingTop, paddingRight, paddingBottom, paddingLeft] = slider.cfg.padding;
					// 重新计算slider宽度，并更新配置重绘
					slider.update({
						...slider.cfg,
						width: slider.cfg.width - paddingLeft
					})
					slider.render()
				})

			})}
		>
			<Line position="year*value" />
			<Point position="year*value" />
			<Slider
				start={0.2}
				padding={[0, 0, 0, 100]}
				formatter={(v, d, i) => {
					flag = !flag;
					return `${v}年${flag ? "开始" : "结束"}`;
				}}
			/>
		</Chart>
	);
}

ReactDOM.render(<Demo />, mountNode);

```
