# Annotation显示隐藏

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/45398be0-f2e3-11ec-8646-7fdcdbfacf2c.png)

```js
import React, { useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import {
  Chart,
  Line,
  Point,
  Tooltip,
  Legend,
  Annotation,
  Axis,
} from "bizcharts";
const props = {
  data: {
    series: [
      { name: "热线心声量", x: "0621 10", y: 2 },
      { name: "热线心声量", x: "0621 11", y: 0 },
      { name: "热线心声量", x: "0621 12", y: 0 },
      { name: "热线心声量", x: "0621 13", y: 0 },
      { name: "热线心声量", x: "0621 14", y: 1 },
      { name: "热线心声量", x: "0621 15", y: 0 },
      { name: "热线心声量", x: "0621 16", y: 0 },
      { name: "热线心声量", x: "0621 17", y: 0 },
      { name: "热线心声量", x: "0621 18", y: 0 },
      { name: "热线心声量", x: "0621 19", y: 1 },
      { name: "热线心声量", x: "0621 20", y: 0 },
      { name: "热线心声量", x: "0621 21", y: 0 },
      { name: "热线心声量", x: "0621 22", y: 0 },
      { name: "热线心声量", x: "0621 23", y: 0 },
      { name: "热线心声量", x: "0622 00", y: 0 },
      { name: "热线心声量", x: "0622 01", y: 0 },
      { name: "热线心声量", x: "0622 02", y: 0 },
      { name: "热线心声量", x: "0622 03", y: 0 },
      { name: "热线心声量", x: "0622 04", y: 0 },
      { name: "热线心声量", x: "0622 05", y: 0 },
      { name: "热线心声量", x: "0622 06", y: 0 },
      { name: "热线心声量", x: "0622 07", y: 0 },
      { name: "热线心声量", x: "0622 08", y: 1 },
      { name: "热线心声量", x: "0622 09", y: 0 },
      { name: "热线心声量", x: "0622 10", y: 0 },
      { name: "热线心声量", x: "0622 11", y: 1 },
      { name: "热线心声量", x: "0622 12", y: 1 },
      { name: "热线心声量", x: "0622 13", y: 0 },
      { name: "热线心声量", x: "0622 14", y: 0 },
      { name: "热线心声量", x: "0622 15", y: 0 },
      { name: "热线心声量", x: "0622 16", y: 0 },
      { name: "热线心声量", x: "0622 17", y: 0 },
      { name: "热线心声量", x: "0622 18", y: 0 },
      { name: "热线心声量", x: "0622 19", y: 0 },
      { name: "热线心声量", x: "0622 20", y: 0 },
      { name: "热线心声量", x: "0622 21", y: 0 },
      { name: "热线心声量", x: "0622 22", y: 0 },
      { name: "热线心声量", x: "0622 23", y: 0 },
      { name: "热线心声量", x: "0623 00", y: 0 },
      { name: "热线心声量", x: "0623 01", y: 0 },
      { name: "热线心声量", x: "0623 02", y: 0 },
      { name: "热线心声量", x: "0623 03", y: 0 },
      { name: "热线心声量", x: "0623 04", y: 0 },
      { name: "热线心声量", x: "0623 05", y: 0 },
      { name: "热线心声量", x: "0623 06", y: 0 },
      { name: "热线心声量", x: "0623 07", y: 0 },
      { name: "热线心声量", x: "0623 08", y: 0 },
      { name: "热线心声量", x: "0623 09", y: 0 },
      { name: "热线心声量", x: "0623 10", y: 0 },
      { name: "全渠道心声量", x: "0621 10", y: 40 },
      { name: "全渠道心声量", x: "0621 11", y: 32 },
      { name: "全渠道心声量", x: "0621 12", y: 24 },
      { name: "全渠道心声量", x: "0621 13", y: 26 },
      { name: "全渠道心声量", x: "0621 14", y: 39 },
      { name: "全渠道心声量", x: "0621 15", y: 12 },
      { name: "全渠道心声量", x: "0621 16", y: 32 },
      { name: "全渠道心声量", x: "0621 17", y: 16 },
      { name: "全渠道心声量", x: "0621 18", y: 11 },
      { name: "全渠道心声量", x: "0621 19", y: 13 },
      { name: "全渠道心声量", x: "0621 20", y: 11 },
      { name: "全渠道心声量", x: "0621 21", y: 13 },
      { name: "全渠道心声量", x: "0621 22", y: 9 },
      { name: "全渠道心声量", x: "0621 23", y: 8 },
      { name: "全渠道心声量", x: "0622 00", y: 0 },
      { name: "全渠道心声量", x: "0622 01", y: 3 },
      { name: "全渠道心声量", x: "0622 02", y: 5 },
      { name: "全渠道心声量", x: "0622 03", y: 1 },
      { name: "全渠道心声量", x: "0622 04", y: 1 },
      { name: "全渠道心声量", x: "0622 05", y: 0 },
      { name: "全渠道心声量", x: "0622 06", y: 0 },
      { name: "全渠道心声量", x: "0622 07", y: 2 },
      { name: "全渠道心声量", x: "0622 08", y: 23 },
      { name: "全渠道心声量", x: "0622 09", y: 31 },
      { name: "全渠道心声量", x: "0622 10", y: 60 },
      { name: "全渠道心声量", x: "0622 11", y: 54 },
      { name: "全渠道心声量", x: "0622 12", y: 39 },
      { name: "全渠道心声量", x: "0622 13", y: 39 },
      { name: "全渠道心声量", x: "0622 14", y: 48 },
      { name: "全渠道心声量", x: "0622 15", y: 45 },
      { name: "全渠道心声量", x: "0622 16", y: 32 },
      { name: "全渠道心声量", x: "0622 17", y: 31 },
      { name: "全渠道心声量", x: "0622 18", y: 28 },
      { name: "全渠道心声量", x: "0622 19", y: 20 },
      { name: "全渠道心声量", x: "0622 20", y: 18 },
      { name: "全渠道心声量", x: "0622 21", y: 10 },
      { name: "全渠道心声量", x: "0622 22", y: 8 },
      { name: "全渠道心声量", x: "0622 23", y: 7 },
      { name: "全渠道心声量", x: "0623 00", y: 4 },
      { name: "全渠道心声量", x: "0623 01", y: 0 },
      { name: "全渠道心声量", x: "0623 02", y: 0 },
      { name: "全渠道心声量", x: "0623 03", y: 0 },
      { name: "全渠道心声量", x: "0623 04", y: 0 },
      { name: "全渠道心声量", x: "0623 05", y: 0 },
      { name: "全渠道心声量", x: "0623 06", y: 2 },
      { name: "全渠道心声量", x: "0623 07", y: 4 },
      { name: "全渠道心声量", x: "0623 08", y: 4 },
      { name: "全渠道心声量", x: "0623 09", y: 12 },
      { name: "全渠道心声量", x: "0623 10", y: 14 },
      { name: "在线心声量", x: "0621 10", y: 22 },
      { name: "在线心声量", x: "0621 11", y: 17 },
      { name: "在线心声量", x: "0621 12", y: 18 },
      { name: "在线心声量", x: "0621 13", y: 16 },
      { name: "在线心声量", x: "0621 14", y: 21 },
      { name: "在线心声量", x: "0621 15", y: 10 },
      { name: "在线心声量", x: "0621 16", y: 24 },
      { name: "在线心声量", x: "0621 17", y: 15 },
      { name: "在线心声量", x: "0621 18", y: 8 },
      { name: "在线心声量", x: "0621 19", y: 10 },
      { name: "在线心声量", x: "0621 20", y: 6 },
      { name: "在线心声量", x: "0621 21", y: 12 },
      { name: "在线心声量", x: "0621 22", y: 4 },
      { name: "在线心声量", x: "0621 23", y: 6 },
      { name: "在线心声量", x: "0622 00", y: 0 },
      { name: "在线心声量", x: "0622 01", y: 3 },
      { name: "在线心声量", x: "0622 02", y: 3 },
      { name: "在线心声量", x: "0622 03", y: 0 },
      { name: "在线心声量", x: "0622 04", y: 1 },
      { name: "在线心声量", x: "0622 05", y: 0 },
      { name: "在线心声量", x: "0622 06", y: 0 },
      { name: "在线心声量", x: "0622 07", y: 1 },
      { name: "在线心声量", x: "0622 08", y: 15 },
      { name: "在线心声量", x: "0622 09", y: 23 },
      { name: "在线心声量", x: "0622 10", y: 50 },
      { name: "在线心声量", x: "0622 11", y: 44 },
      { name: "在线心声量", x: "0622 12", y: 27 },
      { name: "在线心声量", x: "0622 13", y: 25 },
      { name: "在线心声量", x: "0622 14", y: 30 },
      { name: "在线心声量", x: "0622 15", y: 29 },
      { name: "在线心声量", x: "0622 16", y: 21 },
      { name: "在线心声量", x: "0622 17", y: 19 },
      { name: "在线心声量", x: "0622 18", y: 25 },
      { name: "在线心声量", x: "0622 19", y: 14 },
      { name: "在线心声量", x: "0622 20", y: 15 },
      { name: "在线心声量", x: "0622 21", y: 8 },
      { name: "在线心声量", x: "0622 22", y: 8 },
      { name: "在线心声量", x: "0622 23", y: 7 },
      { name: "在线心声量", x: "0623 00", y: 3 },
      { name: "在线心声量", x: "0623 01", y: 0 },
      { name: "在线心声量", x: "0623 02", y: 0 },
      { name: "在线心声量", x: "0623 03", y: 0 },
      { name: "在线心声量", x: "0623 04", y: 0 },
      { name: "在线心声量", x: "0623 05", y: 0 },
      { name: "在线心声量", x: "0623 06", y: 1 },
      { name: "在线心声量", x: "0623 07", y: 1 },
      { name: "在线心声量", x: "0623 08", y: 3 },
      { name: "在线心声量", x: "0623 09", y: 10 },
      { name: "在线心声量", x: "0623 10", y: 10 },
    ],
    markList: [
      { x: "0622 18", label: "预警创建", value: "create" },
      { x: "0622 19", label: "预警完结", value: "finish" },
      { x: "0621 10", label: "预警xxx", value: "xxx" },
      { x: "0622 06", label: "预警yyy", value: "yyy" },
    ],
  },
  canvasParams: { width: 1160, height: 400 },
};
function Demo() {
  const chartRef = useRef();
  const [xVal, setXVal] = useState("");
  const { data, canvasParams } = props;
  const { series, markList } = data;
  const scale = {
    x: 6,
  };

  const handleTooltipChange = useCallback((e) => {
    const chart = chartRef.current;
    const annotationControler = chart.getController("annotation");
    annotationControler.option
      .filter((item) => item.name == "desc")
      .forEach((item) => {
        if (item.position[0] == e.data.title) {
          console.log(annotationControler);
          item.visible = true;
        } else {
          item.visible = false;
        }
      });
    annotationControler.update();
  }, []);
  return (
    <>
      <Chart
        autoFit
        scale={scale}
        interactions={["element-active"]}
        data={series}
        padding={[60, 30, 50, 50]}
        // onTooltipChange={handleTooltipChange}
        onGetG2Instance={(chart) => {
          chartRef.current = chart;
          chart.on("tooltip:change", handleTooltipChange);
        }}
      >
        <Tooltip shared showCrosshairs />
        <Legend offsetX={15} position="top-left" />
        <Axis name="x" />
        <Axis name="y" />
        <Line shape="line" position="x*y" color={"name"} />

        {markList.map((item) => {
          return (
            <Annotation.Html
              html={`<div style='backGround:#0089ff;font-size:10px;line-height:18px;padding:2px 4px;border-radius:3px;color:#fff'>${item.label}</div>`}
              offsetX={-18}
              offsetY={10}
              position={[`${item.x}`, 0]}
              visible={false}
              name="desc"
            />
          );
        })}
        {markList.map((item) => {
          return (
            <Annotation.Html
              html={
                "<div style='width:6px;height:6px;background:#0089FF;border-radius:50%'></div>"
              }
              offsetX={-3}
              offsetY={-2}
              name="point"
              position={[`${item.x}`, 0]}
            />
          );
        })}
      </Chart>
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);

```
