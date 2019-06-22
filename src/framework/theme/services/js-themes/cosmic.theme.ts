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
  base: 'default',
  variables: {
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
    fgText: '#d1d1ff',
    fgHighlight: '#00f9a6',
    layoutBg: '#2f296b',
    separator: '#342e73',
  },
};
