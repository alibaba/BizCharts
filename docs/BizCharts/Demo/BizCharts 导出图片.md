# BizCharts 导出图片

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77e28d50-9979-11ea-9761-adf4e02ffa04.png)

```js
/**
 * 基础图表
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Switch } from '@alifd/next';
import { Chart, Geom, Axis } from 'bizcharts@3.5.8';


const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];

const scales = {
  sold: { alias: '销售量' },
  genre: { alias: '游戏种类' }
};

const EXPORT_TEXT_PNG = '导出PNG图片';
const EXPORT_TEXT_SVG = '导出SVG矢量图';

const styles={
  largeWidth:{
    marginTop:15,
    width:110,
  },
  btn: {
    position: "relative",
    top: -10,
    marginLeft: 5
  },
  title: {
    textAlign: "center"
  },
}

class DownloadImage extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
       exportText: EXPORT_TEXT_SVG,
      isRendererCanvas: false
    };
  }
  
  componentDidMount = () => { };
  
  onClick = (e) => {
    this.chartIns.downloadImage();
    // this.setState({exportText:'导出中...', forceUpdate: false});
  }
  
  onChange = (e) => {
    const { isRendererCanvas } = this.state;
    this.setState({
      isRendererCanvas: !isRendererCanvas, 
      exportText: isRendererCanvas ? EXPORT_TEXT_SVG : EXPORT_TEXT_PNG,
      forceUpdate: true
    });
  }
  
  render() {
    const { exportText, isRendererCanvas, forceUpdate } = this.state;
    const rendererValue = isRendererCanvas ? 'canvas' : 'svg';
    console.log('render', exportText, isRendererCanvas, forceUpdate);
    
    return (
      <div>
        <div className="title">
          <h2>导出PNG位图或SVG矢量图</h2>
          <div>
            <Switch className="large-width" onChange={this.onChange} />
            {
              isRendererCanvas ?
              'Canvas渲染' :
              'SVG渲染'
            }
          </div>
          <Button className="btn" type="normal" key="btn" onClick={ this.onClick }>{ exportText }</Button>
        </div>
        <Chart 
          forceUpdate={forceUpdate}
          key="chart" 
          renderer={rendererValue}
          width={600} 
          height={400} 
          data={data} 
          scale={scales} 
          onGetG2Instance={chartIns => {
            console.log('rendererValue', rendererValue);
            this.chartIns = chartIns;
          }}
        >
          <Axis name="sold" />
          <Axis name="genre" />
          <Geom type="interval" position="genre*sold" color="genre" />
        </Chart>
      </div>
		)
  }
}


ReactDOM.render(<DownloadImage />, mountNode);

```
