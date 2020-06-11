import React, { useState } from "react";
import Canvas from "../../src/g-components/Canvas";
import Circle from "../../src/g-components/Circle";
import Ellipse from "../../src/g-components/Ellipse";
import Group from "../../src/g-components/Group";
import Image from "../../src/g-components/Image";
import Line from "../../src/g-components/Line";
import Marker from "../../src/g-components/Marker";
import Path from "../../src/g-components/Path";
import Polygon from "../../src/g-components/Polygon";
import Polyline from "../../src/g-components/Polyline";

import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  getTheme,
  Legend,
  Effects,
  GComponents,
  Coordinate
} from '../../src';

const { Rect, Text } = GComponents

const colors = [
  '#f5222d',
  '#fa541c',
  '#fa8c16',
  '#faad14',
  '#fadb14',
  '#a0d911',
  '#52c41a',
  '#13c2c2',
  '#1890ff',
  '#2f54eb',
  '#722ed1',
  '#eb2f96',
]

function Labelline() {
  const data = [
    { year: '2001', population: 41.8 },
    { year: '2002', population: 38 },
    { year: '2003', population: 33.7 },
    { year: '2004', population: 30.7 },
    { year: '2005', population: 25.8 },
    { year: '2006', population: 31.7 },
    { year: '2007', population: 33 },
    { year: '2008', population: 46 },
    { year: '2009', population: 38.3 },
    { year: '2010', population: 28 },
    { year: '2011', population: 42.5 },
    { year: '2012', population: 30.3 },
  ];


  return (
    <Chart height={400} padding={20} scale={{
      population: { range: [0, 0.7] }
    }} data={data} autoFit >
      <Coordinate innerRadius={0.3} type="polar" />
      <Axis grid={false} name="population" />
      <Legend visible={false} />
      <Axis name="population" visible={false} />
      <Axis name="year" grid={false} visible={true} label={false} />
      <Tooltip showTitle={false} />
      <Interval
        position="year*population"
        adjust="stack"
        element-highlight
        color={["year", colors]}
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
      />
      <Group>
        <Text attrs={{ x: 100, y: 50, fill: '#000', fontSize: 14, text: '高度自定义的图表' }} />
        <Effects>
          {chart => {
            const data = chart.filteredData;
            const xScale = chart.getXScale();
            // const yScale = chart.getYScales();
            const coord = chart.getCoordinate();

            return <>
              {
                data.map((d, index) => {
                  const { x, y } = coord.convert({
                    x: xScale.scale(d.year),
                    y: 1
                  });
                  return <Group onClick={console.log} key={index}>
                    <Rect
                      onClick={console.log}
                      attrs={{
                        x: x - 15,
                        y: y,
                        width: 30,
                        height: 10,
                        radius: 5,
                        dx: 5,
                        r: 20,
                        fill: colors[index]
                      }}
                      animate={{
                        toAttrs: {
                          x: x - 10,
                          y: y - 5,
                          radius: 10,
                          width: 20,
                          height: 20,
                        },
                        duration: 2000,
                        easing: 'easeQuadInOut',
                        // repeat: true,
                        delay: 1000
                      }}
                    />
                    <Text attrs={{
                      x,
                      y: y - 8,
                      textAlign: 'center',
                      textBaseline: 'middle',
                      text: d.year,
                      fill: '#333'
                    }} />
                  </Group>
                })
              }
            </>;
          }}
        </Effects>
      </Group>
    </Chart>
  );
}


export default function Demo() {
  const [y, setY] = useState(10)
  return <div>
    <div onClick={() => {
      setY(y + 1);
    }}>click me</div>
    <Labelline />
    <Canvas width={800} height={400} id="test">
      {(y < 12 || y > 16) && <Circle ref={(c) => {
        console.log(222, c)
      }} attrs={{ x: 10, y, r: 10, fill: 'red' }} />}
      <Group>
        <Ellipse attrs={{
          x: 300,
          y: 200,
          rx: 30,
          ry: 50,
          fill: '#1890FF',
          stroke: '#F04864',
          lineWidth: 4,
          radius: 8,
        }} />
        <Image attrs={{
          x: 200,
          y: 100,
          width: 200,
          height: 200,
          img: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        }} />
        <Line attrs={{
          x1: 200,
          y1: 100,
          x2: 400,
          y2: 100,
          stroke: '#1890FF',
          lineWidth: 2,
        }} />
        <Marker attrs={{
          r: 30,
          lineWidth: 2,
          stroke: '#F04864',
          fill: '#92323',
          x: 100,
          y: 100,
          symbol: 'triangle',
        }} />
        <Path attrs={{
          path: [
            ['M', 100, 100],
            ['L', 200, 200],
          ],
          startArrow: {
            path: 'M 10,0 L -10,-10 L -10,10 Z',
            d: 10,
          },
          stroke: '#F04864',
        }} />
        <Polygon attrs={{
          points: [
            [200, 100],
            [400, 100],
            [400 + 200 * Math.sin(Math.PI / 6), 100 + 200 * Math.cos(Math.PI / 6)],
            [400, 100 + 200 * Math.cos(Math.PI / 6) * 2],
            [200, 100 + 200 * Math.cos(Math.PI / 6) * 2],
            [200 - 200 * Math.sin(Math.PI / 6), 100 + 200 * Math.cos(Math.PI / 6)],
          ],
          stroke: '#1890FF',
          lineWidth: 2,
        }} />
        <Polyline attrs={{
          points: [
            [50, 50],
            [100, 50],
            [100, 100],
            [150, 100],
            [150, 150],
            [200, 150],
            [200, 200],
            [250, 200],
            [250, 250],
            [300, 250],
            [300, 300],
            [350, 300],
            [350, 350],
            [400, 350],
            [400, 400],
            [450, 400],
          ],
          lineWidth: 4,
          stroke: '#1890FF',
        }} />
        <Rect attrs={{
          x: 200,
          y: 100,
          width: 300,
          height: 200,
          fill: '#1890FF',
          stroke: '#F04864',
          lineWidth: 4,
          radius: 8,
        }} />
        <Text attrs={{
          x: 100,
          y: 100,
          fontFamily: 'PingFang SC',
          text: 'This is text',
          fontSize: 60,
          fill: '#1890FF',
          stroke: '#F04864',
        }} />
      </Group>
    </Canvas>
  </div>
}
