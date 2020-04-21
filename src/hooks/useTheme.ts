import { useState } from 'react';
import { getTheme } from '@antv/g2/lib/theme';

export default function useTheme(defaultThemeName) {
  const [theme, setG2Theme] = useState(defaultThemeName || 'default');
  const setTheme = (themeName) => {
    setG2Theme(getTheme(themeName))
  };
  return { theme, setTheme }
}

