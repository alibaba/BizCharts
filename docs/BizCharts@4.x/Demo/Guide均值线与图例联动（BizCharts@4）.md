# Guide均值线与图例联动（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/ce8439b0-370c-11ec-a801-e7f03f4a2afb.png)

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
} from 'bizcharts@4.1.3-beta.0';

const { Line } = Guide;

const data = {
  refKeywordCloud: [
    { refKeywords: "中山市", spreadScore: 4064 },
    { refKeywords: "鄂尔多斯市", spreadScore: 4226 },
    { refKeywords: "宜宾市", spreadScore: 1809 },
    { refKeywords: "玉林市", spreadScore: 2912 },
    { refKeywords: "九江市", spreadScore: 4194 },
    { refKeywords: "深圳市", spreadScore: 4658 },
    { refKeywords: "湖州市", spreadScore: 2461 },
    { refKeywords: "黄南藏族自治州", spreadScore: 2269 },
    { refKeywords: "泸州市", spreadScore: 2600 },
    { refKeywords: "博尔塔拉蒙古自治州", spreadScore: 4848 },
  ],
  keywordTrend: [
    { keyword: "白超", dates: "1971-01-03 00:39:29", first: 2647 },
    // { keyword: "白超", dates: "1975-04-29 01:53:35", first: 2647 },
    { keyword: "白超", dates: "1985-07-22 13:57:24", first: 2156 },
    { keyword: "白超", dates: "1994-10-10 19:40:08", first: 2166 },
    { keyword: "白超", dates: "1976-08-25 20:59:11", first: 2956 },
//    { keyword: "白超", dates: "1980-03-20 16:28:32", first: 2771 },
    { keyword: "白超", dates: "2000-08-17 18:06:55", first: 2771 },
    { keyword: "谭艳", dates: "1971-01-03 00:39:29", first: 2302 },
    { keyword: "谭艳", dates: "1985-07-22 13:57:24", first: 2709 },
    { keyword: "谭艳", dates: "1994-10-10 19:40:08", first: 2202 },
    { keyword: "谭艳", dates: "1976-08-25 20:59:11", first: 2867 },
//    { keyword: "谭艳", dates: "1980-03-20 16:28:32", first: 2149 },
    { keyword: "谭艳", dates: "2000-08-17 18:06:55", first: 2149 },
  ],
  avgSpreadScore: [
    {
      key: "白超",
      value: 2500,
      checked: true,
      startDate: "1971-01-03 00:39:29",
      endDate: "2000-08-17 18:06:55",
    },
    {
      key: "谭艳",
      value: 2600,
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
class Series extends React.Component {
  state={
    avgSpreadScore,
  }
  render() {
    const cols = {
      dates: {
        range: [0.05, 0.95],
        type:'timeCat'
      },
      first: {
        // min: 0,// 这里要设置一个最小值, 否则可能图表中按照了 keywordTrend 中的最小值设置Y轴最小值
      }
    };
    
    return (
        <Chart height={400} data={keywordTrend} 
        filter={[['keyword',(keyword) => {
            return avgSpreadScore.find(d => d.key === keyword).checked;
          }]]} 
          scale={cols}
          autoFit>
          <Legend onClick={(ev) => {
              console.log(ev);
              const key = ev.item.value;
              avgSpreadScore.find(d => d.key === key).checked = ev.checked;
              setTimeout(() => {
                this.setState({avgSpreadScore})
              }, 0)
            }} />
            <Tooltip shared={true} showCrosshairs/>
          	<Axis name="dates" />
            <Axis name="first" />
            
              {/*shape="smooth" 可配置为曲线，不设置为折线*/}
	          <Geom type="line" shape="smooth" position="dates*first" size={1} color={['keyword', colors]} />
            <Geom type="point" position="dates*first" size={2} color={['keyword', colors]} />
            {/*<Geom/> 和 <Guide/> 是独立控制的，可以通过chart filter来建立交互联动*/}
            <Guide>
              {avgSpreadScore.map((item, index) => {
                if (!item.checked) {
                  return;                
                }
              	return <Line
                top
                start={{ dates: item.startDate, first: item.value }}
                end={{ dates: item.endDate, first: item.value }}
                style={{
                  lineWidth: 2,
                  // 手动维护颜色
                  stroke: colors[index],
                }}
                 /** 调整位置 */
                text={{
                  position: 'end',
                  style: {
                    fill: colors[index],
                  },
                  offsetX: -320,
                  content: `均值${item.key}`
                 }}
                />
              })}
          </Guide>
        </Chart>
    );
  }
}

ReactDOM.render(<Series />, mountNode)

```
