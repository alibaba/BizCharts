import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

const BizCharts = require('../../../src/index');

chai.use(chaiEnzyme()); // Note the invocation at the end
Enzyme.configure({ adapter: new Adapter() });
const { Chart, Geom } = BizCharts;


describe('<Chart height={300}/>', () => {
  it('Render no data Chart', () => {
    const wrapper = mount(
      <Chart height={300} />
    );

    expect(wrapper.find('div').length).to.equal(2);
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
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 }
];

describe('<Chart forceFit={true} />', () => {
  it('Render chart forceFit ', () => {
    let g2Instance = null;
    const wrapper = mount(
      <div width={600} height={400} >
        <Chart
          onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
          height={300}
          width={400}
          data={data}
          forceFit
        >
          <Geom type="line" position="year*value" />
        </Chart>
      </div>
    );

    expect(wrapper.find('div').length).to.equal(3);
    expect(g2Instance._attrs.forceFit).to.equal(true);
  });
});

