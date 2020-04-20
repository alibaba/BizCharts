import React from 'react';
import ChartViewContext from '@/context/view';
import warn from '@/utils/warning';

export default function useView() {

  // @ts-ignore
  return React.useContext(ChartViewContext);
}
