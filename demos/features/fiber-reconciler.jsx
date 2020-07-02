import React, { useEffect, useRef, useState } from 'react';
import Canvas from "../../src/g-components/Canvas";
import ReactG from '../../src/g-components/reconciler';
import Circle from "../../src/g-components/Circle";
import Ellipse from "../../src/g-components/Ellipse";
import Group from "../../src/g-components/Group";
import Image from "../../src/g-components/Image";
import Line from "../../src/g-components/Line";
import Marker from "../../src/g-components/Marker";
import Path from "../../src/g-components/Path";
import Polygon from "../../src/g-components/Polygon";
import Text from "../../src/g-components/Text";

const AnimateCircle = () => {
  // 图形状态自管理
  const [ active, setActive] = useState(0);
  useEffect(() => {
    setInterval(() => {
      console.log('set', active);
      setActive(c => c + 1);
    }, 3000);
  }, [])
  return <>
    <Circle
    attrs={{
      x: 10, y: 10, r: 10, fill: active % 2 === 0 ? '#A42': 'red'
    }} 
    animate={{
      toAttrs: {
        x: 30,
        y: 45,
        r: 30,
      },
      duration: 2000,
      easing: 'easeQuadInOut',
      // repeat: true,
      delay: 100
    }}
  />
  {active % 2 === 0 && <Text attrs={{ x: 90, y: 80, fill: '#000', text: 'active' }} />}
  <Circle
    attrs={{
      x: 50, y: 60, r: 10, fill: '#939'
    }} 
    animate={{
      toAttrs: {
        x: 30,
        y: 45,
        r: 30,
      },
      duration: 2000,
      easing: 'easeQuadInOut',
      // repeat: true,
      delay: 1000
    }}
  />
 </>
}

export default function Demo() {
  const group = useRef(null);
  return <>
  <Canvas width={500} height={200} >
    <Group ref={group} />
  </Canvas>
  <div onClick={() => {
    ReactG.render(<AnimateCircle />, group.current.instance);
  }}>click me</div>
  </>
}
