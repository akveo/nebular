import { NbJSThemeOptions } from './theme.options';
import { NbColorHelper } from '../color.helper';

const palette = {
  primary: '#7659ff',
  success: '#00d977',
  info: '#0088ff',
  warning: '#ffa100',
  danger: '#ff386a',
};

export const COSMIC_THEME: NbJSThemeOptions = {
  name: 'cosmic',
  base: 'default',
  variables: {
    bg: '#3d3780',
    fg: '#a1a1e5',
    fgHeading: '#ffffff',
    fgText: '#d1d1ff',
    fgHighlight: '#00f9a6',
    layoutBg: '#2f296b',
    separator: '#342e73',

    primary: palette.primary,
    success: palette.success,
    info: palette.info,
    warning: palette.warning,
    danger: palette.danger,

    primaryLight: NbColorHelper.tint(palette.primary, 20),
    successLight: NbColorHelper.tint(palette.success, 20),
    infoLight: NbColorHelper.tint(palette.info, 20),
    warningLight: NbColorHelper.tint(palette.warning, 20),
    dangerLight: NbColorHelper.tint(palette.danger, 20),
  },
};
