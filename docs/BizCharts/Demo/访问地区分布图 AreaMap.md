# 访问地区分布图 AreaMap

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77fc56e0-9979-11ea-8225-e30c1937e15c.png)

```js
import React from 'react';
import { Chart, Geom, Tooltip, Legend } from 'bizcharts@3.5.8';
import numeral from 'numeral';
import DataSet from '@antv/data-set';

// 示例地图数据，数据来源DATAV.GeoAtlas: https://datav.aliyun.com/tools/atlas，当前数据只做示例用。
const MAP_URL = 'https://gw.alipayobjects.com/os/basement_prod/a502afb5-d979-443c-9c40-92c0bc297dc9.json';

class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chinaGeo: null,
    };
  }

  componentDidMount() {
    fetch(MAP_URL).then(v => v.json()).then((v) => {
      this.setState({ chinaGeo: v });
    });
  }

  processGeoData = (geoData, dataValue) => {
    const { features } = geoData;
    features.forEach((one) => {
      const name = one && one.properties && one.properties.name;
      dataValue.forEach((item) => {
        if (name.includes(item.name)) {
          one.value = item.value;
        }
      });
    });

    const geoDv = new DataSet.View().source(geoData, { type: 'GeoJSON' });
    return geoDv;
  };

  render() {
    const area = [
      { key: '10105', name: '广东', value: 0.1138 },
      { key: '10125', name: '四川', value: 0.0899 },
      { key: '10102', name: '安徽', value: 0.0695 },
      { key: '10130', name: '浙江', value: 0.0525 },
      { key: '10112', name: '湖北', value: 0.0505 },
      { key: '10124', name: '上海', value: 0.0495 },
      { key: '10103', name: '福建', value: 0.0484 },
      { key: '10131', name: '重庆', value: 0.0419 },
      { key: '10115', name: '江苏', value: 0.0402 },
      { key: '10123', name: '陕西', value: 0.0388 },
      { key: '10121', name: '山东', value: 0.0387 },
      { key: '10109', name: '河北', value: 0.0359 },
      { key: '10116', name: '江西', value: 0.0315 },
      { key: '10113', name: '湖南', value: 0.0304 },
      { key: '10129', name: '云南', value: 0.0294 },
      { key: '10101', name: '北京', value: 0.0246 },
      { key: '10104', name: '甘肃', value: 0.0232 },
      { key: '10114', name: '吉林', value: 0.0229 },
      { key: '10107', name: '贵州', value: 0.0223 },
      { key: '10106', name: '广西', value: 0.022 },
      { key: '10110', name: '河南', value: 0.019 },
      { key: '10117', name: '辽宁', value: 0.0152 },
      { key: '10118', name: '内蒙古', value: 0.0142 },
      { key: '10128', name: '新疆', value: 0.0142 },
      { key: '10111', name: '黑龙江', value: 0.014 },
      { key: '10126', name: '天津', value: 0.0122 },
      { key: '10122', name: '山西', value: 0.0103 },
      { key: '10108', name: '海南', value: 0.0098 },
      { key: '10119', name: '宁夏', value: 0.008 },
      { key: '10120', name: '青海', value: 0.0052 },
      { key: '10127', name: '西藏', value: 0.002 },
    ];
    const { chinaGeo } = this.state;
    if (!chinaGeo) {
      return '数据加载中...';
    }
    const data = this.processGeoData(chinaGeo, area);
    const scale = {
      latitude: {
        sync: true,
        nice: false,
      },
      longitude: {
        sync: true,
        nice: false,
      },
      value: {
        formatter: val => numeral(val || 0).format('0.0%'),
      },
    };
    return [
      <div key="1" style={{ position: 'relative' }}>
        <Chart height={500} width={645} scale={scale} data={data} padding={[0, 0, 0, 90]}>
          <Geom
            type="polygon"
            position="longitude*latitude"
            style={{ lineWidth: 1, stroke: '#505050' }}
            // color={['value', ['#31c5f8', '#61d3f8', '#89dcfd', '#b0e8f8', '#d8f3ff']]}
            color={['value', ['#d9f4ff', '#33c5f6']]}
            tooltip={[
              'name*value',
              (name, value) => ({
                name,
                value: numeral(value || 0).format('0.0%'),
              }),
            ]}
          >
            <Tooltip showTitle={false} />
            <Legend
              position="bottom-left"
              offsetY={-130}
              offsetX={-60}
              slidable={false}
              width={320}
            />
          </Geom>
        </Chart>
      </div>,
    ];
  }
}

ReactDOM.render(<MapChart/>, mountNode);

```
