import React, { useRef, useEffect, useState } from 'react';

export default function withContainer<Iprops>(Component, name: string = 'ChartContainer') {
  const Cls = (props: Iprops) => {
    const container = useRef();
    const [inited, setInited] = useState(false);
    useEffect(() => {
      setInited(true);
    }, [])
    // @ts-ignore
    return <div ref={container} className="bizcharts" style={{ height: props.height || '100%', width: props.width || '100%' }} >
      {inited ? <Component container={container.current} {...props} /> : <></>}
    </div>
  };
  Cls.displayName = name;
  return Cls;
};
