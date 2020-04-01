import React, { useRef, useEffect, useState } from 'react';

export default function withContainer<Iprops>(Component, name: string = 'Chart') {
  const Cls = (props: Iprops) => {
    const container = useRef();
    const [inited, setInited] = useState(false);
    useEffect(() => {
      setInited(true);
    }, [])
    return <div ref={container}>
      {inited ? <Component container={container.current} {...props} /> : <></>}
    </div>
  };
  Cls.displayName = name;
  return Cls;
};
