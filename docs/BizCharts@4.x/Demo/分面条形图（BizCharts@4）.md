# 分面条形图（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/f64c83b0-af9c-11ea-8765-9d54391a91b0.png)

```js
import $ from 'jquery';
import React from 'react';
import { Chart, Tooltip, Legend, Facet } from 'bizcharts';
import DataSet from '@antv/data-set';

let data;
$.ajax({
  url:
    'https://alifd.alibabausercontent.com/materials/@bizcharts/facet-transpose/0.1.3/mock.json',
  async: false,
  success: iData => {
    data = iData;
  },
});

class Mirror extends React.Component {
  render() {
    const tmp = [];
    const dates = [];
    data.male.values.forEach(obj => {
      if (dates.indexOf(obj.date) === -1) {
        dates.push(obj.date);
      }

      obj.age_groups.forEach(subObject => {
        subObject.gender = 'male';
        subObject.date = obj.date;
        tmp.push(subObject);
      });
    });
    data.female.values.forEach(obj => {
      obj.age_groups.forEach(subObject => {
        subObject.gender = 'female';
        subObject.date = obj.date;
        tmp.push(subObject);
      });
    });
    const ds = new DataSet();
    const dv = ds
      .createView()
      .source(tmp)
      .transform({
        type: 'filter',

        callback(row) {
          // 判断某一行是否保留，默认返回true
          return (
            new Date(row.date * 1000).getFullYear() ===
            new Date(dates[0] * 1000).getFullYear()
          );
        },
      });
    const scale = {
      age: {
        sync: true,
        tickCount: 11,
      },
      total_percentage: {
        range: [0, 0.8],
        formatter(v) {
          return `${v}%`;
        },
      },
      gender: {
        sync: true,
      },
    };

    return (
        <Chart
          height={600}
          data={[...dv.rows.slice(15, 30), ...dv.rows.slice(116, 131)]}
          scale={scale}
          autoFit
          padding={50}
        >
          <Tooltip />
          <Facet
            type="mirror"
            fields={['gender']}
            showTitle={false}
            transpose
            padding={0}
            eachView={(view, facet) => {
              const { rowIndex, colIndex } = facet;
              view
                .axis(false)
                .interval()
                .position('age*total_percentage')
                .color('gender', ['rgb(113,192,235)', 'rgb(246,170,203)'])
                .label('age', { textAlign: 'end' });

              const count = 15;
              for (let i = 0; i < count; i++) {
                view.guide().text({
                  position: [i, 1],
                  content: i + 1,
                  style: {
                    textAlign: colIndex == 0 ? 'start' : 'end',
                  },
                });

                view.guide().line({
                  start: [-0.5 + i, 0],
                  end: [-0.5 + i, 1],
                  lineStyle: {
                    lineDash: null,
                    stroke: '#ccc',
                  },
                });
              }
              view.guide().line({
                start: [-0.5 + count, 0],
                end: [-0.5 + count, 1],
                lineStyle: {
                  lineDash: null,
                  stroke: '#ccc',
                },
              });
            }}
          />
        </Chart>
    );
  }
}

ReactDOM.render(<Mirror />, mountNode);

```
