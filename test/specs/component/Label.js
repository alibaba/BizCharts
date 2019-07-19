import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

const BizCharts = require('../../../src/index');

chai.use(chaiEnzyme()); // Note the invocation at the end
Enzyme.configure({ adapter: new Adapter() });
const { Chart, Geom, Label } = BizCharts;

describe('Label API test: ', () => {
  let g2Instance = null;
  const ChartComponent = ({ content = 'string' }) => {
    return (
      <Chart
        onGetG2Instance={(g2Chart) => { g2Instance = g2Chart; }}
        width={600}
        height={400}
        data={[
          { key: 'a', value: 1, type: 'x' },
          { key: 'a', value: 2, type: 'y' }
        ]}
      >
        <Geom type="point" position="key*value" >
          <Label content={content} />
        </Geom>
      </Chart>
    );
  };
  const wrapper = mount(<ChartComponent />);

  it('content update', () => {
    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields).to.be.an('array');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields[0]).to.equal('string');
  });
  it('updateData', () => {
    wrapper.setProps({ content: ['key*value'] });
    wrapper.update();
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields).to.be.an('array');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields.length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields[0]).to.equal('key');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields[1]).to.equal('value');
  });
});

describe('Label API test: ', () => {
  it('content is static string', () => {
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
        <Geom type="point" position="key*value" >
          <Label content="string" />
        </Geom>
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields).to.be.an('array');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields[0]).to.equal('string');
  });
});

describe('Label API test: ', () => {
  it('content is fields', () => {
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
        <Geom type="point" position="key*value" >
          <Label content={['key*value']} />
        </Geom>
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields).to.be.an('array');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields.length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields[0]).to.equal('key');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.fields[1]).to.equal('value');
  });
});

describe('Label API test: ', () => {
  it('label line is false', () => {
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
        <Geom type="point" position="key*value" >
          <Label
            content={['key*value']}
            labelLine={false}
          />
        </Geom>
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.labelLine).to.equal(false);
  });
});

describe('Label API test: ', () => {
  it('label line is object', () => {
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
        <Geom type="point" position="key*value" >
          <Label
            content={['key*value']}
            labelLine={{
              lineWidth: 1, // 线的粗细
              stroke: '#ff8800', // 线的颜色
              lineDash: [2, 1], // 虚线样式
            }}
          />
        </Geom>
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.labelLine).to.be.an('object');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.labelLine.lineWidth).to.equal(1);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.labelLine.stroke).to.equal('#ff8800');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.labelLine.lineDash).to.be.an('array');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.labelLine.lineDash[0]).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.labelLine.lineDash[1]).to.equal(1);
  });
});

describe('Label API test: ', () => {
  it('label offset', () => {
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
        <Geom type="point" position="key*value" >
          <Label
            content={['key*value']}
            offset={20}
          />
        </Geom>
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.offset).to.equal(20);
  });
});

describe('Label API test: ', () => {
  it('label text style', () => {
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
        <Geom type="point" position="key*value" >
          <Label
            content={['key*value']}
            textStyle={{
              textAlign: 'center', // 文本对齐方向，可取值为： start middle end
              fill: '#404040', // 文本的颜色
              fontSize: '12', // 文本大小
              fontWeight: 'bold', // 文本粗细
              rotate: 30,
              textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
            }}
          />
        </Geom>
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.textStyle).to.be.an('object');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.textStyle.textAlign).to.equal('center');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.textStyle.fill).to.equal('#404040');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.textStyle.fontSize).to.equal('12');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.textStyle.fontWeight).to.equal('bold');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.textStyle.rotate).to.equal(30);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.textStyle.textBaseline).to.equal('top');
  });
});

describe('Label API test: ', () => {
  it('autoRotate allow', () => {
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
        <Geom type="point" position="key*value" >
          <Label
            content={['key*value']}
            autoRotate
          />
        </Geom>
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.autoRotate).to.be.an('boolean');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.autoRotate).to.equal(true);
  });
});

describe('Label API test: ', () => {
  it('autoRotate not allow', () => {
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
        <Geom type="point" position="key*value" >
          <Label
            content={['key*value']}
            autoRotate={false}
          />
        </Geom>
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.autoRotate).to.be.an('boolean');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.autoRotate).to.equal(false);
  });
});

describe('Label API test: ', () => {
  it('formatter', () => {
    let g2Instance = null;
    const formatterFunc = () => {};
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
        <Geom type="point" position="key*value" >
          <Label
            content={['key*value']}
            formatter={formatterFunc}
          />
        </Geom>
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.formatter).to.be.an('function');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.formatter).to.equal(formatterFunc);
  });
});

describe('Label API test: ', () => {
  it('htmlTemplate', () => {
    let g2Instance = null;
    const htmlTemplateFunc = () => {};
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
        <Geom type="point" position="key*value" >
          <Label
            content={['key*value']}
            htmlTemplate={htmlTemplateFunc}
          />
        </Geom>
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.htmlTemplate).to.be.an('function');
    expect(g2Instance._attrs.geoms[0]._attrs.labelCfg.cfg.htmlTemplate).to.equal(htmlTemplateFunc);
  });
});
