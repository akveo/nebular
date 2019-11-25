import { NbJSThemeOptions } from './theme.options';

const palette = {
  primary: '#e91d63',
  success: '#60af20',
  info: '#0495ee',
  warning: '#ff9f05',
  danger: '#b00020',
};

export const MATERIAL_DARK_THEME: NbJSThemeOptions = {
  name: 'material-dark',
  base: 'dark',
  variables: {
    fontMain: 'Roboto, sans-serif',
    fontSecondary: 'Roboto, sans-serif',

    bg: '#383838',
    bg2: '#292929',
    bg3: '#1f1f1f',
    bg4: '#141414',

    border: '#383838',
    border2: '#292929',
    border3: '#1f1f1f',
    border4: '#141414',
    border5: '#141414',

    fg: '#808080',
    fgHeading: '#1a2138', // ?
    fgText: '#1a2138', // ?
    fgHighlight: palette.primary,
    layoutBg: '#1f1f1f',
    separator: '#1f1f1f',

    primary: palette.primary,
    success: palette.success,
    info: palette.info,
    warning: palette.warning,
    danger: palette.danger,

    primaryLight: '#f24681',
    successLight: '#8fcf50',
    infoLight: '#40bbf4',
    warningLight: '#ffbe43',
    dangerLight: '#cf3341',
  },
};
