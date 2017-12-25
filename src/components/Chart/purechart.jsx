import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Processor from '../../processor/processor';

export default class PureChart extends Component {
  static childContextTypes = {
    addElement: PropTypes.func,
    updateElement: PropTypes.func,
    deleteElement: PropTypes.func,
    createId: PropTypes.func,
    getParentInfo: PropTypes.func,
    getViewId: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.name = 'Chart';
    this.gId = 0;
    this.id = this.gId;
    this.g2Processor = new Processor();
  }

  getChildContext() {
    return {
      addElement: this.addElement,
      updateElement: this.updateElement,
      deleteElement: this.deleteElement,
      createId: this.createId,
      getParentInfo: this.getParentInfo,
      getViewId: this.getViewId,
    };
  }

  componentDidMount() {
    this.cId = this.addElement(
      this.name,
      this.id,
      {
        ...this.props,
        container: this.containerWrap,
      }
    );
    this.chart = this.g2Processor.createG2Instance();
    this.notifyG2Instance();
  }

  componentDidUpdate() {
    this.updateElement(
      this.name,
      this.cId,
      {
        ...this.props,
        container: this.containerWrap,
      }
    );
    const newChart = this.g2Processor.batchedUpdate();
    if (this.chart !== newChart) {
      this.chart = newChart;
      this.notifyG2Instance();
    }
  }

  componentWillUnmount() {
    this.g2Processor.destory();
    this.chart = null;
    this.containerWrap = null;
  }

  getViewId = () => {}

  getParentInfo = () => {
    return {
      id: this.id,
      name: this.name,
    };
  }

  createId = () => {
    this.gId += 1;
    return this.gId;
  }

  addElement = (name, id, props, parentInfo, viewId) => {
    return this.g2Processor.addElement(name, id, props, parentInfo, viewId);
  }

  updateElement = (name, id, props, parentInfo, viewId) => {
    this.g2Processor.updateElement(name, id, props, parentInfo, viewId);
  }

  deleteElement = (name, id, parentInfo) => {
    this.g2Processor.deleteElement(name, id, parentInfo);
  }

  notifyG2Instance() {
    if (this.props.onGetG2Instance) {
      this.props.onGetG2Instance(this.chart);
    }
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
