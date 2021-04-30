import { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'use-color-scheme';
import { DEFAULT_STATE } from './constants';
import { DarkModeContextModel, DarkModeContextType } from './types';

export const DarkModeContext = createContext<DarkModeContextType>({
  darkModeContext: DEFAULT_STATE,
  toggleDarkMode: () => null,
});

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { scheme } = useColorScheme();
  const [darkModeContext, setDarkModeContext] = useState<DarkModeContextModel>({
    darkMode: scheme === 'dark',
  });

  const toggleDarkMode = () => {
    setDarkModeContext({ darkMode: !darkModeContext.darkMode });
  };

  return (
    <DarkModeContext.Provider value={{ darkModeContext, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
  const { darkModeContext, toggleDarkMode } = useContext(DarkModeContext);
  return { dark: darkModeContext.darkMode, toggleDarkMode };
};
