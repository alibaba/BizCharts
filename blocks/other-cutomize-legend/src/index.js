import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class Cutomizelegend extends React.Component {
  render() {
    const data = [
      {
        country: "Lithuania",
        litres: 501.9
      },
      {
        country: "Czech Republic",
        litres: 301.9
      },
      {
        country: "Ireland",
        litres: 201.1
      },
      {
        country: "Germany",
        litres: 165.8
      },
      {
        country: "Australia",
        litres: 139.9
      },
      {
        country: "Austria",
        litres: 128.3
      },
      {
        country: "UK",
        litres: 99
      },
      {
        country: "Belgium",
        litres: 60
      },
      {
        country: "The Netherlands",
        litres: 50
      }
    ];
    const ds = new DataSet();
    const dv = ds
      .createView()
      .source(data)
      .transform({
        type: "percent",
        field: "litres",
        dimension: "country",
        as: "percent"
      });
    const scale = {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + "%";
          return val;
        }
      },
      nice: false
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          padding={[200, 120, 20, 160]}
          data={dv}
          scale={scale}
          filter={[
            [
              "country",
              val => {
                return val !== "UK";
              }
            ]
          ]}
          forceFit
        >
          <Coord type="theta" innerRadius={0.3} radius={1} />
          <Tooltip
            showTitle={false}
            itemTpl="<li data-index={index}><span style=&quot;color:{color}&quot;>{name}:</span>{value}</li>"
          />
          <Legend
            useHtml={true}
            position="right"
            containerTpl="<div class=&quot;g2-legend&quot;><table class=&quot;g2-legend-list&quot; style=&quot;list-style-type:none;margin:0;padding:0;&quot;></table></div>"
            itemTpl={(value, color, checked, index) => {
              const obj = dv.rows[index];
              checked = checked ? "checked" : "unChecked";
              return (
                '<tr class="g2-legend-list-item item-' +
                index +
                " " +
                checked +
                '" data-value="' +
                value +
                '" data-color=' +
                color +
                ' style="cursor: pointer;font-size: 14px;">' +
                '<td width=150 style="border: none;padding:0;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' +
                color +
                ';"></i>' +
                '<span class="g2-legend-text">' +
                value +
                "</span></td>" +
                '<td style="text-align: right;border: none;padding:0;">' +
                obj.litres +
                "</td>" +
                "</tr>"
              );
            }}
            offsetX={15}
            g2-legend={{
              marginLeft: "100px",
              marginTop: "-107px"
            }}
            g2-legend-list={{
              border: "none"
            }}
          />
          <Geom
            type="intervalStack"
            position="percent"
            color={[
              "country",
              [
                "#67b7dc",
                "#84b761",
                "#fdd400",
                "#cc4748",
                "#cd82ad",
                "#2f4074",
                "#448e4d",
                "#b7b83f",
                "#b9783f"
              ]
            ]}
            style={{
              lineWidth: 2,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.country + ": " + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Cutomizelegend;
