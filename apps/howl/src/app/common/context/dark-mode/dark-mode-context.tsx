import { createContext, useContext, useState } from 'react';
import { DEFAULT_STATE } from './constants';
import { DarkModeContextModel, DarkModeContextType } from './types';

export const DarkModeContext = createContext<DarkModeContextType>({
  darkModeContext: DEFAULT_STATE,
  updateDarkModeContext: () => null,
});

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkModeContext, setDarkModeContext] = useState<DarkModeContextModel>(
    DEFAULT_STATE
  );

  function updateDarkModeContext(updateData: Partial<DarkModeContextModel>) {
    setDarkModeContext((context) => {
      return { ...context, ...updateData };
    });
  }

  return (
    <DarkModeContext.Provider
      value={{ darkModeContext, updateDarkModeContext }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
  const { darkModeContext } = useContext(DarkModeContext);
  return { dark: darkModeContext.darkMode };
};
