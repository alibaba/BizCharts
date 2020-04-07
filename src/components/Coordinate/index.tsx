
import { useEffect } from 'react';
import useChartView from '../../hooks/useChartView';

export default function Tooltip(props) {
  const { visible, ...options } = props;
  const view = useChartView();
  if (visible === true) {
    view.coordinate(options);
  } else {
    view.coordinate(false);
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
