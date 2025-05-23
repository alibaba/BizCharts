# 桑基图布局(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/3067eea0-4937-11ed-9ffc-9b1edf6ed16c.png)

```js
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
	Util,
	getTheme
} from "bizcharts";
import DataSet from "@antv/data-set";

const urlString =
	"https://gw.alipayobjects.com/os/antvdemo/assets/data/energy.json";

function Sankeylayouts() {
	const [dataView, setDataView] = useState();
	const scale = {
		x: {
			sync: true,
		},
		y: {
			sync: true,
		},
	};

	useEffect(() => {
		fetch(urlString)
			.then(function (response) {
				return response.json();
			})
			.then(function (mydata) {
				console.log("Request successful mydata", mydata);

				const ds = new DataSet();
				const dv = ds.createView().source(mydata, {
					type: "graph",
					edges: (d) => d.links,
				});
				// diagram.sankey的配置项文档： https://g2.antv.vision/zh/docs/manual/dataset/transform#diagramsankey-%E6%A1%91%E5%9F%BA%E5%9B%BE
				dv.transform({
					type: 'diagram.sankey',
					sort: (a, b) => {
						if (a.value > b.value) {
							return 0
						} else if (a.value < b.value) {
							return -1
						}
						return 0
					}
				});
				console.log("dataView", dv);

				setDataView(dv);
			})
			.catch(function (error) {
				log("Request failed", error);
			});
	}, []);
	// edge view
	const edges = dataView && dataView.edges.map((edge) => {
		return {
			source: edge.source.name,
			target: edge.target.name,
			x: edge.x,
			y: edge.y,
			value: edge.value,
		};
	});


	const colors = getTheme().colors20;
	const colorsMap = dataView?.nodes.reduce((pre, cur, idx) => {
		pre[cur.name] = colors[idx]
		return pre;
	}, {})


	return (
		<div>
			{dataView && (
				<Chart interactions={['element-highlight']} height={500} autoFit={true} scale={scale} padding={[20, 20, 40]} >
					<Tooltip showTitle={false} showMarkers={false} />
					<Axis name="x" visible={false} />
					<Axis name="y" visible={false} />
					<Legend name='source' visible={false} />
					<View padding={0} data={edges}>
						<Geom
							type="edge"
							position="x*y"
							shape="arc"
							color={['source', name => colorsMap[name]]}
							state={{
								default: {},
								active: { style: { lineWidth: 1.5, strokeOpacity: 2 } },
							}}
							style={{ fillOpacity: 0.3, lineWidth: 0 }}
							tooltip={
								["target*source*value",
									(target, source, value) => {
										return {
											name: source + " to " + target + "</span>",
											value,
										};
									}]
							}
						/>
					</View>
					<View padding={0} data={dataView.nodes}>
						<Geom
							type="polygon"
							position="x*y"
							color="name"
							style={{
								stroke: "#fff",
							}}

							state={{
								default: {},
								active: { style: { stroke: 'red', lineWidth: 1.5, strokeOpacity: 0.9 } },
							}}
							label={["name", {
								offsetY: 10,
								style: { fill: '#666' }
							}]}
						>
						</Geom>
					</View>
				</Chart>
			)}
		</div>
	);
}

ReactDOM.render(<Sankeylayouts />, mountNode);
```
