import G2, { Shape, PathUtil, Animate } from '@antv/g2';
import Util from './shared/util';
import Themes from './themes';
import * as Components from './components';
import * as Com16 from './com16';


const BizCharts = Util.mix(Com16, {
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

BizCharts.Com16 = Com16;

exports.default = BizCharts;
module.exports = exports['default'];
