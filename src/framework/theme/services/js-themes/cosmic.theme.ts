import { NbJSThemeOptions } from './theme.options';

const palette = {
  primary: '#a16eff',
  success: '#00d68f',
  info: '#0095ff',
  warning: '#ffaa00',
  danger: '#ff3d71',
};

export const COSMIC_THEME: NbJSThemeOptions = {
  name: 'cosmic',
  variables: {
    fontMain: 'Open Sans, sans-serif',
    fontSecondary: 'Raleway, sans-serif',

    bg: '#323259',
    bg2: '#252547',
    bg3: '#1b1b38',
    bg4: '#13132b',

    border: '#323259',
    border2: '#252547',
    border3: '#1b1b38',
    border4: '#13132b',
    border5: '#13132b',

    fg: '#b4b4db',
    fgHeading: '#ffffff',
    fgText: '#ffffff',
    fgHighlight: palette.primary,
    layoutBg: '#151a30',
    separator: '#151a30',

    primary: palette.primary,
    success: palette.success,
    info: palette.info,
    warning: palette.warning,
    danger: palette.danger,

    primaryLight: '#b18aff',
    successLight: '#2ce69b',
    infoLight: '#42aaff',
    warningLight: '#ffc94d',
    dangerLight: '#ff708d',
  },
};
