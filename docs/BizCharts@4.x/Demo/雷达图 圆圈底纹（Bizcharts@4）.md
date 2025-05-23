# 雷达图 圆圈底纹（Bizcharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/fd7b0790-afa3-11ea-b974-bdbc104e7053.png)

```js
import React from 'react';
import { 
  Chart, 
  Geom, 
  Axis, 
  Tooltip, 
  Coordinate, 
  Legend, 
  Line, 
  Area,
  Point
} from 'bizcharts';

class Demo extends React.Component {
  render() {
    const data = [
      { item: 'Design', user: 'AppEngineer', score: 70 },
      { item: 'Design', user: 'PlatformEngineer', score: 30 },
      { item: 'Development', user: 'AppEngineer', score: 60 },
      { item: 'Development', user: 'PlatformEngineer', score: 70 },
      { item: 'Marketing', user: 'AppEngineer', score: 50 },
      { item: 'Marketing', user: 'PlatformEngineer', score: 60 },
      { item: 'Users', user: 'AppEngineer', score: 40 },
      { item: 'Users', user: 'PlatformEngineer', score: 50 },
      { item: 'Test', user: 'AppEngineer', score: 60 },
      { item: 'Test', user: 'PlatformEngineer', score: 70 },
      { item: 'Language', user: 'AppEngineer', score: 70 },
      { item: 'Language', user: 'PlatformEngineer', score: 50 },
      { item: 'Technology', user: 'AppEngineer', score: 50 },
      { item: 'Technology', user: 'PlatformEngineer', score: 40 },
      { item: 'Support', user: 'AppEngineer', score: 30 },
      { item: 'Support', user: 'PlatformEngineer', score: 40 },
      { item: 'Sales', user: 'AppEngineer', score: 60 },
      { item: 'Sales', user: 'PlatformEngineer', score: 40 },
      { item: 'UX', user: 'AppEngineer', score: 50 },
      { item: 'UX', user: 'PlatformEngineer', score: 60 },
    ];
    const cols = {
      score: {
        min: 0,
        max: 100,
      },
    };

    return (
        <Chart
          data={data}
          scale={cols}
          height={400}
          width={500}
        >
          <Coordinate type="polar" radius={0.8} />
          <Axis
            name="item"
            line={null}
            tickLine={null}
            grid={{
              lineStyle: {
                lineDash: null,
              },
              hideFirstLine: false,
            }}
          />
          <Tooltip />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: 'circle',
              lineStyle: {
                lineDash: null,
              },
              alternateColor: 'rgba(0, 0, 0, 0.04)',
            }}
          />
          <Area
            position="item*score" 
            color="user" 
          />
          <Line
            position="item*score" 
            color="user" 
            size={2}
          />
          <Point
           type="point"
            position="item*score"
            color="user"
            shape="circle"
            size={4}
            style={{
              stroke: '#fff',
              lineWidth: 1,
              fillOpacity: 1,
            }}
          />
        </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
