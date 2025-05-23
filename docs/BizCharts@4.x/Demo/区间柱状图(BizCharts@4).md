# 区间柱状图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/ba375f10-bb0e-11ec-9fda-8da6a31bb9f4.png)

```js
import React from "react";
import {
	Chart,
	Interval,
	Coord,
	Interaction
} from "bizcharts";

class Columnrange extends React.Component {
	render() {
		const data = [
			{
				x: "分类一",
				y: [26, 50]
			},
			{
				x: "分类一",
				y: [76, 100]
			},
			{
				x: "分类二",
				y: [56, 108]
			},
			{
				x: "分类三",
				y: [38, 129]
			},
			{
				x: "分类四",
				y: [58, 155]
			},
			{
				x: "分类五",
				y: [45, 120]
			},
			{
				x: "分类六",
				y: [23, 99]
			},
			{
				x: "分类七",
				y: [18, 56]
			},
			{
				x: "分类八",
				y: [18, 34]
			}
		];
		return (
			<>
				<div style={{ marginBottom: 50 }}>
					<Chart height={300} data={data} autoFit >
						<Interval position="x*y" />
						<Coord transpose={true} />
						<Interaction type="active-region" />
					</Chart>
				</div>
				<Chart height={300} data={data} autoFit>
					<Interval position="x*y" />
				</Chart>
			</>
		);
	}
}

ReactDOM.render(<Columnrange />, mountNode)
```
