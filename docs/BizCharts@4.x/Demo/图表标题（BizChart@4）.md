# 图表标题（BizChart@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/8a43f3d0-d623-11ea-a29f-815c67f294bf.png)

```js
import { Chart, Interval } from 'bizcharts';

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 45 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];


function Demo() {
  return <>
    <h2>xx品牌历年商品销售数据</h2>
		<h5>数据统计来源为mock的数据（万元）</h5>
	  <Chart height={300} autoFit data={data} >
      <Interval position="year*sales"  />
    </Chart>
	</>
}

ReactDOM.render(<Demo />, mountNode);
```
