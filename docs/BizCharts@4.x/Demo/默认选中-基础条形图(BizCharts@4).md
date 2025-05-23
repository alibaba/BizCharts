# 默认选中-基础条形图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/19c74470-ddff-11ea-aacb-cbc6cbc7e31a.png)

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
import DataSet from "@antv/data-set";

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
		const ds = new DataSet();
		const dv = ds.createView().source(data);
		dv.source(data).transform({
			type: "sort",

			callback(a, b) {
				// 排序依据，和原生js的排序callback一致
				return a.population - b.population > 0;
			}
		});
		return (
			<Chart height={400} data={dv.rows} autoFit interactions={['element-highlight']} onGetG2Instance={c => {
				c.geometries[0].elements.forEach((e, idx) => {
					e.setState(idx === 0 ? 'active' : 'inactive', true);
				})
			}}>
				<Coordinate transpose />
				<Interval position="country*population" />
			</Chart>
		);
	}
}

ReactDOM.render(<Basic />, mountNode)

```
