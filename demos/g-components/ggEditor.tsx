import React, { useState } from "react";
import GGEditor, { Flow } from 'gg-editor';

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

const data = {
  nodes: [
    {
      id: '0',
      label: 'Node',
      x: 55,
      y: 55,
    },
    {
      id: '1',
      label: 'Node',
      x: 55,
      y: 255,
    },
  ],
  edges: [
    {
      label: 'Label',
      source: '0',
      target: '1',
    },
  ],
};


export default function Demo() {
  return <GGEditor>
    <Flow style={{ width: 500, height: 500 }} data={data} />
  </GGEditor>;
}
