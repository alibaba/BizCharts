# 旭日图（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/62a53a70-7bfd-11eb-9a78-1b973196c7b5.png)

```js
import $ from "jquery";
import React from "react";
import {
	Chart,
	Axis,
	Tooltip,
	Coordinate,
	Legend,
	Polygon,
	Interaction
} from "bizcharts";
import DataSet from "@antv/data-set";

let data;
$.ajax({
	url: "https://alifd.alibabausercontent.com/materials/@bizcharts/relation-sunburst/0.2.8/mock.json",
	async: false,
	success: (iData) => { data = iData }
});

class Sunburst extends React.Component {
	render() {
		const { DataView } = DataSet;
		const dv = new DataView();
		dv.source(data, {
			type: "hierarchy"
		}).transform({
			type: "hierarchy.partition",
			// 根据树形数据生成相邻层次图 Adjacency Diagram 布局
			field: "sum",
			as: ["x", "y"]
		});
		const source = [];
		const nodes = dv.getAllNodes();
		nodes.map(node => {
			if (node.depth === 0) {
				// 父节点不展示
				return;
			}

			const obj = {};
			obj.label = node.data.label;
			obj.sum = node.data.sum;
			obj.uv = node.data.uv;
			obj.value = node.value;
			obj.x = node.x;
			obj.y = node.y;
			source.push(obj);
			return node;
		});
		return (
			<Chart data={source} autoFit={true} height={400}>
				<Coordinate type="polar" innerRadius={0.3} />
				<Axis visible={false} />
				<Legend visible={false} />
				<Tooltip showTitle={false} showMarkers={false} />
				<Polygon
					position="x*y"
					active={false}
					color={["value", "#BAE7FF-#1890FF-#0050B3"]}
					style={{
						stroke: "#FFF",
						lineWidth: 1
					}}
					tooltip="label*sum"
				/>
				<Interaction type='element-highlight' />
			</Chart>
		);
	}
}

ReactDOM.render(<Sunburst />, mountNode)

```
