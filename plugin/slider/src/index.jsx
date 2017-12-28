import G2Slider from '@antv/g2-plugin-slider';
import React, { Component } from 'react';

const SliderAttrs = ['width', 'height', 'padding', 'xAis', 'yAxis', 'start', 'end',
  'fillerStyle', 'backgroundStyle', 'scales', 'textStyle', 'handleStyle', 'backgroundChart'];

function isArray(obj) { return Array.isArray(obj); }
function isObject(obj) { return typeof obj === 'object' && obj !== null; }

function length(obj) {
  if (isArray(obj)) {
    return obj.length;
  } else if (isObject(obj)) {
    return Object.keys(obj).length;
  }

  return 0;
}


function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y; //  NaN == NaN
}

function each(obj, fun) {
  if (obj.forEach) {
    obj.forEach(fun);
  }
  if (isObject(obj)) {
    Object.keys(obj).forEach((key) => {
      fun(obj[key], key);
    });
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  if (isArray(objA) !== isArray(objB)) {
    return false;
  }

  if (length(objA) !== length(objB)) {
    return false;
  }

  let ret = true;

  each(objA, (v, k) => {
    if (!is(v, objB[k])) {
      return (ret = false);
    }
    return true;
  });

  return ret;
}

function sliderNeedRebuild(props, nextProps) {
  if (props.onChange !== nextProps.onChange) { return true; }

  for (let i = 0; i < SliderAttrs.length; i += 1) {
    const attr = SliderAttrs[i];
    if (!shallowEqual(props[attr], nextProps[attr])) {
      return true;
    }
  }

  return false;
}

class Slider extends Component {

  componentDidMount() {
    const slider = this.createG2Instance();
    slider.render();
  }

  componentWillReceiveProps(nextProps) {
    const { data, ...others } = this.props;
    const { data: nextData, ...nextOthers } = nextProps;
    // refrence compare
    if (data !== nextData) {
      this.slider.changeData(nextData);
      this.slider.repaint();
    }

    if (sliderNeedRebuild(others, nextOthers)) {
      this.reBuild = true;
    }
  }

  componentDidUpdate() {
    if (!this.reBuild) { return; }

    this.slider.destroy();
    const slider = this.createG2Instance();
    slider.render();
    this.reBuild = false;
  }

  componentWillUnmount() {
    this.slider.destroy();
  }

  createG2Instance() {
    this.slider = new G2Slider({ container: this.container, ...this.props });
    return this.slider;
  }

  refHandle = (cw) => {
    // chart container wrap for reset operation
    if (!this.container) {
      this.container = cw;
    }
  }

  render() {
    return (
      <div ref={this.refHandle} />
    );
  }
}

exports.default = Slider;
module.exports = exports['default'];
