import React from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate
} from '../../src';

function Labelline () {
  const data = [
    { year: '2001', population: 41.8 },
    { year: '2002', population: 38 },
    { year: '2003', population: 33.7 },
    { year: '2004', population: 30.7 },
    { year: '2005', population: 25.8 },
    { year: '2006', population: 31.7 },
    { year: '2007', population: 33 },
    { year: '2008', population: 46 },
    { year: '2009', population: 38.3 },
    { year: '2010', population: 28 },
    { year: '2011', population: 42.5 },
    { year: '2012', population: 30.3 },
  ];


  return (
    <Chart height={400} data={data} autoFit>
      <Coordinate type="polar" />
      <Axis visible={false} />
      <Tooltip showTitle={false} />
      <Interval
        position="year*population"
        adjust="stack"
        element-highlight
        color="year"
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
        label={['year', {
           offset: -15,
        }]}
      />
    </Chart>
  );
}

export default Labelline;
