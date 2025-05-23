# 分组柱状图数值为null时居中展示

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/7c3a0600-0df8-11eb-8e3a-e320dddad297.png)

```js
import React from "react";
import {
	G2,
	Chart,
	Tooltip,
	Interval,
	Interaction
} from "bizcharts";

const data = [
	{ name: 'London', month: 'Jan.', avgRainfall: 18.9 },
	{ name: 'London', month: 'Feb.', avgRainfall: 28.8 },
	{ name: 'London', month: 'Mar.', avgRainfall: 39.3 },
	{ name: 'London', month: 'Apr.', avgRainfall: 20.4 },
	{ name: 'London', month: 'May', avgRainfall: 47 },
	{ name: 'London', month: 'Jun.', avgRainfall: 20.3 },
	{ name: 'London', month: 'Jul.', avgRainfall: 24 },
	{ name: 'London', month: 'Aug.', avgRainfall: null },
	{ name: 'Paris', month: 'Jan.', avgRainfall: 19.9 },
	{ name: 'Paris', month: 'Feb.', avgRainfall: 28.8 },
	{ name: 'Paris', month: 'Mar.', avgRainfall: 29.3 },
	{ name: 'Paris', month: 'Apr.', avgRainfall: null },
	{ name: 'Paris', month: 'May', avgRainfall: 67 },
	{ name: 'Paris', month: 'Jun.', avgRainfall: null },
	{ name: 'Paris', month: 'Jul.', avgRainfall: 23 },
	{ name: 'Paris', month: 'Aug.', avgRainfall: null },
	{ name: 'Berlin', month: 'Jan.', avgRainfall: 12.4 },
	{ name: 'Berlin', month: 'Feb.', avgRainfall: 23.2 },
	{ name: 'Berlin', month: 'Mar.', avgRainfall: 34.5 },
	{ name: 'Berlin', month: 'Apr.', avgRainfall: null },
	{ name: 'Berlin', month: 'May', avgRainfall: 52.6 },
	{ name: 'Berlin', month: 'Jun.', avgRainfall: 35.5 },
	{ name: 'Berlin', month: 'Jul.', avgRainfall: 37.4 },
	{ name: 'Berlin', month: 'Aug.', avgRainfall: 42.4 },
];

const scale = {
	month: {
		alias: '月份'
	},
	avgRainfall: {
		alias: '月均降雨量'
	}
}

function Grouped() {
	return (
		<Chart height={400} padding="auto" data={data} autoFit filter={[
			['avgRainfall', val => val != null] // 图表将会只渲染过滤后的数据
		]}>
			<Interval
				adjust={[
					{
						type: 'dodge',
						marginRatio: 0,
					},
				]}
				color="name"
				position="month*avgRainfall"
			/>
			<Tooltip shared />
			<Interaction type="active-region" />
		</Chart>
	);
}

ReactDOM.render(<Grouped />, mountNode)
```
