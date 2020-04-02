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
  protected readonly abstract ChartBaseClass;
  protected id: string;
  protected readonly name: string = 'base';
  protected getInstance() {
    if (!this.g2Instance) {
      this.initInstance();
    }
    return this.g2Instance;
  }

  initInstance() {
    this.id = uniqueId(this.name);
    const options = this.getInitalConfig();
    this.g2Instance = new this.ChartBaseClass(options);
  }

  // 初始化实例需要的Config
  protected abstract getInitalConfig() : object;

  componentWillUnmount() {
    if (this.g2Instance) {
      this.g2Instance.destroy();
    }
  }

  configInstance(perProps) {
    const { g2Instance } = this;
    if (!g2Instance) {
      throw new Error(`${this.name} 构建失败`);
    }
    const { visible } = this.props;
    if (visible !== (perProps || {}).visible) {
      if (visible) {
        this.g2Instance.show();
      } else {
        this.g2Instance.hide();
      }
    }
  }

  componentDidMount() {
    this.configInstance(null);
  }
  componentDidUpdate(perProps) {
    this.configInstance(perProps);
  }

  render () {
    // 缓存g2Instance
    const g2Instance = this.getInstance();
    console.log('g2Instance', g2Instance);
    return null;
  }
}
