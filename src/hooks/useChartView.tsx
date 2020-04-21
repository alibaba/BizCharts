import React from 'react';
import ChartViewContext from '../context/view';

export default function useView() {

  // @ts-ignore
  return React.useContext(ChartViewContext);
}
