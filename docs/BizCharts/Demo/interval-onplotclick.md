# interval-onplotclick

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77bb0820-9979-11ea-a591-9be663db1ad5.png)

```js
import React from 'react';
import { Chart, Geom, Axis } from 'bizcharts@3.5.8';

class Demo extends React.Component {
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
      <Chart
        width={600}
        height={400}
        data={data}
        scale={scales}
        padding="auto"
        forceFit
        onGetG2Instance={(chart) => {
          setTimeout(() => {
            const geom = chart.get('geoms')[0];
            console.log(geom);
            geom.setSelected(data[1]);
          }, 1000);
        }}
        onPlotClick={(ev) => {
          console.log(ev);
          document.getElementById('container').append(`<p>${JSON.stringify(ev.data._origin)}</p>`);
        }}
      >
        <Axis name="sold" />
        <Axis name="genre" />
        <Geom
          type="interval"
          position="genre*sold"
          color={['genre', '#E6F6C8-#3376CB']}
          select={[
            true,
            {
              mode: 'single', // 选中模式，单选、多选
              style: {
                stroke: '#2C9D61',
                lineWidth: 3,
              }, // 选中后 shape 的样式
              cancelable: false, // 选中之后是否允许取消选中，默认允许取消选中
              animate: true, // 选中是否执行动画，默认执行动画
            },
          ]}
        />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
