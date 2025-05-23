# 柱状图 Region覆盖

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/691bf690-e905-11ea-9184-4f0c59399dde.png)

```js
import React, { useState, useEffect, useRef } from "react";
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

const { Region } = Guide;

function Basiccolumn() {

	const data = [
		{
			year: "1951 年",
			sales: 38
		},
		{
			year: "1952 年",
			sales: 52
		},
		{
			year: "1956 年",
			sales: 61
		},
		{
			year: "1957 年",
			sales: 145
		},
		{
			year: "1958 年",
			sales: 48
		},
		{
			year: "1959 年",
			sales: 38
		},
		{
			year: "1960 年",
			sales: 38
		},
		{
			year: "1962 年",
			sales: 38
		}
	];
	const cols = {
		sales: {
			tickInterval: 20
		}
	};

	const ref = useRef({ curIdx: 0 });
	const [region, setRegion] = useState({ start: [0, 0], end: [0, 0] });
	const [curIdx, setCurIdx] = useState(0);

	useEffect(() => {
		setInterval(() => {
			const idx = ref.current.curIdx + 1;
			ref.current.curIdx = idx;
			setCurIdx(idx % data.length)
		}, 1000)
	}, [])

	useEffect(() => {
		debugger
		setRegion(getRegionPosition(curIdx, data));
	}, [curIdx])

	return (
		<div>
			<Chart height={400} data={data} scale={cols} forceFit>
				<Axis name="year" />
				<Axis name="sales" />
				<Tooltip />
				<Geom type="interval" position="year*sales" />
				<Guide>
					<Region top {...region} />
				</Guide>
			</Chart>
		</div>
	);
}


function getRegionPosition(idx, source) {
	const margin = (1 / source.length) * 10;
	const start = ((idx / source.length) * 100 + margin).toFixed(2);
	const end = (((idx + 1) / source.length) * 100 - margin).toFixed(2);
	return { start: [`${start}%`, '100%'], end: [`${end}%`, '0%'] }
}

ReactDOM.render(<Basiccolumn />, mountNode)

```
