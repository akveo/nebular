import { hexToRgbA } from './e2e-helper';

export const cardSizes = [
  { sizeKey: 'xxsmall', height: '96px' },
  { sizeKey: 'xsmall', height: '216px' },
  { sizeKey: 'small', height: '336px' },
  { sizeKey: 'medium', height: '456px' },
  { sizeKey: 'large', height: '576px' },
  { sizeKey: 'xlarge', height: '696px' },
  { sizeKey: 'xxlarge', height: '816px' },
];

export const alertSizes = [
  { sizeKey: 'xxsmall', height: '52px' },
  { sizeKey: 'xsmall', height: '72px' },
  { sizeKey: 'small', height: '92px' },
  { sizeKey: 'medium', height: '112px' },
  { sizeKey: 'large', height: '132px' },
  { sizeKey: 'xlarge', height: '152px' },
  { sizeKey: 'xxlarge', height: '172px' },
];

export const colors = [
  { colorKey: 'primary', color: hexToRgbA('#8a7fff') },
  { colorKey: 'success', color: hexToRgbA('#40dc7e') },
  { colorKey: 'info', color: hexToRgbA('#4ca6ff') },
  { colorKey: 'warning', color: hexToRgbA('#ffa100') },
  { colorKey: 'danger', color: hexToRgbA('#ff4c6a') },
  { colorKey: 'default', color: hexToRgbA('#a4abb3') },
  { colorKey: 'disabled', color: 'rgba(255, 255, 255, 0.4)' },
];

export const chatSizes = cardSizes;
