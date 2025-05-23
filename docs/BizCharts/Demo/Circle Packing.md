# Circle Packing

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/50e928d0-437e-11eb-9041-470430d65f44.png)

```js
import $ from "jquery";
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
	Guide,
	Shape,
	Facet,
	Util
} from "bizcharts@3.5.8";
import DataSet from "@antv/data-set";

let data;
$.ajax({
	url: "https://alifd.alibabausercontent.com/materials/@bizcharts/relation-circle-packing/0.2.9/mock.json",
	async: false,
	success: (iData) => { data = iData }
});

class Circlepacking extends React.Component {
	render() {
		const dv = new DataSet.View().source(data, {
			type: "hierarchy"
		});
		dv.transform({
			type: "hierarchy.circle-packing"
		});
		const finalData = dv.getAllNodes().map(node => ({
			hasChildren: !!(node.data.children && node.data.children.length),
			name: node.data.name.split(/(?=[A-Z][^A-Z])/g).join("\n"),
			value: node.value,
			depth: node.depth,
			x: node.x,
			y: node.y,
			r: node.r
		}));

		const diameter = Math.min(mountNode.clientWidth, mountNode.clientHeight) - 20;
		return (
			<div>
				<Chart
					data={finalData}
					height={diameter}
					width={diameter}
					padding='auto'
					scale={{
						x: { min: 0, max: 1 },
						y: { min: 0, max: 1 },
					}}
					forceFit>
					<Tooltip showTitle={false} />
					<Geom
						type="point"
						position="x*y"
						shape="circle"
						active={false}
						size={["r", r => r * diameter]}
						style={{
							stroke: "rgb(183, 55, 121)"
						}}
						color={[
							"r",
							"rgb(252, 253, 191)-rgb(231, 82, 99)-rgb(183, 55, 121)"
						]}
						tooltip="name"
					>
						<Label
							content="name"
							offset={0}
							textStyle={(text, item) => {
								if (item.point.hasChildren) {
									return {
										opacity: 0
									};
								}

								return {
									textBaseline: "middle",
									fill: "grey",
									fontSize: 9,
									textAlign: "center"
								};
							}}
						/>
					</Geom>
				</Chart>
			</div>
		);
	}
}

ReactDOM.render(<Circlepacking />, mountNode)

```
