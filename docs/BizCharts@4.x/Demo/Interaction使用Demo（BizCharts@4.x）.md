# Interaction使用Demo（BizCharts@4.x）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/fa11d8a0-137f-11eb-85d9-95fcbab24c56.png)

```js
import React from "react";
import { Chart, Interval, Interaction } from "bizcharts";

const data = [
  { year: "1951 年", sales: 38 },
  { year: "1952 年", sales: 52 },
  { year: "1956 年", sales: 61 },
  { year: "1957 年", sales: 45 },
  { year: "1958 年", sales: 48 },
  { year: "1959 年", sales: 38 },
  { year: "1960 年", sales: 38 },
  { year: "1962 年", sales: 38 },
];

function Demo() {
  return (
		<div style={{padding:'20px'}}>
			<Chart autoFit data={data} height={400} padding="auto">
				<Interval position="year*sales" />
				<Interaction type="element-highlight" />
				<Interaction type="active-region" />
			</Chart>
		</div>
  );
}

ReactDOM.render(<Demo />, mountNode);

```
