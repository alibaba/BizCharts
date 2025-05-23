# bizgolin气泡图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/096d4f80-997a-11ea-a591-9be663db1ad5.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Guide } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [
  { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
  { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
  { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
  { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
  { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
  { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
  { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
  { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
  { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
  { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
  { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
  { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
  { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
  { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
  { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' },
];

const defs = [{
  dataKey: 'y',
  alias: 'Daily sugar intake',
  tickInterval: 50,
  nice: false,
  max: 165,
  min: 0,
}, {
  dataKey: 'x',
  alias: 'Daily fat intake',
  tickInterval: 5,
  nice: false,
  max: 96,
  min: 62,
}, {
  dataKey: 'z',
  alias: 'Obesity(adults) %',
}];

const pixelRatio = window.devicePixelRatio * 2;

class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} defs={defs} pixelRatio={pixelRatio} >
        <Axis dataKey="x" label={text => ({ text: `${text} gr` })} grid={{ stroke: '#d9d9d9', lineWidth: 1, lineDash: [2, 2] }} />
        <Axis dataKey="y" label={(text) => { if (text > 0) { return { text: `${text} gr` }; } }} />
        <Geom geom="point" position="x*y" color="#1890ff" size={['z', [10, 40]]} shape="circle" style={{ lineWidth: 1, stroke: '#1890ff', opacity: 0.3 }} />
        { data.map((item, index) => (<Guide
          key={index}
          type="text"
          position={[item.x, item.y]}
          content={item.name}
          style={{
            textAlign: 'center',
            fill: '#1890FF',
            textBaseline: 'middle',
          }}
        />))}
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
