import React from 'react';
import forIn from '@antv/util/lib/for-in';
import isFunction from '@antv/util/lib/is-function';
import debounce from '@antv/util/lib/debounce';
import { IGroup } from '@antv/g-canvas';
import isArray from '@antv/util/lib/is-array';
import { IGroup as ISVGGroup } from '@antv/g-svg';
import uniqId from '@antv/util/lib/unique-id';
import GroupContext, { withGroupContext } from '../context/group';
import { EVENTS } from './Base/events';

export interface IGroupProps extends React.Props<any>{
  [key: string]: any;
  translate?: [number, number];
}

class Group extends React.Component<any> {
  state={
    isReady: false,
  }
  private id: string;
  protected instance: IGroup | ISVGGroup;
  static defaultProps = {
    zIndex: 3,
  }
  handleRender = debounce(() => {
    if (!this.instance) {
      const { group, zIndex, name } = this.props;
      // children.push 中push 找不到
      this.instance = group.chart.canvas.addGroup({ zIndex, name });
      group.chart.canvas.sort();
      this.setState({ isReady: true })
    } else {
      this.forceUpdate();
    }
  }, 300)
  constructor(props) {
    super(props);
    const { group, zIndex, name } = props;
    this.id = uniqId('group')
    if (group.isChartCanvas) {
      group.chart.on('afterrender', this.handleRender);
    } else {
      this.instance = group.addGroup({ zIndex, name });
      this.configGroup(props);
    }
  }
  componentWillUnmount() {
    const { group } = this.props;
    if (group.isChartCanvas) {
      group.chart.off('afterrender', this.handleRender)
    }
    if (this.instance) {
      this.instance.remove(true);
    }
  }
  public getInstance() {
    return this.instance;
  }
  configGroup = (props: IGroupProps) => {
    const { rotate, animate, rotateAtPoint, scale, translate, move } = props;
    if (rotate) {
      this.instance.rotate(rotate);
    }
    if (isArray(rotateAtPoint)) {
      // @ts-ignore
      this.instance.rotateAtPoint(...rotateAtPoint);
    }
    if (scale) {
      this.instance.rotate(scale);
    }
    if (translate) {
      this.instance.translate(translate[0], translate[1]);
    }
    if (move) {
      this.instance.move(move.x, move.y);
    }
    if (animate) {
      const { toAttrs, ...animateCfg } = animate;
      this.instance.animate(toAttrs, animateCfg);
    }
  }
  bindEvents = () => {
    this.instance.off();
    forIn(EVENTS, (v, k) => {
      if (isFunction(this.props[k])) {
        this.instance.on(v, this.props[k]);
      }
    });
  }

  
  render() {
    const { group } = this.props;
    if (this.instance) {
      this.instance.clear();
      this.bindEvents();
    }

    return (group.isChartCanvas && this.state.isReady) || (!group.isChartCanvas) 
      ? <GroupContext.Provider value={this.instance}>
        <React.Fragment key={uniqId(this.id)}>
          {this.props.children}
        </React.Fragment>
      </GroupContext.Provider> : <></>;
  }
}


export default withGroupContext<IGroupProps>(Group);
