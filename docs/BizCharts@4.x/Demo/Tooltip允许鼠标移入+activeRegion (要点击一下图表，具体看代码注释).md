# Tooltip允许鼠标移入+activeRegion (要点击一下图表，具体看代码注释)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/73f1aef0-8006-11eb-ac0c-9f8d2c3c1809.png)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Interval, Interaction, Tooltip } from 'bizcharts';
import { Button } from '@alifd/next';

// 数据源
const data = [
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

function Demo() {
	return <Chart scale={{ temperature: { min: 0 } }} padding={[10, 20, 50, 40]}
		autoFit height={500} data={data} >
		<Interval shape="smooth" position="month*temperature" color="city" />
		<Tooltip shared={true} lock >
			{
				(title, items) => {
					return <div style={{ padding: 10 }}>
						{title}
						<div style={{ padding: 10 }}>
							{
								items.map(it => {
									console.log(it); // 这里可以获取颜色等信息
									return <div>{it.data.city} : {it.data.temperature}</div>
								})
							}
						</div>
						<Button type="primary" onClick={() => alert('点击了tooltip中的button')}> button </Button>
					</div>
				}
			}
		</Tooltip>
		<Interaction type="active-region-click" />
		<Interaction type="active-region" />
	</Chart>
}



ReactDOM.render(<Demo />, mountNode);



```
