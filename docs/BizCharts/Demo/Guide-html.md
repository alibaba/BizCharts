# Guide-html

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77cfefb0-9979-11ea-9761-adf4e02ffa04.png)

```js
/**
 * guide-html
 */

import React from 'react';
import { Chart, Geom, Axis, Guide } from 'bizcharts@3.5.8';

const { Html } = Guide;

class GuideHtml extends React.Component {
  render() {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    const scales = {
      sold: { alias: '销售量' },
      genre: { alias: '游戏种类' },
    };

    return (
      <Chart height={400} data={data} scale={scales} padding="auto">
        <Axis name="sold" />
        <Axis name="genre" />
        <Geom type="line" position="genre*sold" color="sold" />
        <Guide>
          <Html
            position={['Action', 150]}
            html={(xScale, yScale) => {
              console.log(yScale);
              return `<div>最大值是${yScale.sold.max}，<br/>最小值是${yScale.sold.min}</div>`; // 位置信息
            }}
          />
        </Guide>
      </Chart>
    );
  }
}

ReactDOM.render(<GuideHtml />, mountNode)

```
