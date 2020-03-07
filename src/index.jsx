import G2, { Shape, PathUtil, Animate } from '@antv/g2/lib/core';
import Interactions from '@antv/g2/lib/interaction';
import Util from './shared/util';
import Themes from './themes';

export { default as Chart } from './components/Chart';
export { default as Coord } from './components/Coord';
export { default as Axis } from './components/Axis';
export { default as Legend } from './components/Legend';
export { default as Tooltip } from './components/Tooltip';
export { default as Geom } from './components/Geom';
export { default as View } from './components/View';
export { default as Guide } from './components/Guide';
export { default as Label } from './components/Label';
export { default as Facet } from './components/Facet';

export { G2 };
export { Util };
export { Shape };
export { Animate };
export { PathUtil };
export { Interactions };

export const track = () => {};
export const setTheme = (theme) => {
  let themeObj = theme;
  if (typeof theme === 'string' && Themes[theme]) {
    themeObj = Themes[theme];
  }
  G2.Global.setTheme(themeObj);
};

const BizCharts = {
  G2,
  Util,
  Shape,
  Animate,
  PathUtil,
  track,
  setTheme,
  Interactions,
};

export default BizCharts;
