// 注册主题
import { antvDark } from '@antv/g2/lib/theme/style-sheet/dark';
import { antvLight } from '@antv/g2/lib/theme/style-sheet/light';
import { createThemeByStyleSheet } from '@antv/g2/lib/theme/util/create-by-style-sheet';
import { registerTheme } from '@antv/g2/lib/theme';

export { createThemeByStyleSheet, antvLight, antvDark };

registerTheme('dark', createThemeByStyleSheet(antvDark));
registerTheme('default', createThemeByStyleSheet(antvLight));
registerTheme('light', createThemeByStyleSheet(antvLight));
