import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
// import sinon from 'sinon';
import { Chart, Coord } from 'bizcharts';


chai.use(chaiEnzyme()); // Note the invocation at the end
Enzyme.configure({ adapter: new Adapter() });

describe('Helix', () => {
  let chartInstance = null;
  const wrapper = mount(
    <Chart width={600} height={400} data={[]} onGetG2Instance={(chart) => { chartInstance = chart; }}>
      <Coord type="Helix" radius={0.5} rotate={30} startAngle={-Math.PI / 6} endAngle={7 * Math.PI / 6} />
    </Chart>
  );
  it('angle', () => {
    expect(chartInstance.get('coordController').cfg.startAngle).eqls(-Math.PI / 6);
    expect(chartInstance.get('coordController').cfg.endAngle).eqls(7 * Math.PI / 6);
  });
  // 这个逻辑一直有问题 chartInstance 时机
  it('update data', () => {
    wrapper.find('Coord').setProps({ startAngle: Math.PI / 9 });
    wrapper.update();
    expect(chartInstance.get('coordController').cfg.startAngle).eqls(Math.PI / 9);
  });
});
