import { NbJSThemeOptions } from './theme.options';

const palette = {
  primary: '#73a1ff',
  success: '#5dcfe3',
  info: '#ba7fec',
  warning: '#ffa36b',
  danger: '#ff6b83',
};

export const CORPORATE_THEME: NbJSThemeOptions = {
  name: 'corporate',
  base: 'default',
  variables: {
    fg: '#f1f5f8',
    bg: '#ffffff',
    bg2: '#f7f9fc',
    bg3: '#edf1f7',
    bg4: '#e4e9f2',

    border: '#ffffff',
    border2: '#f7f9fc',
    border3: '#edf1f7',
    border4: '#e4e9f2',
    border5: '#c5cee0',

    fg: '#8f9bb3',
    fgHeading: '#1a2138',
    fgText: '#1a2138',
    fgHighlight: palette.primary,
    layoutBg: '#f7f9fc',
    separator: '#edf1f7',

    primary: palette.primary,
    success: palette.success,
    info: palette.info,
    warning: palette.warning,
    danger: palette.danger,

    primaryLight: NbColorHelper.tint(palette.primary, 15),
    successLight: NbColorHelper.tint(palette.success, 15),
    infoLight: NbColorHelper.tint(palette.info, 15),
    warningLight: NbColorHelper.tint(palette.warning, 15),
    dangerLight: NbColorHelper.tint(palette.danger, 15),
  },
};
