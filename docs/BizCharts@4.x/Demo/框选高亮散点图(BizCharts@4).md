# 框选高亮散点图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/efc90ad0-370f-11ec-87eb-ffd7ec19ab6e.png)

```js
import React, { useState, useEffect } from "react";
import { Chart, Point, registerInteraction } from "bizcharts";

registerInteraction("brush-visible1", {
  showEnable: [
    { trigger: "plot:mouseenter", action: "cursor:crosshair" },
    { trigger: "plot:mouseleave", action: "cursor:default" },
  ],
  start: [
    {
      trigger: "plot:mousedown",
      action: ["rect-mask:start", "rect-mask:show"],
    },
  ],
  processing: [
    {
      trigger: "plot:mousemove",
      action: ["rect-mask:resize"],
    },
    { trigger: "mask:change", action: ["element-range-highlight:highlight"] },
  ],
  end: [
    {
      trigger: "plot:mouseup",
      action: ["rect-mask:end"],
      callback: (e) => {
        const points = e.view.geometries[0].getElementsBy((ele) =>
          ele.hasState("active")
        );
        e.view.emit(
          "brush:end",
          (points || []).map((pt) => pt.data)
        );
      },
    },
  ],
  rollback: [
    {
      trigger: "dblclick",
      action: ["element-range-highlight:clear", "rect-mask:hide"],
      callback: ({ view }) => {
        view.emit("brush:end", []);
      },
    },
  ],
});

let chartIns;
function Demo() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch(
      "https://alifd.alibabausercontent.com/materials/@bizcharts/point-scatter/0.2.8/mock.json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <>
      <Chart
        height={400}
        data={data}
        autoFit
        interactions={["legend-highlight", "brush-visible1"]}
        onGetG2Instance={(c) => {
          chartIns = c;
          c.on("brush:end", (highlightPoints) => {
            console.log("brush:end", highlightPoints);
          });
          c.on("beforepaint", () => {
            // 获取框选出来的数据
            console.log(c.filteredData);
          });
        }}
      >
        <Point
          position="height*weight"
          color="gender"
          shape="circle"
          style={{
            fillOpacity: 0.85,
          }}
        />
      </Chart>
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);

```
