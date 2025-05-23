# 自定义 tooltip 为表格（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/e2bb6140-78fe-11ec-b4c3-d9dab51b42f6.png)

```js
import React from "react";
import {
	G2,
	Chart,
	Geom,
	Axis,
	Tooltip,
	Legend,
	Util,
	getTheme
} from "bizcharts@4.1.14"

const colors = getTheme().colors10;
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

class Curved extends React.Component {
	cols = {
		month: {
			range: [0, 1]
		}
	}
	render() {
		return (
			<Chart height={400} data={data} scale={this.cols} autoFit onAxisLabelClick={console.log}>
				<Legend
					itemName={{
						style: (item) => {
							return { fill: item.name == 'Tokyo' ? colors[0] : colors[1] }
						}
					}}
				/>
				<Axis name="month" />
				<Axis
					name="temperature"
					label={{
						formatter: val => `${val}°C`
					}}
				/>
				<Tooltip>
					{
						(title, items) => {
							// 配置了 class="g2-tooltip-list" 则会将模版中的内容渲染进来
							// 您也可以根据 items 自行渲染
							return (<table>
								<thead>
									<tr>
										<th>&nbsp;</th>
										<th>名称</th>
										<th>值</th>
									</tr>
								</thead>
								<tbody
									class="g2-tooltip-list"
								>
								</tbody>
							</table>);
						}
					}
				</Tooltip>
				<Geom
					type="point"
					position="month*temperature"
					size={4}
					shape={"circle"}
					color={"city"}
					style={{
						stroke: "#fff",
						lineWidth: 1
					}}
				/>
				<Geom
					type="line"
					position="month*temperature"
					size={2}
					color={"city"}
					shape={"smooth"}
				/>
			</Chart>
		);
	}
}

ReactDOM.render(<Curved />, mountNode);

```
