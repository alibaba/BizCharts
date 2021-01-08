// 注册主题
import { antvDark } from '@antv/g2/lib/theme/style-sheet/dark';
import { antvLight } from '@antv/g2/lib/theme/style-sheet/light';
import { createThemeByStyleSheet } from '@antv/g2/lib/theme/util/create-by-style-sheet';
import { registerTheme } from '@antv/g2/lib/theme';

export { createThemeByStyleSheet, antvLight, antvDark };

// fixme: 临时解Roboto 字体问题，根本解决需要同antv 设计师讨论
antvDark.fontFamily = `"-apple-system", "Segoe UI", "Helvetica Neue", Arial,
"Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
"Noto Color Emoji", Roboto`;
antvLight.fontFamily = `"-apple-system", "Segoe UI", "Helvetica Neue", Arial,
"Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
"Noto Color Emoji", Roboto`;

registerTheme('dark', createThemeByStyleSheet(antvDark));
registerTheme('default', createThemeByStyleSheet(antvLight));
registerTheme('ligtht', createThemeByStyleSheet(antvLight));
