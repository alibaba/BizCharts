import React, { useRef, useEffect, useState } from 'react';

export default function withContainer<Iprops>(Component, name: string = 'ChartContainer') {
  const Cls = React.forwardRef<any, Iprops>((props: Iprops, ref) => {
    const container = useRef();
    const [inited, setInited] = useState(false);
    const { className = "bizcharts", containerStyle, ...options } = props as any;
    useEffect(() => {
      setInited(true);
    }, [])
    // @ts-ignore
    return <div
     ref={container}
     className={className}
     // @ts-ignore
     style={{ position:'relative', height: props.height || '100%', width: props.width || '100%', ...containerStyle }} >
      {inited ? <Component ref={ref} container={container.current} {...options} /> : <></>}
    </div>
  });
  Cls.displayName = name || Component.name;
  return Cls;
};
