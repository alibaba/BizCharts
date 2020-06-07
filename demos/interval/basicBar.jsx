import React, { useRef, useEffect, useState } from "react";
import DataSet from "@antv/data-set";
import {
  Chart,
  Coordinate,
  Tooltip,
  Axis,
  Effects,
  Interval,
} from "../../src";

import Canvas from "../../src/g-components/Canvas";
import Circle from "../../src/g-components/Circle";
import Ellipse from "../../src/g-components/Ellipse";
import Group from "../../src/g-components/Group";



function Pie ({ data }) {
  return (
    <Chart pure height={100} width={100} data={data} autoFit>
      <Coordinate type="polar" innerRadius={0.2} />
      <Interval
        position="year*population"
        adjust="stack"
        color="year"
        element-highlight
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
      />
      
    </Chart>
  );
}


const Basic = () => {
    const [count, setCount] = useState(0);
    const data = [
      {
        country: "中国",
        population: 131744
      },
      {
        country: "印度",
        population: 104970
      },
      {
        country: "美国",
        population: 29034,
      },
      {
        country: "印尼",
        population: 23489
      },
      {
        country: "巴西",
        population: 18203
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: "sort",

      callback(a, b) {
        // 排序依据，和原生js的排序callback一致
        return a.population - b.population > 0;
      }
    });
    const chart = useRef();
    useEffect(() => {
      console.log('chart ref', chart);
    }, [])
    console.log(8888)
    return (
      <div>
        <div onClick={() => {
          setCount(count+3)
        }}>clicke me</div>
        <Chart ref={chart} onAfterrender={() => console.log('onAfterRender')} height={200} data={dv.rows} autoFit>
        <Coordinate transpose />
        <Interval element-highlight position="country*population" />
        <Group>
          <Effects>
            {chart => {
              console.log(chart)
              return <>
              {
                chart.filteredData.map((d, index) => {
                  return <Ellipse attrs={{
                    x: 30 + index * 20,
                    y: 50 + count,
                    rx: 20,
                    ry: 50,
                    fill: '#1890FF',
                    stroke: '#F04864',
                    lineWidth: 4,
                    radius: 8,
                  }} />
                })
              }
              </>
            }}
          </Effects>
        </Group>
        <Tooltip>
          {(title, items, x, y) => {
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
            return <Pie data={data} />
          }}
        </Tooltip>
      </Chart>

      </div>
    );
}

export default Basic;
