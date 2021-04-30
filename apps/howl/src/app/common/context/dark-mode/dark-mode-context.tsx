import cx from 'class-names';
import { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'use-color-scheme';
import { DEFAULT_STATE } from './constants';
import styles from './theme.module.scss';
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
      <div
        className={cx([
          styles.theme,
          darkModeContext.darkMode && styles.darkMode,
        ])}
      >
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
  const { darkModeContext, toggleDarkMode } = useContext(DarkModeContext);
  return { dark: darkModeContext.darkMode, toggleDarkMode };
};
