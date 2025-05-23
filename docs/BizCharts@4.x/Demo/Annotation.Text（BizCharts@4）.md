# Annotation.Text（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77b4d730-5bc4-11eb-bb7e-7ba91ac555cf.png)

```js
import React from "react";
import {
	G2,
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coord,
	Label,
	Legend,
	View,
	Annotation,
	Shape,
	Facet,
	Util,
	Slider
} from "bizcharts";
import { Button } from "@alifd/next";
console.log()

class Series extends React.Component {
	render() {
		const data = [
			{
				month: "Jan",
				city: "China",
				revenue: 7,
			},
			{
				month: "Jan",
				city: "Oversea",
				revenue: 3.9,
			},
			{
				month: "Feb",
				city: "China",
				revenue: 6.9,
			},
			{
				month: "Feb",
				city: "Oversea",
				revenue: 4.2,
			},
			{
				month: "Mar",
				city: "China",
				revenue: 9.5,
			},
			{
				month: "Mar",
				city: "Oversea",
				revenue: 5.7,
			},
			{
				month: "Apr",
				city: "China",
				revenue: 14.5,
			},
			{
				month: "Apr",
				city: "Oversea",
				revenue: 8.5,
			},
			{
				month: "May",
				city: "China",
				revenue: 18.4,
			},
			{
				month: "May",
				city: "Oversea",
				revenue: 11.9,
			},
			{
				month: "Jun",
				city: "China",
				revenue: 21.5,
			},
			{
				month: "Jun",
				city: "Oversea",
				revenue: 15.2,
			},
			{
				month: "Jul",
				city: "China",
				revenue: 25.2,
			},
			{
				month: "Jul",
				city: "Oversea",
				revenue: 17,
			},
			{
				month: "Aug",
				city: "China",
				revenue: 26.5,
			},
			{
				month: "Aug",
				city: "Oversea",
				revenue: 16.6,
			},
			{
				month: "Sep",
				city: "China",
				revenue: 23.3,
			},
			{
				month: "Sep",
				city: "Oversea",
				revenue: 14.2,
			},
			{
				month: "Oct",
				city: "China",
				revenue: 18.3,
			},
			{
				month: "Oct",
				city: "Oversea",
				revenue: 10.3,
			},
			{
				month: "Nov",
				city: "China",
				revenue: 13.9,
			},
			{
				month: "Nov",
				city: "Oversea",
				revenue: 6.6,
			},
			{
				month: "Dec",
				city: "China",
				revenue: 9.6,
			},
			{
				month: "Dec",
				city: "Oversea",
				revenue: 4.8,
			},
		];
		const cols = {
			month: {
				range: [0.05, 0.95],
			},
			revenue: {
				min: 0,
			},
		};
		return (
			<div style={{ padding: "20px" }
			}>
				<Chart height={400} data={data} scale={cols} autoFit>
					<Legend position='top-left'/>
					< Axis name="month" />
					<Axis
						name="revenue"
						label={{
							formatter: (val) => `${val}亿`,
						}}
					/>
					< Tooltip
						crosshairs={{
							type: "y",
						}}
					/>
					< Geom type="line" position="month*revenue" size={2} color={"city"} />
					<Geom
						type="point"
						position="month*revenue"
						size={4}
						shape={"circle"}
						color={"city"}
						style={{
							stroke: "#fff",
							lineWidth: 1,
						}}
					/>
					{/** https://bizcharts.net/product/BizCharts4/category/62/page/108#text-1 */}

					<Annotation.Text
						position={["50%", "50%"]}
						content="项目总数\n200"
						style={{ fill: 'red' }}
					/>
					<Annotation.DataRegion
						start={['Jun', 0]}
						end={['Jul', 0]}
						region={{ style: { fill: '#eee' } }}
						lineLength={0}
						text={{ style: { fill: 'green' }, content: 'Annotation.DataRegion' }}
					/>
					<Slider />
				</Chart>
			</div>
		);
	}
}

ReactDOM.render(<Series />, mountNode);

```
