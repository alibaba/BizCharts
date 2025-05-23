# Axis label 旋转

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/35ef3f30-6438-11eb-b8a3-4f1eeb0fc6f2.png)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, LineAdvance, Axis } from 'bizcharts';

// 数据源
const data = [
	{
		month: "Jan long long long long",
		city: "Tokyo",
		temperature: 7
	},
	{
		month: "Jan long long long long",
 		city: "London",
		temperature: 3.9
	},
	{
		month: "Feb long long long long",
		city: "Tokyo",
		temperature: 13
	},
	{
		month: "Feb long long long long",
		city: "London",
		temperature: 4.2
	},
	{
		month: "Mar long long long long",
		city: "Tokyo",
		temperature: 16.5
	},
	{
		month: "Mar long long long long",
		city: "London",
		temperature: 5.7
	},
	{
		month: "Apr long long long long",
		city: "Tokyo",
		temperature: 14.5
	},
	{
		month: "Apr long long long long",
		city: "London",
		temperature: 8.5
	},
	{
		month: "May long long long long",
		city: "Tokyo",
		temperature: 10
	},
	{
		month: "May long long long long",
		city: "London",
		temperature: 11.9
	},
	{
		month: "Jun long long long long",
		city: "Tokyo",
		temperature: 7.5
	},
	{
		month: "Jun long long long long",
		city: "London",
		temperature: 15.2
	},
	{
		month: "Jul",
		city: "Tokyo",
		temperature: 9.2
	},
	{
		month: "Jul long long long long",
		city: "London",
		temperature: 17
	},
	{
		month: "Aug long long long long",
		city: "Tokyo",
		temperature: 14.5
	},
	{
		month: "Aug",
		city: "London",
		temperature: 16.6
	},
	{
		month: "Sep",
		city: "Tokyo",
		temperature: 9.3
	},
	{
		month: "Sep",
		city: "London",
		temperature: 14.2
	},
	{
		month: "Oct",
		city: "Tokyo",
		temperature: 8.3
	},
	{
		month: "Oct long long long long",
		city: "London",
		temperature: 10.3
	},
	{
		month: "Nov long long long long",
		city: "Tokyo",
		temperature: 8.9
	},
	{
		month: "Nov long long long long",
		city: "London",
		temperature: 5.6
	},
	{
		month: "Dec long long long long",
		city: "Tokyo",
		temperature: 5.6
	},
	{
		month: "Dec long long long long",
		city: "London",
		temperature: 9.8
	}
];

function Demo() {
	return <Chart padding={"auto"} appendPadding={10} scale={{ month: { type: 'cat', nice: false }}} autoFit height={300} data={data} >
		<LineAdvance
			shape="smooth"
			point
			area
			position="month*temperature"
			color="city"
		/>
		<Axis name="month" label={{ rotate: 0.5, autoRotate: true, style: {textAlign: 'start', fontSize: 10 } }} />
	</Chart>
}


ReactDOM.render(<Demo />, mountNode);



```
