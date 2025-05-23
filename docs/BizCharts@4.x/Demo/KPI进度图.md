# KPI进度图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/2def8830-5876-11eb-9a78-1b973196c7b5.png)

```js
import React from "react";
import {
  Chart,
  Axis,
  Tooltip,
  Coord,
  Legend,
  View,
  Annotation,
  Point,
  Interval,
  getTheme,
} from "bizcharts";

const BulletgraphKpi = ({
  kpiRanges,
	kpiRangesText,
  title,
  unit,
  actual = 0,
  target350Rate = 0,
  target375Rate = 0,
  containerStyle = {},
}) => {
  const COLOR_CONFIG = {
    target375: getTheme().colors10[1],
    target350: getTheme().colors10[0],
    belowTarget: getTheme().colors10[2],
  };

  const ranges = kpiRanges || [0, 470, 658, 940];

  const data = [
    {
      title: title || "商品发布时长",
      actual: actual || 703.44,
      target: ranges[2],
    },
  ];
  const annotationTextMin = -1.5;
  const annotationRegionStyle = (target) => {
    return {
      style: {
        fill: COLOR_CONFIG[target],
        height: 35,
        fillOpacity: 0.6,
        // opacity: 0.9,
      },
    };
  };
  const annotationTextStyle = () => {
    return {
      style: {
        stroke: "rgba(255,255,255,0)",
        textAlign: "center",
      },
    };
  };

  const target350Desc = `3.5目标完成率：${(target350Rate * 100).toFixed(2)} %`;
  const target375Desc = `3.75目标完成率：${(target375Rate * 100).toFixed(2)} %`;

  let y = 0;
  const yGap = 0.1;

  return (
    <Chart
      height={150}
      padding={[80, 50, 80, 70]}
      autoFit
      containerStyle={containerStyle}
    >
      {data.map((data, index) => {
        const cols = {
          actual: {
            min: ranges[0],
            max: ranges[3],
            ticks: ranges,
            formatter: (val) => `${val} ${unit}`,
            nice: false,
          },
          target: {
            min: 0,
            max: ranges[3],
            nice: false,
          },
        };
        return (
          <View
            padding={[30, 50, 40, 70]}
            start={{
              x: 0,
              y: y,
            }}
            end={{
              x: 1,
              y: y + yGap,
            }}
            data={[data]}
            scale={cols}
            key={index}
          >
            <Coord transpose />
            <Axis
              name="actual"
              position="right"
              label={{
                style: {},
              }}
            />
            <Axis name="target" visible={true} />
            <Interval
              position="title*actual"
              color="#ddd"
              size={20}
              label={[
                "actual",
                (val) => {
                  return {
                    content:
                      target350Rate && target375Rate
                        ? `${val} ${unit}（实际值）\n${target350Desc}\n${target375Desc}`
                        : `${val} ${unit}`,
                    style: {
                      // fill: 'red',
                      fontSize: 14,
                      fontWeight: "bold",
                    },
                  };
                },
              ]}
            />
            <Annotation.Region
              start={[-2, ranges[0]]}
              end={[ranges[0], ranges[1]]}
              {...annotationRegionStyle("target375")}
            />
            <Annotation.Text
              position={[
                annotationTextMin,
                ranges[1] - (ranges[1] - ranges[0]) / 2,
              ]}
              content={kpiRangesText && kpiRangesText[0] || "3.75"}
              {...annotationTextStyle()}
            />
            <Annotation.Region
              start={[-2, ranges[1]]}
              end={[0, ranges[2]]}
              {...annotationRegionStyle("target350")}
            />
            <Annotation.Text
              position={[
                annotationTextMin,
                ranges[2] - (ranges[2] - ranges[1]) / 2,
              ]}
              content={kpiRangesText && kpiRangesText[1] || "3.50"}
              {...annotationTextStyle()}
            />
            <Annotation.Region
              start={[-2, ranges[2]]}
              end={[0, ranges[3]]}
              {...annotationRegionStyle("belowTarget")}
            />
            <Annotation.Text
              position={[
                annotationTextMin,
                ranges[3] - (ranges[3] - ranges[2]) / 2,
              ]}
              content={kpiRangesText && kpiRangesText[2] || "有距离，需努力"}
              {...annotationTextStyle()}
            />
          </View>
        );
      })}
      <Tooltip domStyles={{ "g2-tooltip": { lineHeight: "auto" } }} />
    </Chart>
  );
};

ReactDOM.render(
  <>
    <BulletgraphKpi
      kpiRanges={[18, 19, 22, 28.08]}
      title={`近7日平均\n商品发布\n时长`}
      unit="秒"
      actual={19.22}
      containerStyle={{ marginBottom: 50 }}
    />
    <BulletgraphKpi
      kpiRanges={[100, 200, 250, 500]}
      title={`近30日平均\n开店时长`}
      unit="小时"
      actual={280.8}
      containerStyle={{ marginBottom: 50 }}
    />
    <BulletgraphKpi
      kpiRanges={[0, 8.07, 11.298, 16.14]}
      title={`近30日平均\n开店时长`}
      unit="小时"
      actual={12.8}
      target350Rate={0.8}
      target375Rate={0.4}
    />
		<BulletgraphKpi
      kpiRanges={[0, 21, 21, 28.08]}
      title={`需求交付时长`}
      unit="天"
      actual={19.08}
      containerStyle={{ marginBottom: 50 }}
    />
		<BulletgraphKpi
      kpiRanges={[0, 7, 7, 13.2]}
      title={`变更前置时长`}
      unit="天"
      actual={9.49}
      containerStyle={{ marginBottom: 50 }}
    />
    <BulletgraphKpi
      kpiRanges={[0, 10, 10, 10]}
			kpiRangesText={[' ',' ',' ']}
      title={`变更前置时长`}
      unit="天"
      actual={9.49}
      containerStyle={{ marginBottom: 50 }}
    />
  </>,
  mountNode
);

```
