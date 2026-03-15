import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { id: 'orange', name: '🔥 Orange Energy', color: '#ff6b35' },
  { id: 'purple', name: '💜 Purple Luxury', color: '#9333ea' },
  { id: 'blue', name: '💙 Blue Professional', color: '#2563eb' },
  { id: 'green', name: '💚 Green Eco', color: '#16a34a' },
  { id: 'red', name: '❤️ Red Energy', color: '#dc2626' },
  { id: 'cyan', name: '🌊 Cyan Modern', color: '#0891b2' },
  { id: 'pink', name: '💗 Pink Creative', color: '#db2777' }
];

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('orange');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme && themes.find(t => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('appTheme', themeId);
  };

  const value = {
    currentTheme,
    changeTheme,
    themes,
    getCurrentThemeColor: () => {
      const theme = themes.find(t => t.id === currentTheme);
      return theme ? theme.color : themes[0].color;
    }
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
