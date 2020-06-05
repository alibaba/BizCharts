import React, { useState } from "react";
import Canvas from "../../src/g-components/Canvas";
import Circle from "../../src/g-components/Circle";
import Ellipse from "../../src/g-components/Ellipse";

export default function Demo() {
  const [y, setY] = useState(10)
  return <div>
    <div onClick={() => {
      setY(y+1);
    }}>click me</div>
    <Canvas width={800} height={400} id="test">
      {(y < 12 || y > 16) && <Circle ref={(c) => {
        console.log(222,c)
      }} attrs={{ x: 10, y, r: 10, fill: 'red' }}/>}
      <Ellipse attrs={{
          x: 300,
          y: 200,
          rx: 100,
          ry: 150,
          fill: '#1890FF',
          stroke: '#F04864',
          lineWidth: 4,
          radius: 8,
        }} />
    </Canvas>
  </div>
}
