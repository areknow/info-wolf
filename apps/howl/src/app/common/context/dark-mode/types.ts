export interface DarkModeContextModel {
  darkMode: boolean;
}

export type DarkModeContextType = {
  darkModeContext: DarkModeContextModel;
  toggleDarkMode: () => void;
};
