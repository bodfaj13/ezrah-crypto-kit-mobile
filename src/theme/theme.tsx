import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { darkColorMode, lightColorMode } from './colors';

// Define the shape of theme colors
type ThemeColors = {
  appColorWhite: string;
  appColorBlack: string;
  appColorBlue: string;
  appColorRed: string;
  appColorGreen: string;
  appColorGrey1: string;
  appColorBlueLighter: string;
  appColorBlue1: string;
  appColorGrey: string;
};

// Theme color presets for light and dark modes
const lightTheme: ThemeColors = lightColorMode;
const darkTheme: ThemeColors = darkColorMode;

// Define possible theme modes and the context type
type ThemeMode = 'light' | 'dark' | 'system';
type ThemeContextType = {
  theme: ThemeColors;
  themeMode: ThemeMode;
  changeTheme: (mode: ThemeMode) => void;
  isSystemTheme: boolean;
};

// Create a context to provide theme state and functions
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

// ThemeProvider component to manage and provide theme state
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme(); // Get system color scheme
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isSystemTheme, setIsSystemTheme] = useState(true);
  const [theme, setTheme] = useState<ThemeColors>(
    systemColorScheme === 'dark' ? darkTheme : lightTheme,
  );

  // Update theme based on system preferences or user selection
  useEffect(() => {
    if (isSystemTheme) {
      setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
      setThemeMode(systemColorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [systemColorScheme, isSystemTheme]);

  // Handle theme change by user
  const changeTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    if (mode === 'system') {
      setIsSystemTheme(true);
      setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
    } else {
      setIsSystemTheme(false);
      setTheme(mode === 'dark' ? darkTheme : lightTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, themeMode, changeTheme, isSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to access theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
