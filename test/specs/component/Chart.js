import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
// import sinon from 'sinon';
import { Chart, Geom } from 'bizcharts';


chai.use(chaiEnzyme()); // Note the invocation at the end
Enzyme.configure({ adapter: new Adapter() });


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

// 因为canvas是Didmount之后加的，所以wrapper搜寻不到对应reactNode
describe('<Chart /> size props of width and height', () => {
  let chartInstance = null;
  const wrapper = mount(
    <div width={600}>
      <Chart height={500} width={800} data={data} padding={[0, 50, 20, 50]} onGetG2Instance={chart => { chartInstance = chart; }} >
        <Geom type="line" position="year*value" />
      </Chart>
    </div>
  );
  it('int', () => {
    expect(wrapper.getDOMNode().getElementsByTagName('canvas').length).to.equal(1);
    expect(wrapper.getDOMNode().getElementsByTagName('canvas')[0].width).to.equal(800);
    expect(chartInstance.get('width')).equal(800);
    expect(chartInstance.get('height')).equal(500);
  });

  it('plot test', () => {
    expect(chartInstance.get('plotRange').tl).eqls({ x: 50, y: 0 });
    expect(chartInstance.get('plotRange').br).eqls({ x: 750, y: 480 });
  });
});

// 因为canvas是Didmount之后加的，所以wrapper搜寻不到对应reactNode
describe('<Chart /> data prop', () => {
  let chartInstance = null;
  const wrapper = mount(
    <Chart
      height={500}
      width={800}
      data={data}
      padding={[0, 50, 20, 50]}
      onGetG2Instance={(chart) => {
        // console.log(chart);
        chartInstance = chart;
      }}
    >
      <Geom type="line" position="year*value" />
    </Chart>
  );
  it('int', () => {
    expect(chartInstance.get('data').length).equal(9); // 数据初始化
  });

  it('update data', () => {
    wrapper.setProps({ data: [{ year: '1991', value: 3 }] });
    wrapper.update();
    expect(chartInstance.get('data').length).equal(1);
  });
});
