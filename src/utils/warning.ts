import warning from 'warning';

export const requiredPropWarn = (condition, Component:string, prop: string, others?: string) => warning(condition,
  `'%s' is a required prop of %s. \n %s`,
  [prop, Component, others],
  )

export default warning;
