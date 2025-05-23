# 阶梯折线图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/4d0d2de0-bc23-11ed-8285-57769077f47a.png)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Line, Point, Area, Axis } from 'bizcharts';

// 数据源
const data = [
      {
        month: "Jan",
        value: 51
      },
      {
        month: "Feb-1",
        value: 10
      },
      {
        month: "Feb-2",
        value: 34
      },
      {
        month: "Mar",
        value: 34
      },
      {
        month: "Apr",
        value: 47
      },
      {
        month: "May",
        value: 63
      },
      {
        month: "June",
        value: 58
      },
      {
        month: "July",
        value: 56
      },
      {
        month: "Aug",
        value: 77
      },
      {
        month: "Sep",
        value: 99
      },
      {
        month: "Oct",
        value: 106
      },
      {
        month: "Nov",
        value: 88
      },
      {
        month: "Dec",
        value: 56
      }
    ];

function Demo() {
	const label = {
		formatter: (text, item, index) => {
			console.log({text, item, index})
			return text.split('-')[0];
			
		},
	}
  return <Chart scale={{value: {min: 0}}} padding={[10,20,50,40]} autoFit height={500} data={data} >
    <Line shape="hv" position="month*value" />
  	<Axis name="sold" label={label}/>
  </Chart>
}



ReactDOM.render(<Demo />, mountNode);

 

```
