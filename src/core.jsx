import G2, { Shape, PathUtil, Animate } from '@antv/g2/lib/core';
import Util from './shared/util';
import Themes from './themes';

const BizCharts = {
  G2,
  Util,
  Shape,
  Animate,
  PathUtil,
  track(enable = false) {
    // for srs
    G2.track(enable);
  },
  setTheme(theme) {
    let themeObj = theme;
    if (typeof theme === 'string' && Themes[theme]) {
      themeObj = Themes[theme];
    }

    G2.Global.setTheme(themeObj);
  },
};

exports.default = BizCharts;
module.exports = BizCharts;
