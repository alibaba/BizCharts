# Guide-DataMarker

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77bb0820-9979-11ea-bd36-0f0eda3e7ac1.png)

```js
import $ from "jquery";
import React, { Component } from 'react';
import { Chart, Geom, Axis, Guide } from 'bizcharts@3.5.8';
let data;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/other-datamarker_dataregion/0.1.4/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

const { DataMarker, DataRegion, RegionFilter } = Guide;

const scale = {
  time: {
    range: [0, 1],
  },
};

class RegionFilter2 extends React.Component {
  render() {
    return (
      <Chart height={400} data={data} scale={scale} forceFit>
        <Axis />
        <Geom type="line" position="time*rate" />
        <Guide>
          <DataMarker
            position={['2014-01-03', 6.763]}
            content={'受稳健货币政策影响，协定存款利\n率居高不下,收益率达6.763%'}
            style={{
              text: {
                textAlign: 'left',
              },
            }}
          />
          <DataMarker
            top={false}
            position={['2013-05-31', 2.093]}
            content={'余额宝刚成立时，并未达到目标资产\n配置，故收益率较低'}
            style={{
              text: {
                textAlign: 'left',
              },
            }}
          />
          <RegionFilter
            top={true}
            start={['2016-01-01', 2.1]}
            end={['2016-12-02', 2.513]}
            color='red' //染色色值
  			
          />
          <DataRegion
            top={false}
            start={['2016-12-02', 2.513]}
            end={['2017-03-24', 3.83]}
            content={'宏观经济过热，受稳健货币政策影\n响，余额宝收益率随之上升'}
            lineLength={50}
          />
        </Guide>
      </Chart>
    );
  }
}

ReactDOM.render(<RegionFilter2 />, mountNode)
```
