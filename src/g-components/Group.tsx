import React from 'react';
import forIn from '@antv/util/lib/for-in';
import isFunction from '@antv/util/lib/is-function';
import debounce from '@antv/util/lib/debounce';
import { IGroup } from '@antv/g-canvas';
import { IGroup as ISVGGroup } from '@antv/g-svg';
import uniqId from '@antv/util/lib/unique-id';
import GroupContext, { withGroupContext } from '../context/group';
import { EVENTS } from './Base/events';

export interface IGroupProps extends React.Props<any>{
  [key: string]: any;
}


class Group extends React.Component<any> {
  state={
    isReady: false,
  }
  private id: string;
  protected instance: IGroup | ISVGGroup;
  constructor(props) {
    super(props);
    const { group } = props;
    this.id = uniqId('group')
    if (group.isChartCanvas) {
      group.chart.on('afterrender', this.handleRender)
    } else {
      this.instance = group.addGroup();
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
  handleRender = debounce(() => {
    if (!this.instance) {
      this.instance = this.props.group.chart.canvas.addGroup();
      this.setState({ isReady: true })
    } else {
      this.forceUpdate();
    }
  }, 300)
  componentWillUnmount() {
    const { group } = this.props;
    if (group.isChartCanvas) {
      group.chart.off('afterrender', this.handleRender)
    }
    this.instance.remove(true);
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
