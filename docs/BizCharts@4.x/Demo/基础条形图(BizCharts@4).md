# 基础条形图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/08735400-613c-11eb-b6ac-c11ccf54cc02.png)

```js
import React from "react";
import {
	G2,
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coordinate,
	Label,
	Legend,
	Interval,
	Util
} from "bizcharts";

class Basic extends React.Component {
	render() {
		const data = [
			{
				country: "中国",
				population: 131744
			},
			{
				country: "印度",
				population: 104970
			},
			{
				country: "美国",
				population: 29034
			},
			{
				country: "印尼",
				population: 23489
			},
			{
				country: "巴西",
				population: 18203
			}
		];
		data.sort((a, b) => a.population - b.population)
		return (
			<Chart height={400} data={data} autoFit>
				<Coordinate transpose />
				<Interval position="country*population" />
			</Chart>
		);
	}
}

ReactDOM.render(<Basic />, mountNode)

```
