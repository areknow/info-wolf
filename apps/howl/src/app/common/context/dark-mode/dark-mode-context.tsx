import { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'use-color-scheme';
import { DEFAULT_STATE, GlobalStyles } from './constants';
import { DarkModeContextModel, DarkModeContextType } from './types';

export const DarkModeContext = createContext<DarkModeContextType>({
  darkModeContext: DEFAULT_STATE,
  toggleDarkMode: () => null,
});

/**
 * This provider allows all descendants to get access to the dark mode
 * context and the ability to manually mutate the dark mode state
 * @returns Children of the provider
 */
export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /**
   * useColorScheme hook listens to `prefers-color-scheme` media query to
   * determine if the system is in native light/dark mode. Context is set
   * accordingly. https://github.com/mujo-code/use-color-scheme
   */
  const { scheme } = useColorScheme();
  const [darkModeContext, setDarkModeContext] = useState<DarkModeContextModel>({
    darkMode: scheme === 'dark',
  });

  /** Switch between light/dark mode */
  const toggleDarkMode = () => {
    setDarkModeContext({ darkMode: !darkModeContext.darkMode });
  };

  /**
   * The returned JSX element also includes the styled components GlobalStyles
   * component where the CSS custom properties are attached to :root{}. This
   * allows the entire DOM tree to have access to the color variables which
   * will dynamically update based on light/dark context.
   */
  return (
    <DarkModeContext.Provider value={{ darkModeContext, toggleDarkMode }}>
      <GlobalStyles darkMode={darkModeContext.darkMode} />
      {children}
    </DarkModeContext.Provider>
  );
};

/**
 * Helper hook that returns the darkMode context and the toggle function.
 * This also prevents the need to call useContext elsewhere in the application.
 */
export const useDarkModeContext = () => {
  const { darkModeContext, toggleDarkMode } = useContext(DarkModeContext);
  return { dark: darkModeContext.darkMode, toggleDarkMode };
};
