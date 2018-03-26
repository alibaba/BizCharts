import G2Slider from '@antv/g2-plugin-slider';
import React, { Component } from 'react';

const SliderAttrs = ['width', 'height', 'padding', 'xAis', 'yAxis', 'start', 'end',
  'fillerStyle', 'backgroundStyle', 'scales', 'textStyle', 'handleStyle', 'backgroundChart'];

function sliderNeedRebuild(props, nextProps) {
  if (props.onChange !== nextProps.onChange) { return true; }

  for (let i = 0; i < SliderAttrs.length; i += 1) {
    const attr = SliderAttrs[i];
    if (!window.G2.Util.isEqual(props[attr], nextProps[attr])) {
      return true;
    }
  }

  return false;
}

class Slider extends Component {
  constructor() {
    super();
    this.reBuild = false;
  }

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
