import React from 'react';
import numeral from 'numeral';
import { Chart, Geom, Axis, Tooltip, Coordinate } from '../../src';

// CDN START

const BarLabel = () => {
    const data = [
      {
        age: '18以下',
        count: 0.08,
      },
      {
        age: '19-25',
        count: 0.12,
      },
      {
        age: '26-30',
        count: 0.15,
      },
      {
        age: '31-35',
        count: 0.25,
      },
      {
        age: '36-40',
        count: 0.2,
      },
      {
        age: '41-45',
        count: 0.15,
      },
      {
        age: '46以上',
        count: 0.05,
      },
    ];
    const cols = {};
    return (
      <Chart
        height={600}
        data={data}
        scale={cols}
        padding="auto"
        autoFit
      >
        <Coordinate transpose />
        <Axis name="age" />
        <Axis name="count" visible={false} />
        <Tooltip />
        {/* 凸显类型 color={['age', '#E6F6C8-#3376CB']} */}
        <Geom
          type="interval"
          position="age*count"
          color={['count', '#E6F6C8-#3376CB']}
          label={['age*count', (name, value) => numeral(value || 0).format('0.0%')]}
         />
      </Chart>
    );
}

// CDN END
export default BarLabel;

