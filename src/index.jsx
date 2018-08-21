import G2, { Shape, PathUtil, Animate } from '@antv/g2/lib/core';
import Util from './shared/util';
import Themes from './themes';
import * as components from './components';


G2.Global.trackingInfo = { bizcharts: '3.2.2' };

const BizCharts = Util.mix(components, {
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
});

exports.default = BizCharts;
module.exports = BizCharts;
