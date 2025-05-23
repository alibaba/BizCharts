# 带有slider的柱状图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77e3ece0-9979-11ea-8225-e30c1937e15c.png)

```js
import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts@3.5.8';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';

const ds = new DataSet({
  state: {
    start: 0,
    end: 1,
  },
});
class Basiccolumn extends React.Component {
  handleSliderChange = e => {
    console.log(e);
    const { startRadio, endRadio } = e;
    ds.setState('start', startRadio);
    ds.setState('end', endRadio);
  };
  render() {
    const data = [
      {
        year: '1951 年',
        sales: 38,
      },
      {
        year: '1952 年',
        sales: 52,
      },
      {
        year: '1956 年',
        sales: 61,
      },
      {
        year: '1957 年',
        sales: 145,
      },
      {
        year: '1958 年',
        sales: 48,
      },
      {
        year: '1959 年',
        sales: 38,
      },
      {
        year: '1960 年',
        sales: 38,
      },
      {
        year: '1962 年',
        sales: 38,
      },
    ];
    const cols = {
      sales: {
        tickInterval: 20,
      },
    };
    const dv = ds.createView('origin').source(data);
    dv.transform({
      type: 'filter',
      callback(item, idx) {
        const radio = idx / data.length;
        return radio >= ds.state.start && radio <= ds.state.end;
      },
    });
    return (
      <div>
        <Chart height={400} padding='auto' data={dv} scale={cols} forceFit>
          <Axis name="year" />
          <Axis name="sales" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="interval" position="year*sales" />
        </Chart>
        <Slider
          data={data}
          padding={60}
          xAxis="year"
          yAxis="sales"
          onChange={this.handleSliderChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<Basiccolumn />, mountNode);

```
