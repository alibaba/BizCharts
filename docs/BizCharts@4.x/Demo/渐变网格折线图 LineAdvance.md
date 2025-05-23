# 渐变网格折线图 LineAdvance

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/64eb9580-be2d-11ed-9ceb-df983b83758a.png)

```js
import React from 'react';
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
	LineAdvance
} from 'bizcharts';

const { Line } = Guide;

const data = {
  keywordTrend: [
    { keyword: "白超", dates: "1971-01-03 00:39:29", first: 1647 },
    { keyword: "白超", dates: "1975-04-29 01:53:35", first: 3647 },
    { keyword: "白超", dates: "1985-07-22 13:57:24", first: 3156 },
    { keyword: "白超", dates: "1994-10-10 19:40:08", first: 2166 },
    { keyword: "白超", dates: "1976-08-25 20:59:11", first: 2956 },
   { keyword: "白超", dates: "1980-03-20 16:28:32", first: 3571 },
    { keyword: "白超", dates: "2000-08-17 18:06:55", first: 2771 },
    { keyword: "谭艳", dates: "1971-01-03 00:39:29", first: 2302 },
		{ keyword: "谭艳", dates: "1975-04-29 01:53:35", first: 1647 },
    { keyword: "谭艳", dates: "1985-07-22 13:57:24", first: 1709 },
    { keyword: "谭艳", dates: "1994-10-10 19:40:08", first: 1202 },
    { keyword: "谭艳", dates: "1976-08-25 20:59:11", first: 1867 },
   { keyword: "谭艳", dates: "1980-03-20 16:28:32", first: 1149 },
    { keyword: "谭艳", dates: "2000-08-17 18:06:55", first: 1149 },
  ],
  avgSpreadScore: [
    {
      key: "白超",
      value: 3100,
      checked: true,
      startDate: "1971-01-03 00:39:29",
      endDate: "2000-08-17 18:06:55",
    },
    {
      key: "谭艳",
      value: 1600,
       checked: true,
      startDate: "1971-01-03 00:39:29",
      endDate: "2000-08-17 18:06:55",
    },
  ],
};



const { keywordTrend, avgSpreadScore } = data;

/**
1. 这里使用的是原始数据, 所以是 dates * first, 而格式化后的应该是 dates * value 把所有的 first 换成 value
2. colors: 自己可定义, 看是否可以使用对象(以方便日后指定关键词的颜色对应)
3. 上边数据中注释掉的是超出了 keywordTrend最小值和最大值范围之外的数据, 导致线太长出去了
*/

const colors = ['#1890ff', '#2fc25b'];

const axisConfig = {
  label: {
    style: {
      textAlign: 'center',
    }, // 设置坐标轴文本样式
  },
  line: {
    style: {
      stroke: '#ccc',
      lineDash: [3, 3],
    }, // 设置坐标轴线样式
  },
  grid: {
    line: {
      style: {
				stroke:'#ccc',
        lineDash: [3, 3],
      },
    }, // 设置坐标系栅格样式
  },
};

class Series extends React.Component {
  state={
    avgSpreadScore,
  }
  render() {
    const cols = {
      dates: {
        range: [0, 1],
        type:'timeCat'
      },
      first: {
        min: 0,// 这里要设置一个最小值, 否则可能图表中按照了 keywordTrend 中的最小值设置Y轴最小值
      }
    };
    
    return (
        <Chart height={400} data={keywordTrend} 
        
          scale={cols}
					padding={[40,80,70, 80]}
          autoFit>
          	<Axis name="dates"  {...axisConfig} />
            <Axis name="first"   {...axisConfig} label={{offset:10}}/>
            
              {/*shape="smooth" 可配置为曲线，不设置为折线*/}
	          <LineAdvance point={{size:3}}  shape="smooth" position="dates*first" size={1} color={['keyword', colors]} label="first"/>
            {/*<Geom/> 和 <Guide/> 是独立控制的，可以通过chart filter来建立交互联动*/}
            
        </Chart>
    );
  }
}

ReactDOM.render(<Series />, mountNode)

```
