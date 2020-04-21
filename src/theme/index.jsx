// 注册主题
import { registerTheme } from '@antv/g2/lib/core';
import { antvDark } from '@antv/g2/lib/theme/style-sheet/dark';
import { createThemeByStylesheet } from '@antv/g2/lib/util/theme';

registerTheme('dark', createThemeByStylesheet(antvDark));

