# 多view slider(BizCharts@4.x)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/57ffac00-c6b0-11ec-afaa-f5e63d26bb5c.png)

```js
import React, { useState } from "react";
import {
	Axis,
	Chart,
	Tooltip,
	Interval,
	View,
	Line,
	Legend,
	Slider,
	getTheme,
} from "bizcharts";

const theme = getTheme();

const data = [
	{ name: "London", month: "Jan.", monthAverageRain: 18.9 },
	{ name: "London", month: "Feb.", monthAverageRain: 28.8 },
	{ name: "London", month: "Mar.", monthAverageRain: 39.3 },
	{ name: "London", month: "Apr.", monthAverageRain: 81.4 },
	{ name: "London", month: "May", monthAverageRain: 47 },
	{ name: "London", month: "Jun.", monthAverageRain: 20.3 },
	{ name: "London", month: "Jul.", monthAverageRain: 24 },
	{ name: "London", month: "Aug.", monthAverageRain: 35.6 },
	{ name: "Berlin", month: "Jan.", monthAverageRain: 12.4 },
	{ name: "Berlin", month: "Feb.", monthAverageRain: 23.2 },
	{ name: "Berlin", month: "Mar.", monthAverageRain: 34.5 },
	{ name: "Berlin", month: "Apr.", monthAverageRain: 99.7 },
	{ name: "Berlin", month: "May", monthAverageRain: 52.6 },
	{ name: "Berlin", month: "Jun.", monthAverageRain: 35.5 },
	{ name: "Berlin", month: "Jul.", monthAverageRain: 37.4 },
	{ name: "Berlin", month: "Aug.", monthAverageRain: 42.4 },
];
const average = data.reduce((pre, item) => {
	const { month, monthAverageRain } = item;
	if (!pre[month]) {
		pre[month] = 0;
	}
	pre[month] += monthAverageRain;
	return pre;
}, {});

const averageData = Object.keys(average).map((key) => {
	return {
		month: key,
		averageRain: Number((average[key] / 2).toFixed(2)),
		name: "avg",
	};
});

const scale = {
	month: {
		sync: true,
	},
	averageRain: {
		min: 0,
		max: 100,
		alias: "Average",
	},
	monthAverageRain: {
		min: 0,
		max: 100,
	},
};

const initialSlider = [0, 0.5];

const colors = theme.colors10;
/**
 * 图例开关状态
 */
let legendMap = {};
/**
 * 图表实例
 */
let chartIns;
function Grouped() {
	return (
		<Chart
			height={400}
			scale={scale}
			data={data}
			autoFit
			onSliderChange={console.log}
			onGetG2Instance={(c) => {
				chartIns = c;
				const sliderController = c.getController("slider");
				const xScale = c.getXScale();
				const xValues = xScale.values;

				handleSliderChange(initialSlider)

				sliderController.slider.component.on(
					"sliderchange",
					handleSliderChange
				);

				function handleSliderChange([start, end]) {
					const { minText, maxText } = sliderController.getMinMaxText(
						start,
						end
					);
					const sIdx = xValues.indexOf(minText);
					const eIdx = xValues.indexOf(maxText);
					c.views.forEach((view) => {
						view.filter(xScale.field, (val) => {
							const idx = xValues.indexOf(val);
							return idx >= sIdx && idx <= eIdx;
						});
					});
				}
			}}
		>
			<Tooltip shared />
			<Interval
				adjust={[
					{
						type: "dodge",
						marginRatio: 0,
					},
				]}
				color={["name", colors]}
				position="month*monthAverageRain"
			/>
			<Axis name="monthAverageRain" position="left" />
			<View data={averageData} scale={scale} padding={0}>
				<Axis name="averageRain" position="right" />
				<Line position="month*averageRain" color={colors[2]} />
			</View>
			<Legend
				custom={true}
				items={[
					{
						name: "London",
						value: "London",
						marker: {
							symbol: "square",
							style: { fill: colors[0] },
						},
					},
					{
						name: "Berlin",
						value: "Berlin",
						marker: {
							symbol: "square",
							style: { fill: colors[1] },
						},
					},
					{
						name: "平均",
						value: "avg",
						marker: {
							symbol: "hyphen",
							style: { stroke: colors[2], lineWidth: 2 },
						},
					},
				]}
				onChange={(ev) => {
					const { item } = ev;
					const { value } = item;
					const checked = !item.unchecked;
					// 设置图例项状态
					legendMap[value] = checked;
					if (value === "avg") {
						// 通过filter控制元素显示隐藏
						const view = chartIns.views[0];
						view.filter("name", (val) => {
							return legendMap[val];
						});
						// 重新渲染，触发filter
						view.render(true);
					} else {
						// 通过filter控制元素显示隐藏
						chartIns.filter("name", (val) => {
							return legendMap[val] !== false;
						});
						// 重新渲染，触发filter
						chartIns.render(true);
					}
				}}
			/>
			<Slider start={initialSlider[0]} end={initialSlider[1]} />
		</Chart>
	);
}

ReactDOM.render(<Grouped />, mountNode);

```
