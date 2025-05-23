# 柱状图 color label callback自定义配置

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/a86045e0-d172-11ea-bfea-718cc68fcf72.png)

```js
import React from "react";
import ReactDOM from "react-dom";
import { Chart, Line, Point, Tooltip, Axis, Interaction, Legend, Interval, Annotation } from "bizcharts";

// 数据源
const data = [
	{ year: '2013', value: -3.1, marked: true },
	{ year: '2014', value: 0.8, marked: true },
	{ year: '2015', value: 2.3, marked: false },
	{ year: '2016', value: 3.5, marked: false },
	{ year: '2017', value: 5.4, marked: false },
];

const scale = {
	'value': {
		alias: '现金流(亿)',
		nice: true,
		formatter: (val) => {
			return `${val} 亿`;
		}
	}
}

const dataMarkerCfg = {
	position: ["2014", 0.8],
	autoAdjust: false,
	// 文本style配置
	text: {
		content: "宏观经济过热，受稳健货币政策影\n响，公司现金流稳步上升，\n但还是存在风险",
		style: {
			textAlign: "center",
			fill: "green",
		},
	},
	// line?: null | { style?: ShapeAttrs; length?: number };
	//线条style配置
	line: {
		length: 90,
		style: {
			stroke: "green",
		},
	},
};

const axisCfg = {
	title: {
		style: {
			fontSize: '14',
			fill: '#ff5957',
			fontWeight: 'bold',
		}
	}
}

function Demo() {
	return (
		<Chart
      padding= { [30, 20, 50, 70]}
			autoFit
			height = { 500}
			data = { data }
			scale = { scale }
		>
		<Axis name="year" />
			<Axis name ="value" { ...axisCfg } />
				< Interaction type = "active-region" />

					<Tooltip showCrosshairs showMarkers = { false} />
						<Interval position="year*value" color = {
							['year*value*marked', (year, value, marked) => {
								return marked ? '#36c361' : '#ff5957';
							}]} label = {
								['year*value', (year, value) => {
									return {
										content: (originData) => {
											if (originData.year === '2014') {
												return null;
											}
											return value;
										},
									};
								}]} />
								<Legend visible={ false } />
									< Annotation.DataMarker {...dataMarkerCfg } />
										< /Chart>
  );
}

ReactDOM.render(<Demo />, mountNode);

```
