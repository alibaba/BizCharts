import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

const BizCharts = require('../../../src/index');

chai.use(chaiEnzyme()); // Note the invocation at the end
Enzyme.configure({ adapter: new Adapter() });
const { Chart, Geom, Tooltip } = BizCharts;

describe('Geom API test: ', () => {
  it('geom length', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[{ key: 'a', value: 1 }]}
      >
        <Geom type="point" position="key*value" />
        <Geom type="point" position="key*value" />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms).to.be.an('array');
    expect(g2Instance._attrs.geoms.length).to.equal(3);
  });
});

describe('Geom API test: ', () => {
  it('type is point', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[{ key: 'a', value: 1 }]}
      >
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.type).to.equal('point');
  });
});

describe('Geom API test: ', () => {
  it('type is line', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[{ key: 'a', value: 1 }]}
      >
        <Geom type="line" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.type).to.equal('line');
  });
});

describe('Geom API test: ', () => {
  it('type is interval', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[{ key: 'a', value: 1 }]}
      >
        <Geom type="interval" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.type).to.equal('interval');
  });
});

describe('Geom API test: ', () => {
  it('adjust is stack', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
        adjust="stack"
      >
        <Geom type="interval" position="key*value" color="type" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.adjust).to.equal('stack');
  });
});

describe('Geom API test: ', () => {
  it('adjust is dodge', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
        adjust="dodge"
      >
        <Geom type="interval" position="key*value" color="type" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.adjust).to.equal('dodge');
  });
});

describe('Geom API test: ', () => {
  it('adjust is jitter', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
        adjust="jitter"
      >
        <Geom type="interval" position="key*value" color="type" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.adjust).to.equal('jitter');
  });
});

describe('Geom API test: ', () => {
  it('adjust is symmetric', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
        adjust="symmetric"
      >
        <Geom type="interval" position="key*value" color="type" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.adjust).to.equal('symmetric');
  });
});

describe('Geom API test: ', () => {
  it('position', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
      >
        <Geom type="interval" position="key*value" color="type" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.attrs.position.type).to.equal('position');
    expect(g2Instance._attrs.geoms[0]._attrs.attrs.position.field).to.equal('key*value');
  });
});

describe('Geom API test: ', () => {
  it('color', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
      >
        <Geom type="interval" position="key*value" color="type" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.attrs.color.type).to.equal('color');
    expect(g2Instance._attrs.geoms[0]._attrs.attrs.color.field).to.equal('type');
  });
});

describe('Geom API test: ', () => {
  it('shape', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
      >
        <Geom type="point" position="key*value" shape="type" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.attrs.shape.type).to.equal('shape');
    expect(g2Instance._attrs.geoms[0]._attrs.attrs.shape.field).to.equal('type');
  });
});

describe('Geom API test: ', () => {
  it('size', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x', size: 200 },
          { key: 'a', value: 2, type: 'y', size: 100 }
        ]}
      >
        <Geom type="point" position="key*value" size="size" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.attrs.size.type).to.equal('size');
    expect(g2Instance._attrs.geoms[0]._attrs.attrs.size.field).to.equal('size');
  });
});

describe('Geom API test: ', () => {
  it('style is object', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x', size: 200 },
          { key: 'a', value: 2, type: 'y', size: 100 }
        ]}
      >
        <Geom style={{ lineWidth: 10 }} type="point" position="key*value" opacity="size" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.styleOptions.style.lineWidth).to.equal(10);
  });
});

describe('Geom API test: ', () => {
  it('style is array', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
      >
        <Geom style={['key*value', { lineWidth: 10 }]} type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.styleOptions.style.lineWidth).to.equal(10);
    expect(g2Instance._attrs.geoms[0]._attrs.styleOptions.fields.length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.styleOptions.fields[0]).to.equal('key');
    expect(g2Instance._attrs.geoms[0]._attrs.styleOptions.fields[1]).to.equal('value');
  });
});

describe('Geom API test: ', () => {
  it('tooltip', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
      >
        <Tooltip />
        <Geom type="point" position="key*value" tooltip="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.tooltipCfg.fields.length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.tooltipCfg.fields[0]).to.equal('key');
    expect(g2Instance._attrs.geoms[0]._attrs.tooltipCfg.fields[1]).to.equal('value');
  });
});

describe('Geom API test: ', () => {
  it('select allow', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
      >
        <Geom type="point" position="key*value" select />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.allowSelect).to.equal(true);
  });
});

describe('Geom API test: ', () => {
  it('select not allow', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
      >
        <Geom type="point" position="key*value" select={false} />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.allowSelect).to.equal(false);
  });
});

describe('Geom API test: ', () => {
  it('active allow', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
      >
        <Geom type="point" position="key*value" active />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.allowActive).to.equal(true);
  });
});


describe('Geom API test: ', () => {
  it('active not allow', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
      >
        <Geom type="point" position="key*value" active={false} />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.allowActive).to.equal(false);
  });
});

describe('Geom API test: ', () => {
  it('animate', () => {
    let g2Instance = null;
    const wrapper = mount(
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
      >
        <Geom
          type="point"
          position="key*value"
          animate={{
            animation: 'fadeIn', // 动画名称
            easing: 'easeInQuart', // 动画缓动效果
            delay: 100, // 动画延迟执行时间
            duration: 600 // 动画执行时间
          }}
        />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.animateCfg).to.be.an('object');
    expect(g2Instance._attrs.geoms[0]._attrs.animateCfg.animation).to.equal('fadeIn');
    expect(g2Instance._attrs.geoms[0]._attrs.animateCfg.easing).to.equal('easeInQuart');
    expect(g2Instance._attrs.geoms[0]._attrs.animateCfg.delay).to.equal(100);
    expect(g2Instance._attrs.geoms[0]._attrs.animateCfg.duration).to.equal(600);
  });
});
