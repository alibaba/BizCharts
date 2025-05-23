# 极简环图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/e51e3ed0-5d7a-11eb-b6ac-c11ccf54cc02.png)

```js
import React from "react";
import {
	Chart,
	Interval,
	Axis,
	Tooltip,
	Coordinate,
	Legend,
	View,
	Annotation,
	getTheme,
} from "bizcharts";



function Ring({ data = [], content = {}, intervalConfig = {} }) {
	const brandFill = getTheme().colors10[0];
	return (
		<Chart placeholder={false} height={200} padding="auto" autoFit>
			<Legend visible={false} />
			{/* 绘制图形 */}
			<View
				data={data}
				scale={{
					percent: {
						formatter: (val) => {
							return (val * 100).toFixed(2) + "%";
						},
					},
				}}
			>
				<Coordinate type="theta" innerRadius={0.75} />
				<Interval
					position="percent"
					adjust="stack"
					// color="type"
					// color={["type", ["rgba(100, 100, 255, 0.6)", "#eee"]]}
					color={["type", [brandFill, "#eee"]]}
					size={16}
					// style={{ fillOpacity: 0.6 }}
					// label={['type', {offset: 40}]}
					{...intervalConfig}
				/>
				<Annotation.Text
					position={["50%", "35%"]}
					content={content.siteCode}
					style={{
						lineHeight: "240px",
						fontSize: "16",
						fill: "#000",
						textAlign: "center",
					}}
				/>
				<Annotation.Text
					position={["50%", "48%"]}
					content={content.title}
					style={{
						lineHeight: "240px",
						fontSize: "16",
						fill: "#000",
						textAlign: "center",
					}}
				/>
				<Annotation.Text
					position={["50%", "62%"]}
					content={content.percent}
					style={{
						lineHeight: "240px",
						fontSize: "24",
						fill: brandFill,
						textAlign: "center",
					}}
				/>
			</View>
		</Chart>
	);
}

const myData = [
	{ type: "已完成", percent: 0.6666 },
	{ type: "待提升", percent: 0.3334 },
];
const myContent = {
	siteCode: "电商",
	title: "注册成功率",
	percent: "66.66%",
};

ReactDOM.render(
	<>
		<Ring data={myData} content={myContent} />
		<Ring
			data={myData}
			content={myContent}
			intervalConfig={{
				style: { fillOpacity: 0.6 },
				size: [
					"type",
					(type) => {
						return type === "已完成" ? 12 : 6;
					},
				],
			}}
		/>
	</>,
	mountNode
);
```
