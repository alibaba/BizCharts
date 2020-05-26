// 注册主题
import { antvDark } from '@antv/g2/lib/theme/style-sheet/dark';
import { createThemeByStylesheet } from '@antv/g2/lib/util/theme';

import { getTheme, registerTheme } from '@antv/g2/lib/theme';

export { getTheme, registerTheme };

export * from './plots';

registerTheme('dark', createThemeByStylesheet({ ...antvDark}));
