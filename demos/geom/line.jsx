import React from 'react';
import { Chart, Geom, Effects } from '../../src';
import Tooltip from '../../src/components/Tooltip';

const data = [
  { year: '1991', value1: 3.5, value: 3 },
  { year: '1992', value1: 4, value: 4 },
  { year: '1993', value1: 3, value: 3.5 },
  { year: '1994', value1: 5, value: 5 },
  { year: '1995', value1: 4, value: 4.9 },
  { year: '1996', value1: 6.6, value: 6 },
  { year: '1997', value1: 7, value: 7 },
  { year: '1998', value1: 9, value: 9 },
  { year: '1999', value1: 11, value: 13 },
];

function Basic() {
  const cols = {
    value: {
      type: 'linear-strict',
      tickCount: 6,
    },
    value1: {
      type: 'linear-strict',
      tickCount: 6,
    },
    year: {
      range: [0, 1],
    },
  };
  return (
    <div>
      <Chart height={400} data={data} scale={cols} autoFit>
        <Geom type="line" position="year*value" size={2} />
        <Geom
          type="point"
          position="year*value"
          size={4}
          shape="circle"
          style={{
            stroke: 'red',
            lineWidth: 1,
          }}
        />
        <Geom type="line" position="year*value1" size={2} />
        <Geom
          type="point"
          position="year*value1"
          size={4}
          shape="circle"
          style={{
            stroke: 'red',
            lineWidth: 1,
          }}
        />
        {/* <Text position={ ['50%', '50%']} content="24 hours" /> */}
        <Tooltip shared className="sd" containerStyle={{ padding: 30, background: '#000' }}>
          {(title, items) => {
            return (
              <div>
                {title}
                {items?.length}
              </div>
            );
          }}
        </Tooltip>
        <Effects>
          {/* {(chart) => {
            chart.tooltip({
              showMarkers: false
            })
          }} */}
        </Effects>
      </Chart>
    </div>
  );
}

export default Basic;
