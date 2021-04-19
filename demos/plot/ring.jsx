import React from "react";
import { Pie } from '@antv/g2plot';
import { createPlot } from '../../src';

const RingChart = createPlot(Pie);

const data = [
  {
    "x": "大健康",
    "y": 20
  },
  {
    "x": "大淘系",
    "y": 20
  },
  {
    "x": "大文娱",
    "y": 20
  },
  {
    "x": "大物流",
    "y": 20
  },
  {
    "x": "海外",
    "y": 20
  },
  {
    "x": "基金",
    "y": 121
  },
  {
    "x": "生活服务",
    "y": 140
  },
  {
    "x": "新零售",
    "y": 151
  },
  {
    "x": "新兴业务",
    "y": 200
  },
  {
    "x": "云智能",
    "y": 79
  },
  {
    "x": "待定",
    "y": 30
  },
  {
    "x": "行业未定义",
    "y": 60
  }
];
const config = {
  "title": {
    "visible": true,
    "text": "环形图"
  },
  "description": {
    "visible": true,
    "text": "一个简单的环形图"
  },
  "label": {
    "type": "spider"
  },
  "width": 580,
  "height": 460,
  "autoFit": false,
  "colorField": "x",
  "angleField": "y",
}

function Basic() {
  return <RingChart data={data} {...config} />
}

export default Basic;
