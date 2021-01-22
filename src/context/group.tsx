import React from 'react';

// Group 实例透传

const GroupContext = React.createContext(null);
GroupContext.displayName = 'GroupContext';

export function withGroupContext<T>(Component) {
  const Com = React.forwardRef<any, T>((props: T, ref) => {
    return (
      <GroupContext.Consumer>
        {ctx => <Component ref={ref} group={ctx} {...props} />}
      </GroupContext.Consumer>
    );
  })
  Com.displayName = Component.name;
  return Com;
};

export default GroupContext;
