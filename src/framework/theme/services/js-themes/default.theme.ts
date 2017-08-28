import { NbJSThemeOptions } from './theme.options';
import { tint } from './color.helper';

const palette = {
  primary: '#8a7fff',
  success: '#40dc7e',
  info: '#4ca6ff',
  warning: '#ffa100',
  danger: '#ff4c6a',
};

export const DEFAULT_THEME: NbJSThemeOptions = {
  name: 'default',
  variables: {
    fontMain: 'Open Sans',
    fontSecondary: 'Exo',

    bg: '#ffffff',
    fg: '#a4abb3',
    fgHeading: '#282828',
    fgText: '#484848',
    fgHighlight: '#40dc7e',
    layoutBg: '#ebeff5',
    separator: '#ebeef2',

    primary: palette.primary,
    success: palette.success,
    info: palette.info,
    warning: palette.warning,
    danger: palette.danger,

    primaryLight: tint(palette.primary, 15),
    successLight: tint(palette.success, 15),
    infoLight: tint(palette.info, 15),
    warningLight: tint(palette.warning, 15),
    dangerLight: tint(palette.danger, 15),
  },
};
