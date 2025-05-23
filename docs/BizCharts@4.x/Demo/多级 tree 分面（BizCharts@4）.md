# 多级 tree 分面（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/00ce48b0-5802-11eb-b11e-83d54a0fe496.png)

```js
import React from 'react';
import {
  Chart,
  Tooltip,
  Coord,
  Legend,
  Facet,
} from 'bizcharts@4.1.0-beta.0';
import DataSet from '@antv/data-set';
const data = [
      {
        gender: '男',
        count: 40,
        class: '一班',    
        grade: '一年级',
      },
      {
        gender: '女',
        count: 30,
        class: '一',
        grade: '一年级',
      },
      {
        gender: '男',
        count: 35,
        class: '二班',
        grade: '一年级',
      },
      {
        gender: '女',
        count: 45,
        class: '二班',
        grade: '一年级',
      },
      {
        gender: '男',
        count: 20,
        class: '三班',
        grade: '一年级',
      },
      {
        gender: '女',
        count: 35,
        class: '三班',
        grade: '一年级',
      },
      {
        gender: '男',
        count: 30,
        class: '一班',
        grade: '二年级',
      },
      {
        gender: '女',
        count: 40,
        class: '一班',
        grade: '二年级',
      },
      {
        gender: '男',
        count: 25,
        class: '二班',
        grade: '二年级',
      },
      {
        gender: '女',
        count: 32,
        class: '二班',
        grade: '二年级',
      },
      {
        gender: '男',
        count: 28,
        class: '三班',
        grade: '二年级',
      },
      {
        gender: '女',
        count: 36,
        class: '三班',
        grade: '二年级',
      },
    ];
class Columntree extends React.Component {
	state={data: data }
  render() {
    
    const DataView = DataSet.DataView;
    const scale = {
      cut: {
        sync: true,
      },
      mean: {
        sync: true,
        tickCount: 5,
      },
    };

    return (
      <div>
			  <div onClick={() => {
					data[0].count = Math.random() * 1020;
					this.setState([...data]);
				}}>click me</div>
        <Chart
          data={this.state.data}
          width={600}
          height={450}
          padding={[30, 80, 80, 80]}
          scale={scale}
					key={new Date().getTime()}
        >
          <Tooltip showTitle={false} />
          <Legend />
          <Coord type="theta" />
          <Facet
            type="tree"
            fields={['grade', 'class']}
            line={{
              stroke: '#c0d0e0',
							smooth: true,
            }}
            
            eachView={(view, facet) => {
              const dv = new DataView();
						dv.source(facet.data)
							.transform({
							type: 'percent',
							field: 'count',
							dimension: 'gender',
							as: 'percent'
						});

						view.data(dv.rows);
						view.scale({
							percent: {
								formatter(val) {
									return (val * 100).toFixed(2) + '%';
								}
							}
						});
						view.interval().position('percent').color('gender').adjust('stack');
						view.interaction('element-active');
										}}
          />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Columntree />, mountNode)

```
