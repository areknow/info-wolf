export interface DarkModeContextModel {
  darkMode: boolean;
}

export type DarkModeContextType = {
  darkModeContext: DarkModeContextModel;
  updateDarkModeContext: (updateData: Partial<DarkModeContextModel>) => void;
};
