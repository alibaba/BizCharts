# 负值X轴对齐

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77ab50b0-9979-11ea-bd36-0f0eda3e7ac1.png)

```js
import React from 'react'
import { Chart, Geom, Axis, Legend, Label, Guide, Tooltip } from 'bizcharts@3.5.8'

const { DataMarker } = Guide

const data = [
  { category: 'Sports', sold: 275 },
  { category: 'Strategy', sold: -255 },
  { category: 'Action', sold: 120 },
  { category: 'Shooter', sold: 650 },
  { category: 'Other', sold: 150 }
]

const scale = {
  sold: {
    type: 'linear',
    min: -600,
    max: 1000
  }
}

// http://bizcharts.net/products/bizCharts/api/axis
const grid = {
  zeroLineStyle: {
    stroke: '#ddd',
    lineDash: [2, 4]
  }
}

const styles = {
  wrapper: {
    width: 700,
    height: 500,
    overflow: 'auto',
    textAlign: 'center',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  mainTitle: {
    fontSize: 18,
    color: '#333',
    display: 'block',
    padding: 10
  },
  subTitle: {
    fontSize: 14,
    color: '#bbb',
    display: 'block',
    padding: 10
  }
}

let chartIns

// 默认选中第三项的结果
const handleAlwaysShowTooltip = ev => {
  ev.showTooltip(ev.getXY(data[3]))
}

class XAxisZeroAlign extends React.Component {
  render () {
    return (
      <div style={styles.wrapper}>
        <Chart renderer='canvas' width={500} height={300} data={data}>
          <span className='main-title' style={styles.mainTitle}>
            极简Canvas图表
          </span>
          <span className='sub-title' style={styles.subTitle}>
            仅显示Tooltip
          </span>
          <Axis name='sold' />
          <Axis name='category' />
          <Tooltip />
          <Geom type='interval' position='category*sold' color='category' />
        </Chart>
      </div>
    )
  }
}

// CDN END
ReactDOM.render(<XAxisZeroAlign />, mountNode)

```
