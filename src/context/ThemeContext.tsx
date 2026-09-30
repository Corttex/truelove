import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';
export type FontSizeMode = 'normal' | 'large' | 'xlarge';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  fontSizeMode: FontSizeMode;
  toggleFontSize: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('truelove_theme_mode');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [fontSizeMode, setFontSizeMode] = useState<FontSizeMode>(() => {
    const saved = localStorage.getItem('truelove_font_size');
    return (saved === 'large' || saved === 'xlarge') ? saved as FontSizeMode : 'normal';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('truelove_theme_mode', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSizeMode);
    localStorage.setItem('truelove_font_size', fontSizeMode);
  }, [fontSizeMode]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleFontSize = () => {
    setFontSizeMode(prev => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'xlarge';
      return 'normal';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, fontSizeMode, toggleFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
