import _warning from 'warning';

export const requiredPropWarn = (condition, Component:string, prop: string, others?: string) => _warning(condition,
  `'%s' is a required prop of %s. \n %s`,
  prop, Component, others,
  )

const warning: (c: boolean, temp: string, ...args: any[]) => void = _warning;

export default warning;
