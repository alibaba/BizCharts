# BizCharts-基础饼图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77beffc0-9979-11ea-8225-e30c1937e15c.png)

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
} from 'bizcharts@3.5.8';
import DataSet from '@antv/data-set';

class Labelline extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: '事例一',
        count: 40,
      },
      {
        item: '事例二',
        count: 21,
      },
      {
        item: '事例三',
        count: 17,
      },
      {
        item: '事例四',
        count: 13,
      },
      {
        item: '事例五',
        count: 9,
      },
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + '%';
          return val;
        },
      },
    };
    function getXY(c, { index: idx = 0, field = 'percent', radius = 0.5 }) {
      const d = c.get('data');
      if (idx > d.length) return;
      const scales = c.get('scales');
      let sum = 0;
      for (let i = 0; i < idx + 1; i++) {
        let val = d[i][field];
        if (i === idx) {
          val = val / 2;
        }
        sum += val;
      }
      const pt = {
        y: scales[field].scale(sum),
        x: radius,
      };
      const coord = c.get('coord');
      let xy = coord.convert(pt);
      return xy;
    }
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          scale={cols}
          padding={[80, 100, 80, 80]}
          forceFit
          onGetG2Instance={c => {
            const xy = getXY(c, { index: 0 });
            c.showTooltip(xy);
          }}
        >
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 200}
          />
          <Tooltip
            //triggerOn='none'
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = percent * 100 + '%';
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ': ' + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Labelline />, mountNode);

```
