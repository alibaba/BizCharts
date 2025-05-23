# BizCharts堆叠柱状图使用 Label 显示当前总数

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77df31f0-9979-11ea-bd36-0f0eda3e7ac1.png)

```js
import React from "react";
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
import numeral from 'numeral';

class Stackedcolumn extends React.Component {
  state = {
    londonVisible: true,
    berlinVisible: true,
  };
  
  onLegendClick = (ev) => {
    if (ev.data.value === 'London') {
      this.setState({
        londonVisible: !this.state.londonVisible,
      });
    }
    if (ev.data.value === 'Berlin') {
      this.setState({
        berlinVisible: !this.state.berlinVisible,
      });
    }
  }
  
  
  render() {
    const { londonVisible, berlinVisible } = this.state;
    const data =  [
      {name: "London", 月份: "Jan.", 月均降雨量: 18.9, total: 21.3 },
      {name: "London", 月份: "Feb.", 月均降雨量: 28.8, total: 52 },
      {name: "London", 月份: "Mar.", 月均降雨量: 39.3, total: 73.8 },
      {name: "London", 月份: "Apr.", 月均降雨量: 81.4, total: 181 },
      {name: "London", 月份: "May", 月均降雨量: 47, total: 99.6 },
      {name: "London", 月份: "Jun.", 月均降雨量: 20.3, total: 55.8 },
      {name: "London", 月份: "Jul.", 月均降雨量: 24, total: 61.4 },
      {name: "London", 月份: "Aug.", 月均降雨量: 35.6, total: 78 },
      {name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4, total: 21.3 },
      {name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2, total: 52, },
      {name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5, total: 73.8 },
      {name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7, total: 181 },
      {name: "Berlin", 月份: "May", 月均降雨量: 52.6, total: 99.6 },
      {name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5, total: 55.8 },
      {name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4, total: 61.4 },
      {name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4, total: 78 },
    ];

    return (
      <div>
        <Chart
          height={400}
          data={data}
          forceFit
          onLegendItemClick={this.onLegendClick}
        >
          <Legend />
          <Axis name="月份" />
          <Axis name="月均降雨量" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="月份*月均降雨量"
            color={"name"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          >
            <Label
              content={[
                'total*月均降雨量',
                (total, itemValue) => {
                  // 用于格式化 最终显示的 label
                  if (londonVisible && berlinVisible) {
                    // 显示总数
                    return numeral(total).format('0.00');  
                  }
                  return numeral(itemValue).format('0.00');  
                  
                }]}
              formatter={(text, item, index)=>{
                if (londonVisible && berlinVisible) {
                  // 仅显示 最上面一组的 label 达成总数显示需求
                  if (item._origin.name === 'Berlin') {
                    return null;
                  }
                  // 显示总数
                  return text;  
                }
                return text;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Stackedcolumn />, mountNode)

```
