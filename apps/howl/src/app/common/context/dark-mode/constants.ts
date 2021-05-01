import { createGlobalStyle } from 'styled-components';
import { DARK_THEME, LIGHT_THEME } from '../../colors';
import { DarkModeContextModel } from './types';

export const DEFAULT_STATE: DarkModeContextModel = {
  darkMode: false,
};

/**
 * Generates the CSS custom property values. Dynamically switches
 * between light and dark theme based on context state.
 * @param darkMode whether or not dark theme should be used
 * @returns Object of custom properties to be set in :root{}
 */
const customProperties = (darkMode: boolean): { [key: string]: string } => {
  const colors = darkMode ? DARK_THEME : LIGHT_THEME;
  return {
    '--background-gradient': colors.backgroundGradient.join(', '),
    '--background-color': colors.background,
    '--surface-color': colors.surface,
    '--text-color': colors.text,
  };
};

export const GlobalStyles = createGlobalStyle<{ darkMode: boolean }>`
  :root {
    ${({ darkMode }) => customProperties(darkMode)}
  }
`;
