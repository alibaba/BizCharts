import React from 'react';
import _isFunction from '@antv/util/lib/is-function';
import shallowEqual from '../../utils/shallowEqual';
import useChartView from '../../hooks/useChartView';

const FacetContext = React.createContext();

function Facet(props) {
  const chart = useChartView();
  const { type, children, ...cfg } = props;
  if (_isFunction(children)) {
    chart.facet(type, {
      ...cfg,
      eachView: children
    });
  } else {
    chart.facet(type, {
      ...cfg,
    });
  }
  return FacetContext;
}

export default React.memo(Facet, (preProps, nextProps) => {
  return shallowEqual(preProps, nextProps);
})
