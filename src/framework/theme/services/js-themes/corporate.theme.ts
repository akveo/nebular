import { NbJSThemeOptions } from './theme.options';
import { NbColorHelper } from '../color.helper';

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
    fgHeading: '#181818',
    fgText: '#4b4b4b',
    fgHighlight: '#a4abb3',
    layoutBg: '#f1f5f8',
    separator: '#cdd5dc',

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
