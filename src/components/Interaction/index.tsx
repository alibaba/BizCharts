import React, { useLayoutEffect } from 'react';
// import _isFunction from '@antv/util/lib/is-function';
import { InteractionOption } from '@antv/g2/lib/interface';
import useChart from '../../hooks/useChartView';


export interface IInteractionProps extends InteractionOption, React.Props<any> {
  type: string;
  config?: object;
}

export default function Interaction(props: IInteractionProps) {
  const chart = useChart();
  const { type, config } = props;

  // @ts-ignore
  useLayoutEffect(() => {
    chart.interaction(type, config);
    return () => {
      chart.removeInteraction(type);
    }
  });

  return null;
}
