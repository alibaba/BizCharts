import React, { useEffect, useState } from "react";
import DataSet from "@antv/data-set";
import {
  Chart,
  Coordinate,
  Interval,
} from "../../src";

const Basic = () => {
  const [ width, setWidth ] = useState(400)
  useEffect(() => {
    // setInterval(() => {
    //   const count = Math.random();
    //   if (count > 0.8) {
    //     setWidth(300);
    //     return;
    //   }
    //   if (count > 0.5) {
    //     setWidth(500);
    //     return;
    //   }
    //   if (count > 0.2) {
    //     setWidth(600);
    //     return;
    //   }
    // }, 1000)
  }, [])
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
        population: 29034
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
    return (
      <div style={{ width, height: 500 }}>
        <Chart data={dv.rows} autoFit>
          <Coordinate transpose />
          <Interval position="country*population" />
        </Chart>
      </div>
    );
}

export default Basic;
