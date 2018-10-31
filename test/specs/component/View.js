import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
// import sinon from 'sinon';
import { Chart, View } from 'bizcharts';


chai.use(chaiEnzyme()); // Note the invocation at the end
Enzyme.configure({ adapter: new Adapter() });

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

describe('Helix', () => {
  let chartInstance = null;
  const wrapper = mount(
    <Chart width={600} height={400} data={[]} onGetG2Instance={(chart) => { chartInstance = chart; }}>
      <View data={data} />
    </Chart>
  );
  it('angle', () => {
    expect(chartInstance.get('coordController').cfg.startAngle).eqls(-Math.PI / 6);
    expect(chartInstance.get('coordController').cfg.endAngle).eqls(7 * Math.PI / 6);
  });
  // 这个逻辑一直有问题 chartInstance 时机
  it('update data', () => {
    wrapper.find('View').setProps({ data: [{ year: '1991', value: 3 }] });
    wrapper.update();
    expect(chartInstance.get('data').length).equal(1);
  });
});
