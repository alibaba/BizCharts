# color映射多字段，通过*连接

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77e96b20-9979-11ea-a591-9be663db1ad5.png)

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
const newdata = [
  {
    time: '2019-02',
    level_s_amount: 123,
    level_a_amount: 223,
    level_b_amount: 310,
    level_c_amount: 412,
    level_other_amount: 312,
    level_s_gaap: 123,
    level_a_gaap: 542,
    level_b_gaap: 123,
    level_c_gaap: 432,
    level_other_gaap: 531,
  },
  {
    time: '2019-03',
    level_s_amount: 993,
    level_a_amount: 133,
    level_b_amount: 343,
    level_c_amount: 123,
    level_other_amount: 632,
    level_s_gaap: 342,
    level_a_gaap: 322,
    level_b_gaap: 564,
    level_c_gaap: 422,
    level_other_gaap: 965,
  },
  {
    time: '2019-04',
    level_s_amount: 312,
    level_a_amount: 533,
    level_b_amount: 111,
    level_c_amount: 222,
    level_other_amount: 333,
    level_s_gaap: 444,
    level_a_gaap: 523,
    level_b_gaap: 383,
    level_c_gaap: 343,
    level_other_gaap: 431,
  },
  {
    time: '2019-05',
    level_s_amount: 300,
    level_a_amount: 300,
    level_b_amount: 300,
    level_c_amount: 300,
    level_other_amount: 300,
    level_s_gaap: 300,
    level_a_gaap: 300,
    level_b_gaap: 300,
    level_c_gaap: 300,
    level_other_gaap: 300,
  },
  {
    time: '2019-06',
    level_s_amount: 300,
    level_a_amount: 300,
    level_b_amount: 300,
    level_c_amount: 300,
    level_other_amount: 300,
    level_s_gaap: 300,
    level_a_gaap: 300,
    level_b_gaap: 300,
    level_c_gaap: 300,
    level_other_gaap: 300,
  },
  {
    time: '2019-07',
    level_s_amount: 300,
    level_a_amount: 300,
    level_b_amount: 300,
    level_c_amount: 300,
    level_other_amount: 300,
    level_s_gaap: 300,
    level_a_gaap: 300,
    level_b_gaap: 300,
    level_c_gaap: 300,
    level_other_gaap: 300,
  },
];
class Stackedcolumn extends React.Component {
  render() {
    const ds = new DataSet();
    const dv = ds.createView().source(newdata);
    dv.transform({
      type: 'fold',
      fields: [
        'level_s_amount',
        'level_a_amount',
        'level_b_amount',
        'level_c_amount',
        'level_s_gaap', 'level_a_gaap', 'level_b_gaap', 'level_c_gaap'
      ],
      //   fields: ['time'],
      // 展开字段集
      key: 'key',
      // key字段
      value: 'value', // value字段
    })
    .transform({
    type: 'map',
    callback: (obj) => {
     if(obj.key.indexOf('amount') !== -1) {
       obj.type = '合同金额'
     } else if(obj.key.indexOf('gaap') !== -1) {
        obj.type = 'GAAP收入'
     }
      obj.level = obj.key.split('_')[1].toUpperCase() + '级'
      console.log(obj)
      return obj;
    },
  });
    // const newdv = ds.createView().source(newdata);
    // newdv.transform({
    //   type: "fold",
    //   fields: ["level_s_gaap", "level_a_gaap", "level_b_gaap", "level_c_gaap" ],
    // //   fields: ['time'],
    //   // 展开字段集
    //   key: "name",
    //   // key字段
    //   value: "type" // value字段
    // });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Legend />
          <Axis name="key" />
          <Axis name="type" />
          <Tooltip />
          <Geom
            type="interval"
            position="time*value*type"
            color={'level*type'}
            tooltip={['time*value*level*type', (time, value, level, type)=>{ // array
              console.log(time, value, level, type)
              return {
                name: level,
                value: type + ':' + value
              }
            }]}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
            adjust={[
              {
                type: "dodge",
                dodgeBy: "type",
                // 按照 type 字段进行分组
                marginRatio: 0 // 分组中各个柱子之间不留空隙
              },
              {
                type: "stack"
              }
            ]}
            >       
          </Geom>
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Stackedcolumn />, mountNode);

```
