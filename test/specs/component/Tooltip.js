import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

const BizCharts = require('../../../src/index');

chai.use(chaiEnzyme()); // Note the invocation at the end
Enzyme.configure({ adapter: new Adapter() });
const { Chart, Geom, Tooltip } = BizCharts;

describe('Tooltip API test: ', () => {
  it('tooltip disable', () => {
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
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.tooltip).to.equal(null);
  });
});

describe('Tooltip API test: ', () => {
  it('tooltip enable', () => {
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
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.tooltip).to.be.an('object');
  });
});

describe('Tooltip API test: ', () => {
  it('triggerOn click', () => {
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
        <Tooltip triggerOn="click" />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.triggerOn).to.equal('click');
  });
});

describe('Tooltip API test: ', () => {
  it('triggerOn mousemove', () => {
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
        <Tooltip triggerOn="mousemove" />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.triggerOn).to.equal('mousemove');
  });
});

describe('Tooltip API test: ', () => {
  it('triggerOn none', () => {
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
        <Tooltip triggerOn="none" />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.triggerOn).to.equal('none');
  });
});

describe('Tooltip API test: ', () => {
  it('showTitle allow', () => {
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
        <Tooltip showTitle />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.showTitle).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.showTitle).to.equal(true);
  });
});

describe('Tooltip API test: ', () => {
  it('showTitle not allow', () => {
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
        <Tooltip showTitle={false} />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.showTitle).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.showTitle).to.equal(false);
  });
});

describe('Tooltip API test: ', () => {
  it('title string', () => {
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
        <Tooltip title="string" />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.title).to.be.an('string');
    expect(g2Instance._attrs.tooltipController.options.title).to.equal('string');
  });
});

describe('Tooltip API test: ', () => {
  it('crosshairs', () => {
    let g2Instance = null;
    const crosshairsCfg = {
      // rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
      type: 'rect' || 'x' || 'y' || 'cross',
      style: {
        lineWidth: 2,
        stroke: '#ff0000',
      }
    };
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
        <Tooltip
          crosshairs={crosshairsCfg}
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.crosshairs).to.be.an('object');
    expect(g2Instance._attrs.tooltipController.options.crosshairs).to.equal(crosshairsCfg);
  });
});

describe('Tooltip API test: ', () => {
  it('offset', () => {
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
        <Tooltip
          offset={20}
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.offset).to.be.an('number');
    expect(g2Instance._attrs.tooltipController.options.offset).to.equal(20);
  });
});

describe('Tooltip API test: ', () => {
  it('inPlot is true', () => {
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
        <Tooltip
          inPlot
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.inPlot).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.inPlot).to.equal(true);
  });
});

describe('Tooltip API test: ', () => {
  it('inPlot is false', () => {
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
        <Tooltip
          inPlot={false}
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.inPlot).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.inPlot).to.equal(false);
  });
});

describe('Tooltip API test: ', () => {
  it('follow is true', () => {
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
        <Tooltip
          follow
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.follow).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.follow).to.equal(true);
  });
});

describe('Tooltip API test: ', () => {
  it('follow is false', () => {
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
        <Tooltip
          follow={false}
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.follow).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.follow).to.equal(false);
  });
});

describe('Tooltip API test: ', () => {
  it('shared is true', () => {
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
        <Tooltip
          shared
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.shared).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.shared).to.equal(true);
  });
});

describe('Tooltip API test: ', () => {
  it('shared is false', () => {
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
        <Tooltip
          shared={false}
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.shared).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.shared).to.equal(false);
  });
});

describe('Tooltip API test: ', () => {
  it('enterable is true', () => {
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
        <Tooltip
          enterable
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.enterable).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.enterable).to.equal(true);
  });
});

describe('Tooltip API test: ', () => {
  it('enterable is false', () => {
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
        <Tooltip
          enterable={false}
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.enterable).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.enterable).to.equal(false);
  });
});

describe('Tooltip API test: ', () => {
  it('position is left', () => {
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
        <Tooltip
          position="left"
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.position).to.be.an('string');
    expect(g2Instance._attrs.tooltipController.options.position).to.equal('left');
  });
});

describe('Tooltip API test: ', () => {
  it('position is right', () => {
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
        <Tooltip
          position="right"
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.position).to.be.an('string');
    expect(g2Instance._attrs.tooltipController.options.position).to.equal('right');
  });
});

describe('Tooltip API test: ', () => {
  it('position is top', () => {
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
        <Tooltip
          position="top"
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.position).to.be.an('string');
    expect(g2Instance._attrs.tooltipController.options.position).to.equal('top');
  });
});

describe('Tooltip API test: ', () => {
  it('position is bottom', () => {
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
        <Tooltip
          position="bottom"
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.position).to.be.an('string');
    expect(g2Instance._attrs.tooltipController.options.position).to.equal('bottom');
  });
});

describe('Tooltip API test: ', () => {
  it('hideMarkers is true', () => {
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
        <Tooltip
          hideMarkers
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.hideMarkers).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.hideMarkers).to.equal(true);
  });
});

describe('Tooltip API test: ', () => {
  it('hideMarkers is false', () => {
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
        <Tooltip
          hideMarkers={false}
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.hideMarkers).to.be.an('boolean');
    expect(g2Instance._attrs.tooltipController.options.hideMarkers).to.equal(false);
  });
});

describe('Tooltip API test: ', () => {
  it('containerTpl', () => {
    let g2Instance = null;
    const containerTpl = '<div class="g2-tooltip">'
    + '<div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>'
    + '<ul class="g2-tooltip-list"></ul>'
    + '</div>';
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
        <Tooltip
          containerTpl={containerTpl}
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.containerTpl).to.be.an('string');
    expect(g2Instance._attrs.tooltipController.options.containerTpl).to.equal(containerTpl);
  });
});

describe('Tooltip API test: ', () => {
  it('itemTpl', () => {
    let g2Instance = null;
    const itemTpl = '<li data-index={index}>'
    + '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>'
    + '{name}: {value}'
    + '</li>';
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
        <Tooltip
          itemTpl={itemTpl}
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.itemTpl).to.be.an('string');
    expect(g2Instance._attrs.tooltipController.options.itemTpl).to.equal(itemTpl);
  });
});

describe('Tooltip API test: ', () => {
  it('g2-tooltip custom', () => {
    let g2Instance = null;
    const containerTpl = '<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
    const itemTpl = '<tr class="g2-tooltip-list-item"><td style="color:{color}">{name}</td><td>{value}</td></tr>'
    const g2Tooltip = {
      position: 'absolute',
      visibility: 'hidden',
      border: '1px solid #efefef',
      backgroundColor: 'white',
      color: '#000',
      opacity: '0.8',
      padding: '5px 15px',
      transition: 'top 200ms,left 200ms',
    };
    const g2TooltipTitle = {
      margin: '20px',
    };
    const g2TooltipList = {
      margin: '10px',
    };
    const g2TooltipListItem = {
      color: '#F00',
    };
    const g2TooltipMarker = {
      opacity: '0.6',
    };
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
        <Tooltip
          containerTpl={containerTpl}
          itemTpl={itemTpl}
          g2-tooltip={g2Tooltip}
          g2-tooltip-title={g2TooltipTitle}
          g2-tooltip-list={g2TooltipList}
          g2-tooltip-list-item={g2TooltipListItem}
          g2-tooltip-marker={g2TooltipMarker}
        />
        <Geom type="point" position="key*value" />
      </Chart>
    );

    expect(wrapper.find('div').length).to.equal(2);
    expect(g2Instance._attrs.tooltipController.options.itemTpl).to.be.an('string');
    expect(g2Instance._attrs.tooltipController.options.containerTpl).to.equal(containerTpl);
    expect(g2Instance._attrs.tooltipController.options['g2-tooltip']).to.equal(g2Tooltip);
    expect(g2Instance._attrs.tooltipController.options['g2-tooltip-title']).to.equal(g2TooltipTitle);
    expect(g2Instance._attrs.tooltipController.options['g2-tooltip-list']).to.equal(g2TooltipList);
    expect(g2Instance._attrs.tooltipController.options['g2-tooltip-list-item']).to.equal(g2TooltipListItem);
    expect(g2Instance._attrs.tooltipController.options['g2-tooltip-marker']).to.equal(g2TooltipMarker);
  });
});
