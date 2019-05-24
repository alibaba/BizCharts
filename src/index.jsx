import G2, { Shape, PathUtil, Animate } from '@antv/g2/lib/core';
import Interactions from '@antv/g2/lib/interaction';
import Util from './shared/util';
import Themes from './themes';
import * as components from './components';

// G2.Global.animate = false;

const BizCharts = Util.mix(components, {
  G2,
  Util,
  Shape,
  Animate,
  PathUtil,
  track() {
  },
  setTheme(theme) {
    let themeObj = theme;
    if (typeof theme === 'string' && Themes[theme]) {
      themeObj = Themes[theme];
    }

    G2.Global.setTheme(themeObj);
  },
  Interactions,
});

exports.default = BizCharts;
module.exports = BizCharts;
