import React from 'react';
import { Canvas as GCanvas, Cursor, Renderer, IGroup } from '@antv/g-canvas';
import { Canvas as GSVG } from '@antv/g-svg';
import withContainer from '../boundary/withContainer';
import ErrorBoundary from '../boundary/ErrorBoundary';
import CanvasContext from '../context/canvas';
import GroupContext from '../context/group';
// import pickWithout from '../utils/pickWithout';

export interface ICanvasProps extends React.Props<any> {

  container?: string | HTMLElement;
  width?: number;
  height?: number;
  capture?: boolean;
  renderer?: Renderer;
  cursor?: Cursor;
  [key: string]: any
}

class CanvasHelper {

  instance: GCanvas | GSVG;
  rootGroup: IGroup;
  createInstance(props) {
    const { children, renderer, ...config } = props;
    if (renderer === 'svg') {
      this.instance = new GSVG({
        ...config
      });
    } else {
      this.instance = new GCanvas({
        ...config
      });
    }
  }
  update(newConfig) {
    if (!this.instance) {
      this.createInstance(newConfig);
    }
  }
  draw() {
    if (!this.instance) {
      return;
    }
    this.instance.draw();
  }
  destory() {
    if (this.instance) {
      this.instance.remove();
      this.instance = null;
    }
  }
}

class Canvas extends React.Component<ICanvasProps> {
  public helper: CanvasHelper;

  constructor(props) {
    super(props);
    this.helper = new CanvasHelper();
  }

  componentDidMount() {
    this.helper.draw();
  }
  
  componentWillUnmount() {
    this.helper.destory();
  }

  public getInstance() {
    return this.helper.instance;
  }

  render() {
    this.helper.update(this.props);
    return <ErrorBoundary {...this.props.ErrorBoundaryProps}>
      <CanvasContext.Provider value={this.helper}>
        <GroupContext.Provider value={this.helper.instance}>
          <>{this.props.children}</>
        </GroupContext.Provider>
      </CanvasContext.Provider>
    </ErrorBoundary>
  }
}

export default withContainer<ICanvasProps>(Canvas)
