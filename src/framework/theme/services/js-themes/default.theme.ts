import { NbJSThemeOptions } from './theme.options';

const palette = {
  primary: '#3366ff',
  success: '#00d68f',
  info: '#0095ff',
  warning: '#ffaa00',
  danger: '#ff3d71',
};

export const DEFAULT_THEME: NbJSThemeOptions = {
  name: 'default',
  variables: {
    fontMain: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSecondary: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

    bg: '#ffffff',
    fg: '#8f9bb3',
    fgHeading: '#1a2138',
    fgText: '#1a2138',
    fgHighlight: '#3366ff',
    layoutBg: '#f7f9fc',
    separator: '#edf1f7',

    primary: palette.primary,
    success: palette.success,
    info: palette.info,
    warning: palette.warning,
    danger: palette.danger,

    primaryLight: '#598bff',
    successLight: '#2ce69b',
    infoLight: '#42aaff',
    warningLight: '#ffc94d',
    dangerLight: '#ff708d',
  },
};
