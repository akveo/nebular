import { NbJSThemeOptions } from './theme.options';

const palette = {
  primary: '#11a1fd',
  success: '#07c180',
  info: '#5a75f8',
  warning: '#ff9931',
  danger: '#f42b3d',
};

export const BLUEBERRY_THEME: NbJSThemeOptions = {
  name: 'blueberry',
  variables: {
    fontMain: 'Open Sans, sans-serif',
    fontSecondary: 'Raleway, sans-serif',

    bg: '#ffffff',
    bg2: '#f3f7f9',
    bg3: '#e3eef6',
    bg4: '#cbdfea',

    border: '#ffffff',
    border2: '#f3f7f9',
    border3: '#e3eef6',
    border4: '#cbdfea',
    border5: '#a6c1d3',

    fg: '#7d9eb5',
    fgHeading: '#223345',
    fgText: '#223345',
    fgHighlight: palette.primary,
    layoutBg: '#f3f7f9',
    separator: '#e3eef6',

    primary: palette.primary,
    success: palette.success,
    info: palette.info,
    warning: palette.warning,
    danger: palette.danger,

    primaryLight: '#4cc3fd',
    successLight: '#3cd993',
    infoLight: '#8299fa',
    warningLight: '#ffba64',
    dangerLight: '#f85f5e',
  },
};
