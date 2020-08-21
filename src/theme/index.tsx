// 注册主题
import { antvDark } from '@antv/g2/lib/theme/style-sheet/dark';
import { antvLight } from '@antv/g2/lib/theme/style-sheet/light';
import { createThemeByStylesheet } from '@antv/g2/lib/util/theme';
import { registerTheme } from '@antv/g2/lib/theme';

export { createThemeByStylesheet, antvLight, antvDark };

// fixme: 临时解Roboto 字体问题，根本解决需要同antv 设计师讨论
antvDark.fontFamily = `"-apple-system", "Segoe UI", "Helvetica Neue", Arial,
"Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
"Noto Color Emoji", Roboto`;
antvLight.fontFamily = `"-apple-system", "Segoe UI", "Helvetica Neue", Arial,
"Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
"Noto Color Emoji", Roboto`;

registerTheme('dark', createThemeByStylesheet(antvDark));
registerTheme('default', createThemeByStylesheet(antvLight));
registerTheme('ligtht', createThemeByStylesheet(antvLight));
