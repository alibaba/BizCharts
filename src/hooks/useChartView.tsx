import React from 'react';
import { Chart } from '@antv/g2/lib/chart';
import ChartViewContext from '../context/view';

export default function useView() {

  // @ts-ignore
  return React.useContext<Chart>(ChartViewContext);
}
