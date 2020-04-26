import { useState } from 'react';
import { getTheme } from '@antv/g2/lib/theme';

export default function useTheme(defaultThemeName = 'default') {
  const defaultTheme = getTheme(defaultThemeName);
  defaultTheme.name = defaultThemeName;
  const [theme, setG2Theme] = useState(defaultTheme);
  const setTheme = themeName => {
    const nextTheme = getTheme(themeName);
    nextTheme.name = themeName;
    setG2Theme(nextTheme);
  };
  return [theme, setTheme];
}
