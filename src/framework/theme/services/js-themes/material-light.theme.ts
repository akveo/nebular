import { NbJSThemeOptions } from './theme.options';

const palette = {
  primary: '#6200ee',
  success: '#00dbc4',
  info: '#0495ee',
  warning: '#ff9f05',
  danger: '#b00020',
};

export const MATERIAL_LIGHT_THEME: NbJSThemeOptions = {
  name: 'material-light',
  base: 'default',
  variables: {
    fontMain: 'Roboto, sans-serif',
    fontSecondary: 'Roboto, sans-serif',

    bg: '#ffffff',
    bg2: '#f5f5f5',
    bg3: '#ebebeb',
    bg4: '#e0e0e0',

    border: '#ffffff',
    border2: '#f5f5f5',
    border3: '#ebebeb',
    border4: '#e0e0e0',
    border5: '#b3b3b3',

    fg: '#838383',
    fgHeading: '#1a2138', // ?
    fgText: '#1a2138', // ?
    fgHighlight: palette.primary,
    layoutBg: '#ebebeb',
    separator: '#ebebeb',

    primary: palette.primary,
    success: palette.success,
    info: palette.info,
    warning: palette.warning,
    danger: palette.danger,

    primaryLight: '#7f39fb',
    successLight: '#3ae9c6',
    infoLight: '#40baf5',
    warningLight: '#ffbd43',
    dangerLight: '#cf3341',
  },
};
