import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
// import sinon from 'sinon';
import { Chart, Coord } from 'bizcharts';


chai.use(chaiEnzyme()); // Note the invocation at the end
Enzyme.configure({ adapter: new Adapter() });
let chartInstance = null;


const Test1 = ({ viewProps }) => {
  return (
    <Chart width={600} height={400} data={[]} onGetG2Instance={(chart) => { chartInstance = chart; }}>
      <Coord type="Helix" radius={0.5} rotate={30} startAngle={-Math.PI / 6} endAngle={7 * Math.PI / 6} {...viewProps} />
    </Chart>
  );
};
describe('Helix', () => {
  const wrapper1 = mount(<Test1 />);

  it('endAngle', () => {
    expect(chartInstance.get('coordController').cfg.startAngle).eqls(-Math.PI / 6);
    expect(chartInstance.get('coordController').cfg.endAngle).eqls(7 * Math.PI / 6);
  });
  it('update data', () => {
    wrapper1.setProps({ viewProps: { startAngle: Math.PI / 9 } });
    wrapper1.update();
    console.log(chartInstance.get('coordController').cfg);
    expect(chartInstance.get('coordController').cfg.startAngle).eqls(Math.PI / 9);
  });
});
