// 注册主题
import { registerTheme } from '@antv/g2/esm/core';
import { antvDark } from '@antv/g2/esm/theme/style-sheet/dark';
import { createThemeByStylesheet } from '@antv/g2/esm/util/theme';
registerTheme('dark', createThemeByStylesheet(antvDark));

