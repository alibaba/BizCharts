import React, { useRef, useEffect, useState } from 'react';

export default function withContainer<Iprops>(Component, name: string = 'ChartContainer') {
  const Cls = (props: Iprops) => {
    const container = useRef();
    const [inited, setInited] = useState(false);
    const { className, containerStyle } = props as any;
    useEffect(() => {
      setInited(true);
    }, [])
    // @ts-ignore
    return <div
     ref={container}
     className={className ? className : "bizcharts"}
     // @ts-ignore
     style={{ height: props.height || '100%', width: props.width || '100%', ...containerStyle }} >
      {inited ? <Component container={container.current} {...props} /> : <></>}
    </div>
  };
  Cls.displayName = name;
  return Cls;
};
