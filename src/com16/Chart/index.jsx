import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Processor from '../../processor';

export default class PureChart extends Component {
  static childContextTypes = {
    submitConfig: PropTypes.func,
    updateConfig: PropTypes.func,
    deleteConfig: PropTypes.func,
  };

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object,
    ]),
    scale: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    animate: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number.isRequired,
    onGetG2Instance: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.name = 'Chart';
    this.g2Processor = new Processor();
  }

  componentDidMount() {
    this.cId = this.g2Processor.addComponent(
      this.name,
      {
        ...this.props,
        container: this.containerWrap,
      }
    );
    this.chart = this.g2Processor.createG2Instance();
    this.notifyG2Instance();
  }

  componentDidUpdate() {
    this.g2Processor.updateConfig(this.cId, this.props);
    const newChart = this.g2Processor.batchedUpdate();
    if (this.chart !== newChart) {
      this.chart = newChart;
      this.notifyG2Instance();
    }
  }

  componentWillUnmount() {
    this.g2Processor.destory();
  }

  notifyG2Instance() {
    if (this.props.onGetG2Instance) {
      this.props.onGetG2Instance(this.chart);
    }
  }

  addComponent = (name, config) => {
    return this.g2Processor.addComponent(name, config);
  }

  updateComponent = (id, config) => {
    this.g2Processor.updateComponent(id, config);
  }

  deleteComponent = (id) => {
    this.g2Processor.deleteComponent(id);
  }

  refHandle = (cw) => {
    // chart container wrap for reset operation
    if (!this.containerWrap) {
      this.containerWrap = cw;
    }
  }

  render() {
    return <div ref={this.refHandle}>{this.props.children}</div>;
  }
}
