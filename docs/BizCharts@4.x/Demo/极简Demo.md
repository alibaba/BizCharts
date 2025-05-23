# 极简Demo

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/7f7a52d0-d0c1-11ea-b9f5-33045a8270a9.png)

```js

import { Chart, Interval, Tooltip, Line, Axis, Coordinate, Point, Legend } from 'bizcharts';


const data = [
	{ year: '1951 年', sales: 38 },
	{ year: '1952 年', sales: 52 },
	{ year: '1956 年', sales: 61 },
	{ year: '1957 年', sales: 45 },
	{ year: '1958 年', sales: 48 },
	{ year: '1959 年', sales: 38 },
	{ year: '1960 年', sales: 38 },
	{ year: '1962 年', sales: 38 },
];
const scale = {
	sales: {
		min: 0
	}
}

const multiLineData = [
	{
		month: "Jan",
		city: "Tokyo",
		temperature: 7
	},
	{
		month: "Jan",
		city: "London",
		temperature: 3.9
	},
	{
		month: "Feb",
		city: "Tokyo",
		temperature: 6.9
	},
	{
		month: "Feb",
		city: "London",
		temperature: 4.2
	},
	{
		month: "Mar",
		city: "Tokyo",
		temperature: 9.5
	},
	{
		month: "Mar",
		city: "London",
		temperature: 5.7
	},
	{
		month: "Apr",
		city: "Tokyo",
		temperature: 14.5
	},
	{
		month: "Apr",
		city: "London",
		temperature: 8.5
	},
	{
		month: "May",
		city: "Tokyo",
		temperature: 18.4
	},
	{
		month: "May",
		city: "London",
		temperature: 11.9
	},
	{
		month: "Jun",
		city: "Tokyo",
		temperature: 21.5
	},
	{
		month: "Jun",
		city: "London",
		temperature: 15.2
	},
	{
		month: "Jul",
		city: "Tokyo",
		temperature: 25.2
	},
	{
		month: "Jul",
		city: "London",
		temperature: 17
	},
	{
		month: "Aug",
		city: "Tokyo",
		temperature: 26.5
	},
	{
		month: "Aug",
		city: "London",
		temperature: 16.6
	},
	{
		month: "Sep",
		city: "Tokyo",
		temperature: 23.3
	},
	{
		month: "Sep",
		city: "London",
		temperature: 14.2
	},
	{
		month: "Oct",
		city: "Tokyo",
		temperature: 18.3
	},
	{
		month: "Oct",
		city: "London",
		temperature: 10.3
	},
	{
		month: "Nov",
		city: "Tokyo",
		temperature: 13.9
	},
	{
		month: "Nov",
		city: "London",
		temperature: 6.6
	},
	{
		month: "Dec",
		city: "Tokyo",
		temperature: 9.6
	},
	{
		month: "Dec",
		city: "London",
		temperature: 4.8
	}
];

const pieData = [
	{ item: '事例一', percent: 0.4 },
	{ item: '事例二', percent: 0.21 },
	{ item: '事例三', percent: 0.17 },
	{ item: '事例四', percent: 0.13 },
	{ item: '事例五', percent: 0.09 },
];

const cols = {
	percent: {
		formatter: val => {
			val = val * 100 + '%';
			return val;
		},
	},
};

// interactions 交互配置 https://bizcharts.net/product/BizCharts4/category/62/page/112#type

function Demo() {
	return (
		<div style= {{ padding: '20px' }
}>
	<h3>柱状图 < /h3>
	< Chart height = { 400} scale = { scale } autoFit data = { data } interactions = { ['active-region']} appendPadding = { [20, 0, 0, 0]} >
		<Interval position="year*sales" color = "year" />
			<Tooltip shared />
			</Chart>
			< h3 > 单条折线图 < /h3>
			< Chart height = { 400} scale = { scale } autoFit data = { data } appendPadding = { [20, 0, 0, 0]} >
				<Line position="year*sales" shape = "smooth" />
					<Point position="year*sales" />
						<Tooltip showCrosshairs />
						</Chart>
						< h3 > 多条折线图 < /h3>
						< Chart scale = {{ temperature: { min: 0 } }} padding = { [10, 20, 50, 40]} autoFit height = { 500} data = { multiLineData } >
							<Line shape="smooth" position = "month*temperature" color = "city" />
								<Point position="month*temperature" color = "city" />
									<Tooltip shared={ true } showCrosshairs />
										<Legend itemName={
	{
		style: {
			fill: "#333"
		}
	}
} />
	< /Chart>
	< h3 > 饼图 < /h3>
	< Chart height = { 400} data = { pieData } scale = { cols } autoFit interactions = { ['element-single-selected']} >
		<Coordinate type="theta" radius = { 0.75} />
			<Tooltip showTitle={ false } />
				< Axis visible = { false} />
					<Interval
          position="percent"
adjust = "stack"
color = "item"
style = {{
	lineWidth: 1,
		stroke: '#fff',
          }}
label = {
	['*', {
		content: (data) => {
			return `${data.item}: ${data.percent * 100}%`;
		},
	}]}
	/>
	</Chart>
	< /div>
  )
}

ReactDOM.render(<Demo />, mountNode);
```
