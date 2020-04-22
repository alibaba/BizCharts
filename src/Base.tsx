import React from 'react';
import uniqueId from '@antv/util/lib/unique-id';

/**
 * G2 Chart、View、Geometry 以及 Element 等的基类。
 */
export interface IBaseProps {
  visible?: boolean,
  [key: string]: any,
}

export default abstract class Base<T extends IBaseProps> extends React.Component<T> {
  public g2Instance: any;
  protected id: string;
  protected readonly name: string = 'base';

  componentDidMount() {
    this.configInstance(null, this.props);
  }
  componentDidUpdate(perProps) {
    this.configInstance(perProps, this.props);
  }

  // 初始化实例需要的Config
  protected abstract getInitalConfig() : object;

  protected checkInstanceReady() {
    const { forceUpdate } = this.props;
    if (!this.g2Instance || forceUpdate) {
      this.initInstance();
    }
  }
  protected readonly abstract ChartBaseClass;

  initInstance() {
    this.id = uniqueId(this.name);
    const options = this.getInitalConfig();
    this.g2Instance = new this.ChartBaseClass(options);
  }

  configInstance(perProps, curProps) {
    const { g2Instance } = this;
    if (!g2Instance) {
      throw new Error(`${this.name} 构建失败`);
    }
    const { visible } = curProps;
    if (visible !== (perProps || {}).visible) {
      if (visible) {
        this.g2Instance.show();
      } else {
        this.g2Instance.hide();
      }
    }
  }
  render (): any {
    // 缓存g2Instance
    this.checkInstanceReady();

    if (this.props.children) {
      return React.Children.map(this.props.children, element => {
        return React.isValidElement(element) ? React.cloneElement(element, { parentInstance: this.g2Instance }) : element;
      })
    }
    return null;
  }
}
