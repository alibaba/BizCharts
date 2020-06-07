import React from 'react';
import pickWithout from '../utils/pickWithout';
import { REACT_PIVATE_PROPS } from '../utils/constant';
import cloneDeep from '../utils/cloneDeep';

export interface ICircleProps extends React.Props<any> {
  [key: string]: any;
}

export default class Helper {
  instance: any;
  config: Record<string,any>;
  constructor(private shape) {
    this.shape = shape;
  }
  createInstance(props) {
    this.instance = props.group.addShape(this.shape,pickWithout(props, ['group', 'ctx']))
  };
  destroy() {
    if (this.instance) {
      this.instance.remove(true);
      this.instance = null;
    }
  }
  update(props) {
    const newConfig = pickWithout(props, [...REACT_PIVATE_PROPS])
    if (!this.instance) {
      this.createInstance(newConfig);
    }
    const { attrs, animate, animateState } = newConfig;
    switch (animateState) {

    }
    this.instance.attr(attrs);
    this.instance.animate(...animate);

    this.config = cloneDeep(newConfig);
    
  }
}
