import React from 'react';
import {
  Chart,
  Interval,
  Legend,
  Tooltip,
  Axis,
  Line,
  registerShape,
  Interaction,
  Coordinate
} from '../../src';


const sliceNumber = 0.01; // 自定义 other 的图形，增加两条线

registerShape("interval", "sliceShape", {
  draw(cfg, container) {
    const {points} = cfg;
    let path = [];
    path.push(["M", points[0].x, points[0].y]);
    path.push(["L", points[1].x, points[1].y - sliceNumber]);
    path.push(["L", points[2].x, points[2].y - sliceNumber]);
    path.push(["L", points[3].x, points[3].y]);
    path.push("Z");
    path = this.parsePath(path);
    return container.addShape("path", {
      attrs: {
        fill: cfg.color,
        path
      }
    });
  }
});

function Labelline() {
  const data = [
    { item: '事例一', count: 40, percent: 0.4 },
    { item: '事例二', count: 21, percent: 0.21 },
    { item: '事例三', count: 17, percent: 0.17 },
    { item: '事例四', count: 13, percent: 0.13 },
    { item: '事例五', count: 9, percent: 0.09 },
  ];

  const cols = {
    percent: {
      formatter: val => {
        return `${val * 100}%`;
      },
    },
  };

  return (
    <>
      <Chart
        height={200}
        data={data}
        scale={cols}
        autoFit
        placeholder
        // interactions={['element-selected']}
      >
        <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
        <Tooltip linkage={["test", (records, chart) => {
          // 堆叠的
          return chart.getXY({ 1:'1', ...records[0].data })
        }]} showTitle={false} />
        <Axis visible={false} />
        <Interval
          shape="sliceShape"
          position="percent"
          adjust="stack"
          color="item"
          label={['count', {
            content: d => {
              return `${d.item}: ${d.percent * 100}%`;
            },
          }]}
        />
        <Legend itemName={{ formatter: () => 'custname' }} itemValue={{ formatter: () => 323 }} />
        <Interaction type="element-selected" />
      </Chart>
      <Chart
        height={200}
        data={data}
        scale={cols}
        appendPadding={20}
        autoFit
      >
        <Tooltip showTitle={false} shared linkage={["test", (records, chart) => {
          return chart.getXY({...records[0].data});
        }]} />
        <Interval
          position="item*percent"
          // adjust="item"
          color="item"
          label={['count', {
            content: d => {
              return `${d.item}: ${d.percent * 100}%`;
            },
          }]}
        />
        <Legend itemName={{ formatter: () => 'custname' }} itemValue={{ formatter: () => 323 }} />
        <Interaction type="element-selected" />
      </Chart>
      <Chart
        height={200}
        data={data}
        scale={cols}
        autoFit
      >
        <Tooltip linkage={["test", (records, chart) => {
          return chart.getXY(records[0].data);
        }]} showTitle={false} />
        <Line
          position="item*count"
        />
        <Legend itemName={{ formatter: () => 'custname' }} itemValue={{ formatter: () => 323 }} />
        <Interaction type="element-selected" />
      </Chart>
    </>
  );
}

export default Labelline;
