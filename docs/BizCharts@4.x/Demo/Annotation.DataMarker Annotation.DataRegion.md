# Annotation.DataMarker Annotation.DataRegion

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/d89b2520-d31d-11ea-8ec9-2b2b04fb6be5.png)

```js
import React, { useState, useEffect } from "react";
import { Chart, Point, Line, Annotation } from "bizcharts";

const scale = {
  rate: {
    nice: true,
  },
};
const dataMarkerCfg1 = {
  position: ["2014-01-03", 6.763],
  text: {
    content: "受稳健货币政策影响，协定存款利\n率居高不下,收益率达6.763%",
    style: {
      textAlign: "left",
    },
  },
};

const dataMarkerCfg2 = {
  position: ["2013-05-31", 2.093],
  text: {
    content: "余额宝刚成立时，并未达到目标资产\n配置，故收益率较低",
    style: {
      textAlign: "left",
    },
  },
};

const dataMarkerCfg3 = {
  position: ["2016-09-04", 2.321],
  autoAdjust: false,
  text: {
    content: "受积极货币政策的影响，收益率降\n到历史最低2.321%",
    style: {
      textAlign: "right",
    },
  },
  line: {
    length: 30,
  },
};
// style文档 https://bizcharts.net/product/BizCharts4/category/61/page/114
const dataMarkerCfg4 = {
  position: ["2016-11-02", 2.399],
  autoAdjust: false,
  // 文本style配置
  text: {
    content: "宏观经济过热，受稳健货币政策影\n响，余额宝收益率随之上升",
    style: {
      textAlign: "center",
      fill: "red",
    },
  },
  // line?: null | { style?: ShapeAttrs; length?: number };
  //线条style配置
  line: {
    length: 180,
    style: {
      stroke: "red",
    },
  },
};
const dataMarkerCfg5 = {
  position: ["2017-03-24", 3.83],
  text: null,
  line: {
    length: 50,
  },
};
const dataRegionCfg = {
  start: ["2016-12-02", 2.517],
  end: ["2017-03-24", 3.83],
  text: {
    content: "【关键区间】",
  },
  lineLength: 50,
};
function Demo() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("https://gw.alipayobjects.com/os/antvdemo/assets/data/income.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <Chart height={400} data={data} autoFit scale={scale}>
      <Line position="time*rate" />

      <Point
        position="height*weight"
        color="gender"
        shape={["gender", ["circle", "square"]]}
        style={{
          fillOpacity: 0.85,
        }}
      />
      <Annotation.DataMarker {...dataMarkerCfg1} />
      <Annotation.DataMarker {...dataMarkerCfg2} />
      <Annotation.DataMarker {...dataMarkerCfg3} />
      <Annotation.DataMarker {...dataMarkerCfg4} />
      <Annotation.DataMarker {...dataMarkerCfg5} />
      <Annotation.DataRegion {...dataRegionCfg} />
    </Chart>
  );
}

ReactDOM.render(<Demo />, mountNode);

```
