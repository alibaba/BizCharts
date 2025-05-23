# 弧形链接图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/0bd9c710-436d-11eb-9e2b-6dd1d3623770.png)

```js
import React, { useState, useEffect } from "react";
import {
	Chart,
	Edge,
	Point,
	Axis,
	Tooltip,
	Coord,
	Label,
	Legend,
	View,
	Guide,
	Shape,
} from "bizcharts";
import DataSet from "@antv/data-set";

function Arc() {
	const ds = new DataSet();
	const dv = ds.createView();
	const [data, setData] = useState();
	const [nodes, setNodes] = useState([]);
	const [edges, setEdges] = useState([]);

	useEffect(() => {
		fetch("https://alifd.alibabausercontent.com/materials/@bizcharts/relation-arc/0.2.8/mock.json").then(res =>
			res.json()
		).then(setData);
	}, [])

	useEffect(() => {
		if (data) {
			dv.source(data, {
				type: "graph",
				edges: d => d.links
			});
			dv.transform({
				type: "diagram.arc",
				marginRatio: 0.5 // sortBy: 'frequency' // id, weight, frequency, {function}
			});
			setNodes(dv.nodes);
			setEdges(dv.edges);
		}
	}, [data])
	return (
		<Chart padding={[40, 30, 65, 4]} pure autoFit height={400} forceUpdate>
			<Tooltip showTitle={false} />
			<View data={edges}>
				<Edge
					position="x*y"
					shape="arc"
					color="source"
					opacity={0.5}
					tooltip={"source*target"}
				/>
			</View>
			<View data={nodes}>
				<Point
					position="x*y"
					shape="circle"
					size="value"
					color="id"
					opacity={0.5}
					style={{
						stroke: "grey"
					}}
					label={['name', {
						offset: -12,
						rotate: Math.PI * 0.5,
						style: {
							textAlign: "left",
							fill: "black"
						}
					}]}
				/>
			</View>
		</Chart>
	);
}

ReactDOM.render(<Arc />, mountNode)

```
