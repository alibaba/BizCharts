# 基础点图（Point）

![预览](https://z.alicdn.com/alickn/chu-ko-no/2020-4-28/bizcharts/427633e8-bcab-43db-aec5-450bbd412138/427633e8-bcab-43db-aec5-450bbd412138.png)

```js
import { Chart, Point } from 'bizcharts';

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
  return <Chart padding={[20, 30]} height={200} autoFit data={data} >
    <Point position="year*sales"  />
  </Chart>
}

ReactDOM.render(<Demo />, mountNode);
```
