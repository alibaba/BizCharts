import { useState } from 'react';
import { getTheme } from '../theme';

export default function useTheme(defaultThemeName) {
  const [theme, setG2Theme] = useState(defaultThemeName || 'default');
  const setTheme = (themeName) => {
    setG2Theme(getTheme(themeName))
  };
  return { theme, setTheme }
}

