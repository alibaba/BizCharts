import G2, { Shape, PathUtil, Animate } from '@antv/g2/lib/core';
import Util from './shared/util';
import Themes from './themes';

export { G2 };
export { Util };
export { Shape };
export { Animate };
export { PathUtil };

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
  track, // 不可开启，兼容旧版
  setTheme,
};

exports.default = BizCharts;
