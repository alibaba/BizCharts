import React from 'react';

// canvas 实例透传

const CanvasContext = React.createContext(null);
CanvasContext.displayName = 'CanvasContext';

export function withCanvasContext<T>(Component) {
  const Com = React.forwardRef<any, T>((props: T, ref) => {
    return (
      <CanvasContext.Consumer>
        {ctx => <Component ref={ref} ctx={ctx} {...props} />}
      </CanvasContext.Consumer>
    );
  })
  Com.displayName = Component.name;
  return Com;
};

export default CanvasContext;
