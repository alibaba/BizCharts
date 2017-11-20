# 仪表盘

---

# 仪表盘

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Coord, Geom, Axis, Shape, Guide } from '@ali/bizcharts';

// 需求来源https://aone.alibaba-inc.com/project/575162/issue/10214698

const cols = {
  value: {
    min: -100,
    max: 100,
    tickInterval: 50
  }
};

Shape.registShape('point', 'dashboard', {
  drawShape: function(cfg, group){
    var origin = cfg.origin; // 原始数据
    var value = origin.value;
    var point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint({ // 将标记点转换到画布坐标
      x: point.x,
      y: 0.95
    });
    var center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0
    });
    var r = 50;
    var ra = 0.8 * r;
    var X1 = center.x;
    var Y1 = center.y;
    var X2 = point.x;
    var Y2 = point.y;
    // 三角形顶部夹角
    var B = 120/180;
    var Xa,Xb,Xc,Ya,Yb,Yc; // 绘制小箭头需要的三个点
    var shape;
    // 三角形
    if (Y1==Y2) {
      if(X1>X2){
        Xa = X2 + Math.cos(B)* ra;
        Ya = Y2 - Math.sin(B)* ra;
        Xb = X2 + Math.cos(B)* ra;
        Yb = Y2 + Math.sin(B)* ra;
        Xc = X2 - ra / 5;
        Yc = Y2;
      }else{
        Xa = X2 - Math.cos(B)* ra;
        Ya = Y2 - Math.sin(B)* ra;
        Xb = X2 - Math.cos(B)* ra;
        Yb = Y2 + Math.sin(B)* ra;
        Xc = X2 + ra / 5;
        Yc = Y2;
      }
    }else if(Y1>Y2){
      var A = Math.atan((X1 - X2) / (Y1 - Y2));
      Xa = X2 + ra * Math.sin(A + B);
      Ya = Y2 + ra * Math.cos(A + B);
      Xb = X2 + ra * Math.sin(A - B);
      Yb = Y2 + ra * Math.cos(A - B);
      Xc = X2 - ra * Math.sin(A) / 5;
      Yc = Y2 - ra * Math.cos(A) / 5;
    }else{
      if(X1>X2){
        var A = Math.atan((Y2 - Y1) / (X1 - X2));
        Xa = X2 + ra * Math.cos(A + B);
        Ya = Y2 - ra * Math.sin(A + B);
        Xb = X2 + ra * Math.cos(A - B);
        Yb = Y2 - ra * Math.sin(A - B);
        Xc = X2 - ra * Math.cos(A) / 5;
        Yc = Y2 + ra * Math.sin(A) / 5;
      }else{
        var A = Math.atan((Y2 - Y1) / (X2 - X1));
        Xa = X2 - ra * Math.cos(A - B);
        Ya = Y2 - ra * Math.sin(A - B);
        Xb = X2 - ra * Math.cos(A + B);
        Yb = Y2 - ra * Math.sin(A + B);
        Xc = X2 + ra * Math.cos(A) / 5;
        Yc = Y2 + ra * Math.sin(A) / 5;
      }
    }
    group.addShape('circle', {
      attrs:{
        x: X1,
        y: Y1,
        r: 112,
        fill: 'rgb(241, 241, 241)'
      }
    });
    // 添加文本1
    group.addShape('text', {
      attrs: {
        x: X1,
        y: Y1 + 20,
        text: '42',
        fontSize: 60,
        fill: 'rgb(48, 48, 48)',
        textAlign: 'center'
      }
    });
    // 添加文本2
    group.addShape('text', {
      attrs: {
        x: X1,
        y: Y1 + 40,
        text: 'NPS',
        fontSize: 18,
        fill: '#F75B5B',
        textAlign: 'center'
      }
    });
    // 三角箭头
    group.addShape('polygon', {
      attrs: {
        points: [
          [Xa, Ya],
          [Xc, Yc],
          [Xb, Yb],
          [Xa, Ya]
        ],
        fill: 'rgb(241, 241, 241)'
      }
    });
    return shape;
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      val: this.createData()
    }
  }
  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        val: this.createData()
      })
    }, 3000);
  }
  createData() {
    var data = [];
    var val = Math.random() * 0.15;
    val = val.toFixed(3);
    data.push({value: Number(val)});
    return data;
  }
  render() {
    const { val } = this.state;
		// console.log(JSON.stringify(val));
    
    return(
      <Chart width={600} height={400} data={val} cols={cols} plotCfg={{margin: 100}}>
        <Coord type='gauge' startAngle={-9/8 * Math.PI} endAngle={1/8 * Math.PI} />
        <Axis name="value" tickLine={null} labelOffset={15} />
        <Geom type="point" position="value" shape="dashboard" />
        <Guide arc={[[-100, 0.95], [-51, 0.95], {
          stroke: 'rgb(54, 95, 108)',
          lineWidth: 50
          }]}
        />
        <Guide arc={[[-50, 0.95], [-1, 0.95], {
          stroke: 'rgb(54, 95, 108)',
          lineWidth: 50
          }]}
        />
        <Guide arc={[[0, 0.95], [49, 0.95], {
          stroke: 'rgb(54, 95, 108)',
          lineWidth: 50
          }]}
        />
        <Guide arc={[[51, 0.95], [100, 0.95], {
          stroke: 'rgb(54, 95, 108)',
          lineWidth: 50
          }]}
        />
      </Chart>
		);
  }
}

ReactDOM.render(<App />, document.getElementById('mountNode'));
````