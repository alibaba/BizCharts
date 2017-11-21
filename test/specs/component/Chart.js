import React from 'react';
import { mount, render } from 'enzyme';
import { expect } from 'chai';
import BizCharts from 'bizcharts';

const { Chart, Geom } = BizCharts;


describe('<Chart height={300}/>', () => {
  it('Render no data Chart', () => {
    const wrapper = mount(
      <Chart height={300} />
    );

    expect(wrapper.find('div').length).to.equal(3);
  });
});

describe('<Chart height={300} data={[{ a: 1 }]} />', () => {
  it('Render have data Chart', () => {
    const wrapper = mount(
      <Chart height={300} data={[{ a: 1 }]} />
    );

    expect(wrapper.find('div').length).to.equal(2);
  });
});

const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 }
];

describe('<Chart forceFit={true} />', () => {
  it('Render chart forceFit ', () => {
    const wrapper = mount(
      <div width={600}>
        <Chart height={300} width={400} data={data} >
          <Geom type="line" position="year*value" />
        </Chart>
      </div>
    );

    expect(wrapper.find('canvas').length).to.equal(1);
    expect(wrapper.find('canvas')[0].width).to.equal(600);
  });
});

