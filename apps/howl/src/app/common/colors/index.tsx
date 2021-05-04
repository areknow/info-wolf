/**
 * This is a common area for shared color variables
 */

import { Colors } from '../types';

export const LIGHT_THEME: Colors = {
  backgroundGradient: ['#fafafa', '#ececec'],
  background: '#fafafa',
  surface1: '#FAFBFB',
  surface2: '#ffffff',
  text: 'hsl(229, 33%, 15%)',
  chart: {
    border: '#E6E6E6',
    text: '#999999',
    label: '#5a5a5a',
    selection: 'rgba(1, 38, 91, 0.1)',
    plotBand: 'hsla(342, 100%, 62%, 0.1)',
    plotLine: 'hsla(342, 100%, 62%, 0.2)',
  },
  theme1: 'hsl(240, 46%, 37%)',
  theme2: 'hsl(239, 82%, 65%)',
  theme3: 'hsl(224, 91%, 70%)',
  theme4: 'hsl(203, 91%, 69%)',
  theme5: 'hsl(254, 89%, 68%)',
  theme6: 'hsl(326, 88%, 68%)',
  shadow1:
    'rgba(1, 38, 91, 0.1) 0px 8px 12px 0px, rgba(1, 38, 91, 0.1) 0px 16px 32px 0px',
  shadow2:
    'rgba(1, 38, 91, 0.2) 0px 0px 4px 0px, rgba(1, 38, 91, 0.2) 0px 2px 8px 0px',
};

export const DARK_THEME: Colors = {
  backgroundGradient: ['#1c2138', '#131625'],
  background: 'hsl(229, 33%, 15%)',
  surface1: 'hsl(229, 33%, 25%)',
  surface2: 'hsl(229, 33%, 30%)',
  text: '#ffffff',
  chart: {
    border: '#404661',
    text: '#6c7291',
    label: '#939ab9',
    selection: 'rgba(0, 0, 0, 0.1)',
    plotBand: 'hsla(342, 100%, 52%, 0.1)',
    plotLine: 'hsla(342, 100%, 52%, 0.2)',
  },
  theme1: 'hsl(240, 46%, 27%)',
  theme2: 'hsl(239, 82%, 55%)',
  theme3: 'hsl(224, 91%, 60%)',
  theme4: 'hsl(203, 91%, 59%)',
  theme5: 'hsl(254, 89%, 58%)',
  theme6: 'hsl(326, 88%, 58%)',
  shadow1:
    'rgba(0,0,0, 0.1) 0px 8px 12px 0px, rgba(0,0,0, 0.1) 0px 16px 32px 0px',
  shadow2: 'rgba(0,0,0, 0.2) 0px 0px 4px 0px, rgba(0,0,0, 0.2) 0px 2px 8px 0px',
};
