import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { Chart, Guide, Geom } from 'bizcharts';

//  chart无法获取guide实例
const { RegionFilter } = Guide;

chai.use(chaiEnzyme()); // Note the invocation at the end
Enzyme.configure({ adapter: new Adapter() });
let chartInstance = null;
const data = [{
  year: 1700,
  exports: 35,
  imports: 70,
}, {
  year: 1710,
  exports: 59,
  imports: 81,
}, {
  year: 1720,
  exports: 76,
  imports: 96,
}];
const scale = {
  value: {
    min: 0,
    max: 200,
  },
  range: {
    min: 0,
    max: 200,
  },
};

describe('Guide', () => {
  const wrapper = mount(
    <Chart
      width={600}
      height={400}
      data={data}
      scale={scale}
      onGetG2Instance={(chart) => { chartInstance = chart; }}
    >
      <Geom
        type="line"
        position="year*value"
        color={['type', ['#F5222D', '#FAAD14']]}
        size={2.5}
        shape="smooth"
      />
      <Guide>
        <RegionFilter
          top
          start={[1700, 'min']}
          end={[1753, 'max']}
          color="#F5222D"
          apply={['area']}
        />
      </Guide>
    </Chart>
  );
  it('Guide', () => {
    // console.log(chartInstance._attrs.geoms[0]._attrs);
    // expect(chartInstance.get('guide')).not.to.be.empty;
  });
});
