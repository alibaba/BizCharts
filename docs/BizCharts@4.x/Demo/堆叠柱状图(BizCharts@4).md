# 堆叠柱状图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/5d39dbc0-fc32-11ec-a0ff-bff4646a7e06.png)

```js
import React from "react";
import {
	G2,
	Chart,
	Tooltip,
	Interval,
	Line,
	Point,
} from "bizcharts";

const data =[
    {
        "type": "doneCanvas",
        "date": "2020-7",
        "count": 1,
				"total": 1,
    },
    {
        "type": "doneCanvas",
        "date": "2021-4",
        "count": 1,
				"total": 2,
    },
    {
        "type": "doneCanvas",
        "date": "2021-6",
        "count": 1,
				"total": 3,
    },
    {
        "type": "doneCanvas",
        "date": "2021-7",
        "count": 4,
				"total": 7,
    },
    {
        "type": "doneCanvas",
        "date": "2021-8",
        "count": 6,
				"total": 13,
    },
    {
        "type": "doneCanvas",
        "date": "2021-9",
        "count": 14,
				"total": 27,
    },

    {
        "type": "LowCode",
        "date": "2021-10",
        "count": 9,
				"total": 9,
    },
    {
        "type": "doneCanvas",
        "date": "2021-10",
        "count": 14,
				"total": 41,
    },
    {
        "type": "LowCode",
        "date": "2021-11",
        "count": 9,
				"total": 18,
    },
    {
        "type": "doneCanvas",
        "date": "2021-11",
        "count": 70,
				"total": 111,
    },
    {
        "type": "LowCode",
        "date": "2021-12",
        "count": 20,
				"total": 38,
    },
    {
        "type": "doneCanvas",
        "date": "2021-12",
        "count": 31,
				"total": 142,
    },
    {
        "type": "LowCode",
        "date": "2022-1",
        "count": 40,
				"total": 78,
    },
    {
        "type": "doneCanvas",
        "date": "2022-1",
        "count": 24,
				"total": 166,
    },
    {
        "type": "LowCode",
        "date": "2022-2",
        "count": 28,
				"total": 106,
    },
    {
        "type": "doneCanvas",
        "date": "2022-2",
        "count": 13,
				"total": 179,
    },
    {
        "type": "LowCode",
        "date": "2022-3",
        "count": 15,
				"total": 121,
    },
    {
        "type": "doneCanvas",
        "date": "2022-3",
        "count": 21,
				"total": 200,
    },
    {
        "type": "LowCode",
        "date": "2022-4",
        "count": 26,
				"total": 147,
    },
    {
        "type": "doneCanvas",
        "date": "2022-4",
        "count": 18,
				"total": 218,
    },
    {
        "type": "LowCode",
        "date": "2022-5",
        "count": 21,
				"total": 168,
    },
    {
        "type": "doneCanvas",
        "date": "2022-5",
        "count": 22,
				"total": 240,
    },
    {
        "type": "LowCode",
        "date": "2022-6",
        "count": 38,
				"total": 206,
    },
    {
        "type": "doneCanvas",
        "date": "2022-6",
        "count": 22,
				"total": 262,
    },
    {
        "type": "LowCode",
        "date": "2022-7",
        "count": 2,
				"total": 208,
    }
]

const position="date*count"
function Grouped() {
	return (
		<Chart height={400} padding="auto" data={data} scale={{
			name: {
			}
		}} autoFit>
<Line shape="smooth" position="date*total" color={['type', ['#18b1f7', '#01c1b2']]} label="temperature" />
			<Interval
				adjust={[
					{
						type: 'stack',
					},
				]}
				color={['type', ['#18b1f7', '#01c1b2']]}
				position={position}
			/>
			<Tooltip shared />
		</Chart>
	);
}

ReactDOM.render(<Grouped />, mountNode)

```
