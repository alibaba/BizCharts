import React from 'react';
import RootChartContext from '../../context/root';
import ChartViewContext from '../../context/view';
import { IViewProps } from '../../interface';
import ViewHelper from './viewHelper';

export class View extends React.Component<IViewProps> {
  name = 'view';
  private viewHelper: ViewHelper;
  static defaultProps = {
    visible: true,
    preInteractions: [],
    filter: [],
  };
  componentWillUnmount() {
    this.viewHelper.destroy();
    this.viewHelper = null;
  }
  render() {
    if (!this.viewHelper) {
      this.viewHelper = new ViewHelper(this.context.chart);
    }
    this.viewHelper.update(this.props);
    return (
      <ChartViewContext.Provider value={this.viewHelper.view}>
        <>{this.props.children}</>
      </ChartViewContext.Provider>
    );
  }
}

View.contextType = RootChartContext;

export default View
