
import { useEffect } from 'react';
import useChartView from '../../hooks/useChartView';

export default function Coordinate(props) {
  const { type, ...options } = props;
  const view = useChartView();
  if (type) {
    view.coordinate(type, options);
  } else {
    view.coordinate(options);
  }
  useEffect(() => {
    return () => {
      // 销毁
      view.coordinate({
        type: 'rect',
        actions: [],
        cfg: {},
      });
    }
  });
  return null;
}
