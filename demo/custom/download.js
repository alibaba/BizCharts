# 下载图片

---

# 下载图片

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Chart, View, Coord, Geom, Tooltip, Legend, Label } from '@ali/bizcharts';
import DataSet from '@antv/data-set';

const data = [
   { value: 335, type: '直达', name: '直达' },
  { value: 310, type: '营销广告', name: '邮件营销' },
  { value: 234, type: '营销广告', name: '联盟广告' },
  { value: 135, type: '营销广告', name: '视频广告' },
  { value: 1048, type: '搜索引擎', name: '百度' },
  { value: 251, type: '搜索引擎', name: '谷歌' },
  { value: 147, type: '搜索引擎', name: '必应' },
  { value: 102, type: '搜索引擎', name: '其他' }
];

const ds = new DataSet();
const dv = ds.createView('tt');
dv.source(data);
dv.transform({
  type:'percent',
  field:'value',
  dimension:'name',
  as:'percent', 
});


const dv1 = ds.createView('ss');
dv1.source(data);
dv1.transform({
  type:'percent',
  field:'value',
  dimension:'type',
  as:'percent',
});

class App extends Component {
  componentDidMount() {
    this.chart = this.c.getG2Instance();
  }
	download = () => {
    this.chart && this.chart.downloadImage();
  }
  render() {
    return (
      <div>
        <button type="primary" onClick={this.download}>下载图片</button>
        <Chart width={600} height={400} data={data} ref={(c) => { this.c = c; }}>
        <Tooltip />
				<Legend />
          <View data={dv1} >
            <Coord type="theta"/>
            <Geom
              type="intervalStack"
              position={'percent'} 
              color={['type', ['#4E7CCC', '#36B3C3', '#F9815C']]}
            >
             <Label  label='type' offset={-50} fontSize={12}/>
            </Geom>
          </View>
          <View data={dv}>
            <Coord type="theta" innerRadius={0.75} />
            <Geom
              type="intervalStack"
              position={'percent'} 
              color={['name', ['#ff7CCC', '#36ddC3', '#F981ff']]}
              label="percent"
              select={{ mode: 'multiple' }}
            >
               <Label  label='name*type' />
            </Geom>
          </View>
        </Chart>
      </div>
    );
  }
}

ReactDOM.render((<App />), document.getElementById('mountNode'));
````