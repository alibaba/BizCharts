import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
// import sinon from 'sinon';
import { Chart, View } from 'bizcharts';


chai.use(chaiEnzyme()); // Note the invocation at the end
Enzyme.configure({ adapter: new Adapter() });
let chartInstance = null;


const Test = ({ viewProps }) => {
  return (<Chart width={600} height={400} data={[]} onGetG2Instance={(chart) => { chartInstance = chart; }}>
    <View data={[]} {...viewProps} />
    <View data={[]} />
    <View data={[]} />
  </Chart>);
};

describe('Context', () => {
  const wrapper2 = mount(<Test />);
  it('viewsHasCreate', () => {
    expect(chartInstance.get('views').length).is.eqls(3);
  });
  it('updateData', () => {
    // console.log(chartInstance.get('views')[0]._attrs.data);
    wrapper2.setProps({ viewProps: { data: [{ a: 1 }] } });
    wrapper2.update();
    expect(chartInstance.get('views')[0]._attrs.data.length).is.eqls(1);
  });
});
